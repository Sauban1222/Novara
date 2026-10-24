const currency = 'PKR'
const locale = 'en-PK'

export function formatPrice(amount) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
