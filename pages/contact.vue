<script setup lang="ts">
import emailjs from '@emailjs/browser'
const lang = useCookie('lang', {
  default: () => 'en'
})

const config = useRuntimeConfig()

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

const form = reactive({ ...initialForm })

const clearFeedback = (feedbackOnly: boolean) => {
  if(!feedbackOnly) Object.assign(form, initialForm)

  setTimeout(() => feedback.message = '', 5000)
}

const sendEmail = async (formData: { email: string, subject: string, message: string }) => {
  if (!formData.email || !formData.subject || !formData.message) {
    feedback.message = lang.value === 'en' ? 'All fields are required.' : 'Todos los campos son obligatorios.'
    clearFeedback(true)
    return
  }

  try {
    await emailjs.send('service-portolio-ls', 'email-template-portfolio', formData, config.public.emailJsKey)
    feedback.success = true
    feedback.message = lang.value === 'en' ? 'Message sent successfully!' : '¡Mensaje enviado con éxito!'
    clearFeedback(false)
  } catch (err) {
    feedback.success = false
    feedback.message = lang.value === 'en' ? 'Failed to send message. Try again later.' : 'Error al enviar el mensaje. Intenta de nuevo más tarde.'
    clearFeedback(false)
  }
}
</script>

<template>
  <header class="absolute w-full z-20">
    <vk-navbar floating fixed flat color="neutral" shape="rounded">
      <site-links />
    </vk-navbar>
  </header>

  <main class="relative min-h-screen w-full pt-24 px-4">
    <div class="absolute inset-0 bg-gradient-to-br from-black to-white dark:from-white dark:to-black opacity-50" />

    <div class="relative z-20 text-center max-w-2xl mx-auto animate-slideIn">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">
          {{ lang === 'en' ? "Let's Connect" : 'Conectemos' }}
        </h1>
        <p class="mt-4 text-lg text-gray-700 dark:text-gray-300">
          {{
            lang === 'en'
              ? "I'm currently looking for new opportunities. My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
              : 'Actualmente estoy buscando nuevas oportunidades. Mi bandeja de entrada siempre está abierta. Ya sea que tengas una pregunta o solo quieras saludar, haré lo mejor que pueda para responderte.'
          }}
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
            :label="lang === 'en' ? 'Subject' : 'Asunto'"
          />
          <vk-textarea
            v-model="form.message"
            variant="outlined"
            :label="lang === 'en' ? 'Message' : 'Mensaje'"
          />
          <p
            v-if="feedback.message"
            :class="`text-left ${feedback.success ? 'text-success-500' : 'text-error-500'}`"
          >
            {{ feedback.message }}
          </p>

          <div>
            <vk-button
              variant="outlined"
              flat
              size="lg"
              class="w-full"
              @click="sendEmail(form)"
            >
              {{ lang === 'en' ? 'Send Message' : 'Enviar mensaje' }}
            </vk-button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
