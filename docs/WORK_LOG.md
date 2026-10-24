# Work and Decision Log

## 2026-10-24

### Work completed

- Re-scoped the application to the customer-facing Project 1 storefront and removed the server-backed catalogue and obsolete credential files.
- Retained React/Vite and local mock product data; removed backend-only scripts and dependencies.
- Restored bag persistence/normalization against local data and made storage recovery visible.
- Added checkout city/postal validation, accessible field feedback, simulated completion, and bag reset.
- Added focused Node tests and project requirement/implementation/validation documentation.
- Exercised the main storefront, bag, form, keyboard drawer, image-fallback, and responsive-width flows in the integrated browser; recorded results and remaining limits in [`TESTING.md`](./TESTING.md).

### Decisions

- **Local catalogue instead of a service:** The assignment is a frontend demonstration; a backend would add scope without supporting required customer-facing flows.
- **PKR mock prices:** Keep currency consistent in the interface; values are illustrative, not exchange-rate quotations.
- **Development-only error preview:** A query-controlled state demonstrates recovery UI without claiming local data caused a network failure.
- **No invented order/shipping promises:** The checkout confirms only client-side validation, clears local demo state, and explicitly excludes fulfilment and payment.

### Validation status

Automated and browser validation outcomes are maintained in [`TESTING.md`](./TESTING.md). Unit tests, the production build, and the recorded browser workflow passed.

### Follow-up — 2026-10-24

- Reduced every catalogue selling price into the requested Rs 4,000–6,000 range; displayed comparison prices for sale items were also brought into that range.
- Refined section spacing and editorial labels, hero hierarchy, navigation controls, category tile scale, and product-card image/hover treatment.
- Updated price-range tests and re-ran the suite and production build successfully.
- Rechecked responsive overflow at 320, 390, 768, 1024, and 1440 CSS px; no horizontal overflow was observed.

## Four-week workflow mapping

The assignment suggests a four-week process. This section is a repeatable mapping, not a claim that work was completed on historical dates.

1. **Week 1 — Research and scope:** Confirm stakeholder, user needs, requirements, acceptance checks, project setup, and design direction; record decisions in this log.
2. **Week 2 — Core implementation:** Build responsive reusable layout, local catalogue browsing, search/filter/sort, product details, and accessible design states.
3. **Week 3 — Shopping flows:** Complete bag persistence, checkout/newsletter validation, error recovery, and responsive/keyboard refinement.
4. **Week 4 — QA and handoff:** Run functional and edge-case checks, resolve defects, record evidence, document limitations, and prepare the demonstration.

For an internship submission, replace this suggested sequence with dated weekly notes as the work is actually carried out.
