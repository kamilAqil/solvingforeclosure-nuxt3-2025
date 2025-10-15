// plugins/geo.client.ts
export default defineNuxtPlugin(() => {
  // Don’t re-run if cookies exist
  const city  = useCookie<string>('geo_city')
  const state = useCookie<string>('geo_state')
  if (city.value && state.value) return

  if (!('geolocation' in navigator)) return

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude: lat, longitude: lng } = pos.coords
    try { await $fetch('/api/geo', { method: 'POST', body: { lat, lng } }) } catch {}
  }, () => {}, { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 })
})
