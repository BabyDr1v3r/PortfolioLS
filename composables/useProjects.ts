import { computed } from 'vue'
import type { Composer } from 'vue-i18n'

const useProjects = (t: Composer['t']) => computed(() => [
  {
    key: 'valkoui',
    title: t('sections.projects.item-1.title'),
    img: { light: '/valkoweb-light.png', dark: '/valkoweb-dark.png' },
    tags: ['Vue3', 'TailwindCSS', 'TypeScript', 'Nuxt'],
    description: t('sections.projects.item-1.description'),
    links: {
      github: 'https://github.com/ValkoDevs/valko-ui',
      website: 'https://valkoui.valkosoftware.dev/'
    }
  }
])

export default useProjects
