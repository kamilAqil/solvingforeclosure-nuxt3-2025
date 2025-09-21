<template>
  <section id="testimonials" class="py-16 bg-white">
    <UContainer>
      <h2 class="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>

      <div class="grid gap-8 md:grid-cols-3">
        <UCard class="p-6 flex flex-col items-center text-center">
          <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-8 h-8 text-primary mb-4" />
          <p class="italic mb-4">"EZ Home Cashout made selling my home so easy. I didn’t have to clean or fix a thing."</p>
          <div class="font-semibold">– Sarah J., Anaheim</div>
        </UCard>

        <UCard class="p-6 flex flex-col items-center text-center">
          <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-8 h-8 text-primary mb-4" />
          <p class="italic mb-4">"They gave me a fair offer and closed in just one week. Totally hassle-free."</p>
          <div class="font-semibold">– Michael R., Santa Ana</div>
        </UCard>

        <UCard class="p-6 flex flex-col items-center text-center">
          <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-8 h-8 text-primary mb-4" />
          <p class="italic mb-4">"Friendly team, quick process, and no hidden fees. Highly recommend them."</p>
          <div class="font-semibold">– Lisa M., Garden Grove</div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>


<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>