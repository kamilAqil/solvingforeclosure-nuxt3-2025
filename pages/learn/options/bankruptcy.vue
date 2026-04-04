<script setup>
import OptionPageCta from '~/components/solving_foreclosure/OptionPageCta.vue'
definePageMeta({ layout: 'sf' })

useSeoMeta({
  title: 'Bankruptcy and Foreclosure | Foreclosure Option',
  description: 'Bankruptcy can trigger an automatic stay and pause a pending foreclosure sale.',
  ogType: 'website'
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <section class="mx-auto max-w-5xl px-6 py-14">
      <NuxtLink to="/learn/options" class="text-sm text-emerald-700 hover:underline">← Back to all options</NuxtLink>
      <h1 class="mt-4 text-4xl font-bold text-gray-900">Bankruptcy (Automatic Stay)</h1>
      <p class="mt-4 text-gray-700">Filing bankruptcy may create an automatic stay that can temporarily pause foreclosure action.</p>
      <div class="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-gray-900">Know Before Filing</h2>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          <li>Case type and prior filings affect how strong the stay is.</li>
          <li>Chapter 13 may allow structured repayment of arrears.</li>
          <li>Legal guidance is essential before taking this step.</li>
        </ul>
      </div>
      
      <OptionPageCta />
    </section>
  </div>
</template>
