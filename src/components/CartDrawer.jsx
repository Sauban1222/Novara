import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Minus, Plus, X } from 'lucide-react'
import { useCart } from '../hooks/useCart.js'
import { formatPrice } from '../utils/formatPrice.js'
import ImageWithFallback from './ImageWithFallback.jsx'
import './CartDrawer.css'

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, setQuantity, removeItem, message } = useCart()
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const previous = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = [...panelRef.current.querySelectorAll('button, a[href], input')]
        .filter((element) => !element.disabled)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
      previous?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" ref={panelRef}>
        <div className="drawer-header">
          <h2 id="drawer-title">Your bag <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2>
          <button className="icon-button" type="button" aria-label="Close shopping bag" onClick={onClose} ref={closeRef}><X size={20} /></button>
        </div>
        {items.length === 0 ? (
          <div className="drawer-empty">
            <p>{message || 'Your bag is waiting for something special.'}</p>
            <button className="button" type="button" onClick={onClose}>Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {items.map((item) => (
                <article className="drawer-item" key={item.id}>
                  <ImageWithFallback src={item.image} alt={item.name} />
                  <div className="drawer-item-info">
                    <Link to={`/product/${item.id}`} onClick={onClose}>{item.name}</Link>
                    <span>{formatPrice(item.price)}</span>
                    <div className="quantity-control">
                      <button type="button" aria-label={`Decrease ${item.name} quantity`} disabled={item.quantity <= 1} onClick={() => setQuantity(item.id, item.quantity - 1)}><Minus size={13} /></button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button type="button" aria-label={`Increase ${item.name} quantity`} disabled={item.quantity >= item.stock} onClick={() => setQuantity(item.id, item.quantity + 1)}><Plus size={13} /></button>
                    </div>
                  </div>
                  <button className="drawer-remove" type="button" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)}>Remove</button>
                </article>
              ))}
            </div>
            <div className="drawer-summary">
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p>Shipping and taxes are not calculated in this demo.</p>
              <Link className="button drawer-checkout" to="/cart" onClick={onClose}>View bag & checkout <ArrowRight size={16} /></Link>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
