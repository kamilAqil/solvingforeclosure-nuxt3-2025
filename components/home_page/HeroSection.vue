<script setup>

let heroImage = `https://ik.imagekit.io/s6a52okgg/ez_home_family_photo.png?updatedAt=1753936549606`;
</script>

<template>
  <section id="hero" :style="`background-image: url('${heroImage}')`" class="relative flex items-center justify-center text-white bg-cover bg-center" >
    <div class="absolute inset-0 bg-black/50" />
    
    <UContainer class="relative z-10 text-center px-6 py-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4" >
        Sell Your Home Fast for Cash in Orange County
      </h1>
      <p class="text-lg md:text-xl mb-6">
        No Repairs. No Fees. No Hassle. Just a Fair Cash Offer.
      </p>
      <UButton to="#contact" color="secondary" class="text-white" size="lg">
        Get My Cash Offer
      </UButton>
    </UContainer>
  </section>
</template>


<style scoped>
#hero {
  background-size: cover;
  background-position: center;
  min-height: 50vh;
}
</style>