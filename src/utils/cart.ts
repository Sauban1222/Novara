import { products } from '../data/products'

export function normalizeCart(value, catalog = products) {
  if (!Array.isArray(value)) {
    return { items: [], message: 'Your saved bag could not be read and has been reset.' }
  }

  const normalized = new Map()
  let adjusted = false
  value.forEach((item) => {
    const product = catalog.find((entry) => entry.id === item?.id)
    if (!product || !Number.isInteger(item?.quantity) || item.quantity <= 0 || product.stock < 1) {
      adjusted = true
      return
    }
    const previous = normalized.get(product.id)?.quantity || 0
    const quantity = Math.min(product.stock, previous + item.quantity)
    if (previous > 0 || quantity !== previous + item.quantity) adjusted = true
    normalized.set(product.id, { id: product.id, quantity })
  })

  return {
    items: [...normalized.values()],
    message: adjusted ? 'Some saved bag items were unavailable or invalid and have been corrected.' : '',
  }
}
