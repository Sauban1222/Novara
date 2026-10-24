import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { products } from '../data/products'
import { filterProducts } from '../utils/storefront'
import Hero from '../components/Hero'
import CategorySection from '../components/CategorySection'
import FilterSidebar from '../components/FilterSidebar'
import ProductGrid from '../components/ProductGrid'
import PromoBanner from '../components/PromoBanner'
import Newsletter from '../components/Newsletter'
import './Home.css'

function scrollToShop() {
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Home() {
  const location = useLocation()
  const [search, setSearch] = useState(() => new URLSearchParams(location.search).get('q') || '')
  const [category, setCategory] = useState(() => new URLSearchParams(location.search).get('category') || '')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('featured')
  const [newOnly, setNewOnly] = useState(false)
  const [saleOnly, setSaleOnly] = useState(false)
  const numericMin = minPrice === '' ? null : Number(minPrice)
  const numericMax = maxPrice === '' ? null : Number(maxPrice)
  const invalidRange = (numericMin !== null && (!Number.isFinite(numericMin) || numericMin < 0))
    || (numericMax !== null && (!Number.isFinite(numericMax) || numericMax < 0))
    || (numericMin !== null && numericMax !== null && numericMin > numericMax)
  const demoError = import.meta.env.DEV && new URLSearchParams(location.search).get('demoState') === 'error'

  useEffect(() => {
    setSearch(new URLSearchParams(location.search).get('q') || '')
    const nextCategory = new URLSearchParams(location.search).get('category') || ''
    setCategory(['Clothing', 'Shoes', 'Bags', 'Accessories'].includes(nextCategory) ? nextCategory : '')
  }, [location.search])

  useEffect(() => {
    if (location.hash === '#shop') {
      window.requestAnimationFrame(() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }))
    }
  }, [location.hash])

  const filteredProducts = useMemo(() => filterProducts(products, {
    search,
    category,
    minPrice: numericMin,
    maxPrice: numericMax,
    sort,
    newOnly,
    saleOnly,
  }), [search, category, numericMin, numericMax, sort, newOnly, saleOnly])

  const clearFilters = () => {
    setSearch('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
    setSort('featured')
    setNewOnly(false)
    setSaleOnly(false)
  }

  const selectCategory = (value) => {
    setCategory((current) => current === value ? '' : value)
    scrollToShop()
  }

  const showNewArrivals = () => {
    setNewOnly(true)
    setSearch('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
    setSaleOnly(false)
    scrollToShop()
  }

  const featuredIds = ['linen-shirt', 'studio-blazer', 'leather-loafer', 'weekender-tote', 'ribbed-knit', 'city-sneaker', 'gold-hoops', 'crossbody-bag']
  const featuredProducts = featuredIds.map((id) => products.find((product) => product.id === id)).filter(Boolean)
  const newArrivals = products.filter((product) => product.isNew).slice(0, 4)

  return (
    <>
      <Hero />
      <CategorySection activeCategory={category} onSelectCategory={selectCategory} />
      <section className="shop-section section" id="shop">
        <div className="page-container">
          <div className="shop-heading">
            <div><p className="eyebrow">The NOVARA collection</p><h2 className="section-title">Pieces to live in</h2><p className="section-intro">Considered shapes, enduring materials, and the details that make a piece your own.</p></div>
          </div>
          <FilterSidebar
            search={search} setSearch={setSearch} category={category} setCategory={setCategory}
            minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            sort={sort} setSort={setSort} newOnly={newOnly} setNewOnly={setNewOnly}
            saleOnly={saleOnly} setSaleOnly={setSaleOnly}
            invalidRange={invalidRange}
            onClear={clearFilters} resultCount={filteredProducts.length}
          />
          {invalidRange && <p className="filter-error" id="price-filter-error" role="alert">Enter a valid price range. The minimum must be non-negative and no greater than the maximum.</p>}
          {demoError
            ? <div className="product-empty catalog-demo-error" role="alert"><p className="eyebrow">Development preview</p><h3>We couldn’t display the collection.</h3><p>This controlled error preview does not affect the local product data.</p><Link className="button button--outline" to="/#shop">Return to the storefront</Link></div>
            : <ProductGrid products={filteredProducts} onClear={clearFilters} />}
        </div>
      </section>
      <section className="featured-section section">
        <div className="page-container">
          <div className="section-heading-row"><div><p className="eyebrow">Selected for NOVARA</p><h2 className="section-title">The considered edit</h2><p className="section-intro">An editorial selection of considered shapes and everyday essentials.</p></div><Link className="underlined-link" to="/#shop">Shop all pieces <span aria-hidden="true">↗</span></Link></div>
          {!demoError && <ProductGrid products={featuredProducts} />}
        </div>
      </section>
      <PromoBanner />
      <section className="new-arrivals-section section" id="new-arrivals">
        <div className="page-container">
          <div className="section-heading-row"><div><p className="eyebrow">Just arrived</p><h2 className="section-title">A fresh perspective</h2><p className="section-intro">New-season shapes to make your own.</p></div><button className="underlined-link new-arrivals-link" type="button" onClick={showNewArrivals}>View all new arrivals <span aria-hidden="true">↗</span></button></div>
          {!demoError && <ProductGrid products={newArrivals} />}
        </div>
      </section>
      <Newsletter />
    </>
  )
}
