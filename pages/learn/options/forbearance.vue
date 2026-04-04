<script setup>
import OptionPageCta from '~/components/solving_foreclosure/OptionPageCta.vue'
definePageMeta({ layout: 'sf' })

useSeoMeta({
  title: 'Repayment / Forbearance | Foreclosure Option',
  description: 'Forbearance pauses or reduces payments temporarily while you recover financially.',
  ogType: 'website'
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <section class="mx-auto max-w-5xl px-6 py-14">
      <NuxtLink to="/learn/options" class="text-sm text-emerald-700 hover:underline">← Back to all options</NuxtLink>
      <h1 class="mt-4 text-4xl font-bold text-gray-900">Repayment / Forbearance</h1>
      <p class="mt-4 text-gray-700">Forbearance can pause or reduce payments for a short period while you stabilize income.</p>
      <div class="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-gray-900">Key Considerations</h2>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          <li>Relief is temporary and payments eventually resume.</li>
          <li>Lenders typically require hardship documentation.</li>
          <li>You may need a repayment plan after the pause ends.</li>
        </ul>
      </div>

      <OptionPageCta />
    </section>
  </div>
</template>
