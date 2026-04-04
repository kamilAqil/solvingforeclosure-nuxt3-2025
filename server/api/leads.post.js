import { readBody, setResponseStatus, getRequestHeader, getRequestIP } from 'h3'
import { getMailgunErrorDetails } from '~/server/services/leads/formatters'
import { normalizePropertyCondition, saveLeadToDb } from '~/server/services/leads/saveLead'
import { sendLeadEmail } from '~/server/services/leads/sendLeadEmail'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('[leads] Received lead submission')

  if (body.website) {
    return { ok: true, ignored: true }
  }

  if (!body.address) {
    setResponseStatus(event, 400)
    return { ok: false, error: 'Address is required' }
  }

  let propertyCondition
  try {
    propertyCondition = normalizePropertyCondition(body.propertyCondition)
  } catch (e) {
    setResponseStatus(event, 400)
    return { ok: false, error: e?.message || 'Invalid property condition' }
  }

  const config = useRuntimeConfig()
  const ip = getRequestIP(event, { xForwardedFor: true }) || null
  const ua = getRequestHeader(event, 'user-agent') || null

  // Optional DB save (best-effort). Email still sends if this fails.
  let savedLeadId = null
  try {
    savedLeadId = await saveLeadToDb({
      body,
      propertyCondition,
      ip,
      ua
    })
  } catch (e) {
    console.error('[leads] sf_leads insert failed (continuing with email):', e)
  }

  try {
    await sendLeadEmail({
      config,
      body,
      propertyCondition,
      ip,
      ua,
      savedLeadId
    })

    return {
      ok: true,
      id: savedLeadId
    }
  } catch (e) {
    if (e?.code === 'MAILGUN_CONFIG') {
      console.warn('[leads] Mailgun not fully configured (MAILGUN_API_KEY/DOMAIN/FROM/TO)')
      setResponseStatus(event, 500)
      return {
        ok: false,
        id: savedLeadId,
        error: e.message
      }
    }

    const details = getMailgunErrorDetails(e)
    console.error('[leads] Mailgun send failed:', details)
    setResponseStatus(event, 502)
    return {
      ok: false,
      id: savedLeadId,
      error: 'Failed to send lead email',
      ...(process.env.NODE_ENV !== 'production' ? { debug: details } : {})
    }
  }
})
