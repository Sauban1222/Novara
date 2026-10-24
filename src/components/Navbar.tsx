import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import CartDrawer from './CartDrawer'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const closeCart = useCallback(() => setCartOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const submitSearch = (event) => {
    event.preventDefault()
    setMenuOpen(false)
    setSearchOpen(false)
    navigate(`/?q=${encodeURIComponent(search.trim())}#shop`)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <div className="navbar page-container">
          <button
            className="icon-button mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <Link className="wordmark" to="/" onClick={closeMenu} aria-label="NOVARA — Style That Moves You, home">
            <img src="/novara-logo.svg" alt="" width="220" height="48" />
          </Link>
          <nav id="primary-navigation" className={`primary-navigation${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/#shop" onClick={closeMenu}>Shop</Link>
            <Link to="/#collections" onClick={closeMenu}>Collections</Link>
            <Link to="/?category=Clothing#shop" onClick={closeMenu}>Clothing</Link>
            <Link to="/?category=Shoes#shop" onClick={closeMenu}>Shoes</Link>
            <Link to="/?category=Bags#shop" onClick={closeMenu}>Bags</Link>
            <Link to="/?category=Accessories#shop" onClick={closeMenu}>Accessories</Link>
            <Link to="/#about" onClick={closeMenu}>About</Link>
          </nav>
          <div className="navbar-actions">
            <button className="icon-button search-toggle" type="button" aria-label="Search products" aria-expanded={searchOpen} onClick={() => setSearchOpen((open) => !open)}>
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>
            <button className="icon-button bag-toggle" type="button" aria-label={`Open shopping bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={19} />
              <span className="bag-count" aria-hidden="true">{itemCount}</span>
            </button>
          </div>
        </div>
        {searchOpen && (
          <form className="nav-search page-container" role="search" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="nav-search">Search the collection</label>
            <Search size={17} aria-hidden="true" />
            <input id="nav-search" type="search" placeholder="Search the collection" value={search} onChange={(event) => setSearch(event.target.value)} autoFocus />
            <button className="nav-search-submit" type="submit">Search</button>
          </form>
        )}
      </header>
      <CartDrawer open={cartOpen} onClose={closeCart} />
    </>
  )
}
