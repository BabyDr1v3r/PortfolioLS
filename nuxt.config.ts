// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      emailJsKey: process.env.NUXT_PUBLIC_EMAILJS_KEY,
      emailJsServiceId: process.env.NUXT_PUBLIC_EMAILJS_SERVICE_ID,
      emailJsTemplateId: process.env.NUXT_PUBLIC_EMAILJS_TEMPLATE_ID
    }
  },
  pages: false,
  modules: [
    '@nuxt/eslint',
    '@valko-ui/components/nuxt',
    '@nuxtjs/i18n'
  ],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    }
  },
  i18n: {
    locales: [
      { code: 'en-US', iso: 'en-US', name: 'English (US)', file: 'en-US.json' },
      { code: 'es-AR', iso: 'es-AR', name: 'Español (AR)', file: 'es-AR.json' }
    ],
    defaultLocale: 'en-US',
    langDir: 'locales',
    strategy: 'no_prefix'
  }
})
