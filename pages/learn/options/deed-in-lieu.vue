<script setup>
import OptionPageCta from '~/components/solving_foreclosure/OptionPageCta.vue'
definePageMeta({ layout: 'sf' })

useSeoMeta({
  title: 'Deed in Lieu | Foreclosure Option',
  description: 'A deed in lieu transfers ownership to the lender to avoid formal foreclosure.',
  ogType: 'website'
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <section class="mx-auto max-w-5xl px-6 py-14">
      <NuxtLink to="/learn/options" class="text-sm text-emerald-700 hover:underline">← Back to all options</NuxtLink>
      <h1 class="mt-4 text-4xl font-bold text-gray-900">Deed in Lieu</h1>
      <p class="mt-4 text-gray-700">In a deed in lieu, you voluntarily transfer the property to the lender instead of foreclosure.</p>
      <div class="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-gray-900">When It Is Considered</h2>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          <li>The property has had trouble selling.</li>
          <li>The lender is open to negotiated release terms.</li>
          <li>You are ready to exit and avoid a foreclosure process.</li>
        </ul>
      </div>

      <OptionPageCta />
    </section>
  </div>
</template>
