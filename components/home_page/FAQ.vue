<template>
  <section id="faq" class="py-16 bg-white">
    <UContainer>
      <h2 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

      <UAccordion :items="faqs" />
    </UContainer>
  </section>
</template>

<script setup>
const faqs = [
  {
    label: 'Do I need to clean or repair my home before selling?',
    content: 'Nope! We buy homes as-is, so you don’t need to fix anything or even clean up.'
  },
  {
    label: 'How quickly can I close?',
    content: 'We can close in as little as 7 days — or on your preferred timeline.'
  },
  {
    label: 'Are there any fees or commissions?',
    content: 'None at all. We cover all closing costs, and you pay zero fees or commissions.'
  },
  {
    label: 'What kind of homes do you buy?',
    content: 'We buy all types of residential properties — single-family, condos, inherited homes, and more.'
  },
  {
    label: 'Is there any obligation if I request an offer?',
    content: 'Not at all. Our offer is 100% free and comes with no obligation.'
  }
]
</script>
