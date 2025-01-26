// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      emailJsKey: process.env.NUXT_PUBLIC_EMAILJS_KEY,
    }
  },
  routeRules: {
    '/': { redirect: '/home' }
  },
  modules: ['@nuxtjs/tailwindcss', '@valko-ui/components/nuxt', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en-US', iso: 'en-US', name: 'English (US)', file: 'en-US.json' },
      { code: 'es-AR', iso: 'es-AR', name: 'Español (AR)', file: 'es-AR.json' }
    ],
    lazy: true,
    defaultLocale: 'en-US',
    langDir: 'locales',
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts'
  },
  vite: {
    optimizeDeps: {
      include: ['@valko-ui/components'],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  }
})
