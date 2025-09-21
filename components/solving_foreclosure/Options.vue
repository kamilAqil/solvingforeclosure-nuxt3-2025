<!-- components/ForeclosureOptions.vue -->
<template>
  <section id="options" class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 md:p-8">
    <header class="mb-6">
      <h2 class="text-2xl md:text-3xl font-semibold text-emerald-700">Foreclosure Options</h2>
      <p class="mt-2 text-gray-700">
        Compare ways to keep your home or exit with control. Every situation is different—review the trade-offs and talk to a counselor or attorney before deciding.
      </p>
    </header>

    <!-- Toggle: Keep vs Exit (optional) -->
    <div class="mb-4 flex gap-2">
      <button
        class="px-3 py-1.5 rounded-full text-sm border"
        :class="view === 'all' ? activeBtn : baseBtn"
        @click="view = 'all'"
      >All</button>
      <button
        class="px-3 py-1.5 rounded-full text-sm border"
        :class="view === 'keep' ? activeBtn : baseBtn"
        @click="view = 'keep'"
      >Keep the home</button>
      <button
        class="px-3 py-1.5 rounded-full text-sm border"
        :class="view === 'exit' ? activeBtn : baseBtn"
        @click="view = 'exit'"
      >Exit the home</button>
    </div>

    <div class="grid gap-5 md:grid-cols-2">
      <article
        v-for="card in filteredCards"
        :key="card.key"
        class="rounded-2xl border border-gray-200 shadow-sm p-5"
      >
        <h3 class="text-xl font-semibold text-gray-900">{{ card.title }}</h3>

        <ul class="mt-3 space-y-1 text-gray-700">
          <li v-for="(pro, i) in card.pros" :key="`pro-${card.key}-${i}`">✔ {{ pro }}</li>
          <li
            v-for="(con, i) in card.cons"
            :key="`con-${card.key}-${i}`"
            class="text-gray-500"
          >– {{ con }}</li>
        </ul>

        <div class="mt-3 flex items-center gap-2">
          <span class="text-sm text-gray-600">Est. resolution:</span>
          <span
            class="text-xs px-2 py-0.5 rounded-full ring-1"
            :class="badgeTone(card.speed)"
          >
            {{ card.speedLabel }}
          </span>
        </div>

        <NuxtLink
          :to="card.href"
          class="mt-3 inline-block text-emerald-700 hover:underline"
        >
          Learn more
        </NuxtLink>
      </article>
    </div>

    <!-- Optional slot for CTA(s) -->
    <div v-if="$slots.cta" class="mt-6">
      <slot name="cta" />
    </div>

    <!-- Light disclaimer -->
    <p class="mt-6 text-xs text-gray-500">
      This is general information, not legal or financial advice.
    </p>
  </section>
</template>

<script setup>
// JS (no TS), Tailwind only.
const props = defineProps({
  // you can swap in city-specific routes later
  basePath: { type: String, default: '/learn/options' },
  customCards: { type: Array, default: () => [] }
})

const baseBtn =
  'bg-white text-gray-700 hover:bg-gray-50 border-gray-300';
const activeBtn =
  'bg-emerald-600 text-white border-emerald-600';

const defaultCards = [
  {
    key: 'reinstate',
    title: 'Reinstate Loan',
    pros: ['Immediate resolution', 'Keep your home', 'No long-term credit impact'],
    cons: ['Requires lump sum', 'Time-sensitive'],
    speed: 'fast',
    href: `${props.basePath}/reinstate`
  },
  {
    key: 'forbearance',
    title: 'Repayment / Forbearance',
    pros: ['Temporary relief', 'Less short-term strain', 'Can help protect credit'],
    cons: ['Requires financial review', 'Payments may be higher later'],
    speed: 'moderate',
    href: `${props.basePath}/forbearance`
  },
  {
    key: 'modification',
    title: 'Loan Modification',
    pros: ['Lower monthly payment', 'Long-term solution', 'May protect credit'],
    cons: ['Must qualify', 'Process can be lengthy'],
    speed: 'long',
    href: `${props.basePath}/modification`
  },
  {
    key: 'sell-before',
    title: 'Sell Before Auction',
    pros: ['Avoid foreclosure', 'You control the sale', 'Cash in hand'],
    cons: ['May not get full market value', 'Requires quick action'],
    speed: 'fast',
    href: `${props.basePath}/sell-before-auction`
  },
  {
    key: 'short-sale',
    title: 'Short Sale',
    pros: ['Avoids foreclosure on record', 'Possible relocation assistance'],
    cons: ['Lender approval required', 'Takes time; sale not guaranteed'],
    speed: 'moderate',
    href: `${props.basePath}/short-sale`
  },
  {
    key: 'deed-in-lieu',
    title: 'Deed in Lieu',
    pros: ['Simpler exit than foreclosure', 'May reduce deficiency risk'],
    cons: ['Lender must approve', 'You give up the home'],
    speed: 'moderate',
    href: `${props.basePath}/deed-in-lieu`
  },
  {
    key: 'bankruptcy',
    title: 'Bankruptcy (Automatic Stay)',
    pros: ['Immediate pause on sale (automatic stay)', 'Can structure repayment (Ch. 13)'],
    cons: ['Serious credit impact', 'Requires attorney guidance'],
    speed: 'fast',
    href: `${props.basePath}/bankruptcy`
  }
]

// allow full override, else use defaults
const cards = computed(() => (props.customCards.length ? props.customCards : defaultCards))

// simple filter state
const view = ref('all') // 'all' | 'keep' | 'exit'

// lightweight grouping by intent
const keepKeys = new Set(['reinstate', 'forbearance', 'modification'])
const exitKeys = new Set(['sell-before', 'short-sale', 'deed-in-lieu', 'bankruptcy'])

const filteredCards = computed(() => {
  if (view.value === 'all') return cards.value
  if (view.value === 'keep') return cards.value.filter(c => keepKeys.has(c.key))
  return cards.value.filter(c => exitKeys.has(c.key))
})

// badge tones
function badgeTone(speed) {
  switch (speed) {
    case 'fast':
      return 'text-emerald-800 bg-emerald-50 ring-emerald-200'
    case 'moderate':
      return 'text-amber-800 bg-amber-50 ring-amber-200'
    default:
      return 'text-gray-800 bg-gray-50 ring-gray-200'
  }
}
const speedLabel = {
  fast: 'Fast',
  moderate: 'Moderate',
  long: 'Long-term'
}
// derive label on the fly for robustness
cards.value.forEach(c => (c.speedLabel = speedLabel[c.speed] || 'Varies'))
</script>
<style scoped>
</style>