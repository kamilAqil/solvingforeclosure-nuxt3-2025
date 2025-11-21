<script setup>
import citiesData from "../../server/cities.json";
import ContactForm from '~/components/solving_foreclosure/ContactForm.vue';

const route = useRoute();

// Nuxt dynamic params are always lowercase in the route object
const topic = route.params.topic;
const city = route.params.city;

// Debug logging
console.log('Raw route.params:', route.params);
console.log('Topic:', topic);
console.log('City:', city);

// Get city data
const cityData = computed(() => {
  if (!city) {
    console.error('No city param found');
    return null;
  }
  const data = citiesData.california?.[city];
  console.log('City data found:', data);
  return data;
});

// Topic configuration
const topicConfig = {
  'postpone-foreclosure': {
    title: 'Postpone Foreclosure',
    description: 'Legal strategies to delay your foreclosure sale date',
    eyebrow: 'Foreclosure Defense'
  },
  'stop-auction': {
    title: 'Stop Foreclosure Auction',
    description: 'Emergency options to halt an imminent foreclosure sale',
    eyebrow: 'Urgent Action'
  },
  'loan-modification': {
    title: 'Loan Modification',
    description: 'Permanently modify your mortgage terms to make payments affordable',
    eyebrow: 'Long-term Solution'
  },
  'reinstate-loan': {
    title: 'Reinstate Your Loan',
    description: 'Pay past-due amounts to bring your mortgage current',
    eyebrow: 'Quick Resolution'
  },
  'sell-before-auction': {
    title: 'Sell Before Auction',
    description: 'Sell your home quickly and avoid foreclosure on your record',
    eyebrow: 'Exit Strategy'
  }
};

const currentTopic = computed(() => {
  if (!topic) return {
    title: 'Foreclosure Help',
    description: 'Expert guidance for homeowners facing foreclosure',
    eyebrow: 'Get Help'
  };
  return topicConfig[topic] || {
    title: 'Foreclosure Help',
    description: 'Expert guidance for homeowners facing foreclosure',
    eyebrow: 'Get Help'
  };
});

