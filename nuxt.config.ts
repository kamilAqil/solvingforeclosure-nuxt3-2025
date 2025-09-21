import { topics, allCitySlugs } from './utils/locations'

const citySlugs = allCitySlugs()
const topicRoutes = topics.flatMap(t => citySlugs.map(c => `/${t}/${c}`))

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/image', 'nuxt-gtag'],

  // GA4 via nuxt-gtag (reads env)
  gtag: {
    id: process.env.GTAG_ID || '',
    config: { anonymize_ip: true },
  },

  ui: { icons: ['heroicons'] },

  // Auto-import your components dir
  imports: { dirs: ['~/components'] },
  components: { global: true },

  css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],

  image: {
    provider: 'imagekit',
    imagekit: {
      baseURL:
        process.env.NUXT_PUBLIC_IMAGEKIT_BASE_URL ||
        'https://ik.imagekit.io/s6a52okgg'
    }
  },

  // Vercel-friendly output + Prisma externals
  nitro: {
    preset: 'vercel',
    externals: {
      external: ['@prisma/client', 'prisma'],
      inline: []
    },
    prerender: {
      crawlLinks: false,
      routes: topicRoutes,
      // Optional safety net during rollout:
      // failOnError: false
    }
  },

  // If the cross-product gets huge, consider ISR instead of prerender:
  // routeRules: {
  //   '/:topic/:city': { isr: 3600 } // revalidate hourly
  // },

  runtimeConfig: {
    // server-only
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    sendGridApiKey: process.env.NUXT_SENDGRID_API_KEY,
    sendGridFrom: process.env.NUXT_SENDGRID_FROM,
    sendGridTo: process.env.NUXT_SENDGRID_TO,
    databaseUrl: process.env.DATABASE_URL || process.env.POSTGRES_URL,

    // public (client-exposed) — never put secrets here
    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL || 'https://solvingforeclosure.com',
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      gtagId: process.env.GTAG_ID || ''
    }
  }
})
