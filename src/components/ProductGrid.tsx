import ProductCard from './ProductCard'
import './ProductGrid.css'

export default function ProductGrid({ products, emptyTitle = 'No pieces found', emptyMessage = 'Try adjusting your search or filters to discover more of the collection.', onClear }) {
  if (products.length === 0) {
    return (
      <div className="product-empty" role="status">
        <p className="eyebrow">A little quiet here</p>
        <h3>{emptyTitle}</h3>
        <p>{emptyMessage}</p>
        {onClear && <button className="button button--outline" type="button" onClick={onClear}>Clear filters</button>}
      </div>
    )
  }

  return <div className="product-grid">{products.map((product) => <ProductCard product={product} key={product.id} />)}</div>
}
