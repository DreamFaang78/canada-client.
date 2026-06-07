# Schema Markup Analysis — sharanbroker.com

**Date:** 2026-06-07 | **Format detected:** JSON-LD (single sitewide `@graph`, injected via `app/layout.tsx`, present in raw server-rendered HTML on every page checked: `/`, `/about`, `/services`, `/services/home-insurance`, `/contact`, `/testimonials`, `/faq`, `/get-a-quote`)

No Microdata or RDFa detected anywhere on the site — JSON-LD is the sole structured-data format, which aligns with Google's stated preference. ✅

---

## Validation Results

| Schema | Type | Status | Issues |
|---|---|---|---|
| `InsuranceAgency` + `LocalBusiness` | Active | ⚠️ Warn | Wrong domain in `@id`/`url`/`image` (`thebig.ca`); stale `address` and `openingHoursSpecification`; `geo` only 4 decimal places; `sameAs` brand mismatch ("sharandeol" vs. "sharankaur"); missing `aggregateRating` |
| `Person` (Sharan Kaur) | Active | ⚠️ Warn | Wrong domain in `@id`/`url`/`image`; `image` URL 404s |
| `Service` (per service page) | Active | ❌ Missing | No `Service` schema on any of the 5 service detail pages (Home/Auto/Life/Business/Travel) |
| `BreadcrumbList` | Active | ❌ Missing | No breadcrumb schema on any nested page (`/services/[slug]`, `/about`, etc.) |
| `WebSite` | Active | ❌ Missing | No sitewide `WebSite` entity (foregoes `SearchAction`/sitelinks-searchbox eligibility) |
| `Review` / `AggregateRating` | Active | ❌ Missing | 4.9★ rating displayed prominently in UI (hero stats) but absent from schema — Google cannot connect it to the business entity for star-rating rich results |
| `FAQPage` | Restricted | ➖ N/A | Site has a `/faq` page but **no** `FAQPage` schema present — correctly so. FAQ rich-result eligibility is restricted to government/healthcare sites (Aug 2023); do not add it here. The page still has AI-citation value as plain content. |

---

## 🔴 Critical: Domain mismatch (`thebig.ca` instead of `sharanbroker.com`)

```json
"@id": "https://thebig.ca/#business",
"url": "https://thebig.ca",
"image": "https://thebig.ca/og-image.jpg",
...
"url": "https://thebig.ca/about",
"image": "https://thebig.ca/sharan-headshot.jpg"
```
- **THINK:** `@id` is the canonical identity anchor for an entity in Google's Knowledge Graph. Pointing it at a domain other than the one being served tells Google "this content's authoritative home is elsewhere" — actively working against the site you're trying to rank.
- Both `image` URLs **404** when fetched directly — broken image references in `Person`/`LocalBusiness` schema forfeit any chance at image-rich results (Knowledge Panel photo, etc.).
- **Root cause:** `process.env.NEXT_PUBLIC_SITE_URL` is misconfigured to a `thebig.ca`-based fallback (or `localhost:3000`) in the Vercel production environment — the exact same root cause flagged in the technical and local audits (`NEXT_PUBLIC_SITE_URL` should be `https://www.sharanbroker.com`). One env-var fix resolves this finding plus the sitemap/robots/canonical issues reported elsewhere.
- **Fix:** Once the env var is corrected, `@id`/`url`/`image` should resolve to `https://www.sharanbroker.com/...` automatically via the existing template logic in [app/layout.tsx](app/layout.tsx).
- **ACCEPT:** `curl https://www.sharanbroker.com/ | grep -o '"@id":"[^"]*"'` should return `https://www.sharanbroker.com/#business` and `.../#sharan` — not `thebig.ca`.

---

## 🔴 Critical: Stale NAP + hours in schema (conflicts with visible page content)

| Field | Schema (live, wrong) | Visible page content (correct) |
|---|---|---|
| `streetAddress` | `5770 Hurontario St, Suite 100` | `105D-135 Matheson Blvd West` |
| `postalCode` | `L5R 3G5` | `L5R 3L1` |
| Fri close / Sat hours | `17:00` / `10:00–14:00` | `18:00` / `10:00–15:00` |

