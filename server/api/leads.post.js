import { prisma } from '~/server/utils/prisma'
import sgMail from '@sendgrid/mail'
import { readBody, setResponseStatus, getRequestHeader, getRequestIP } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('[leads] Received lead submission:', body)

  // --- Basic validation ---
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
        property_description: body.propertyDescription || null,
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
  // support either camel or lowercase keys (depending on how you set runtimeConfig)
  const apiKey = config.sendgridApiKey || config.sendGridApiKey
  const from = config.sendgridFrom || config.sendGridFrom
  const to = config.sendgridTo || config.sendGridTo

  if (apiKey && from && to) {
    try {
      sgMail.setApiKey(apiKey)

      const idStr = String(saved.id) // BigInt -> string
      const lines = [
        `<strong>Name:</strong> ${body.name || '(n/a)'}`,
        `<strong>Email:</strong> ${body.email || '(n/a)'}`,
        `<strong>Address:</strong> ${body.address}`,
        `<strong>Condition:</strong> ${property_condition ?? '(n/a)'}`,
        `<strong>Timeline:</strong> ${body.timeline || '(n/a)'}`,
        `<strong>IP:</strong> ${getRequestIP(event, { xForwardedFor: true }) || '(n/a)'}`,
        `<strong>User-Agent:</strong> ${getRequestHeader(event, 'user-agent') || '(n/a)'}`
      ].join('<br/>')

      await sgMail.send({
        to: 'kaqil91@gmail.com',
        from, // must be a verified sender in SendGrid
        subject: `New Lead #${idStr}: ${body.address}`,
        html: `
          <h2>New Lead Submitted</h2>
          <p>${lines}</p>
          <p><strong>Description:</strong></p>
          <p>${(body.propertyDescription || '').replace(/\n/g, '<br/>')}</p>
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
        id: String(saved.id),                               // BigInt-safe
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
    id: String(saved.id),                                   // BigInt -> string
    created_at: saved.created_at.toISOString()
  }
})
