<template>
  <section
    class="relative overflow-hidden"
    :class="[
      paddingY,
      variant === 'image' ? 'bg-gray-900' : 'bg-white'
    ]"
  >
    <!-- Background image (optional) -->
    <NuxtImg
      v-if="bgImage && variant === 'image'"
      :src="bgImage"
      alt=""
      format="webp"
      sizes="100vw"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div v-if="bgImage && variant === 'image'" class="absolute inset-0 bg-black/50"></div>

    <UContainer class="relative">
      <div
        :class="[
          'mx-auto',
          align === 'center' ? 'text-center' : 'text-left',
          maxWidth
        ]"
      >
        <!-- Eyebrow -->
        <p v-if="eyebrow" class="mb-3 text-sm font-semibold tracking-wide uppercase"
           :class="variant === 'image' ? 'text-gray-100' : 'text-gray-600'">
          {{ eyebrow }}
        </p>

        <!-- Title -->
        <h1
          class="font-bold leading-tight"
          :class="[
            size === 'lg' ? 'text-4xl sm:text-5xl' : size === 'sm' ? 'text-3xl' : 'text-4xl',
            variant === 'image' ? 'text-white' : 'text-gray-900'
          ]"
        >
          {{ title }}
        </h1>

        <!-- Subtitle -->
        <p
          v-if="subtitle"
          class="mt-4"
          :class="[
            'max-w-2xl',
            align === 'center' ? 'mx-auto' : '',
            size === 'lg' ? 'text-lg' : 'text-base',
            variant === 'image' ? 'text-gray-100/90' : 'text-gray-600'
          ]"
        >
          {{ subtitle }}
        </p>

        <!-- Actions -->
        <div
          v-if="primary?.label || secondary?.label"
          class="mt-8 flex flex-wrap gap-3"
          :class="align === 'center' ? 'justify-center' : ''"
        >
          <UButton
            v-if="primary?.label"
            :to="primary.to"
            :href="primary.href"
            size="lg"
            color="primary"
            @click="emit('primary')"
          >
            {{ primary.label }}
          </UButton>

          <UButton
            v-if="secondary?.label"
            :to="secondary.to"
            :href="secondary.href"
            size="lg"
            color="gray"
            variant="ghost"
            @click="emit('secondary')"
          >
            {{ secondary.label }}
          </UButton>
        </div>

        <!-- Stats (optional) -->
        <div
          v-if="stats?.length"
          class="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6"
          :class="align === 'center' ? 'mx-auto max-w-3xl' : ''"
        >
          <div v-for="s in stats" :key="s.label" class="text-left">
            <div class="text-2xl font-bold"
                 :class="variant === 'image' ? 'text-white' : 'text-gray-900'">
              {{ s.value }}
            </div>
            <div class="text-sm"
                 :class="variant === 'image' ? 'text-gray-100/80' : 'text-gray-600'">
              {{ s.label }}
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
type Linkish = { label: string; to?: string; href?: string }

const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  eyebrow?: string
  primary?: Linkish
  secondary?: Linkish
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'plain' | 'image'
  bgImage?: string
  stats?: Array<{ label: string; value: string }>
}>(), {
  align: 'left',
  size: 'lg',
  variant: 'plain'
})

const emit = defineEmits<{
  (e: 'primary'): void
  (e: 'secondary'): void
}>()

const paddingY = computed(() => (props.size === 'lg' ? 'py-20 sm:py-28' : 'py-14 sm:py-18'))
const maxWidth = computed(() => (props.align === 'center' ? 'max-w-4xl' : 'max-w-3xl'))
</script>
