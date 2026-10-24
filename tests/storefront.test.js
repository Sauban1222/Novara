import test from 'node:test'
import assert from 'node:assert/strict'
import { products } from '../src/data/products.js'
import { normalizeCart } from '../src/utils/cart.js'
import { validateCheckoutForm } from '../src/utils/checkout.js'
import { filterProducts } from '../src/utils/storefront.js'

test('search, category, price, and sort filters compose', () => {
  const results = filterProducts(products, {
    search: 'leather',
    category: 'Shoes',
    minPrice: 5000,
    maxPrice: 6000,
    sort: 'price-asc',
  })
  assert.deepEqual(results.map((product) => product.id), ['leather-loafer'])
})

test('empty search leaves the catalog and invalid price ranges match nothing', () => {
  assert.equal(filterProducts(products, { search: '   ' }).length, products.length)
  assert.deepEqual(filterProducts(products, { minPrice: 40000, maxPrice: 10000 }), [])
  assert.deepEqual(filterProducts(products, { minPrice: -1 }), [])
})

test('price bounds are inclusive and curated filters use supported product fields', () => {
  assert.deepEqual(
    filterProducts(products, { minPrice: 4290, maxPrice: 4290 }).map((product) => product.id),
    ['gold-hoops'],
  )
  assert.ok(products.every((product) => product.price >= 4000 && product.price <= 6000))
  assert.ok(products.filter((product) => product.originalPrice).every(
    (product) => product.originalPrice > product.price && product.originalPrice <= 6000,
  ))
  assert.ok(filterProducts(products, { newOnly: true }).every((product) => product.isNew))
  assert.ok(filterProducts(products, { saleOnly: true }).every((product) => product.originalPrice))
})

test('price and name sorting are deterministic', () => {
  assert.deepEqual(
    filterProducts(products, { sort: 'price-asc' }).map((product) => product.price),
    [...products].map((product) => product.price).sort((a, b) => a - b),
  )
  assert.equal(filterProducts(products, { sort: 'name' })[0].name, 'City Court Sneaker')
})

test('cart data is sanitized, duplicates merge, and quantities respect demo limits', () => {
  const result = normalizeCart([
    { id: 'linen-shirt', quantity: 10 },
    { id: 'linen-shirt', quantity: 10 },
    null,
    { id: 'not-a-product', quantity: 1 },
    { id: 'city-sneaker', quantity: 1 },
    { id: 'gold-hoops', quantity: -2 },
  ])
  assert.deepEqual(result.items, [
    { id: 'linen-shirt', quantity: 12 },
  ])
  assert.match(result.message, /corrected/)
})

test('malformed cart shape recovers to an empty bag with a message', () => {
  const result = normalizeCart({ items: [] })
  assert.deepEqual(result.items, [])
  assert.match(result.message, /reset/)
  assert.deepEqual(normalizeCart([null]).items, [])
})

test('checkout validation explains missing and invalid fields', () => {
  const errors = validateCheckoutForm({ fullName: '', email: 'not-an-email', address: '', city: '', postalCode: 'x' })
  assert.deepEqual(Object.keys(errors), ['fullName', 'email', 'address', 'city', 'postalCode'])
})

test('checkout accepts complete valid details', () => {
  assert.deepEqual(validateCheckoutForm({
    fullName: 'Sam Example',
    email: 'sam@example.test',
    address: '12 Sample Road',
    city: 'Lahore',
    postalCode: '54000',
  }), {})
})
