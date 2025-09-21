<script setup>
import HeroSection from '~/components/solving_foreclosure/HeroSection.vue';
import { useGeoCity } from '~/composables/useGeoCity';
import TimelineSection from '~/components/solving_foreclosure/TimelineAndResources.vue';
import Options from "~/components/solving_foreclosure/Options.vue";
import AgentVsInvestor from '~/components/solving_foreclosure/AgentVsInvestor.vue';
import FAQ from '~/components/solving_foreclosure/FAQ.vue';
import ContactForm from '~/components/solving_foreclosure/ContactForm.vue';
definePageMeta({
  layout: 'sf',
})
</script>

<template>
  <HeroSection />
  <!-- timeline -->
  <TimelineSection />
  <!-- options -->
  <Options />
  <!-- agent vs investor -->
  <AgentVsInvestor city="Your Area" />
  <!-- FAQ -->
  <FAQ city="Your Area" />
  <!-- contact form -->
  <ContactForm />
</template>

<style scoped>

</style>