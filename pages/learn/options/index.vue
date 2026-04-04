<script setup>
definePageMeta({ layout: 'sf' })

const options = [
  { title: 'Reinstate Loan', to: '/learn/options/reinstate', speed: 'Fast' },
  { title: 'Repayment / Forbearance', to: '/learn/options/forbearance', speed: 'Moderate' },
  { title: 'Loan Modification', to: '/learn/options/modification', speed: 'Long-term' },
  { title: 'Sell Before Auction', to: '/learn/options/sell-before-auction', speed: 'Fast' },
  { title: 'Short Sale', to: '/learn/options/short-sale', speed: 'Moderate' },
  { title: 'Deed in Lieu', to: '/learn/options/deed-in-lieu', speed: 'Moderate' },
  { title: 'Bankruptcy (Automatic Stay)', to: '/learn/options/bankruptcy', speed: 'Fast' }
]

useSeoMeta({
  title: 'Foreclosure Options | Compare Your Paths Forward',
  description: 'Compare the most common foreclosure options, including reinstatement, forbearance, modification, sale, and bankruptcy.',
  ogType: 'website'
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <section class="bg-white border-b border-gray-200">
      <div class="mx-auto max-w-6xl px-6 py-14">
        <p class="text-sm font-semibold uppercase tracking-wide text-emerald-700">Foreclosure Help</p>
        <h1 class="mt-2 text-4xl font-bold text-gray-900">Foreclosure Options</h1>
        <p class="mt-4 max-w-3xl text-gray-700">
          Every homeowner situation is different. Start with the option pages below to compare timelines,
          trade-offs, and what to do next.
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-10">
      <div class="grid gap-4 md:grid-cols-2">
        <NuxtLink
          v-for="option in options"
          :key="option.to"
          :to="option.to"
          class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow"
        >
          <p class="text-sm font-medium text-emerald-700">{{ option.speed }}</p>
          <h2 class="mt-1 text-xl font-semibold text-gray-900">{{ option.title }}</h2>
          <p class="mt-2 text-sm text-gray-600">Learn how it works, when it helps, and key risks to consider.</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
