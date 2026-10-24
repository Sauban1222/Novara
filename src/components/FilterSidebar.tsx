import { Search, X } from 'lucide-react'
import { categories } from '../data/products'
import './FilterSidebar.css'

export default function FilterSidebar({ search, setSearch, category, setCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, sort, setSort, newOnly, setNewOnly, saleOnly, setSaleOnly, invalidRange, onClear, resultCount }) {
  return (
    <div className="shop-controls">
      <form className="shop-search" role="search" onSubmit={(event) => event.preventDefault()}>
        <Search size={17} aria-hidden="true" />
        <label className="sr-only" htmlFor="product-search">Search products</label>
        <input id="product-search" type="search" placeholder="Search pieces" value={search} onChange={(event) => setSearch(event.target.value)} />
        {search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')}><X size={15} /></button>}
      </form>
      <div className="shop-filter">
        <label htmlFor="category-filter">Category</label>
        <select id="category-filter" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">All collections</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <fieldset className="price-filter">
        <legend>Price</legend>
        <label className="sr-only" htmlFor="min-price">Minimum price</label>
        <input id="min-price" type="number" min="0" step="1" placeholder="Min" value={minPrice} aria-invalid={invalidRange || undefined} aria-describedby={invalidRange ? 'price-filter-error' : undefined} onChange={(event) => setMinPrice(event.target.value)} />
        <span aria-hidden="true">–</span>
        <label className="sr-only" htmlFor="max-price">Maximum price</label>
        <input id="max-price" type="number" min="0" step="1" placeholder="Max" value={maxPrice} aria-invalid={invalidRange || undefined} aria-describedby={invalidRange ? 'price-filter-error' : undefined} onChange={(event) => setMaxPrice(event.target.value)} />
      </fieldset>
      <fieldset className="collection-filters">
        <legend className="sr-only">Curated collections</legend>
        <label><input type="checkbox" checked={newOnly} onChange={(event) => setNewOnly(event.target.checked)} /> New arrivals</label>
        <label><input type="checkbox" checked={saleOnly} onChange={(event) => setSaleOnly(event.target.checked)} /> Sale</label>
      </fieldset>
      <div className="shop-filter shop-sort">
        <label htmlFor="sort-products">Sort</label>
        <select id="sort-products" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
      <div className="shop-result-count" aria-live="polite" aria-atomic="true">{resultCount} {resultCount === 1 ? 'piece' : 'pieces'}</div>
      <button className="clear-filters" type="button" onClick={onClear}>Clear filters</button>
    </div>
  )
}
