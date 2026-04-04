<script setup>
import ContactForm from '~/components/solving_foreclosure/ContactForm.vue'

const rc = useRuntimeConfig()
const phone = computed(() => rc.public?.phone || '714 787 8471')
const phoneLabel = computed(() => phone.value)
const telHref = computed(() => `tel:${phone.value.replace(/[^\d+]/g, '')}`)
</script>

<template>
  <section class="mt-8 space-y-6">
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 p-6 md:p-8 text-white shadow-xl ring-1 ring-emerald-400/40">
      <div class="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
      <div class="pointer-events-none absolute -left-10 -bottom-16 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

      <p class="text-xs font-semibold uppercase tracking-wider text-emerald-100">Free Homeowner Guidance</p>
      <h2 class="mt-2 inline-block max-w-2xl rounded-md bg-black/25 px-3 py-2 text-2xl md:text-3xl font-extrabold leading-tight !text-white">
        Need Help Choosing the Right Foreclosure Option?
      </h2>
      <p class="mt-3 max-w-2xl text-emerald-50">
        Get a no-pressure review of your timeline and options so you can move forward with clarity.
      </p>

      <div class="mt-4 flex flex-wrap gap-2 text-xs">
        <span class="rounded-full border border-white/30 bg-white/10 px-3 py-1">No obligation</span>
        <span class="rounded-full border border-white/30 bg-white/10 px-3 py-1">Quick response</span>
        <span class="rounded-full border border-white/30 bg-white/10 px-3 py-1">Local specialists</span>
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href="#option-contact"
          class="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-emerald-800 shadow-sm transition-colors hover:bg-emerald-50"
        >
          Get Free Consultation
        </a>
        <a
          :href="telHref"
          class="inline-flex items-center justify-center rounded-lg border border-white/50 bg-emerald-900/20 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-900/35"
        >
          Call {{ phoneLabel }}
        </a>
      </div>
    </div>

    <div id="option-contact" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ring-1 ring-emerald-100">
      <p class="text-xs font-semibold uppercase tracking-wider text-emerald-700">Start Here</p>
      <h3 class="mt-1 text-2xl font-bold text-gray-900">Request Your Free Offer</h3>
      <p class="mt-2 text-gray-600">
        Share a few details and our team will follow up quickly with your available options.
      </p>
      <div class="mt-6">
        <ContactForm />
      </div>
    </div>
  </section>
</template>
