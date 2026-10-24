import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ImageWithFallback from './ImageWithFallback'
import './PromoBanner.css'

export default function PromoBanner() {
  return (
    <section className="promo-banner">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=85"
        alt="Fashion editorial portrait in a minimal studio"
        loading="lazy"
      />
      <div className="promo-shade" />
      <div className="promo-copy page-container">
        <p className="eyebrow">Designed to be lived in</p>
        <h2>YOUR STYLE.<br />YOUR STATEMENT.</h2>
        <p>Personal style is never one-size-fits-all. Find the pieces that feel like you.</p>
        <Link className="button button--light" to="/#shop">Explore the collection <ArrowRight size={16} /></Link>
      </div>
    </section>
  )
}
