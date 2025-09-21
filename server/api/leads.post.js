import { prisma } from '~/server/utils/prisma'
import sgMail from '@sendgrid/mail'
import { readBody, setResponseStatus, getRequestHeader, getRequestIP } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('[leads] Received lead submission:', body)

  // --- Honeypot: silently accept & stop if bots fill this ---
  if (body.website) {
    return { ok: true, ignored: true }
  }

  // --- Basic validation (keep server-side permissive) ---
  if (!body.address) {
    setResponseStatus(event, 400)
    return { ok: false, error: 'Address is required' }
  }

  // --- Normalize condition (smallint 1..10 or null) ---
  let property_condition = null
  if (body.propertyCondition != null && body.propertyCondition !== '') {
    const n = parseInt(body.propertyCondition, 10)
    if (Number.isNaN(n) || n < 1 || n > 10) {
      setResponseStatus(event, 400)
      return { ok: false, error: 'Property condition must be 1–10' }
    }
    property_condition = n
  }

  // --- Map new ContactForm fields to your existing schema ---
  // Your table has: address, name, email, property_condition, timeline, property_description, user_agent, ip
  // We’ll put the new "notes" into property_description
  const notes = body.notes || body.propertyDescription || ''

  // To avoid losing new fields (phone/situation/goal),
  // append a compact summary under the notes you store.
  const extrasSummaryParts = []
  if (body.phone) extrasSummaryParts.push(`Phone: ${body.phone}`)
  if (body.situation) extrasSummaryParts.push(`Stage: ${labelStage(body.situation)}`)
  if (body.goal) extrasSummaryParts.push(`Goal: ${labelGoal(body.goal)}`)
  if (body.timeline) extrasSummaryParts.push(`Urgency: ${labelTimeline(body.timeline)}`)

  const property_description =
    [notes.trim(), extrasSummaryParts.length ? `\n\n---\n${extrasSummaryParts.join(' | ')}` : '']
      .join('')
      .trim()

  // --- Insert into DB ---
  let saved
  try {
    saved = await prisma.leads.create({
      data: {
        address: body.address,
        name: body.name || null,
        email: body.email || null,
        property_condition,
        timeline: body.timeline || null,
        property_description,
        user_agent: getRequestHeader(event, 'user-agent') || null,
        ip: getRequestIP(event, { xForwardedFor: true }) || null
      },
      select: { id: true, created_at: true }
    })
  } catch (e) {
    console.error('[leads] DB insert error:', e)
    setResponseStatus(event, 500)
    return { ok: false, error: 'Database insert failed' }
  }

  // --- Send email with SendGrid (best-effort) ---
  const config = useRuntimeConfig()
  const apiKey = config.sendgridApiKey || config.sendGridApiKey
  const from = config.sendgridFrom || config.sendGridFrom
  const to = config.sendgridTo || config.sendGridTo

  if (apiKey && from && to) {
    try {
      sgMail.setApiKey(apiKey)

      const idStr = String(saved.id) // BigInt -> string
      const ip = getRequestIP(event, { xForwardedFor: true }) || '(n/a)'
      const ua = getRequestHeader(event, 'user-agent') || '(n/a)'

      const pretty = (label, val) => `<strong>${label}:</strong> ${val || '(n/a)'}`
      const htmlLines = [
        pretty('Name', body.name),
        pretty('Email', body.email),
        pretty('Phone', body.phone),
        pretty('Address', body.address),
        pretty('Stage', labelStage(body.situation)),
        pretty('Goal', labelGoal(body.goal)),
        pretty('Urgency', labelTimeline(body.timeline)),
        pretty('Condition', property_condition ?? '(n/a)'),
        pretty('IP', ip),
        pretty('User-Agent', ua),
        pretty('Source', body.source),
        pretty('Path', body.path),
        pretty('Timestamp', body.ts)
      ].join('<br/>')

      await sgMail.send({
        to: to,                               // or a comma-separated list
        from,                                 // must be a verified sender in SendGrid
        subject: `New Foreclosure Lead #${idStr}: ${body.address}`,
        html: `
          <h2>New Foreclosure Lead</h2>
          <p>${htmlLines}</p>
          <p><strong>Notes:</strong></p>
          <p>${(notes || '').replace(/\n/g, '<br/>')}</p>
          <hr/>
          <small>Lead ID: ${idStr} • Created: ${saved.created_at.toISOString()}</small>
        `
      })
    } catch (e) {
      console.error('[leads] SendGrid error status:', e?.code || e?.response?.statusCode)
      console.error('[leads] SendGrid error body:', e?.response?.body)
      console.error('[leads] SendGrid error headers:', e?.response?.headers)
      // Do not fail the request if email fails
      return {
        ok: true,
        id: String(saved.id),
        created_at: saved.created_at.toISOString(),
        warning: 'Saved, but email failed to send'
      }
    }
  } else {
    console.warn('[leads] SendGrid not configured (sendgridApiKey/sendgridFrom/sendgridTo)')
    return {
      ok: true,
      id: String(saved.id),
      created_at: saved.created_at.toISOString(),
      warning: 'Saved, but email not configured'
    }
  }

  // --- Success (BigInt-safe) ---
  return {
    ok: true,
    id: String(saved.id),
    created_at: saved.created_at.toISOString()
  }
})

/** ---------- helpers to prettify select values ---------- */
function labelStage(v) {
  switch (v) {
    case 'missed': return 'Missed a few payments'
    case 'nod': return 'Notice of Default'
    case 'nts': return 'Notice of Trustee Sale'
    case 'auction': return 'Auction scheduled'
    case 'other': return 'Other'
    default: return v || '(n/a)'
  }
}

function labelGoal(v) {
  switch (v) {
    case 'keep': return 'Keep the home'
    case 'sell': return 'Sell before auction'
    case 'time': return 'Need more time'
    case 'explore': return 'Explore options'
    default: return v || '(n/a)'
  }
}

function labelTimeline(v) {
  switch (v) {
    case '30d': return 'Auction in < 30 days'
    case '1-3m': return '1–3 months'
    case '3-6m': return '3–6 months'
    case 'exploring': return 'Just exploring options'
    default: return v || '(n/a)'
  }
}
