import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CircleCheck, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
import { validateCheckoutForm } from '../utils/checkout'
import type { CheckoutErrors, CheckoutForm } from '../utils/checkout'
import ImageWithFallback from '../components/ImageWithFallback'
import './Cart.css'

const initialForm: CheckoutForm = { fullName: '', email: '', address: '', city: '', postalCode: '' }

export default function Cart() {
  const { items, subtotal, setQuantity, removeItem, clearCart, message } = useCart()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<CheckoutErrors>({})
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  const submitting = useRef(false)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setErrors((current) => ({ ...current, [event.target.name]: '' }))
  }

  const submitCheckout = (event) => {
    event.preventDefault()
    if (submitting.current || items.length === 0) return
    submitting.current = true
    const nextErrors = validateCheckoutForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      submitting.current = false
      const firstInvalid = document.getElementById(`${Object.keys(nextErrors)[0]}-field`)
      window.requestAnimationFrame(() => firstInvalid?.focus())
      return
    }
    clearCart()
    setCheckoutComplete(true)
    submitting.current = false
  }

  if (checkoutComplete) {
    return (
      <section className="empty-cart page-container checkout-complete">
        <CircleCheck className="checkout-complete-icon" size={42} aria-hidden="true" />
        <p className="eyebrow">Demo checkout complete</p>
        <h1 className="section-title">Thank you for exploring NOVARA.</h1>
        <p>Your details passed validation and your demo bag has been cleared. No order was created, and no payment or email was processed.</p>
        <Link to="/#shop" className="button">Continue shopping</Link>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="empty-cart page-container">
        <div className="empty-cart-mark"><span>0</span></div>
        <p className="eyebrow">Your bag</p>
        <h1 className="section-title">A little room for something lovely.</h1>
        <p role={message ? 'status' : undefined}>{message || 'Your bag is currently empty. Take a look at the collection and find a piece that feels like you.'}</p>
        <Link to="/#shop" className="button">Continue shopping</Link>
      </section>
    )
  }

  return (
    <section className="cart-page page-container">
      <Link className="back-link" to="/#shop"><ArrowLeft size={15} /> Continue shopping</Link>
      <div className="cart-title-row"><div><p className="eyebrow">Your selection</p><h1 className="section-title">Shopping bag</h1></div><span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span></div>
      <div className="cart-layout">
        <div className="cart-lines">
          <div className="cart-table-heading"><span>Product</span><span>Quantity</span><span>Total</span></div>
          {items.map((item) => (
            <article className="cart-line" key={item.id}>
              <ImageWithFallback src={item.image} alt={item.name} loading="lazy" />
              <div className="cart-line-product"><Link to={`/product/${item.id}`}>{item.name}</Link><span>{item.category}</span><span>{formatPrice(item.price)}</span><button className="cart-remove mobile-remove" type="button" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)}><Trash2 size={13} /> Remove</button></div>
              <div className="quantity-control">
                <button type="button" aria-label={`Decrease ${item.name} quantity`} disabled={item.quantity <= 1} onClick={() => setQuantity(item.id, item.quantity - 1)}><Minus size={13} /></button>
                <span aria-live="polite">{item.quantity}</span>
                <button type="button" aria-label={`Increase ${item.name} quantity`} disabled={item.quantity >= item.stock} onClick={() => setQuantity(item.id, item.quantity + 1)}><Plus size={13} /></button>
              </div>
              <strong className="cart-line-total">{formatPrice(item.price * item.quantity)}</strong>
              <button className="cart-remove desktop-remove" type="button" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)}><Trash2 size={14} /></button>
            </article>
          ))}
          <p className="cart-feedback" role="status">{message}</p>
        </div>
        <aside className="checkout-panel">
          <h2>Order summary</h2>
          <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
          <div className="summary-row"><span>Shipping</span><span>Not calculated in this demo</span></div>
          <div className="summary-row summary-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
          <p className="checkout-disclaimer">Frontend demonstration only. No payment is taken and no order is created.</p>
          {Object.keys(errors).length > 0 && <p className="field-error checkout-error-summary" role="alert">Please correct the highlighted fields before continuing.</p>}
          <form className="checkout-form" onSubmit={submitCheckout} noValidate>
            <h3>Checkout details</h3>
            <p className="checkout-required">Fields marked * are required.</p>
            <div className="checkout-field">
              <label htmlFor="fullName-field">Full name *</label>
              <input id="fullName-field" name="fullName" type="text" autoComplete="name" required value={form.fullName} onChange={updateField} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'full-name-error' : undefined} />
              {errors.fullName && <span className="field-error" id="full-name-error">{errors.fullName}</span>}
            </div>
            <div className="checkout-field">
              <label htmlFor="email-field">Email address *</label>
              <input id="email-field" name="email" type="email" autoComplete="email" required value={form.email} onChange={updateField} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'checkout-email-error' : undefined} />
              {errors.email && <span className="field-error" id="checkout-email-error">{errors.email}</span>}
            </div>
            <div className="checkout-field">
              <label htmlFor="address-field">Delivery address *</label>
              <textarea id="address-field" name="address" autoComplete="street-address" rows={2} required value={form.address} onChange={updateField} aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? 'checkout-address-error' : undefined} />
              {errors.address && <span className="field-error" id="checkout-address-error">{errors.address}</span>}
            </div>
            <div className="checkout-field">
              <label htmlFor="city-field">City *</label>
              <input id="city-field" name="city" type="text" autoComplete="address-level2" required value={form.city} onChange={updateField} aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'checkout-city-error' : undefined} />
              {errors.city && <span className="field-error" id="checkout-city-error">{errors.city}</span>}
            </div>
            <div className="checkout-field">
              <label htmlFor="postalCode-field">Postal code *</label>
              <input id="postalCode-field" name="postalCode" type="text" autoComplete="postal-code" required value={form.postalCode} onChange={updateField} aria-invalid={Boolean(errors.postalCode)} aria-describedby={errors.postalCode ? 'checkout-postal-error' : undefined} />
              {errors.postalCode && <span className="field-error" id="checkout-postal-error">{errors.postalCode}</span>}
            </div>
            <button className="button checkout-submit" type="submit">Complete demo checkout</button>
          </form>
        </aside>
      </div>
    </section>
  )
}
