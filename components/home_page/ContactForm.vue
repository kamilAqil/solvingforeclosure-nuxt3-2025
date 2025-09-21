<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted, ref, nextTick } from "vue";

const schema = v.object({
  address: v.pipe(v.string(), v.nonEmpty("Address is required")),
  name: v.pipe(v.string(), v.nonEmpty("Name is required")),
  email: v.pipe(v.string(), v.email("Email is invalid")),
  propertyDescription: v.pipe(
    v.string(),
    v.nonEmpty("Property description is required")
  ),
    propertyCondition: v.pipe(
    v.string(),
    v.nonEmpty("Property condition is required")
  ),
});

// script setup
const conditionOptions = Array.from({ length: 10 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1),
}))

type Schema = v.InferOutput<typeof schema>;

const state = reactive<Schema>({
  address: "",
  name: "",
  email: "",
  propertyDescription: "",
  propertyCondition: "",
  timeline: '',
});

const timelineOptions = [
  { label: 'Sell Now', value: 'now' },
  { label: 'Within 1 Month', value: '1_month' },
  { label: '1–3 Months', value: '1_3_months' },
  { label: '3–6 Months', value: '3_6_months' },
  { label: 'More than 6 Months', value: '6_plus_months' }
]

const toast = useToast();

// This will be a wrapper div around the UInput
const autocompleteWrapper = ref<HTMLElement | null>(null);

async function onSubmit(event) {
  try {
    const { data, error } = await useFetch('/api/leads', {
      method: 'POST',
      body: event.data
    })

    if (error.value) throw error.value

    toast.add({
      title: 'Success',
      description: 'Lead saved and email sent.',
      color: 'success'
    })
  } catch (e) {
    toast.add({
      title: 'Error',
      description: e?.data?.error || 'Something went wrong.',
      color: 'error'
    })
  }
}


onMounted(async () => {
  const loader = new Loader({
    apiKey: useRuntimeConfig().public.googleMapsApiKey,
    libraries: ["places"],
  });

  const google = await loader.load();
  await nextTick();

  // Query the real <input> inside UInput’s wrapper
  const inputEl = autocompleteWrapper.value?.querySelector("input") as HTMLInputElement;

  if (inputEl) {
    const autocomplete = new google.maps.places.Autocomplete(inputEl, {
      types: ["geocode"],
      componentRestrictions: { country: "us" }, // optional
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        state.address = place.formatted_address;
      }
    });
  }
});
</script>

<template>
  <section id="contact" class="px-4 py-12 bg-gray-50">
    <div class="max-w-2xl mx-auto">
      <UForm
        :schema="schema"
        :state="state"
        @submit="onSubmit"
        class="space-y-6"
      >
        <div class="grid grid-cols-1 gap-4 relative ">
          <UFormField name="address" label="Address">
            <div ref="autocompleteWrapper">
              <UInput
                v-model="state.address"
                placeholder="Start typing your address"
                class="w-full"
              />
            </div>
          </UFormField>

          <UFormField name="name" label="Name">
            <UInput v-model="state.name" placeholder="Enter your name" />
          </UFormField>

          <UFormField name="email" label="Email">
            <UInput v-model="state.email" placeholder="Enter your email" />
          </UFormField>
          <UFormField name="propertyCondition" label="Condition of Property (1–10)">
              <USelect v-model="state.propertyCondition" :items="conditionOptions" class="w-48" />
          </UFormField>
          <!-- Timeline Dropdown -->
          <UFormField name="timeline" label="When do you want to sell?">
            <USelect 
              v-model="state.timeline"
              :items="timelineOptions"
              placeholder="Select timeline"
              class="w-64"
            />
          </UFormField>
          <UFormField
            name="propertyDescription"
            label="Property Description"
          >
            <UTextarea
              v-model="state.propertyDescription"
              placeholder="Enter property description"
            />
          </UFormField>
          
        </div>

        <div class="pt-4">
          <UButton type="submit" block size="lg" class="text-white">Submit</UButton>
        </div>
      </UForm>
    </div>
  </section>
</template>
