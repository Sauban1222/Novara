import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { products } from '../data/products.js'
import { normalizeCart } from '../utils/cart.js'

const CartContext = createContext(null)
const STORAGE_KEY = 'novara-cart'

function readCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return { items: [], message: '' }
    return normalizeCart(JSON.parse(saved))
  } catch {
    return { items: [], message: 'Your saved bag could not be read and has been reset.' }
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart)
  const itemsRef = useRef(cart.items)
  const { items, message } = cart

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      setCart((current) => ({ ...current, message: 'Your bag could not be saved in this browser.' }))
    }
  }, [items])

  const updateCart = useCallback((nextItems, nextMessage) => {
    itemsRef.current = nextItems
    setCart({ items: nextItems, message: nextMessage })
  }, [])

  const addItem = useCallback((product, quantity = 1) => {
    const currentProduct = products.find((entry) => entry.id === product?.id)
    if (!currentProduct || currentProduct.stock < 1) {
      setCart((current) => ({ ...current, message: 'This item is unavailable in the demo catalogue.' }))
      return false
    }
    const requestedQuantity = Number(quantity)
    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
      setCart((current) => ({ ...current, message: 'Choose a valid quantity.' }))
      return false
    }
    const currentItems = itemsRef.current
    const existing = currentItems.find((item) => item.id === currentProduct.id)
    if ((existing?.quantity || 0) + requestedQuantity > currentProduct.stock) {
      setCart((current) => ({ ...current, message: `Only ${currentProduct.stock} demo item${currentProduct.stock === 1 ? '' : 's'} available. Your bag was not changed.` }))
      return false
    }
    const nextItems = existing
      ? currentItems.map((item) => item.id === currentProduct.id ? { ...item, quantity: item.quantity + requestedQuantity } : item)
      : [...currentItems, { id: currentProduct.id, quantity: requestedQuantity }]
    updateCart(nextItems, `${currentProduct.name} added to your bag.`)
    return true
  }, [updateCart])

  const setQuantity = useCallback((id, quantity) => {
    const product = products.find((entry) => entry.id === id)
    if (!product) return
    if (!Number.isInteger(quantity) || quantity < 1) {
      setCart((current) => ({ ...current, message: 'Bag quantity must be at least one.' }))
      return
    }
    const next = Math.min(product.stock, quantity)
    const nextItems = itemsRef.current.flatMap((item) => {
      if (item.id !== id) return [item]
      return next > 0 ? [{ ...item, quantity: next }] : []
    })
    updateCart(nextItems, `${product.name} quantity updated.`)
  }, [updateCart])

  const removeItem = useCallback((id) => {
    const product = products.find((entry) => entry.id === id)
    updateCart(itemsRef.current.filter((item) => item.id !== id), product ? `${product.name} removed from your bag.` : 'Item removed from your bag.')
  }, [updateCart])

  const clearCart = useCallback(() => updateCart([], ''), [updateCart])

  const detailedItems = useMemo(() => items.map((item) => ({
    ...products.find((product) => product.id === item.id),
    quantity: item.quantity,
  })).filter((item) => item.id), [items])
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const subtotal = useMemo(
    () => detailedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [detailedItems],
  )

  const value = useMemo(() => ({
    items: detailedItems,
    itemCount,
    subtotal,
    message,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  }), [detailedItems, itemCount, subtotal, message, addItem, setQuantity, removeItem, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider.')
  return context
}
