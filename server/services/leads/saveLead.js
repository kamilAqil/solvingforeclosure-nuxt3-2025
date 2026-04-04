import { prisma } from '~/server/utils/prisma'

export function normalizePropertyCondition(value) {
  if (value == null || value === '') return null
  const n = parseInt(value, 10)
  if (Number.isNaN(n) || n < 1 || n > 10) {
    throw new Error('Property condition must be 1–10')
  }
  return n
}

export async function saveLeadToDb({ body, propertyCondition, ip, ua }) {
  const saved = await prisma.sf_leads.create({
    data: {
      address: body.address,
      name: body.name || null,
      email: body.email || null,
      phone: body.phone || null,
      situation: body.situation || null,
      goal: body.goal || null,
      timeline: body.timeline || null,
      property_condition: propertyCondition,
      notes: body.notes || null,
      user_agent: ua,
      ip,
      source: body.source || null,
      path: body.path || null,
      ts: parseTimestamp(body.ts)
    },
    select: { id: true }
  })

  return String(saved.id)
}

function parseTimestamp(value) {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}
