<script setup>
import { useRoute, useRouter, useFetch } from '#imports'

const props = defineProps({
  // Optional overrides (useful on non-[topic]/[city] pages)
  city: { type: String, default: '' },
  topic: { type: String, default: '' },

  // Scroll targets (ids or hashes)
  primaryTarget:  { type: String, default: '#options' },
  contactTarget:  { type: String, default: '#contact' }
})

const route = useRoute()
const router = useRouter()

const pretty = (s = '') =>
  s.split('-').map(w => (w ? w[0].toUpperCase() + w.slice(1) : '')).join(' ')

/* --- Read city/topic from route (pretty-cased) --- */
const routeCitySlug  = computed(() => String(route.params.city || ''))
const cityFromRoute  = computed(() => routeCitySlug.value ? pretty(routeCitySlug.value) : '')
const routeTopicSlug = computed(() => String(route.params.topic || 'postpone-foreclosure'))
const topicTitle     = computed(() => props.topic || pretty(routeTopicSlug.value))

/* --- SSR fetch of IP-based city (no prompt) --- */
const { data: geo } = await useFetch('/api/geo', {
  server: true,
  default: () => ({ city: null, state: null, slug: null })
})
const ipCityLabel = computed(() => geo.value?.city || 'your area')

/* --- Final city shown in H1 & hint line --- */
const displayCity = computed(() => props.city || cityFromRoute.value || ipCityLabel.value)

function scrollToHash(hash) {
  const id = hash.startsWith('#') ? hash.slice(1) : hash
  const el = document.getElementById(id)
  if (el) {
    const offset = 64 // adjust if your header height differs
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  } else {
    router.push({ hash: `#${id}` })
  }
}

function onPrimary()  { scrollToHash(props.primaryTarget) }
function onSecondary(){ scrollToHash(props.contactTarget) }
</script>

<template>
  <!-- Mobile-first; responsive on md/lg -->
  <section class="px-4 md:px-6 lg:px-8 pt-5 pb-4 md:pb-6 space-y-3 md:space-y-4 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
    <h1 class="text-xl md:text-2xl lg:text-3xl font-semibold leading-snug">
      How to {{ topicTitle }} in {{ displayCity }}, CA
    </h1>

    <p class="text-sm md:text-base text-slate-600">
      Foreclosure timeline matters. Compare reinstatement, forbearance, loan modification,
      or a quick sale—plain-English guidance, local help.
    </p>

    <div class="grid grid-cols-2 gap-2 md:max-w-sm">
      <button class="btn-primary" @click="onPrimary">See My Options</button>
      <button class="btn-outline" @click="onSecondary">Talk to a Specialist</button>
    </div>

    <div class="flex flex-wrap gap-2 md:gap-3 pt-1">
      <span class="chip">Local team</span>
      <span class="chip">No obligation</span>
      <span class="chip">No pressure</span>
      <span class="chip">Honest timelines</span>
    </div>

    <!-- Soft location line (no geocoding prompt) -->
    <p class="text-xs md:text-sm text-slate-500">
      Serving homeowners in {{ ipCityLabel }}
    </p>
  </section>
</template>