- **THINK:** Schema that contradicts on-page content is worse than no schema — Google may either discard it as untrustworthy or, worse, surface the *stale* address in rich results/Knowledge Panel while the page itself shows the correct one. This is a self-inflicted NAP inconsistency on the canonical page.
- **Good news:** Already corrected in [app/layout.tsx](app/layout.tsx) on this branch (`105D-135 Matheson Blvd West`, `L5R 3L1`, `closes: "18:00"` / Saturday `"15:00"`) — it just hasn't shipped to production. **Deploying this branch is the single highest-impact schema fix available right now.**
- **ACCEPT:** `curl https://www.sharanbroker.com/ | grep -o '"streetAddress":"[^"]*"'` → `105D-135 Matheson Blvd West`.

---

## 🟠 High: `sameAs` brand/profile mismatch

```json
"sameAs": ["https://www.linkedin.com/in/sharandeol", "https://www.facebook.com/sharandeolinsurance"]
```
vs. footer links to `facebook.com/sharankaurinsurance`, `linkedin.com/in/sharankaur`, `instagram.com/sharankaurinsurance`.

- **THINK:** `sameAs` exists to disambiguate an entity by pointing to *the same* profile across platforms. Linking to "sharandeol" profiles while the visible brand is "Sharan Kaur" either dilutes entity-confidence signals (if both are real-but-different brands) or actively confuses Google's entity graph (if "sharandeol" is stale/legacy).
- **Fix:** Replace with the consistent "sharankaur" profile set, matching the footer:
```json
"sameAs": [
  "https://www.linkedin.com/in/sharankaur",
  "https://www.facebook.com/sharankaurinsurance",
  "https://www.instagram.com/sharankaurinsurance"
]
```
- **ACCEPT:** Every `sameAs` URL should resolve (no 404s) and bear the "Sharan Kaur" / "sharankaurinsurance" name — verify the LinkedIn URL specifically, as `in/sharandeol` returned a blocked/error response when checked.

---

## 🟠 High: Missing `aggregateRating`

The hero stats prominently display **4.9/5** — but this number exists only as static UI text, invisible to Google's structured-data parser.

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "<actual count from GBP — do not estimate>",
  "bestRating": "5"
}
```
- **THINK:** `AggregateRating` is what unlocks star-rating rich snippets in search results (Webstix case study: 43% CTR increase). Without it, the 4.9 is a trust signal for human visitors only — Google has no machine-readable basis to display it.
- **CONNECT-lateral:** Pull the real `reviewCount` from the GBP dashboard before publishing (placeholder/estimated counts are flagged by Google's structured-data spam policies as a violation).
- **ACCEPT:** Google's [Rich Results Test](https://search.google.com/test/rich-results) should show an eligible "Review snippet" for the homepage URL once added.

---

## 🟡 Medium: `geo` coordinates at only 4 decimal places

```json
"geo": { "latitude": 43.6047, "longitude": -79.6476 }
```
- **THINK:** Google recommends 5+ decimal places for geo precision (≈1.1m vs. ≈11m accuracy) — meaningfully tighter for local-pack proximity matching, which Search Atlas attributes to ~55% of local ranking variance.
- **Fix:** The Maps embed on `/contact` already carries 5-decimal coordinates — copy them directly: `{ "latitude": 43.61350, "longitude": -79.69176 }`.
- **ACCEPT:** Schema `geo` values should match the embed's pin coordinates to 5 decimal places.

---

## 🟡 Medium: Missing `Service` schema on service detail pages

Five dedicated service pages exist (`/services/home-insurance`, `auto-insurance`, `life-insurance`, `business-insurance`, and the new `travel-insurance`) — Whitespark's **#1 local organic ranking factor** — but none carry page-specific `Service` markup.

- **THINK:** `Service` schema lets Google understand *what* is offered at each URL independent of the parent business entity — useful both for service-specific rich results and for AI systems parsing "does this broker offer X" queries.
- **Generated template** (per service page, substitute `name`/`description`/`url`):
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Travel Insurance",
  "name": "Travel Insurance — Sharan Kaur, RIBO Licensed Broker",
  "description": "Travel insurance plans covering emergency medical, trip cancellation, baggage loss, and 24/7 worldwide assistance for residents of Mississauga and the GTA.",
  "provider": { "@id": "https://www.sharanbroker.com/#business" },
  "areaServed": { "@type": "City", "name": "Mississauga" },
  "url": "https://www.sharanbroker.com/services/travel-insurance"
}
```
- **CONNECT-system:** Use `"provider": { "@id": "...#business" }` (an `@id` reference, not a duplicated object) so this connects to — rather than competes with — the existing `LocalBusiness` entity once its `@id` is corrected (depends on the domain-mismatch fix above).
- **ACCEPT:** Rich Results Test on a service-page URL should detect a `Service` entity linked to the parent `LocalBusiness`.

