import type { FieldState, FieldKey } from '~/types/common'
import sendContactEmail from '~/composables/useEmail'
import createEmailSchema from '~/types/contact.schema'
import { useI18n } from 'vue-i18n'

const phrases = [
  'Full-Stack </>',
  'Web Developer',
  'VueJS & React',
  'CS:GO <3'
]

export const items = ref([
  { key: 0, title: 'I like', icon: 'heart'},
  { key: 0, title: 'Making', icon: 'rating-16-plus'},
  { key: 0, title: 'YT Vids', icon: 'brand-youtube'}
])

export const state = reactive({
  currentText: '',
  phraseIndex: 0,
  typingIndex: 0,
  isDeleting: false,
  page: 5,
  switchRef: true
})

export const typeWriter = () => {
  const phrase = phrases[state.phraseIndex]
  const maxLength = phrase.length
  const isAtStartOfPhrase = state.typingIndex === 0
  const isAtEndOfPhrase = state.typingIndex === maxLength

  if (isAtStartOfPhrase && state.isDeleting) {
    state.isDeleting = false
    state.phraseIndex = (state.phraseIndex + 1) % phrases.length
  } else if (isAtEndOfPhrase && !state.isDeleting) {
    state.isDeleting = true
  }

  state.currentText = phrase.slice(0, state.typingIndex + (state.isDeleting ? -1 : 1))
  state.typingIndex += state.isDeleting ? -1 : 1
}

const downloadResume = (lang: 'esp' | 'eng') => {
  const link = document.createElement('a')
  link.href = `/exequiel-segura-${lang}.pdf`
  link.download = `exequiel-segura-${lang}.pdf`
  link.click()
}

export const resumeItems = [
  {
    key: 'resume-esp',
    title: 'Español',
    icon: 'download',
    onClick: () => downloadResume('esp')
  },
  {
    key: 'resume-eng',
    title: 'English',
    icon: 'download',
    onClick: () => downloadResume('eng')
  }
]

const defaultFieldState = (): FieldState => ({
  value: '',
  helper: '',
  color: 'primary'
})

const useFieldGroup = (keys: FieldKey[]) => {
  const fields = reactive(
    Object.fromEntries(keys.map(key => [key, defaultFieldState()])) as Record<FieldKey, FieldState>
  )
  const reset = () => keys.forEach(key => Object.assign(fields[key], defaultFieldState()))
  return { fields, reset }
}

export const useContactForm = () => {
  const { t } = useI18n()
  const emailSchema = createEmailSchema(t)
  const { fields: form, reset: resetAllFields } = useFieldGroup(['email', 'subject', 'message'])
  const sending = ref(false)

  function setFieldError(field: FieldKey, message: string) {
    form[field].helper = message
    form[field].color = 'negative'
  }

  const sendEmail = async () => {
    const result = emailSchema.safeParse({
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    })

    if (!result.success) {
      for (const issue of result.error.issues) {
        setFieldError(issue.path[0] as FieldKey, issue.message)
      }
      return
    }

    sending.value = true
    try {
      await sendContactEmail({
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
      })

      form.message.helper = t('sections.contact.validation.success')
      form.email.color = 'positive'
      form.subject.color = 'positive'
      form.message.color = 'positive'

      setTimeout(() => {
        resetAllFields()
      }, 3000)
    } catch {
      form.message.helper = t('sections.contact.validation.error')
      form.message.color = 'negative'
    } finally {
      sending.value = false
    }
  }

  return { form, sending, sendEmail }
}
