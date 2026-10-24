import { ArrowUpRight, Instagram, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="page-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link className="footer-wordmark" to="/" aria-label="NOVARA — Style That Moves You, home">
              <img src="/novara-logo-light.svg" alt="" width="220" height="48" />
            </Link>
            <p>Timeless essentials and contemporary pieces, thoughtfully chosen for a life in motion.</p>
            <a className="footer-social" href="mailto:hello@novara.example" aria-label="Email NOVARA"><Mail size={16} /></a>
          </div>
          <div className="footer-links">
            <div><h2>Explore</h2><Link to="/#shop">Shop all</Link><Link to="/#collections">Collections</Link><Link to="/#new-arrivals">New arrivals</Link><Link to="/?category=Clothing#shop">Clothing</Link><Link to="/?category=Shoes#shop">Shoes</Link><Link to="/?category=Bags#shop">Bags</Link><Link to="/?category=Accessories#shop">Accessories</Link></div>
            <div><h2>Information</h2><a href="mailto:hello@novara.example?subject=Customer%20care">Customer care <ArrowUpRight size={12} /></a><a href="mailto:hello@novara.example?subject=Shipping%20and%20returns">Shipping & returns <ArrowUpRight size={12} /></a><a href="mailto:hello@novara.example">Contact us <ArrowUpRight size={12} /></a></div>
            <div><h2>Follow along</h2><a className="footer-social" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Visit Instagram"><Instagram size={16} /> Instagram <ArrowUpRight size={12} /></a></div>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} NOVARA. All rights reserved.</span><span>Style that moves you.</span><details className="footer-demo-note"><summary>Demo & privacy</summary><p>Demo only: no orders, payments, or emails are sent. Your shopping bag is stored in this browser.</p></details></div>
      </div>
    </footer>
  )
}
