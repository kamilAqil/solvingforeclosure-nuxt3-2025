// nuxt.config.ts
import { topicCityRoutes } from './utils/locations'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/image', 'nuxt-gtag', '@nuxtjs/sitemap', '@zadigetvoltaire/nuxt-gtm'],

  // GA4 via nuxt-gtag
  gtag: {
    id: process.env.GTAG_ID || '',
    config: { anonymize_ip: true }
  },
  gtm: {
    id: "GTM-KWVQH4V6", // your GTM container
    enabled: true,
    debug: false,       // set true for development preview
  },

  ui: { icons: ['heroicons'] },

  // Auto-import components
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

  nitro: {
    // Use Vercel output if deploying on Vercel
    preset: 'node-server',

    // Prisma stays external so serverless bundling is happy
    externals: {
      external: ['@prisma/client', 'prisma'],
      inline: []
    },

    prerender: {
      crawlLinks: false,
      routes: topicCityRoutes,
      // During debugging you can keep builds going:
      // failOnError: false
    }
  },

  // If you plan to add many more routes later, consider ISR instead of prerender:
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

    // public (client-exposed) — no secrets here
    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL || 'https://solvingforeclosure.com',
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      gtagId: process.env.GTAG_ID || ''
    }
  }
})
