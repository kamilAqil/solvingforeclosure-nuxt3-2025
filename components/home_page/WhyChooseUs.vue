<script setup>

</script>

<template>
  <section id="why-us" class="py-16 bg-gray-50">
    <UContainer>
      <h2 class="text-3xl font-bold text-center mb-12">
        Why Choose EZ Home Cashout?
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <UCard class="text-center p-6">
          <template #header>
            <UIcon name="i-heroicons-bolt" class="w-8 h-8 text-primary mx-auto mb-2" />
          </template>
          <h3 class="text-lg font-semibold mb-2">Fast Closings</h3>
          <p>We can close in as little as 7 days, on your schedule.</p>
        </UCard>

        <UCard class="text-center p-6">
          <template #header>
            <UIcon name="i-heroicons-currency-dollar" class="w-8 h-8 text-primary mx-auto mb-2" />
          </template>
          <h3 class="text-lg font-semibold mb-2">No Commissions or Fees</h3>
          <p>There are no hidden costs — you keep more money in your pocket.</p>
        </UCard>

        <UCard class="text-center p-6">
          <template #header>
            <UIcon name="i-heroicons-home-modern" class="w-8 h-8 text-primary mx-auto mb-2" />
          </template>
          <h3 class="text-lg font-semibold mb-2">We Buy As-Is</h3>
          <p>No cleaning, repairs, or showings needed — sell it exactly as it is.</p>
        </UCard>

        <UCard class="text-center p-6">
          <template #header>
            <UIcon name="i-heroicons-hand-thumb-up" class="w-8 h-8 text-primary mx-auto mb-2" />
          </template>
          <h3 class="text-lg font-semibold mb-2">Trusted & Local</h3>
          <p>We’re based in Orange County and have helped dozens of local homeowners.</p>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>


<style scoped>

</style>
