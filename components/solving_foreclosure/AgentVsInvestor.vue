<!-- components/AgentVsInvestor.vue -->
<template>
  <section id="agent-vs-cash" class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 md:p-8">
    <!-- Heading -->
    <header class="mb-6">
      <h2 class="text-2xl md:text-3xl font-semibold text-emerald-700">
        Selling with an Agent vs Selling to a Cash Buyer in {{ city }}
      </h2>
      <p class="mt-2 text-gray-700">
        Quick certainty vs. potential top dollar. Compare the trade-offs to choose what fits your timeline and goals.
      </p>
    </header>

    <!-- Summary Cards -->
    <div class="grid gap-5 md:grid-cols-2">
      <!-- Agent card -->
      <article class="rounded-2xl border border-gray-200 shadow-sm p-5">
        <h3 class="text-xl font-semibold text-gray-900">Agent</h3>
        <ul class="mt-3 space-y-1 text-gray-700">
          <li v-for="(l, i) in agentPoints" :key="'agent-'+i">• {{ l }}</li>
        </ul>
      </article>

      <!-- Cash Buyer card -->
      <article class="rounded-2xl border border-gray-200 shadow-sm p-5 bg-emerald-50">
        <h3 class="text-xl font-semibold text-gray-900">Cash Buyer / Investor</h3>
        <ul class="mt-3 space-y-1 text-gray-800">
          <li v-for="(l, i) in investorPoints" :key="'investor-'+i">• {{ l }}</li>
        </ul>
      </article>
    </div>

    <!-- Comparison Table -->
    <div class="mt-6 overflow-x-auto rounded-xl ring-1 ring-gray-200">
      <table class="min-w-full divide-y divide-gray-200 bg-white">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Criteria</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Agent</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cash Buyer</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="(row, idx) in rows"
            :key="row.key || idx"
            :class="idx % 2 ? 'bg-emerald-50/40' : 'bg-white'"
          >
            <td class="px-4 py-3 text-gray-900 font-medium">{{ row.label }}</td>
            <td class="px-4 py-3 text-gray-700">{{ row.agent }}</td>
            <td class="px-4 py-3 text-gray-700">{{ row.investor }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Optional CTA(s) -->
    <div v-if="$slots.cta" class="mt-6">
      <slot name="cta" />
    </div>

    <!-- Light disclaimer -->
    <p class="mt-6 text-xs text-gray-500">
      This is general information, not legal, tax, or financial advice. Your results may vary by property condition, market, and lender requirements.
    </p>
  </section>
</template>

<script setup>
// JS (no TS). Tailwind only.
const props = defineProps({
  city: { type: String, default: 'Anaheim' },
  // summary bullets for each card
  agentPoints: {
    type: Array,
    default: () => [
      'May get higher price (if time & condition allow)',
      'Requires repairs & showings',
      'Uncertain timeline',
      '5–6% commission + seller closing costs'
    ]
  },
  investorPoints: {
    type: Array,
    default: () => [
      'Close in 7–21 days (often sooner)',
      'No repairs or showings',
      'High certainty (no financing contingency)',
      'Typical seller closing costs covered'
    ]
  },
  // comparison rows
  rows: {
    type: Array,
    default: () => [
      { key: 'time', label: 'Time to Close', agent: 'Varies (30–60+ days)', investor: '7–21 days' },
      { key: 'repairs', label: 'Repairs Needed', agent: 'Usually yes / prep recommended', investor: 'No (sell as-is)' },
      { key: 'showings', label: 'Showings', agent: 'Yes', investor: 'No' },
      { key: 'fallthrough', label: 'Risk of Fall-Through', agent: 'Higher (financing/appraisal)', investor: 'Low (cash, no appraisal contingency)' },
      { key: 'costs', label: 'Costs / Commissions', agent: '5–6% + closing costs', investor: 'No commissions; minimal seller costs' },
      { key: 'certainty', label: 'Certainty', agent: 'Variable', investor: 'High' }
    ]
  }
})

const { city, agentPoints, investorPoints, rows } = toRefs(props)
</script>
