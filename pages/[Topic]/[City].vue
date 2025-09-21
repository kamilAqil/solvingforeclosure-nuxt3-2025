<script setup lang="ts">
import { topics, allCitySlugs } from '~/utils/locations'
const route = useRoute()
if (!topics.includes(route.params.topic as string) ||
    !allCitySlugs().includes(route.params.city as string)) {
  throw createError({ statusCode: 404, statusMessage: 'Not found' })
}
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
