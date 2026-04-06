<template>
  <header
    :class="[
      'shadow-sm sticky top-0 z-50',
      isOpen ? 'bg-white' : 'bg-white/95 backdrop-blur'
    ]"
  >
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
    <transition name="drawer">
      <div v-if="isOpen" class="fixed inset-0 z-50 md:hidden">
        <button
          class="absolute inset-0 bg-stone-950/35"
          aria-label="Close menu"
          @click="isOpen = false"
        />

        <aside
          class="mobile-drawer relative h-full w-[78vw] max-w-sm bg-white border-r border-stone-200 shadow-2xl flex flex-col"
          aria-label="Mobile menu"
        >
          <div class="flex items-center justify-between px-6 py-5 border-b border-stone-200">
            <span class="text-lg font-semibold text-ink">Menu</span>
            <button @click="isOpen = false" aria-label="Close menu">
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6 text-brand" />
            </button>
          </div>

          <nav class="flex flex-col gap-5 px-6 py-6 bg-white">
            <NuxtLink
              v-for="l in links"
              :key="l.to"
              :to="l.to"
              class="text-lg text-slate-700 hover:text-brand"
              @click="isOpen = false"
            >
              {{ l.label }}
            </NuxtLink>
          </nav>

          <div class="mt-auto px-6 pb-6 bg-white">
            <UButton :to="telHref" color="primary" block @click="isOpen = false">
              Talk to a specialist
            </UButton>
          </div>
        </aside>
      </div>
    </transition>
  </header>
</template>

<script setup>
const isOpen = ref(false)
const links = [
  { label: 'Timelines', to: '/#timelines' },
  { label: 'Options', to: '/#options' },
  { label: 'Agent vs Cash', to: '/#agent-vs-cash' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Contact', to: '/#contact' }
]

const rc = useRuntimeConfig()
const phone = rc.public?.phone || '714 787 8471' // set NUXT_PUBLIC_PHONE to override
const telHref = computed(() => `tel:${phone.replace(/[^\d+]/g, '')}`)
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity .2s ease;
}

.drawer-enter-active .mobile-drawer,
.drawer-leave-active .mobile-drawer {
  transition: transform .25s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .mobile-drawer,
.drawer-leave-to .mobile-drawer {
  transform: translateX(-100%);
}
</style>
