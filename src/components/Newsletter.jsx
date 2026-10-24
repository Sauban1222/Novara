import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import './Newsletter.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const normalized = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setStatus('Enter a valid email address to continue.')
      return
    }
    setStatus('Thank you for your interest. This demo does not send or store your email address.')
    setEmail('')
  }

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-title">
      <div className="newsletter-inner page-container">
        <div><p className="eyebrow">Notes from NOVARA</p><h2 id="newsletter-title">A little inspiration,<br />delivered thoughtfully.</h2><p>New collections, considered stories, and occasional notes from the studio.</p></div>
        <form className="newsletter-form" onSubmit={submit} noValidate>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <div className="newsletter-input"><input id="newsletter-email" type="email" autoComplete="email" placeholder="Your email address" value={email} onChange={(event) => { setEmail(event.target.value); setStatus('') }} aria-describedby="newsletter-message" aria-invalid={status && !status.startsWith('Thank you') ? 'true' : undefined} /><button type="submit" aria-label="Subscribe to NOVARA updates"><ArrowRight size={18} /></button></div>
          <p id="newsletter-message" className={`newsletter-status${status.startsWith('Thank you') ? ' is-success' : status ? ' is-error' : ''}`} role="status">{status || 'By subscribing, you agree to receive occasional updates. Demo only; no email is sent.'}</p>
        </form>
      </div>
    </section>
  )
}
