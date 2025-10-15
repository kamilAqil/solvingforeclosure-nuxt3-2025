<template>
  <header class="bg-white/95 backdrop-blur shadow-sm sticky top-0 z-50">
    <UContainer class="flex items-center justify-between py-3">
      <!-- Wordmark -->
      <NuxtLink to="/" class="flex items-center gap-2 text-base font-semibold text-ink">
        <img
          src="https://ik.imagekit.io/s6a52okgg/Solving-Foreclosure/solving_foreclosure_logo.svg?updatedAt=1760507933186"
          alt="Solving Foreclosure logo"
          class="h-8 w-auto"
        />
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="text-sm text-slate-600 hover:text-brand">
          {{ l.label }}
        </NuxtLink>
        <UButton :to="telHref" color="primary" class="text-white">Talk to a specialist</UButton>
      </nav>

      <!-- Mobile hamburger -->
      <button class="md:hidden" @click="isOpen = !isOpen" aria-label="Open menu">
        <UIcon name="i-heroicons-bars-3" class="w-6 h-6 text-brand" />
      </button>
    </UContainer>

    <!-- Mobile sheet -->
    <transition name="slide">
      <div v-if="isOpen" class="fixed top-0 left-0 w-3/4 max-w-xs h-full bg-white shadow-md z-50 p-6 flex flex-col gap-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-lg font-semibold text-ink">Menu</span>
          <button @click="isOpen = false" aria-label="Close menu">
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6 text-brand" />
          </button>
        </div>

        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="text-base text-slate-700 hover:text-brand"
          @click="isOpen = false"
        >
          {{ l.label }}
        </NuxtLink>

        <UButton :to="telHref" color="primary" block @click="isOpen = false">
          Talk to a specialist
        </UButton>
      </div>
    </transition>
  </header>
</template>

<script setup>
const isOpen = ref(false)
const links = [
  { label: 'Timelines', to: '#timelines' },
  { label: 'Options', to: '#options' },
  { label: 'Agent vs Cash', to: '#agent-vs-cash' },
  { label: 'FAQ', to: '#faq' },
  { label: 'Contact', to: '#contact' }
]

const rc = useRuntimeConfig()
const phone = rc.public?.phone || '+1-714-555-0111' // set NUXT_PUBLIC_PHONE to override
const telHref = computed(() => `tel:${phone.replace(/[^\d+]/g, '')}`)
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: transform .25s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
</style>
