export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/image', 'nuxt-gtag'],
  gtag: { id: 'G-WBKWLJ15E6' },

  ui: { icons: ['heroicons'] },

  imports: { dirs: ['~/components'] },
  components: { global: true },

  css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],

  image: {
    provider: 'imagekit',
    imagekit: { baseURL: 'https://ik.imagekit.io/s6a52okgg' }
  },

  // ⬇️ Important for Prisma + Nitro
  nitro: {
    preset: 'node-server',
    externals: {
      // Keep Prisma external so Nitro doesn't transform the client runtime blob
      external: ['@prisma/client', 'prisma'],
      inline: []
    },
    // Avoid executing server code (and Prisma) at build time
    prerender: {
      crawlLinks: false,
      routes: []
    }
  },

  runtimeConfig: {
    // server-only (safe)
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    sendGridApiKey: process.env.NUXT_SENDGRID_API_KEY, // keep camelCase since you used it that way
    sendGridFrom: process.env.NUXT_SENDGRID_FROM,
    sendGridTo: process.env.NUXT_SENDGRID_TO,
    databaseUrl: process.env.DATABASE_URL,

    // client-exposed (public) — DO NOT put secrets here
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
      // ⚠️ removed sendGrid* and databaseUrl from here
    }
  }
})
