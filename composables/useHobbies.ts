import { computed } from 'vue'
import type { Composer } from 'vue-i18n'

const useHobbies = (t: Composer['t']) => computed(() => [
  { name: t('sections.about.hobbies.item-1'), icon: 'device-gamepad' },
  { name: t('sections.about.hobbies.item-2'), icon: 'motorbike' },
  { name: t('sections.about.hobbies.item-3'), icon: 'ball-football' },
  { name: t('sections.about.hobbies.item-4'), icon: 'book' },
  { name: t('sections.about.hobbies.item-5'), icon: 'swords' },
  { name: t('sections.about.hobbies.item-6'), icon: 'leaf' }
])

export default useHobbies
