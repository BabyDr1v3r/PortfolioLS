<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import emailjs from '@emailjs/browser'

const config = useRuntimeConfig()
const { t } = useI18n()

emailjs.init(config.public.emailJsKey)

const feedback = reactive({
  success: false,
  message: ''
})

const initialForm = {
  email: '',
  subject: '',
  message: ''
}

const translations = reactive({
  form: t('pages.contact.feedback.form'),
  success: t('pages.contact.feedback.success'),
  error: t('pages.contact.feedback.error'),
})

const form = reactive({ ...initialForm })

const clearFeedback = (feedbackOnly: boolean) => {
  if(!feedbackOnly) Object.assign(form, initialForm)

  setTimeout(() => feedback.message = '', 5000)
}

const sendEmail = async (formData: { email: string, subject: string, message: string }) => {
  if (!formData.email || !formData.subject || !formData.message) {
    feedback.message = translations.form
    clearFeedback(true)
    return
  }

  try {
    await emailjs.send('service-portolio-ls', 'email-template-portfolio', formData, config.public.emailJsKey)
    feedback.success = true
    feedback.message = translations.success
    clearFeedback(false)
  } catch (err) {
    feedback.success = false
    feedback.message = translations.error
    clearFeedback(false)
  }
}
</script>

<template>
  <div class="text-center max-w-2xl my-12 mx-auto animate-slideIn">
    <div class="mb-8">
      <h1 class="text-4xl font-bold font-serif">
        {{ $t('pages.contact.title') }}
      </h1>
      <p class="mt-4 text-lg text-gray-700 dark:text-gray-300">
        {{ $t('pages.contact.subtitle') }}
      </p>
    </div>

    <div class="bg-light-3 dark:bg-dark-3 shadow-lg rounded-lg px-6 py-8 animate-slideIn">
      <div class="space-y-6">
        <vk-input
          v-model="form.email"
          variant="outlined"
          type="email" label="Email"
        />
        <vk-input
          v-model="form.subject"
          variant="outlined"
          :label="$t('pages.contact.subject')"
        />
        <vk-textarea
          v-model="form.message"
          variant="outlined"
          :label="$t('pages.contact.message')"
        />
        <p
          v-if="feedback.message"
          :class="`text-left ${feedback.success ? 'text-success-500' : 'text-error-500'}`"
        >
          {{ feedback.message }}
        </p>

        <div>
          <vk-button
            flat
            size="lg"
            class="w-full"
            @click="sendEmail(form)"
          >
            {{ $t('pages.contact.submit') }}
          </vk-button>
        </div>
      </div>
    </div>
  </div>
</template>
