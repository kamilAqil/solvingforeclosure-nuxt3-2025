import { defineEventHandler } from 'h3'

// pull best-guess client IP from common proxy headers
function getClientIp(event) {
  const h = event.node.req.headers
  console.log('[geo] Incoming headers:', h)

  const xf =
    (h['x-forwarded-for'] ||
      h['x-real-ip'] ||
      h['cf-connecting-ip'] ||
      '').toString()

  console.log('[geo] Raw forwarded header:', xf)

  const ip = xf.split(',')[0].trim().replace('::ffff:', '')
  console.log('[geo] Parsed client IP:', ip)

  return ip || ''
}

export default defineEventHandler(async (event) => {
  const ip = getClientIp(event)

  try {
    console.log(`[geo] Looking up location for IP: ${ip || '(empty)'}`)

    const url = ip ? `https://ipapi.co/${ip}/json/` : 'https://ipapi.co/json/'
    console.log('[geo] Fetching URL:', url)

    const data = await $fetch(url)

    console.log('[geo] Raw response data:', data)

    const city = data?.city || null
    const state = data?.region || null
    const slug = city ? city.toLowerCase().replace(/\s+/g, '-') : null

    console.log('[geo] Parsed result:', { city, state, slug })
    
    return { city, state, slug }
  } catch (err) {
    console.error('[geo] Error during lookup:', err)
    return { city: null, state: null, slug: null }
  }
})
