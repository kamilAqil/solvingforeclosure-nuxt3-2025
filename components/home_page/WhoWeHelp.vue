<template>
  <section id="who-we-help" class="py-16 bg-white">
    <UContainer class="px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-10 sm:mb-12">
        Who We Help
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-10">
        <div
          v-for="type in types"
          :key="type.title"
          class="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <img
            :src="`https://ik.imagekit.io/s6a52okgg/who_we_help_icons/${type.icon}`"
            :alt="type.title"
            class="w-20 h-20 object-contain mb-3"
          />
          <span class="text-sm sm:text-base font-medium text-gray-700">
            {{ type.title }}
          </span>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
const types = [
  { title: 'Inherited Homes', icon: 'inherited_homes.png' },
  { title: 'Foreclosure', icon: 'foreclosure.png' },
  { title: 'Divorce', icon: 'divorce.png' },
  { title: 'Tired Landlords', icon: 'tired_landlords.png' },
  { title: 'Relocation', icon: 'relocation.png' },
  { title: 'Vacant Properties', icon: 'vacant_properties.png' },
  { title: 'Behind on Payments', icon: 'behind_on_payments.png' },
  { title: 'Downsizing', icon: 'downsizing.png' },
  { title: 'Fire-Damaged Homes', icon: 'fire_damaged_homes.png' },
  { title: 'Probate Sales', icon: 'probate_sales.png' }
]
</script>

