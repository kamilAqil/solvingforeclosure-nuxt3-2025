<!-- pages/[topic]/[city].vue -->
<script setup>
import { topicSet, citySet } from '~/utils/locations'
const route = useRoute()

const topic = String(route.params.Topic || '')
const city  = String(route.params.City || '')

// DEBUG: see exactly what Nitro is validating during prerender
console.log('[topic-city] validating', {
  topic, city, topicOk: topicSet.has(topic), cityOk: citySet.has(city)
})

// TEMP: allow skipping the guard during debugging builds
const SKIP_GUARD = process.env.SKIP_TOPIC_CITY_GUARD === '1'

if (!SKIP_GUARD && (!topicSet.has(topic) || !citySet.has(city))) {
  console.warn('[topic-city] 404 guard miss', {
    topicMissing: !topicSet.has(topic),
    cityMissing: !citySet.has(city)
  })
  throw createError({ statusCode: 404, statusMessage: 'Not found' })
}

// labels for template
const format = s => s.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
const topicName = format(topic)
const cityName  = format(city)
</script>

<template>
  <section class="py-12">
    <UContainer>
      <h1 class="text-3xl font-bold mb-6">
        {{ topicName }} in {{ cityName }}
      </h1>
      <p>
        Learn more about {{ topicName.toLowerCase() }} options available to homeowners in {{ cityName }}.
      </p>
    </UContainer>
  </section>
</template>
