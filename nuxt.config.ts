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
  modules: ['@nuxtjs/tailwindcss', '@valko-ui/components/nuxt'],
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
