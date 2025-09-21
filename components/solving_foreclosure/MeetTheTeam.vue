<template>
  <section id="meet-the-team" class="py-16 bg-gray-50">
    <UContainer>
      <!-- Heading -->
      <h2 class="text-3xl font-bold text-center mb-12">Meet Our Team</h2>

      <!-- Team Cards -->
      <div
        class="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center"
      >
        <div
          v-for="member in team"
          :key="member.name"
          class="flex justify-center"
        >
          <UCard class="p-6 w-full max-w-xs">
            <NuxtImg
              :src="member.photo"
              width="160"
              height="160"
              sizes="(max-width: 768px) 120px, (max-width: 1024px) 160px, 200px"
              format="webp"
              alt="Photo of {{ member.name }}"
              class="rounded-full w-32 h-32 object-cover mx-auto mb-4"
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

<style scoped>
/* Optional subtle hover effect */
.u-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.u-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}
</style>
