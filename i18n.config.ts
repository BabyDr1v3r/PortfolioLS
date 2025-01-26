import { createI18n } from 'vue-i18n'

export default createI18n({
  locale: 'en-US',
  messages: {
    'en-US': require('./i18n/locales/en-US.json'),
    'es-AR': require('./i18n/locales/es-AR.json')
  }
})
