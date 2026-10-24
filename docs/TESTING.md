# Testing and Validation Evidence

## Automated checks

Results below are recorded after executing the commands in this project workspace. Tests use Node's built-in test runner and no external test framework.

| Check | Command | Expected result | Actual result | Status |
|---|---|---|---|---|
| Product discovery and cart/checkout logic | `npm test` | All focused tests pass, including inclusive price bounds and the Rs 4,000–6,000 catalogue range | 8 tests passed, 0 failed | Pass |
| Production bundle | `npm run build` | Vite completes and writes `dist/` | Vite production build completed successfully | Pass |

The automated cases cover composed search/category/price filters, the inclusive Rs 4,000–6,000 product-price range, sale-price ordering, blank searches, invalid ranges, price/name sorting, cart data sanitization/duplicate merging/quantity caps, malformed cart shape, and invalid/valid checkout fields.

## Manual/browser review checklist

Do not mark a browser item complete until it has actually been exercised. Record environment constraints or untested items honestly.

| Area | Test steps | Expected result | Actual result |
|---|---|---|---|
| Navigation | Use category and section links; open/close mobile menu | Valid destinations; mobile menu closes after selection | Mobile menu opened; Escape closed it; category link applied the Clothing filter | Pass |
| Search and empty result | Search matching and unmatched phrases; clear search | Correct products/count; clear restores results | Clothing + “linen” produced one match; unmatched query showed the empty state; reset restored 14 products | Pass |
| Filters | Combine category, price boundaries, sale/new, and sort; enter invalid range; reset | Filters compose; invalid range does not show all products; reset restores catalogue | Price sort selection and invalid-range feedback/reset exercised in browser; exact range, ordering, and curated boundaries covered by unit tests | Pass |
| Product detail | Open a product and an invalid product ID | Matching details and add action; invalid ID recovers safely | Linen Shirt details/add flow worked; unknown ID displayed the recovery view | Pass |
| Bag | Add same item repeatedly; change quantity; remove; compare count and subtotal | Consistent quantities, line totals, and subtotal | Duplicate add merged; subtotal verified; quantity increased to the demo limit and decreased to one; removal showed the empty state | Pass |
| Persistence/recovery | Refresh with a bag; corrupt `novara-cart` in browser storage and reload | Valid bag persists; malformed data recovers with visible feedback | Two-item bag survived refresh; malformed JSON recovered with a user-visible reset message | Pass |
| Checkout | Submit blank, malformed email/postal, and valid values | Accessible errors focus first invalid field; success clears bag and disclaims real order/payment | Empty submission was rejected and focused the first invalid field; valid demo details displayed completion and cleared bag | Pass |
| Newsletter | Submit malformed and valid email | Error/success feedback; no email is transmitted | Invalid email was rejected; valid demo email displayed explicit no-send/no-store feedback | Pass |
| States | Preview no-result, empty bag, `?demoState=error#shop`, and image load/failure | Useful empty/error/success feedback and image fallback | No-result, empty bag, controlled error, action feedback, and forced image failure fallback all displayed | Pass |
| Keyboard/accessibility | Check mobile-menu Escape, drawer focus trap/restore, and invalid-field focus | Keyboard dismissal, contained dialog focus, restored focus, and error focus | Drawer focus trapped, Escape closed it, and focus returned to the bag button; invalid checkout focused its first field | Pass |
| Responsive | Inspect small phone, mobile, tablet, and desktop widths | No horizontal overflow at the tested widths | No document horizontal overflow at 320, 390, 768, 1024, or 1440 CSS px | Pass |
| Visual refinement | Review hero, collection tiles, and product cards after the style update | Clear editorial hierarchy, aligned product information, and consistent hover/focus treatment | Updated hero and product cards reviewed in the integrated browser; mobile cards remained two-column and readable | Pass |
| Text contrast | Calculate key text-token ratios against warm white | Normal text meets 4.5:1 | Muted `#6B6B6B`: 5.06:1; contrast-safe gold text `#785F2E`: 5.74:1 | Pass |

## Bugs fixed during this implementation

- Removed server/catalog dependencies and stale loading/error props from the frontend-only bag.
- Restored bag hydration from local data and added normalization/recovery for invalid persisted values.
- Corrected product detail to use the local catalogue.
- Added required checkout fields, field-specific validation, first-invalid focus, demo completion feedback, and bag clearing.
- Clarified that shipping/tax, product prices, and quantity limits are not real fulfilment or inventory data.
- Added focused unit tests for filter, cart normalization, and checkout validation behavior.

## Limitations and outstanding review

- The ARROWSTACK assignment PDF was not available in the workspace for a direct document-by-document review.
- Browser interaction checks were run in the integrated browser; no screen-reader, full-page automated accessibility audit, Lighthouse, or multi-device physical test result is claimed here.
- Remote image availability depends on external network access; inspect fallback states with network conditions or a controlled invalid URL if browser tooling is available.
- Browser checks used synthetic `example.test` form values; no personal customer data was included in this evidence. Browser screenshots were not saved into the repository.
