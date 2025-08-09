import type { Color } from '@valko-ui/components'

export interface ContactForm {
  email: string;
  subject: string;
  message: string;
}

export type FieldKey = 'email' | 'subject' | 'message'

export interface FieldState {
  value: string;
  helper: string;
  color: Color;
}
