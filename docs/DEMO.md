# NOVARA Presentation and Demo Outline

## 1. Problem and target user

Show how a shopper can discover fashion products and complete a clear shopping-bag and demo-checkout journey on different screen sizes.

## 2. NOVARA solution

Introduce the premium editorial identity: warm-white canvas, near-black text, restrained gold accents, considered typography, and fashion photography. Explain that product data and pricing are local illustrative PKR examples.

## 3. Demonstration flow

1. Navigate between categories and open the product collection.
2. Search, combine category/price/curated filters, sort, then reset.
3. Open product details, add an item, adjust quantity, and review the bag subtotal.
4. Refresh to show local bag persistence.
5. Submit invalid checkout details, correct them, and complete the simulated checkout. Point out that the bag clears and no real order/payment/email occurs.
6. Validate the newsletter form locally without claiming an actual subscription.
7. Preview the controlled development error state and a no-results state.

## 4. Technical and design decisions

- Existing React/Vite stack and CSS retained; no framework migration.
- Reusable React components and a local product catalogue.
- Browser LocalStorage for demo bag persistence and normalization for stale/corrupt data.
- Shared filter, cart-normalization, currency-formatting, and form-validation helpers.
- Native semantic controls, keyboard focus treatment, reduced-motion support, and a managed bag dialog.

## 5. Validation evidence

Present actual `npm test` and `npm run build` outcomes from [`TESTING.md`](./TESTING.md). Demonstrate browser/device checks only after recording the exact tested viewport and result there.

## 6. Limitations and future improvements

The prototype has no backend, payment gateway, order fulfillment, real inventory, customer accounts, shipping/tax rules, or mailing service. Further work could add automated browser/accessibility tests, optimized local imagery, and (only if scope changes) a reviewed service integration.