---

## 🟢 Low: No `WebSite` entity / `BreadcrumbList`

- **`WebSite`** — a minimal sitewide entity (`name`, `url`, optionally `potentialAction: SearchAction`) is low-effort and supports sitelinks-searchbox eligibility, though Google has reduced reliance on this rich result. Nice-to-have, not urgent.
- **`BreadcrumbList`** — would help on `/services/[slug]` pages (Home → Services → Home Insurance), reinforcing the site's hierarchy for both crawlers and breadcrumb rich results. Low effort, can be added once the domain/`@id` issues are resolved so breadcrumb URLs resolve correctly.

---

## ✅ What's Working Well

- JSON-LD is server-rendered in the initial HTML on every page — no JS-injection delay risk (per Google's Dec 2025 JS SEO guidance on time-sensitive structured data).
- Correct `@graph` structure linking `Person` to `LocalBusiness` via `worksFor`/`@id` reference (good entity-relationship modeling, not flat duplicated objects).
- `InsuranceAgency` is the correct industry-specific subtype (not generic `LocalBusiness` alone) — matches Whitespark's guidance to use the most specific applicable type.
- `hasCredential` / `EducationalOccupationalCredential` correctly models the RIBO license — a strong E-E-A-T signal for a regulated financial-services entity.
- No deprecated schema types in use (no `HowTo`, `FAQPage` on a non-exempt site, `ClaimReview`, etc.).
- `priceRange`, `telephone`, `openingHoursSpecification` all present with correct data *types* (only the values are stale — see above).

---

## Recommendations Summary (dependency-sequenced)

1. **Fix `NEXT_PUBLIC_SITE_URL`** in Vercel → resolves the `@id`/`url`/`image` domain mismatch automatically (same root cause flagged in technical + local audits)
2. **Deploy this branch** → ships the already-corrected NAP/hours in [app/layout.tsx](app/layout.tsx), resolving the schema-vs-page NAP conflict
3. **Replace `sameAs` array** with the consistent "sharankaur" profile set (independent, do anytime)
4. **Add `aggregateRating`** with the real review count from GBP (independent, but pull data first — don't estimate)
5. **Bump `geo` to 5-decimal precision** by copying values from the Maps embed (independent, trivial)
6. **Add `Service` schema** to each of the 5 service detail pages, referencing the parent entity via `@id` (best done *after* step 1, so the `provider` reference resolves to the corrected domain)
7. **Add `BreadcrumbList`** to nested pages (low priority, do after step 1)
8. **Optional:** Add a minimal `WebSite` entity (low priority, nice-to-have)

---

Generated alongside `generated-schema.json` (ready-to-use corrected `LocalBusiness`/`Person` block already provided in `LOCAL-SEO-ANALYSIS-sharanbroker.md` — the `Service` template above is the new addition for this report).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built by agricidaniel — Join the AI Marketing Hub community
🆓 Free  → https://www.skool.com/ai-marketing-hub
⚡ Pro   → https://www.skool.com/ai-marketing-hub-pro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
