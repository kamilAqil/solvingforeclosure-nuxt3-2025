<!-- components/ForeclosureFaq.vue -->
<template>
  <section class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 md:p-8">
    <header class="mb-6">
      <h2 class="text-2xl md:text-3xl font-semibold text-emerald-700">FAQs</h2>
      <p v-if="intro" class="mt-2 text-gray-700">{{ intro }}</p>
    </header>

    <div class="space-y-4">
      <details
        v-for="(qa, i) in faqs"
        :key="qa.q + i"
        class="group rounded-2xl border border-gray-200 bg-white p-4 open:bg-emerald-50/60"
      >
        <summary class="cursor-pointer list-none">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ qa.q.replaceAll('{city}', city) }}
          </h3>
        </summary>
        <p class="mt-2 text-gray-700">
          {{ qa.a.replaceAll('{city}', city) }}
        </p>
      </details>
    </div>

    <div v-if="$slots.cta" class="mt-6">
      <slot name="cta" />
    </div>

    <p class="mt-6 text-xs text-gray-500">
      General information only—please consult a qualified professional for advice about your situation.
    </p>
  </section>
</template>

<script setup>
// JS only (no TS), Tailwind classes used
const props = defineProps({
  city: { type: String, default: 'Anaheim' },
  intro: { type: String, default: '' },
  // [{ q: 'Question with {city}', a: 'Answer with {city}' }]
  items: {
    type: Array,
    default: () => ([
      {
        q: 'Can I postpone my foreclosure sale in {city}?',
        a: 'Often, yes. Depending on your lender and status, options like forbearance, modification review, bankruptcy (automatic stay), or a sale in progress can lead to postponements.'
      },
      {
        q: 'What if I need more time to get financing?',
        a: 'We can explore forbearance or loan-mod options, or discuss a short postponement request with the trustee or lender if appropriate.'
      },
      {
        q: 'Can I still sell during pre-foreclosure?',
        a: 'Absolutely. Selling before the auction can stop foreclosure, pay off the loan and fees, and help you retain equity.'
      },
      {
        q: 'How fast can this move?',
        a: 'With clear title and cooperation from all parties, cash sales can close in as little as 7–21 days—sometimes faster.'
      }
    ])
  }
})

const city = toRef(props, 'city')

// Build the list we’ll render
const faqs = computed(() => props.items)

// JSON-LD for FAQPage (SEO)
const faqLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqs.value.map(qa => ({
    '@type': 'Question',
    'name': qa.q.replaceAll('{city}', city.value),
    'acceptedAnswer': { '@type': 'Answer', 'text': qa.a.replaceAll('{city}', city.value) }
  }))
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      // stringify at runtime to include city substitutions
      children: () => JSON.stringify(faqLd.value)
    }
  ]
})
</script>