// All California cities for footer
const californiaCities = computed(() => {
  if (citiesData.california) {
    return Object.entries(citiesData.california)
      .map(([slug, data]) => ({
        name: data.name,
        slug,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  return [];
});

// 404 if city not found
if (!cityData.value) {
  console.error('City not found!');
  console.error('Looking for city slug:', city);
  console.error('Available cities:', Object.keys(citiesData.california || {}).slice(0, 10));
  throw createError({
    statusCode: 404,
    statusMessage: `City '${city}' not found in California. Topic: '${topic}'`,
    fatal: true,
  });
}

// SEO
useSeoMeta({
  title: () => `${currentTopic.value.title} in ${cityData.value.name}, CA | Foreclosure Help`,
  ogTitle: () => `${currentTopic.value.title} in ${cityData.value.name}, CA`,
  ogType: "website",
  description: () => `${currentTopic.value.description} for homeowners in ${cityData.value.name}, ${cityData.value.county} County, California.`,
  ogDescription: () => `${currentTopic.value.description} for homeowners in ${cityData.value.name}, ${cityData.value.county} County, California.`,
});

// Foreclosure options cards
const baseBtn = 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300';
const activeBtn = 'bg-emerald-600 text-white border-emerald-600';

const view = ref('all');

const keepKeys = new Set(['reinstate', 'forbearance', 'modification']);
const exitKeys = new Set(['sell-before', 'short-sale', 'deed-in-lieu', 'bankruptcy']);

const allCards = [
  {
    key: 'reinstate',
    title: 'Reinstate Loan',
    pros: ['Immediate resolution', 'Keep your home', 'No long-term credit impact'],
    cons: ['Requires lump sum', 'Time-sensitive'],
    speed: 'fast',
    speedLabel: 'Fast'
  },
  {
    key: 'forbearance',
    title: 'Repayment / Forbearance',
    pros: ['Temporary relief', 'Less short-term strain', 'Can help protect credit'],
    cons: ['Requires financial review', 'Payments may be higher later'],
    speed: 'moderate',
    speedLabel: 'Moderate'
  },
  {
    key: 'modification',
    title: 'Loan Modification',
    pros: ['Lower monthly payment', 'Long-term solution', 'May protect credit'],
    cons: ['Must qualify', 'Process can be lengthy'],
    speed: 'long',
    speedLabel: 'Long-term'
  },
  {
    key: 'sell-before',
    title: 'Sell Before Auction',
    pros: ['Avoid foreclosure', 'You control the sale', 'Cash in hand'],
    cons: ['May not get full market value', 'Requires quick action'],
    speed: 'fast',
    speedLabel: 'Fast'
  },
  {
    key: 'short-sale',
    title: 'Short Sale',
    pros: ['Avoids foreclosure on record', 'Possible relocation assistance'],
    cons: ['Lender approval required', 'Takes time; sale not guaranteed'],
    speed: 'moderate',
    speedLabel: 'Moderate'
  },
  {
    key: 'deed-in-lieu',
    title: 'Deed in Lieu',
    pros: ['Simpler exit than foreclosure', 'May reduce deficiency risk'],
    cons: ['Lender must approve', 'You give up the home'],
    speed: 'moderate',
    speedLabel: 'Moderate'
  },
  {
    key: 'bankruptcy',
    title: 'Bankruptcy (Automatic Stay)',
    pros: ['Immediate pause on sale (automatic stay)', 'Can structure repayment (Ch. 13)'],
    cons: ['Serious credit impact', 'Requires attorney guidance'],
    speed: 'fast',
    speedLabel: 'Fast'
  }
];

const filteredCards = computed(() => {
  if (view.value === 'all') return allCards;
  if (view.value === 'keep') return allCards.filter(c => keepKeys.has(c.key));
  return allCards.filter(c => exitKeys.has(c.key));
});

function badgeTone(speed) {
  switch (speed) {
    case 'fast':
      return 'text-emerald-800 bg-emerald-50 ring-emerald-200';
    case 'moderate':
      return 'text-amber-800 bg-amber-50 ring-amber-200';
    default:
      return 'text-gray-800 bg-gray-50 ring-gray-200';
  }
}

// FAQs
const faqs = [
  {
    label: 'Can I really stop a foreclosure at the last minute?',
    content: `Yes, there are several options available even close to the sale date, including filing bankruptcy, reinstating your loan, or negotiating with your lender. The key is acting quickly and getting professional help in ${cityData.value.name}.`
  },
  {
    label: 'How long does a loan modification take?',
    content: 'A loan modification typically takes 30-90 days to complete, depending on your lender and how quickly you provide required documentation. Start the process as early as possible.'
  },
  {
    label: 'Will selling my home before auction hurt my credit?',
    content: 'Selling before auction is much better for your credit than a completed foreclosure. While you may still see some credit impact from missed payments, avoiding foreclosure keeps your credit score significantly higher.'
  },
  {
    label: `Do I need an attorney in ${cityData.value.name}?`,
    content: `While not always required, having a foreclosure attorney familiar with ${cityData.value.county} County procedures can significantly improve your outcome and help you understand all your options.`
  },
  {
    label: 'What if I owe more than my home is worth?',
    content: 'You still have options including short sales, loan modifications, or deed in lieu of foreclosure. Many lenders prefer these alternatives to foreclosure even when you\'re underwater on your mortgage.'
  }
];
</script>

<template>
  <div v-if="cityData" class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-white py-20 sm:py-28">
      <div class="mx-auto max-w-7xl px-6">
        <div class="mx-auto max-w-3xl text-left">
          <p class="mb-3 text-sm font-semibold tracking-wide uppercase text-gray-600">
            {{ currentTopic.eyebrow }}
          </p>
          <h1 class="font-bold leading-tight text-4xl sm:text-5xl text-gray-900">
            {{ currentTopic.title }} in <span class="text-emerald-600">{{ cityData.name }}</span>
          </h1>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl">
            {{ currentTopic.description }} for homeowners in {{ cityData.name }}, {{ cityData.county }} County, California.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Get Free Cash Offer
            </a>
            <a
              href="#options"
              class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View All Options
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-6 py-16">
      <!-- Introduction -->
      <section class="mb-16">
        <div class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 md:p-8">
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Foreclosure Help in {{ cityData.name }}, {{ cityData.state }}
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed">
              If you're facing foreclosure in {{ cityData.name }}, you're not alone. Many homeowners in 
              {{ cityData.county }} County struggle with mortgage payments due to job loss, medical bills, 
              divorce, or other financial hardships. The good news is that you have options, and acting 
              quickly can make all the difference.
            </p>
            <p class="text-gray-700 leading-relaxed mt-4">
              Whether you want to keep your home through a loan modification or reinstatement, or you need 
              to exit quickly by selling before auction, this guide will help you understand your choices 
              and take the right next steps for your situation in {{ cityData.name }}.
            </p>
          </div>
        </div>
      </section>

      <!-- Foreclosure Options -->
      <section id="options" class="mb-16">
        <div class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 md:p-8">
          <header class="mb-6">
            <h2 class="text-2xl md:text-3xl font-semibold text-emerald-700">Foreclosure Options</h2>
            <p class="mt-2 text-gray-700">
              Compare ways to keep your home or exit with control. Every situation is different—review the 
              trade-offs and talk to a counselor or attorney before deciding.
            </p>
          </header>

          <!-- Filter Toggle -->
          <div class="mb-6 flex flex-wrap gap-2">
            <button
              class="px-3 py-1.5 rounded-full text-sm border transition-colors"
              :class="view === 'all' ? activeBtn : baseBtn"
              @click="view = 'all'"
            >
              All Options
            </button>
            <button
              class="px-3 py-1.5 rounded-full text-sm border transition-colors"
              :class="view === 'keep' ? activeBtn : baseBtn"
              @click="view = 'keep'"
            >
              Keep the Home
            </button>
            <button
              class="px-3 py-1.5 rounded-full text-sm border transition-colors"
              :class="view === 'exit' ? activeBtn : baseBtn"
              @click="view = 'exit'"
            >
              Exit the Home
            </button>
          </div>

          <!-- Options Cards -->
          <div class="grid gap-5 md:grid-cols-2">
            <article
              v-for="card in filteredCards"
              :key="card.key"
              class="rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <h3 class="text-xl font-semibold text-gray-900">{{ card.title }}</h3>
              <ul class="mt-3 space-y-1 text-gray-700">
                <li v-for="(pro, i) in card.pros" :key="`pro-${card.key}-${i}`" class="flex items-start">
                  <span class="text-emerald-600 mr-2">✔</span>
                  <span>{{ pro }}</span>
                </li>
                <li
                  v-for="(con, i) in card.cons"
                  :key="`con-${card.key}-${i}`"
                  class="text-gray-500 flex items-start"
                >
                  <span class="mr-2">–</span>
                  <span>{{ con }}</span>
                </li>
              </ul>
              <div class="mt-3 flex items-center gap-2">
                <span class="text-sm text-gray-600">Est. resolution:</span>
                <span
                  class="text-xs px-2 py-0.5 rounded-full ring-1"
                  :class="badgeTone(card.speed)"
                >
                  {{ card.speedLabel }}
                </span>
              </div>
            </article>
          </div>

          <p class="mt-6 text-xs text-gray-500">
            This is general information, not legal or financial advice. Consult with a qualified attorney 
            or HUD-approved counselor in {{ cityData.name }} for guidance specific to your situation.
          </p>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="mb-16">
        <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-white shadow-xl">
          <h3 class="text-3xl font-bold mb-4">
            Ready to Take Action in {{ cityData.name }}?
          </h3>
          <p class="text-xl mb-8 text-emerald-50">
            Get a free consultation to discuss your options and find the best path forward.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              class="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Your Free Offer
            </a>
            <a
              href="tel:1-800-555-0100"
              class="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
            >
              Call (800) 555-0100
            </a>
          </div>
        </div>
      </section>

      <!-- Contact Form Section -->
      <section id="contact" class="mb-16">
        <div class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 md:p-8">
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-2">
            Get Your Free Cash Offer
          </h2>
          <p class="text-center text-gray-600 mb-8">
            Fill out the form below and we'll get back to you within 24 hours with a no-obligation offer.
          </p>
          <ContactForm />
        </div>
      </section>

      <!-- FAQ Section -->
      <section id="faq" class="mb-16">
        <div class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 md:p-8">
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div class="space-y-4">
            <details
              v-for="(faq, index) in faqs"
              :key="index"
              class="group rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors"
            >
              <summary class="flex justify-between items-center cursor-pointer font-medium text-gray-900">
                {{ faq.label }}
                <span class="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p class="mt-3 text-gray-700 leading-relaxed">{{ faq.content }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- Other Cities Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-8 text-gray-900">
          Foreclosure Help in Other <span class="text-emerald-600">California Cities</span>
        </h2>
        <div class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <NuxtLink
              v-for="cityItem in californiaCities"
              :key="cityItem.slug"
              :to="`/${topic}/${cityItem.slug}`"
              class="block px-4 py-3 rounded-lg font-medium transition-all duration-200 text-center text-sm bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200 hover:border-emerald-300"
            >
              {{ cityItem.name }}
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}
</style>
