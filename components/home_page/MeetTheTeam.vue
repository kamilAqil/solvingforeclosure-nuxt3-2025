<template>
  <section id="meet-the-team" class="py-16 bg-gray-50">
    <UContainer>
      <h2 class="text-3xl font-bold text-center mb-12">Meet Our Team</h2>

      <div class="cardsContainer grid gap-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 text-center justify-items-center justify-center">
        <div v-for="member in team" :key="member.name">
          <UCard class="p-4">
            <NuxtImg
            :src="member.photo"
            width="100"
            height="100"
            sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 300px"
            format="webp"
            class="rounded-full w-24 h-24 object-cover mx-auto mb-4 mx-auto"
          />
            <h3 class="text-lg font-semibold">{{ member.name }}</h3>
            <p class="text-sm text-gray-600">{{ member.role }}</p>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
const team = [
  {
    name: 'Kamil Aqil',
    role: 'Home Buying Specialist',
    photo: 'kamil-circle.png?updatedAt=1753939476674'
  },
  {
    name: 'Naila Aqil',
    role: 'Home Buying Specialist',
    photo: 'nillo.png?updatedAt=1753939001728'
  },
  {
    name: 'Maggie Aldana',
    role: 'Home Buying Specialist',
    photo: 'maggie-circle.png?updatedAt=1753940103043'
  },
]
</script>

<style lang="scss" scoped>

</style>