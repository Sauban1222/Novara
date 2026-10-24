# NOVARA — Style That Moves You.

**Project 1: Accessible E-Commerce Storefront**  
ARROWSTACK Frontend Development Internship

NOVARA is a responsive, editorial-style fashion storefront prototype. Shoppers can discover a local sample catalogue, inspect product details, manage a persistent demo bag, and validate a simulated checkout. It does not process payments, create real orders, transmit customer data, or subscribe email addresses.

## Features

- Responsive navigation, mobile menu, category discovery, editorial hero, and image fallbacks.
- Product search, category and curated collection filters, PKR price bounds, sorting, and reset.
- Product detail pages with graceful invalid-product handling.
- Bag quantities, removal, subtotal, LocalStorage persistence, and recovery from invalid stored data.
- Client-side newsletter and checkout validation with accessible feedback.
- Focus-managed, keyboard-operable bag drawer, visible focus states, reduced-motion support, and semantic form labels.
- Loading placeholders for remote imagery, empty product/bag states, a controlled development error preview, and action success messages.

## Technology

- React 18 with JavaScript/JSX
- Vite 6
- React Router
- Lucide React
- CSS
- Node.js built-in test runner

Vite and plain JavaScript/CSS were retained from the existing project. This avoids an unnecessary framework migration while keeping the component system and project simple to run. Products are local mock data; the bag is persisted in browser LocalStorage.

## Getting started

Install Node.js 20 or later, then run:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Demo guide

1. Browse the collection or choose a category.
2. Combine a text search, price range, curated filter, and sort order; use **Clear filters** to reset.
3. Open a product, add it to the bag, and adjust quantity or remove it.
4. Refresh the page to confirm the demo bag persists.
5. Open the bag page and submit incomplete/invalid details to see accessible validation. Submit valid details to see the simulation confirmation and cleared bag.
6. Use the newsletter form with invalid and valid email values; no email is sent.
7. In development, append `?demoState=error#shop` to the home URL to preview the controlled collection error state. This preview is not a network error.

## Production build and tests

```sh
npm test
npm run build
npm run preview
```

`npm test` runs focused tests for composed product filters, sorting, cart-data recovery, and checkout validation. The preview command serves the previously built `dist/` output.

## Project structure

```text
src/
├── components/       Shared navigation, product, category, form, and layout components
├── data/products.js  Local sample products and category imagery
├── hooks/            Shopping-bag context and hook
├── pages/            Home, product detail, and bag/checkout pages
└── utils/            Cart normalization, filtering, checkout validation, and currency formatting
tests/                Node built-in unit tests
docs/                 Requirements, implementation, validation, work log, and demo outline
```

## Scope and limitations

- Prices and product catalogue details are illustrative mock data shown in Pakistani rupees (PKR); they are not live offers, verified inventory, or price quotes.
- Product availability is only a local demo constraint used for bag quantity controls.
- The project has no backend, customer accounts, order processing, payment gateway, real inventory, or mailing-list integration.
- Checkout validates data only in the browser, clears the local demo bag after successful validation, and does not retain or transmit the submitted details.
- Product and editorial photos load from Unsplash, so image display requires network access. A branded fallback is shown if an image fails.
- No real business contact details are included.
- The assignment PDF was not present in the workspace. Documentation maps the implementation to the requirements supplied in the project brief.
- Automated unit tests and the production build are provided. Browser/accessibility checks must be read alongside their recorded status in [`docs/TESTING.md`](./docs/TESTING.md).

## Documentation

- [Requirements and acceptance criteria](./docs/PROJECT_REQUIREMENTS.md)
- [Architecture and implementation decisions](./docs/IMPLEMENTATION.md)
- [Test cases and validation evidence](./docs/TESTING.md)
- [Dated work and decision log](./docs/WORK_LOG.md)
- [Presentation/demo outline](./docs/DEMO.md)
