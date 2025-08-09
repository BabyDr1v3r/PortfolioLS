import z from 'zod'
import type { Composer } from 'vue-i18n'

const createEmailSchema = (t: Composer['t']) => z.object({
  email: z.email({ message: t('sections.contact.validation.form.email.invalid') }).nonempty(t('sections.contact.validation.form.email.required')),
  subject: z.string().nonempty(t('sections.contact.validation.form.subject.required')),
  message: z.string().nonempty(t('sections.contact.validation.form.message.required')),
})

export default createEmailSchema
