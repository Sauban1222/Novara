import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { products } from '../data/products.js'
import { useCart } from '../hooks/useCart.js'
import { formatPrice } from '../utils/formatPrice.js'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import './ProductDetails.css'

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find((entry) => entry.id === id)
  const [quantity, setQuantity] = useState(1)
  const [feedback, setFeedback] = useState('')
  const { addItem, message } = useCart()

  if (!product) {
    return (
      <section className="not-found page-container">
        <p className="eyebrow">The piece has moved on</p>
        <h1 className="section-title">We couldn’t find that product.</h1>
        <p>It may have been removed or the link may be incorrect.</p>
        <Link className="button" to="/">Return to the collection</Link>
      </section>
    )
  }

  const unavailable = product.stock === 0
  const addToBag = () => {
    if (addItem(product, quantity)) setFeedback(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to your bag.`)
    else setFeedback(message || 'This item could not be added to your bag.')
  }

  return (
    <section className="product-details page-container">
      <Link className="back-link" to="/#shop"><ArrowLeft size={15} /> Back to shopping</Link>
      <div className="product-details-layout">
        <div className="product-details-image"><ImageWithFallback src={product.image} alt={product.name} /></div>
        <div className="product-details-copy">
          <p className="eyebrow">{product.category} / NOVARA collection</p>
          <h1>{product.name}</h1>
          <p className="details-price">{formatPrice(product.price)} {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}</p>
          <p className="details-description">{product.description}</p>
          <p className={`availability${unavailable ? ' is-out' : ''}`}>{unavailable ? 'Unavailable in this demo catalogue' : 'Available in this demo catalogue'}</p>
          <div className="details-actions">
            <div className="quantity-control">
              <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1 || unavailable} onClick={() => setQuantity((current) => Math.max(1, current - 1))}><Minus size={14} /></button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" aria-label="Increase quantity" disabled={quantity >= product.stock || unavailable} onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}><Plus size={14} /></button>
            </div>
            <button className="button" type="button" disabled={unavailable} onClick={addToBag}><ShoppingBag size={16} /> Add to bag</button>
          </div>
          <p className="product-feedback" role="status">{feedback && <><Check size={15} /> {feedback}</>}</p>
          <div className="details-note"><span>Thoughtfully selected</span><span>Local demo catalogue</span></div>
        </div>
      </div>
    </section>
  )
}
