import { ArrowUpRight } from 'lucide-react'
import { categories, categoryImages } from '../data/products.js'
import ImageWithFallback from './ImageWithFallback.jsx'
import './CategorySection.css'

export default function CategorySection({ activeCategory, onSelectCategory }) {
  return (
    <section className="category-section section" id="collections">
      <div className="page-container">
        <div className="category-heading">
          <div><p className="eyebrow">The edit</p><h2 className="section-title">Find your point of view</h2></div>
          <p className="category-intro">Thoughtful pieces, made to move with you. Explore the collections.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <button
              className={`category-card${activeCategory === category ? ' is-selected' : ''}`}
              type="button"
              key={category}
              aria-pressed={activeCategory === category}
              onClick={() => onSelectCategory(category)}
            >
              <ImageWithFallback src={categoryImages[category]} alt={`${category} collection`} loading="lazy" />
              <span className="category-overlay" />
              <span className="category-card-copy"><span className="category-number">0{index + 1}</span><strong>{category}</strong><span className="category-link">Explore <ArrowUpRight size={15} /></span></span>
            </button>
          ))}
        </div>
        {activeCategory && (
          <button className="category-clear" type="button" onClick={() => onSelectCategory('')}>Clear {activeCategory} selection</button>
        )}
      </div>
    </section>
  )
}
