<!-- components/ForeclosureTimeline.vue -->
<template>
  <section id="timelines" class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 md:p-8">
    <!-- Heading -->
    <header class="mb-6">
      <h2 class="text-2xl md:text-3xl font-semibold text-emerald-700">
        Foreclosure timelines in {{ city }}
      </h2>
      <p class="mt-2 text-gray-700">
        Notice of Default → Notice of Trustee Sale → Auction. Understand each phase to plan ahead.
      </p>
      <p class="mt-1 text-gray-600">
        Each step has its own timeline and implications. We explain it without legal jargon so you can decide your next move with confidence.
      </p>
    </header>

    <!-- Timeline -->
    <ol class="relative border-s-2 border-emerald-200 ps-5 space-y-6">
      <li v-for="(step, i) in steps" :key="step.key" class="group">
        <div class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-white ring-2 ring-emerald-500"></div>
        <div class="flex flex-col gap-1">
          <div class="flex flex-wrap items-baseline gap-x-2">
            <h3 class="text-lg font-semibold text-gray-900">{{ i + 1 }}. {{ step.title }}</h3>
            <span v-if="step.when" class="text-sm text-emerald-700/80">
              {{ step.when }}
            </span>
          </div>
          <p class="text-gray-700">
            {{ step.summary }}
          </p>
          <ul v-if="step.notes?.length" class="mt-1 list-disc ms-5 text-gray-600">
            <li v-for="(n, idx) in step.notes" :key="idx">{{ n }}</li>
          </ul>
        </div>
      </li>
    </ol>

    <!-- Callout -->
    <div class="mt-6 rounded-xl bg-emerald-50 p-4">
      <p class="text-gray-800">
        Stay informed about your options and timelines. Talking to a HUD-approved counselor or legal aid can
        help you avoid missteps and keep more options on the table.
      </p>
    </div>

    <!-- Resources -->
    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <div class="rounded-xl border border-gray-200 p-4">
        <h4 class="font-semibold text-gray-900">Courts & legal help ({{ county }})</h4>
        <ul class="mt-2 space-y-2">
          <li v-for="(r, idx) in resources.legal" :key="'legal-'+idx">
            <NuxtLink :to="r.href" target="_blank" rel="noopener" class="text-emerald-700 hover:underline">
              {{ r.label }}
            </NuxtLink>
            <span v-if="r.desc" class="block text-sm text-gray-600">{{ r.desc }}</span>
          </li>
        </ul>
      </div>

      <div class="rounded-xl border border-gray-200 p-4">
        <h4 class="font-semibold text-gray-900">Counseling & mediation</h4>
        <ul class="mt-2 space-y-2">
          <li v-for="(r, idx) in resources.counseling" :key="'counsel-'+idx">
            <NuxtLink :to="r.href" target="_blank" rel="noopener" class="text-emerald-700 hover:underline">
              {{ r.label }}
            </NuxtLink>
            <span v-if="r.desc" class="block text-sm text-gray-600">{{ r.desc }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Optional slot for custom CTA(s) -->
    <div v-if="$slots.cta" class="mt-6">
      <slot name="cta" />
    </div>
  </section>
</template>

<script setup>
// Keep JS (no TS) per your preference
const props = defineProps({
  city: { type: String, default: 'Anaheim' },
  county: { type: String, default: 'Orange County' },

  // Allow overriding timeline content if needed
  customSteps: {
    type: Array,
    default: () => []
  },

  // Allow overriding resources
  customResources: {
    type: Object,
    default: () => ({})
  }
})

// Default timeline (California nonjudicial flow; keep language general)
const defaultSteps = [
  {
    key: 'nod',
    title: 'Notice of Default (NOD)',
    when: 'Filed after ~90+ days of missed payments',
    summary:
      'The trustee records an NOD to start foreclosure. You usually have at least 90 days to cure (bring the loan current) plus fees.',
    notes: [
      'Ask your servicer about loss-mitigation options.',
      'Respond promptly to any “Breath-Easy”/workout packets.'
    ]
  },
  {
    key: 'nts',
    title: 'Notice of Trustee Sale (NTS)',
    when: 'Posted/mailed at least 20 days before auction',
    summary:
      'If the default is not cured, the trustee sets an auction date and records an NTS. Reinstatement is usually allowed up to 5 business days before sale.',
    notes: [
      'Confirm your exact sale date/time with the trustee.',
      'You may still explore options (modification, repayment plan, selling, SB 1079-eligible bids, etc.).'
    ]
  },
  {
    key: 'auction',
    title: 'Trustee Sale (Auction)',
    when: 'On the scheduled date (can be postponed)',
    summary:
      'Property is sold to the highest bidder or reverts to the lender. Post-sale rights are limited; get legal advice if you receive notices to vacate.',
    notes: [
      'If sale is postponed, keep checking for new dates.',
      'Surplus funds (if any) may be claimable by the former owner.'
    ]
  }
]

const steps = computed(() => props.customSteps.length ? props.customSteps : defaultSteps)

// Default resource links (can be overridden)
// Tip: replace the hrefs with your tracked/curated links when you’re ready.
const defaultResources = {
  legal: [
    {
      label: 'Orange County Superior Court — Self-Help Center',
      href: 'https://www.occourts.org/self-help/',
      desc: 'General civil help, housing/eviction assistance, and referrals.'
    },
    {
      label: 'Legal Aid Society of Orange County / Community Legal Aid SoCal',
      href: 'https://www.communitylegalsocal.org/',
      desc: 'Low/no-cost legal help; ask about foreclosure and housing issues.'
    }
  ],
  counseling: [
    {
      label: 'HUD-Approved Housing Counselors (Find a counselor)',
      href: 'https://hud.gov/findacounselor',
      desc: 'Free foreclosure-avoidance counseling and budget planning.'
    },
    {
      label: 'NeighborWorks counseling network',
      href: 'https://www.neighborworks.org/Homeownership/Foreclosure-Prevention',
      desc: 'Trusted nonprofit counseling resources.'
    }
  ]
}

const resources = computed(() => {
  return {
    legal: props.customResources.legal || defaultResources.legal,
    counseling: props.customResources.counseling || defaultResources.counseling
  }
})
</script>
