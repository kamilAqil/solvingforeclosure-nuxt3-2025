<!-- components/HeroTheme.vue -->
<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white"
    aria-labelledby="hero-title"
  >
    <!-- soft mint wash & radial glow (very light) -->
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40"></div>
    <div class="pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl"></div>

    <!-- subtle dotted pattern (keeps it on-brand without a photo) -->
    <svg class="absolute inset-0 opacity-[0.12]" aria-hidden="true">
      <defs>
        <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" class="text-emerald-200" />
    </svg>

    <div class="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-16">
      <!-- left-aligned to match your section headings -->
      <div class="max-w-2xl">
        <p class="mb-2 text-sm font-medium text-emerald-700/80">
          Clear steps • Local help • No pressure
        </p>

        <h1 id="hero-title" class="mb-3 text-3xl md:text-5xl font-bold leading-tight text-slate-900">
          {{ title }}
        </h1>

        <p class="mb-7 text-base md:text-lg text-slate-600">
          {{ subtitle }}
        </p>

        <div class="flex flex-col gap-3 sm:flex-row">
          <!-- primary CTA styled like your header button -->
          <NuxtLink
            :to="ctaLink"
            class="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 active:translate-y-[1px] transition"
          >
            {{ ctaText }}
          </NuxtLink>

          <!-- secondary text link that matches your body links -->
          <NuxtLink
            to="#timelines"
            class="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
          >
            See foreclosure timelines
          </NuxtLink>
        </div>

       
      </div>
    </div>

    <!-- soft bottom divider that hands off to content -->
    <svg class="absolute -bottom-px left-0 w-full text-emerald-50" viewBox="0 0 1440 40" fill="currentColor" aria-hidden="true">
      <path d="M0,0 C300,40 1140,0 1440,40 L1440,40 L0,40 Z"></path>
    </svg>
  </section>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: 'Understand Every Step of the Foreclosure Process' },
  subtitle: {
    type: String,
    default:
      'Notice of Default → Notice of Trustee Sale → Auction. Understand each phase and choose your next step with confidence.'
  },
  ctaText: { type: String, default: 'Talk to a specialist' },
  ctaLink: { type: String, default: '#contact' }
})
</script>


<style scoped>
h1 {
  color : #fbbf24; /* Tailwind's yellow-400 */
}
section {
  color: white;
  transition: background 0.3s ease-in-out;
}
</style>
