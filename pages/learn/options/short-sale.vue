<script setup>
import OptionPageCta from '~/components/solving_foreclosure/OptionPageCta.vue'
definePageMeta({ layout: 'sf' })

useSeoMeta({
  title: 'Short Sale | Foreclosure Option',
  description: 'A short sale may let you sell for less than payoff with lender approval.',
  ogType: 'website'
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <section class="mx-auto max-w-5xl px-6 py-14">
      <NuxtLink to="/learn/options" class="text-sm text-emerald-700 hover:underline">← Back to all options</NuxtLink>
      <h1 class="mt-4 text-4xl font-bold text-gray-900">Short Sale</h1>
      <p class="mt-4 text-gray-700">A short sale requires lender approval when the expected sale price is below total mortgage payoff.</p>
      <div class="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-gray-900">Important Trade-offs</h2>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          <li>Approval can take time and is not guaranteed.</li>
          <li>It may still be better than a completed foreclosure.</li>
          <li>Deficiency treatment should be reviewed carefully.</li>
        </ul>
      </div>

      <OptionPageCta />
    </section>
  </div>
</template>
