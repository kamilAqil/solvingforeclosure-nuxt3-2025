<script setup>
import OptionPageCta from '~/components/solving_foreclosure/OptionPageCta.vue'
definePageMeta({ layout: 'sf' })

useSeoMeta({
  title: 'Sell Before Auction | Foreclosure Option',
  description: 'Selling before auction can help you avoid foreclosure and control your timeline.',
  ogType: 'website'
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <section class="mx-auto max-w-5xl px-6 py-14">
      <NuxtLink to="/learn/options" class="text-sm text-emerald-700 hover:underline">← Back to all options</NuxtLink>
      <h1 class="mt-4 text-4xl font-bold text-gray-900">Sell Before Auction</h1>
      <p class="mt-4 text-gray-700">A pre-auction sale helps avoid a completed foreclosure and can preserve more control.</p>
      <div class="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-gray-900">What To Prepare</h2>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          <li>Sale date and lender payoff information.</li>
          <li>Property disclosures and any title issues.</li>
          <li>A realistic pricing strategy for a quick close.</li>
        </ul>
      </div>

      <OptionPageCta />
    </section>
  </div>
</template>
