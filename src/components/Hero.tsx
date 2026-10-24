import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight } from 'lucide-react'
import ImageWithFallback from './ImageWithFallback'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <ImageWithFallback
        className="hero-image"
        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2200&q=90"
        alt="Model in an elegant neutral outfit in an architectural setting"
        fetchpriority="high"
      />
      <div className="hero-shade" />
      <div className="hero-content page-container">
        <p className="hero-kicker">A considered wardrobe, for everywhere</p>
        <h1>STYLE THAT<br /><em>MOVES YOU.</em></h1>
        <p className="hero-copy">Discover timeless essentials and contemporary pieces designed for your everyday style.</p>
        <div className="hero-actions">
          <Link to="/#shop" className="button button--light">Shop collection <ArrowRight size={16} /></Link>
          <Link to="/#new-arrivals" className="hero-text-link">Explore new arrivals</Link>
        </div>
      </div>
      <a className="hero-scroll" href="#collections"><span>Scroll to explore</span><ArrowDown size={15} /></a>
    </section>
  )
}
