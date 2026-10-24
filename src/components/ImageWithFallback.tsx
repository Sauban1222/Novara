import { useState } from 'react'
import './ImageWithFallback.css'

export default function ImageWithFallback({ src, alt, className = '', ...props }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed) {
    return (
    <div className={`image-fallback ${className}`} role="img" aria-label={`${alt} image unavailable`}>
      <span>NOVARA</span>
      <small>Image unavailable</small>
    </div>
    )
  }

  return (
    <img
      className={`${className}${loaded ? '' : ' image-loading'}`}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      onLoad={() => setLoaded(true)}
      {...props}
    />
  )
}
