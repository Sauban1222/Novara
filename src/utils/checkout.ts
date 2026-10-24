export interface CheckoutForm {
  fullName: string
  email: string
  address: string
  city: string
  postalCode: string
}

export type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>

export function validateCheckoutForm(form: CheckoutForm): CheckoutErrors {
  const errors: CheckoutErrors = {}
  if (!form.fullName.trim()) errors.fullName = 'Enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email address.'
  if (!form.address.trim()) errors.address = 'Enter a delivery address.'
  if (!form.city.trim()) errors.city = 'Enter your city.'
  if (!/^[A-Za-z0-9][A-Za-z0-9 -]{2,11}$/.test(form.postalCode.trim())) {
    errors.postalCode = 'Enter a valid postal code (3–12 letters, numbers, or spaces).'
  }
  return errors
}
