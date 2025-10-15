<!-- pages/index.vue -->
<script setup lang="ts">
import GenericHero from '~/components/solving_foreclosure/GenericHero.vue'
import TimelineSection from '~/components/solving_foreclosure/TimelineAndResources.vue'
import Options from '~/components/solving_foreclosure/Options.vue'
import AgentVsInvestor from '~/components/solving_foreclosure/AgentVsInvestor.vue'
import FAQ from '~/components/solving_foreclosure/FAQ.vue'
import ContactForm from '~/components/solving_foreclosure/ContactForm.vue'
import MeetTheTeam from '~/components/solving_foreclosure/MeetTheTeam.vue'
import HeroSection from '~/components/solving_foreclosure/HeroSection.vue'

definePageMeta({ layout: 'sf' })

// SSR-safe cookie read
const city  = useCookie<string>('geo_city',  { default: () => '' })
const state = useCookie<string>('geo_state', { default: () => 'CA' })

const heroCity  = city.value || 'Your Area'
const heroState = state.value || 'CA'
const topicTitle = 'Postpone Foreclosure' // or derive from query, etc.
</script>

<template>
  <HeroSection
    :topic="topicTitle"
    :city="heroCity"
    :ipCity="heroCity"
    :ipState="heroState"
    primary-target="#options"
    contact-target="#contact"
  />
  <TimelineSection />
  <Options />
  <AgentVsInvestor :city="heroCity" />
  <FAQ :city="heroCity" />
  <ContactForm />
  <MeetTheTeam />
</template>

