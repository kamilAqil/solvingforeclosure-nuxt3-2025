<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { Loader } from '@googlemaps/js-api-loader'

/* ---------------------- Validation (Valibot) ---------------------- */
const phoneRegex =
  /^(\+?1[\s.-]?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/

const schema = v.object({
  address: v.pipe(v.string(), v.nonEmpty('Address is required')),
  name: v.pipe(v.string(), v.nonEmpty('Name is required')),
  email: v.pipe(v.string(), v.email('Enter a valid email')),
  phone: v.pipe(v.string(), v.regex(phoneRegex, 'Enter a valid US phone')),
  situation: v.pipe(v.string(), v.nonEmpty('Select your current stage')),
  goal: v.pipe(v.string(), v.nonEmpty('Select your goal')),
  timeline: v.pipe(v.string(), v.nonEmpty('Select your urgency')),
  propertyCondition: v.pipe(v.string(), v.nonEmpty('Condition is required')),
  notes: v.optional(v.string()),
  accept: v.literal(true, 'Please accept Terms & Privacy'),
  website: v.optional(v.string()) // honeypot
})
type Schema = v.InferOutput<typeof schema>

/* ---------------------- Items (for USelect :items) ---------------------- */
const conditionItems = Array.from({ length: 10 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1)
}))

const situationItems = [
  { label: 'Missed a few payments', value: 'missed' },
  { label: 'Notice of Default (NOD) received', value: 'nod' },
  { label: 'Notice of Trustee Sale (NTS) received', value: 'nts' },
  { label: 'Auction scheduled', value: 'auction' },
  { label: 'Other', value: 'other' }
]

const goalItems = [
  { label: 'Keep the home (mod/repayment/forbearance)', value: 'keep' },
  { label: 'Sell before auction (cash/short sale)', value: 'sell' },
  { label: 'Need more time (postpone/bankruptcy/SB 1079)', value: 'time' },
  { label: 'Not sure — explore options', value: 'explore' }
]

const timelineItems = [
  { label: 'Auction in < 30 days', value: '30d' },
  { label: '1–3 months', value: '1-3m' },
  { label: '3–6 months', value: '3-6m' },
  { label: 'Just exploring options', value: 'exploring' }
]

/* ---------------------- State ---------------------- */
const state = reactive<Schema>({
  address: '',
  name: '',
  email: '',
  phone: '',
  situation: '',
  goal: '',
  timeline: '',
  propertyCondition: '',
  notes: '',
  accept: false,
  website: ''
})

const submitting = ref(false)
const toast = useToast()
const autocompleteWrapper = ref<HTMLElement | null>(null)

/* ---------------------- Submit ---------------------- */
async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (state.website) return // honeypot

  submitting.value = true
  try {
    const { error } = await useFetch('/api/sf-leads', {
      method: 'POST',
      body: {
        ...event.data,
        source: 'solvingforeclosure.com',
        path: useRoute().path,
        ts: new Date().toISOString()
      }
    })
    if (error.value) throw error.value

    toast.add({
      title: 'Thanks!',
      description: 'We received your request and will reach out shortly.',
      color: 'success'
    })

    Object.assign(state, {
      address: '',
      name: '',
      email: '',
      phone: '',
      situation: '',
      goal: '',
      timeline: '',
      propertyCondition: '',
      notes: '',
      accept: false,
      website: ''
    })
  } catch (e: any) {
    toast.add({
      title: 'Error',
      description: e?.data?.error || 'Something went wrong. Please try again.',
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}

/* ---------------------- Google Places Autocomplete ---------------------- */
onMounted(async () => {
  const { public: pub } = useRuntimeConfig()
  const loader = new Loader({
    apiKey: pub.googleMapsApiKey,
    libraries: ['places']
  })

  const google = await loader.load()
  await nextTick()

  const inputEl = autocompleteWrapper.value?.querySelector('input') as HTMLInputElement | undefined
  if (!inputEl) return

  const autocomplete = new google.maps.places.Autocomplete(inputEl, {
    types: ['geocode'],
    componentRestrictions: { country: 'us' }
  })

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    if (place?.formatted_address) state.address = place.formatted_address
  })
})
</script>

