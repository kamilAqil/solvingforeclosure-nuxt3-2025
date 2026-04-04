import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { buildLeadFields, fieldsToHtml, fieldsToText } from './formatters'

export async function sendLeadEmail({
  config,
  body,
  propertyCondition,
  ip,
  ua,
  savedLeadId
}) {
  const apiKey = config.mailgunApiKey
  const domain = config.mailgunDomain
  const from = config.mailgunFrom
  const to = config.mailgunTo || 'kaqil91@gmail.com'
  const apiBase = config.mailgunApiBase || 'https://api.mailgun.net'

  if (!apiKey || !domain || !from || !to) {
    const err = new Error('Lead service not configured. Please set Mailgun environment variables.')
    err.code = 'MAILGUN_CONFIG'
    throw err
  }

  const fields = buildLeadFields({ body, propertyCondition, ip, ua, savedLeadId })
  const text = fieldsToText(fields)
  const html = fieldsToHtml(fields)

  const mailgun = new Mailgun(FormData)
  const mg = mailgun.client({
    username: 'api',
    key: apiKey,
    url: apiBase
  })

  return mg.messages.create(domain, {
    from,
    to: [to],
    subject: `New Foreclosure Lead: ${body.address}`,
    text,
    html
  })
}
