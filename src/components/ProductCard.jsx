import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../hooks/useCart.js'
import { formatPrice } from '../utils/formatPrice.js'
import ImageWithFallback from './ImageWithFallback.jsx'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [feedback, setFeedback] = useState('')
  const unavailable = product.stock === 0
  const handleAdd = () => {
    setFeedback(addItem(product) ? `${product.name} added to your bag.` : 'This item could not be added. Check its availability in your bag.')
  }

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <ImageWithFallback src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {product.isNew && <span className="product-badge">New</span>}
        {product.originalPrice && <span className="product-sale">Sale</span>}
        <Link className="product-view" to={`/product/${product.id}`} aria-label={`View details for ${product.name}`}><ArrowUpRight size={18} /></Link>
      </div>
      <div className="product-info">
        <div className="product-meta"><span>{product.category}</span></div>
        <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <div className="product-price">
          <span>{formatPrice(product.price)}</span>
          {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}
        </div>
        <button className="product-add" type="button" disabled={unavailable} onClick={handleAdd}>
          <ShoppingBag size={15} /> {unavailable ? 'Unavailable' : 'Add to bag'}
        </button>
        <span className="product-card-feedback" role="status">{feedback}</span>
      </div>
    </article>
  )
}
