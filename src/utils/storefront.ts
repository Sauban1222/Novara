export function filterProducts(products, filters) {
  const {
    search = '',
    category = '',
    minPrice = null,
    maxPrice = null,
    sort = 'featured',
    newOnly = false,
    saleOnly = false,
  } = filters
  const invalidRange = (minPrice !== null && (!Number.isFinite(minPrice) || minPrice < 0))
    || (maxPrice !== null && (!Number.isFinite(maxPrice) || maxPrice < 0))
    || (minPrice !== null && maxPrice !== null && minPrice > maxPrice)

  if (invalidRange) return []

  const query = search.trim().toLowerCase()
  const result = products.filter((product) => {
    const matchesSearch = !query || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query)
    const matchesCategory = !category || product.category === category
    const matchesPrice = (minPrice === null || product.price >= minPrice) && (maxPrice === null || product.price <= maxPrice)
    const matchesNew = !newOnly || product.isNew
    const matchesSale = !saleOnly || Boolean(product.originalPrice)
    return matchesSearch && matchesCategory && matchesPrice && matchesNew && matchesSale
  })

  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
  if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name))
  return result
}
