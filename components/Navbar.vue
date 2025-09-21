<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <UContainer class="flex items-center justify-between py-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 text-xl font-bold text-primary">
        <NuxtImg
          src="ezhome%20cashout%20nuxt%203/logo-1.png?updatedAt=1752457368231"
          alt="EZ Home Logo"
         
          sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, 150px"
          format="webp"
        />
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex gap-6 items-center">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-text hover:text-primary"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Desktop CTA -->
      <UButton to="#contact" color="secondary" class="text-white hidden md:inline-flex">
        Get Offer
      </UButton>

      <!-- Hamburger for mobile -->
      <button class="md:hidden" @click="isOpen = !isOpen">
        <UIcon name="i-heroicons-bars-3" class="w-6 h-6 text-primary" />
      </button>
    </UContainer>

    <!-- Mobile Slide Menu -->
    <transition name="slide">
      <div
        v-if="isOpen"
        class="fixed top-0 left-0 w-3/4 max-w-xs h-full bg-white shadow-md z-50 p-6 flex flex-col gap-4"
      >
        <div class="flex justify-between items-center mb-4">
          <span class="text-xl font-bold text-primary">Menu</span>
          <button @click="isOpen = false">
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5 text-primary" />
          </button>
        </div>

        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-text text-lg hover:text-primary"
          @click="isOpen = false"
        >
          {{ link.label }}
        </NuxtLink>

        <UButton to="#contact" color="primary" block @click="isOpen = false">
          Get Offer
        </UButton>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const links = [
  { label: 'How It Works', to: '#how-it-works' },
  { label: 'Why Choose Us', to: '#why-us' },
  { label: 'Testimonials', to: '#testimonials' },
  { label: 'FAQ', to: '#faq' }
]
</script>

<style scoped>
/* Optional slide-in transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
