import { topics } from './composables/useCities'
import { allCitySlugs } from './composables/useCities'

const citySlugs = allCitySlugs()
const topicRoutes = topics.flatMap((t) => citySlugs.map((c) => `/${t}/${c}`))

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

  imports: { dirs: ['~/components'] },
  components: { global: true },

  css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],

  image: {
    provider: 'imagekit',
    imagekit: {
      baseURL: process.env.NUXT_PUBLIC_IMAGEKIT_BASE_URL || 'https://ik.imagekit.io/s6a52okgg'
    }
  },

  // Prisma + Nitro
  nitro: {
    preset: 'node-server',
    externals: {
      external: ['@prisma/client', 'prisma'],
      inline: []
    },
    prerender: {
      crawlLinks: false,
      routes: [
        ...topicRoutes
      ]
    }
  },

  runtimeConfig: {
    // server-only (safe)
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    sendGridApiKey: process.env.NUXT_SENDGRID_API_KEY,
    sendGridFrom: process.env.NUXT_SENDGRID_FROM,
    sendGridTo: process.env.NUXT_SENDGRID_TO,
    // Prefer DATABASE_URL; fall back to POSTGRES_URL if present
    databaseUrl: process.env.DATABASE_URL || process.env.POSTGRES_URL,

    // client-exposed (public) — do NOT put secrets here
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://solvingforeclosure.com',
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      gtagId: process.env.GTAG_ID || ''
    }
  }
})

