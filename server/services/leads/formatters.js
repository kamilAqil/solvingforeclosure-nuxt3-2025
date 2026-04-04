export function labelStage(v) {
  switch (v) {
    case 'missed': return 'Missed a few payments'
    case 'nod': return 'Notice of Default'
    case 'nts': return 'Notice of Trustee Sale'
    case 'auction': return 'Auction scheduled'
    case 'other': return 'Other'
    default: return v || '(n/a)'
  }
}

export function labelGoal(v) {
  switch (v) {
    case 'keep': return 'Keep the home'
    case 'sell': return 'Sell before auction'
    case 'time': return 'Need more time'
    case 'explore': return 'Explore options'
    default: return v || '(n/a)'
  }
}

export function labelTimeline(v) {
  switch (v) {
    case '30d': return 'Auction in < 30 days'
    case '1-3m': return '1–3 months'
    case '3-6m': return '3–6 months'
    case 'exploring': return 'Just exploring options'
    default: return v || '(n/a)'
  }
}

export function buildLeadFields({ body, propertyCondition, ip, ua, savedLeadId }) {
  return [
    ['Name', body.name],
    ['Email', body.email],
    ['Phone', body.phone],
    ['Address', body.address],
    ['Stage', labelStage(body.situation)],
    ['Goal', labelGoal(body.goal)],
    ['Urgency', labelTimeline(body.timeline)],
    ['Condition', propertyCondition ?? '(n/a)'],
    ['Notes', body.notes || '(n/a)'],
    ['Source', body.source || '(n/a)'],
    ['Path', body.path || '(n/a)'],
    ['Timestamp', body.ts || new Date().toISOString()],
    ['IP', ip || '(n/a)'],
    ['User-Agent', ua || '(n/a)'],
    ['Lead ID', savedLeadId || '(not saved)']
  ]
}

export function fieldsToText(fields) {
  return fields
    .map(([label, value]) => `${label}: ${value ?? '(n/a)'}`)
    .join('\n')
}

export function fieldsToHtml(fields) {
  return `
    <h2>New Foreclosure Lead</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      ${fields
        .map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}:</strong></td><td>${escapeHtml(String(value ?? '(n/a)'))}</td></tr>`)
        .join('')}
    </table>
  `
}

export function getMailgunErrorDetails(error) {
  return {
    message: error?.message || '(no message)',
    status: error?.status || error?.statusCode || error?.response?.status,
    details: error?.details || error?.response?.data || error?.body || null
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