<template>
  <section id="contact" class="px-4 py-12 bg-gray-50">
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 md:p-8">
      <header class="mb-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-emerald-700">
          Get help with your foreclosure timeline
        </h2>
        <p class="mt-2 text-gray-700">
          Tell us a bit about your situation—we’ll help you understand your options.
        </p>
      </header>

      <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-6">
        <div class="grid grid-cols-1 gap-4">
          <!-- Address (Google Autocomplete) -->
          <UFormField name="address" label="Property Address">
            <div ref="autocompleteWrapper">
              <UInput v-model="state.address" placeholder="Start typing your address" class="w-full" />
            </div>
          </UFormField>

          <!-- Name -->
          <UFormField name="name" label="Full Name">
            <UInput v-model="state.name" placeholder="Jane Doe" />
          </UFormField>

          <!-- Contact -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField name="email" label="Email">
              <UInput v-model="state.email" type="email" placeholder="you@example.com" />
            </UFormField>
            <UFormField name="phone" label="Phone">
              <UInput v-model="state.phone" type="tel" placeholder="(555) 555-5555" />
            </UFormField>
          </div>

          <!-- Foreclosure stage -->
          <UFormField name="situation" label="What’s your current foreclosure stage?">
            <USelect
              v-model="state.situation"
              :items="situationItems"
              placeholder="Select stage"
              :popper="{ strategy: 'fixed', placement: 'bottom-start', offset: 6 }"
              :ui="{ menu: 'z-[9999]' }"
            />
          </UFormField>

          <!-- Goal -->
          <UFormField name="goal" label="What’s your main goal right now?">
            <USelect
              v-model="state.goal"
              :items="goalItems"
              placeholder="Select goal"
              :popper="{ strategy: 'fixed', placement: 'bottom-start', offset: 6 }"
              :ui="{ menu: 'z-[9999]' }"
            />
          </UFormField>

          <!-- Urgency -->
          <UFormField name="timeline" label="How urgent is your situation?">
            <USelect
              v-model="state.timeline"
              :items="timelineItems"
              placeholder="Select urgency"
              :popper="{ strategy: 'fixed', placement: 'bottom-start', offset: 6 }"
              :ui="{ menu: 'z-[9999]' }"
            />
          </UFormField>

          <!-- Condition -->
          <UFormField name="propertyCondition" label="Condition of Property (1–10)">
            <USelect
              v-model="state.propertyCondition"
              :items="conditionItems"
              class="w-48"
              placeholder="Select"
              :popper="{ strategy: 'fixed', placement: 'bottom-start', offset: 6 }"
              :ui="{ menu: 'z-[9999]' }"
            />
          </UFormField>

          <!-- Notes -->
          <UFormField name="notes" label="Anything else we should know? (optional)">
            <UTextarea
              v-model="state.notes"
              :rows="4"
              placeholder="e.g., number of missed payments, auction date, if you’ve spoken with the lender/attorney, repairs needed…"
            />
          </UFormField>

          <!-- Honeypot -->
          <div class="hidden">
            <label for="website">Website</label>
            <UInput id="website" v-model="state.website" />
          </div>

          <!-- Terms -->
          <UFormField name="accept">
            <div class="flex items-start gap-2">
              <UCheckbox v-model="state.accept" />
              <span class="text-sm text-gray-700">
                I agree to the
                <NuxtLink to="/terms" class="text-emerald-700 underline">Terms</NuxtLink>
                and
                <NuxtLink to="/privacy" class="text-emerald-700 underline">Privacy Policy</NuxtLink>.
              </span>
            </div>
          </UFormField>
        </div>

        <div class="pt-2 flex items-center gap-3">
          <UButton
            type="submit"
            size="lg"
            :loading="submitting"
            class="text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl"
          >
            Submit
          </UButton>
          <p class="text-xs text-gray-500">We’ll never share your information.</p>
        </div>
      </UForm>
    </div>
  </section>
</template>
