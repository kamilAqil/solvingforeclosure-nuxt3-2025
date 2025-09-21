import { defineEventHandler } from 'h3'

// pull best-guess client IP from common proxy headers
function getClientIp(event) {
  const h = event.node.req.headers
  const xf = (h['x-forwarded-for'] || h['x-real-ip'] || h['cf-connecting-ip'] || '').toString()
  const ip = xf.split(',')[0].trim().replace('::ffff:', '')
  return ip || ''
}

export default defineEventHandler(async (event) => {
  const ip = getClientIp(event)
  try {
    // if we don’t have an IP (local dev), ipapi falls back to server IP
    const url = ip ? `https://ipapi.co/${ip}/json/` : 'https://ipapi.co/json/'
    const data = await $fetch(url)

    const city = data?.city || null
    const state = data?.region || null
    const slug = city ? city.toLowerCase().replace(/\s+/g, '-') : null

    return { city, state, slug }   // keep it minimal
  } catch {
    return { city: null, state: null, slug: null }
  }
})
