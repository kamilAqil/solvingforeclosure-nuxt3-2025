// server/api/geo.post.ts
import { defineEventHandler, readBody, setCookie } from 'h3'

type GComp = { long_name: string; short_name: string; types: string[] }
type GResult = { address_components: GComp[] }
type GRes = { status: string; results: GResult[]; error_message?: string }

const toSlug = (s?: string | null) => (s || '').trim().toLowerCase().replace(/\s+/g, '-')

const pick = (a: GComp[], t: string) => a.find(c => c.types.includes(t))

function toCityState(results: GResult[]) {
  for (const r of results) {
    const c = r.address_components || []
    const city =
      pick(c, 'locality')?.long_name ||
      pick(c, 'postal_town')?.long_name ||
      pick(c, 'administrative_area_level_3')?.long_name ||
      pick(c, 'sublocality')?.long_name ||
      pick(c, 'neighborhood')?.long_name || null
    const state = pick(c, 'administrative_area_level_1')?.short_name || null
    if (city || state) return { city, state }
  }
  return { city: null, state: null }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ lat?: number; lng?: number }>(event)
  const lat = Number(body?.lat)
  const lng = Number(body?.lng)
  const key = useRuntimeConfig(event).googleMapsApiKey

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return { ok: false, error: 'Missing lat/lng' }
  }
  if (!key) {
    return { ok: false, error: 'Missing GOOGLE_MAPS_API_KEY' }
  }

  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const params = {
    latlng: `${lat},${lng}`,
    result_type: 'locality|postal_town|administrative_area_level_3|sublocality|neighborhood',
    key
  }

  try {
    const data = await $fetch<GRes>(url, { params, retry: 0, timeout: 5000 })
    if (data.status !== 'OK') return { ok: false, status: data.status, city: null, state: null, slug: null }

    const { city, state } = toCityState(data.results || [])
    const slug = city ? toSlug(city) : null

    // Store for SSR (7 days). Not httpOnly so client can read too if needed.
    const maxAge = 60 * 60 * 24 * 7
    setCookie(event, 'geo_city', city || '', { maxAge, sameSite: 'lax' })
    setCookie(event, 'geo_state', state || '', { maxAge, sameSite: 'lax' })
    setCookie(event, 'geo_slug', slug || '', { maxAge, sameSite: 'lax' })

    return { ok: true, city, state, slug }
  } catch (e) {
    return { ok: false, error: 'Geocode failed', city: null, state: null, slug: null }
  }
})
