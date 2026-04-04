<script setup>
import OptionPageCta from '~/components/solving_foreclosure/OptionPageCta.vue'
definePageMeta({ layout: 'sf' })

useSeoMeta({
  title: 'Loan Modification | Foreclosure Option',
  description: 'A loan modification can reduce your monthly payment through updated loan terms.',
  ogType: 'website'
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <section class="mx-auto max-w-5xl px-6 py-14">
      <NuxtLink to="/learn/options" class="text-sm text-emerald-700 hover:underline">← Back to all options</NuxtLink>
      <h1 class="mt-4 text-4xl font-bold text-gray-900">Loan Modification</h1>
      <p class="mt-4 text-gray-700">A modification changes loan terms to make payments more affordable long-term.</p>
      <div class="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-gray-900">Best Fit Scenarios</h2>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          <li>Your hardship is resolved but payment is still too high.</li>
          <li>You can submit complete financial documents quickly.</li>
          <li>You want to remain in the property long-term.</li>
        </ul>
      </div>

      <OptionPageCta />
    </section>
  </div>
</template>
