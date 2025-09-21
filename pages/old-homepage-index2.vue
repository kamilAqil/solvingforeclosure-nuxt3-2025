<script setup>
import HeroSection from '~/components/home_page/HeroSection.vue';
import StepProcess from '~/components/home_page/StepProcess.vue';
import WhyChooseUs from '~/components/home_page/WhyChooseUs.vue';
import Testimonials from '~/components/home_page/Testimonials.vue';
import MeetTheTeam from '~/components/home_page/MeetTheTeam.vue';
import FAQ from '~/components/home_page/FAQ.vue';
import ContactForm from '~/components/home_page/ContactForm.vue';
import WhoWeHelp from '~/components/home_page/WhoWeHelp.vue';
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <HeroSection />
  <StepProcess />
  <WhyChooseUs />
  <Testimonials />
  <WhoWeHelp />
  <MeetTheTeam />
  <FAQ />
  <ContactForm />
</template>

<style scoped>

</style>