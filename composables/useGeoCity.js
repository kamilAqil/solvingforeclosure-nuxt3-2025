export function useGeoCity() {
  const status = ref('idle')  // idle | loading | ready | error
  const city = ref(null)
  const state = ref(null)
  const slug = ref(null)

  async function load() {
    status.value = 'loading'
    try {
      const res = await $fetch('/api/geo')
      city.value = res?.city || null
      state.value = res?.state || null
      slug.value = res?.slug || null
      status.value = 'ready'
    } catch {
      status.value = 'error'
    }
  }

  const cityLabel = computed(() => city.value || 'your area') // <- fallback

  onMounted(load)

  return { status, city, state, slug, cityLabel, reload: load }
}
