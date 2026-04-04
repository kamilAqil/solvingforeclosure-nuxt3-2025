<script setup>
import OptionPageCta from '~/components/solving_foreclosure/OptionPageCta.vue'
definePageMeta({ layout: 'sf' })

useSeoMeta({
  title: 'Reinstate Loan | Foreclosure Option',
  description: 'Reinstatement lets you pay arrears and bring your mortgage current before sale.',
  ogType: 'website'
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <section class="mx-auto max-w-5xl px-6 py-14">
      <NuxtLink to="/learn/options" class="text-sm text-emerald-700 hover:underline">← Back to all options</NuxtLink>
      <h1 class="mt-4 text-4xl font-bold text-gray-900">Reinstate Loan</h1>
      <p class="mt-4 text-gray-700">Reinstatement means paying the past-due amount, fees, and costs to bring your loan current.</p>
      <div class="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-gray-900">When It Can Work</h2>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          <li>You can access a lump sum quickly.</li>
          <li>The sale date is close and you need a fast resolution.</li>
          <li>You want to stay in the home and resume normal payments.</li>
        </ul>
      </div>

      <OptionPageCta />
    </section>
  </div>
</template>
