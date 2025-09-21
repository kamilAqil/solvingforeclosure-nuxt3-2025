<script setup>
const steps = [
  {
    number: 1,
    title: 'Tell Us About Your Home',
    description: 'Submit your property details through our simple form or give us a call.',
    image: '3-step-process/step-1.png?updatedAt=1752383653733'
  },
  {
    number: 2,
    title: 'Receive Your Cash Offer',
    description: 'We’ll review your info and send a fair, no-obligation cash offer within 24 hours.',
    image: '3-step-process/step-2.png?updatedAt=1752383653851'
  },
  {
    number: 3,
    title: 'Close On Your Schedule',
    description: 'Choose your closing date and get paid in as little as 7 days — stress free.',
    image: '3-step-process/step-3.png?updatedAt=1752383653741'
  }
]
</script>

<template>
  <section id="how-it-works" class="py-16 bg-white">
    <UContainer>
      <h2 class="text-3xl font-bold text-center mb-12">
        Our 3-Step Process
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <UCard
          v-for="step in steps"
          :key="step.number"
          class="text-center"
        >
          <template #header>
            <div class="text-primary text-4xl font-bold">{{ step.number }}</div>
          </template>
          <NuxtImg
            :src="step.image"
            width="100"
            height="100"
            sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 300px"
            format="webp"
            class="mx-auto"
          />
          <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
