import emailjs from '@emailjs/browser'
import type { ContactForm } from '~/types/common'

const sendContactEmail = async(form: ContactForm): Promise<void> => {
  const config = useRuntimeConfig()
  const serviceId = config.public.emailJsServiceId
  const templateId = config.public.emailJsTemplateId
  const publicKey = config.public.emailJsKey

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS environment variables are not set')
  }

  emailjs.init(publicKey)

  await emailjs.send(serviceId, templateId, {
    reply_to: form.email,
    subject: form.subject,
    message: form.message,
  }, publicKey)
}

export default sendContactEmail
