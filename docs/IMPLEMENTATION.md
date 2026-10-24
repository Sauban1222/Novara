# NOVARA Implementation Notes

## Architecture

The app uses React 18, Vite, React Router, JavaScript/JSX, and CSS. `src/main.jsx` mounts the shared cart provider; `src/App.jsx` provides the announcement, navigation, route outlet, and footer. Home, product detail, and bag/checkout are route-level pages. Presentational components are shared for product cards, grids, category discovery, filters, newsletter, image fallback, and the bag drawer.

The project intentionally uses the working Vite setup rather than migrating frameworks or introducing a backend. Product data is imported from `src/data/products.js`. The sample catalogue is synchronous local data, so the app does not fake a remote product loading delay or network failure.

## Product data and discovery

Each product has an ID, name, category, PKR mock price, optional original price for a sale display, image URL, description, new-arrival flag, and demo-only quantity limit. Cards and detail pages render from these records. `src/utils/storefront.js` applies trimmed case-insensitive search, category, valid inclusive minimum/maximum prices, new/sale selection, and sorting to one result list. An invalid price range returns no results; the page explains the invalid range and offers reset controls.

The controlled development-only `?demoState=error` query previews the collection error UI without pretending the local catalogue failed.

## Bag state and persistence

`CartProvider` resolves product IDs against the current local catalogue, stores quantities rather than copied product records, and derives displayed item details, count, and subtotal. `src/utils/cart.js` normalizes persisted entries: unknown products, invalid quantities, zero-availability demo items, and over-limit quantities are removed or clamped. JSON/storage read failures recover to an empty bag with a visible message. The bag is written to `novara-cart` in LocalStorage; write failures remain visible in the UI.

Adding a product validates quantity and demo availability. Duplicate adds merge, quantity cannot fall below one, and cart controls prevent exceeding the local demo limit. These limits demonstrate edge handling and are not inventory claims.

## Forms and error handling

`src/utils/checkout.js` provides field-specific client-side validation for required name, email, address, city, and a bounded postal code. Errors are tied to inputs with `aria-describedby`; submission focuses the first invalid field. A valid submission clears the browser bag and displays a demo completion screen. No card data, order, email, or backend request is involved.

The newsletter validates email format and displays local feedback only. It does not store or send the address. Unexpected remote image failures use a branded fallback; a loading class appears while images load. Product filtering has an empty state, bag has an empty state, and the controlled development query previews a collection error.

## Accessibility and responsive design

The interface uses semantic headings, landmarks, links, buttons, native labels, and status/error messaging. The cart drawer uses dialog semantics, initial focus, a focus trap, Escape dismissal, focus restoration, and background scroll locking. Icon-only controls have accessible names. Global styles provide `:focus-visible` indicators and respect reduced-motion preferences. Product imagery is rendered with a stable visual area and lazy loading where appropriate. CSS breakpoints adapt navigation, cards, filters, and checkout layouts.

## Currency and visual decisions

All demo prices are displayed in Pakistani rupees (PKR) using the shared `formatPrice` utility. Values are illustrative sample prices rather than a live or exchange-rate-backed catalogue. Muted gold remains the decorative accent; gold-colored text and focus indicators use a darker contrast-safe shade, while secondary text uses a slightly darker gray for readable contrast. Product photography and generous spacing support the editorial fashion direction.

## Known limitations

- No server, real payment, order, customer-account, inventory, shipping/tax, or mailing-list integrations.
- Remote Unsplash imagery requires connectivity; fallback treatment is local.
- Product data and quantity limits are local demonstration content.
- Browser automation, assistive technology, and external performance measurement should be performed and recorded when the corresponding tools/environment are available.
