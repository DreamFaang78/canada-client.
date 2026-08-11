# Local SEO Analysis — sharanbroker.com

**Business type:** Hybrid (physical office address + GTA service-area language)
**Industry vertical:** Insurance Brokerage (generic `LocalBusiness` + `InsuranceAgency`)
**Date:** 2026-06-07

## Local SEO Score: 52/100

| Dimension | Score | Weight | Notes |
|---|---|---|---|
| GBP Signals | 45/100 | 25% | Map embed present; no visible GBP review widget/posts/photos integration |
| Reviews & Reputation | 40/100 | 20% | 4.9 rating displayed in UI but **not** in schema; review count not surfaced |
| Local On-Page SEO | 60/100 | 20% | NAP visible, dedicated service pages exist, but missing H1 on /contact and city not in most titles |
| NAP Consistency & Citations | 45/100 | 15% | Address/phone consistent on-page, but **JSON-LD NAP is stale** (old address) and conflicts with visible content |
| Local Schema Markup | 55/100 | 10% | LocalBusiness present with geo + hours, but wrong domain entity (`thebig.ca`), missing `aggregateRating` |
| Local Link & Authority | 60/100 | 10% | Facebook/Instagram/LinkedIn present; no Chamber/BBB/press signals detected |

---

## 1. GBP Optimization Checklist

| Signal | Status |
|---|---|
| Embedded Google Map on contact page | ✅ Present, correctly pinned to 135 Matheson Blvd W |
| Click-to-call (`tel:`) link | ✅ `tel:+16475018013` present in header, footer, mobile menu |
| Business hours visible on page | ✅ Shown in [LocationContact.tsx](app/sections/LocationContact.tsx) (Mon-Fri 9-6, Sat 10-3, Sun by appt) |
| GBP review widget / live review feed | ❌ Not detected — testimonials are static fallback content, not pulled from GBP |
| GBP posts / photos integration | ❌ Not detected |
| Q&A → FAQ migration (GBP Q&A deprecated Dec 2025) | ⚠️ Site has a `/faq` page — verify it answers the same questions GBP Q&A used to |
| Google Verified badge eligibility | Unknown — verify in GBP dashboard |

**Recommendation:** Confirm the GBP primary category is **"Insurance Broker"** (not "Insurance Agency" or "Insurance Company" — Whitespark's #1 negative ranking factor is an incorrect primary category). Add 4 relevant secondary categories (e.g., Auto Insurance Agency, Home Insurance Agency, Life Insurance Agency, Travel Insurance Agency — the last now justified by your new Travel Insurance service page).

---

## 2. Review Health Snapshot

- **Displayed rating:** 4.9/5 (shown prominently in hero stats — good trust signal)
- **Review count:** Not surfaced anywhere on-page or in schema — a missed opportunity. Whitespark calls 10 reviews the "magic threshold," and 68% of consumers only consider businesses rated 4+ stars *with visible review volume*.
- **`aggregateRating` schema:** **Missing.** The 4.9 rating exists only as static UI text — Google cannot connect it to the business entity for star-rating rich results.
- **Testimonials:** 3 detailed written reviews on-site (Priya M., Harjot S., Meena R. — per your latest content update), all sourced as "Verified via Google Reviews," all 5-star. Good qualitative trust content, but they're hardcoded fallback data, not a live GBP feed — so they won't reflect review velocity (the "18-day rule": rankings can dip if no new reviews appear for 3 weeks).
- **Owner responses:** Cannot verify from the website — check directly in GBP dashboard (88% of consumers prefer businesses that respond to reviews).

**Action:** Add `aggregateRating` to the `InsuranceAgency` schema block:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "<actual count from GBP>",
  "bestRating": "5"
}
```
Pull the real `reviewCount` from the GBP dashboard before publishing — do not estimate it.

---

## 3. NAP Consistency Audit (Critical Finding)

I compared three sources of Name/Address/Phone:

| Source | Address | Phone | Hours |
|---|---|---|---|
| **On-page** ([LocationContact.tsx](app/sections/LocationContact.tsx), footer, contact, privacy policy) | 105D-135 Matheson Blvd West, Mississauga, ON L5R 3L1 | (647) 501-8013 | Mon-Fri 9-6, Sat 10-3, Sun by appt |
| **JSON-LD schema** (currently live) | ~~5770 Hurontario St, Suite 100, L5R 3G5~~ | +1-647-501-8013 | Mon-Fri 9-5, Sat 10-2 (no Sunday entry) |
| **Google Maps embed** | 135 Matheson Blvd W, L5R 3L1 ✅ | n/a | n/a |

🔴 **The structured-data address and hours do not match the visible page content or the embedded map.** This is exactly the kind of cross-source NAP discrepancy that confuses Google's entity matching for the local pack — and it's worse than a typical citation mismatch because it's *self-inflicted*, on the canonical page itself.

- **Why this matters:** NAP consistency is a foundational local ranking and entity-trust signal; mismatched schema vs. visible content can cause Google to either ignore the schema or, worse, surface the stale address in rich results/Knowledge Panel.
- **Good news:** You've already corrected this in your local branch ([app/layout.tsx](app/layout.tsx) now has `105D-135 Matheson Blvd West` / `L5R 3L1` / extended hours) — it just hasn't shipped to production yet. **Prioritize deploying that change** — it's the single highest-impact local SEO fix available right now.
- **How you'd know it's fixed:** `curl https://www.sharanbroker.com/ | grep -o '"streetAddress":"[^"]*"'` returns `105D-135 Matheson Blvd West`.

---

## 4. Citation Presence Check

| Platform | Status |
|---|---|
| Google Business Profile | Referenced indirectly (4.9 rating, map embed) — direct listing not verifiable from site |
| Facebook | ⚠️ **Two different profiles linked**: footer → `facebook.com/sharankaurinsurance`; JSON-LD `sameAs` → `facebook.com/sharandeolinsurance` |
| LinkedIn | ⚠️ **Two different profiles linked**: footer → `linkedin.com/in/sharankaur`; JSON-LD `sameAs` → `linkedin.com/in/sharandeol` (this one returns a blocked/error response when fetched) |
| Instagram | `instagram.com/sharankaurinsurance` (footer only, not in schema `sameAs`) |
| Apple Business Connect | Not detectable — recommend claiming (usage doubled to 27% per BrightLocal 2026) |
| Bing Places | Not detectable — recommend claiming (powers ChatGPT, Copilot, Alexa answers) |
| BBB / Chamber of Commerce | Not detected |
| Yelp / industry directories | Not detected |

🔴 **Brand-name entity confusion:** the JSON-LD `sameAs` array points to "sharandeol" profiles (a different name/handle than "Sharan Kaur"), while the footer correctly links to "sharankaur"/"sharankaurinsurance" profiles. One of two things is true: either the "sharandeol" profiles are stale/wrong and should be removed from schema, or they're a legacy brand that's actively diluting entity signals. Either way, **pick one consistent name + profile set** and use it everywhere (schema `sameAs`, footer, GBP, Apple/Bing listings).
- **Falsifiability check:** All `sameAs` URLs and footer social links should resolve to profiles bearing the same name ("Sharan Kaur" / "sharankaurinsurance"), and none should 404 or block crawlers.

---

## 5. Local Schema Status

**Present:** `InsuranceAgency` + `LocalBusiness` + `Person` JSON-LD with `address`, `geo` (43.6047, -79.6476 — only 4 decimal places; 5+ recommended for precision), `openingHoursSpecification`, `telephone`, `priceRange`.

**Issues:**
1. Entity `@id`/`url`/`image` use `https://thebig.ca` instead of `https://www.sharanbroker.com` — and the linked image 404s. (Same root-cause as the audit's domain-mismatch finding — fixing `NEXT_PUBLIC_SITE_URL` resolves this.)
2. `streetAddress`/`postalCode`/hours are stale (see NAP audit above).
3. Missing `aggregateRating` (see Reviews section).
4. `sameAs` brand mismatch (see Citations section).
5. `geo` coordinates only carry 4 decimal places — bump to 5+ for the precision Google recommends (e.g., `43.61350`, `-79.69176` — values already present in the Maps embed URL, just copy them over).

**Ready-to-use corrected block** (once domain env var is fixed):
```json
{
  "@type": ["InsuranceAgency", "LocalBusiness"],
  "@id": "https://www.sharanbroker.com/#business",
  "name": "Sharan Kaur Insurance",
  "url": "https://www.sharanbroker.com",
  "telephone": "+1-647-501-8013",
  "email": "sharan@thebig.ca",
  "image": "https://www.sharanbroker.com/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "105D-135 Matheson Blvd West",
    "addressLocality": "Mississauga",
    "addressRegion": "ON",
    "postalCode": "L5R 3L1",
    "addressCountry": "CA"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 43.61350, "longitude": -79.69176 },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "<from GBP>", "bestRating": "5" },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "15:00" }
  ],
  "sameAs": ["https://www.linkedin.com/in/sharankaur", "https://www.facebook.com/sharankaurinsurance", "https://www.instagram.com/sharankaurinsurance"]
}
```
*(Sunday "by appointment only" has no clean `OpeningHoursSpecification` equivalent — omitting it from schema is standard practice; keep it as visible page text only.)*

---

## 6. Local On-Page SEO Findings

- ✅ Dedicated service pages exist for Home, Auto, Life, Business, and (per your pending update) Travel Insurance — this is Whitespark's **#1 local organic ranking factor**.
- ✅ NAP visible in footer and on `/contact` with working `tel:`/`mailto:` links and an embedded, correctly-pinned Google Map.
- ⚠️ **Missing `<h1>` on `/contact`** — the page jumps straight to an `<h2>` ("Visit Sharan's Mississauga Office"). Every indexable page should carry exactly one `<h1>`; this is also where "Mississauga" + "insurance broker" keyword reinforcement would do the most good.
- ⚠️ Title tags on `/about`, `/services`, and individual service-detail pages duplicate the homepage title (flagged in the full audit) — none currently include "Mississauga" + the specific service, which is a missed local-intent signal (e.g., "Auto Insurance in Mississauga, ON | Sharan Kaur — RIBO Broker").
- ✅ Service area framing ("serving Mississauga and the Greater Toronto Area") appears in the footer and About bio — appropriate hybrid-business language.

---

## 7. Local Link & Authority Signals

- Social presence: Facebook, Instagram, LinkedIn (with the brand-mismatch issue noted above).
- No Chamber of Commerce, BBB accreditation, local press mentions, or "best of Mississauga" list placements detected — these are increasingly important not just for traditional rankings (~26% of local organic weight) but as the **#1 AI-visibility citation factor** per Whitespark 2026.
- No community-involvement content (sponsorships, local events) found on the site.

---

## Top 10 Prioritized Actions

1. 🔴 **Critical** — Fix `NEXT_PUBLIC_SITE_URL` env var (resolves domain mismatch in schema/OG across the board — same fix flagged in the full audit).
2. 🔴 **Critical** — Deploy the pending `app/layout.tsx` JSON-LD update so schema NAP matches the live page content (address, postal code, hours). This is currently your biggest self-inflicted NAP inconsistency.
3. 🔴 **Critical** — Reconcile the "sharandeol" vs "sharankaur" brand mismatch across `sameAs` schema and footer social links; remove/replace any stale "sharandeol" profile references.
4. 🟠 **High** — Add `aggregateRating` to the LocalBusiness schema using the real review count from your GBP dashboard (don't estimate — pull the actual number).
5. 🟠 **High** — Add an `<h1>` to `/contact` containing "Mississauga" + "Insurance Broker" framing.
6. 🟠 **High** — Confirm/correct the GBP primary category to "Insurance Broker" and add ~4 secondary categories (incl. Travel Insurance Agency, matching your new service).
7. 🟡 **Medium** — Rewrite title tags for `/about` and each `/services/[slug]` page to include "Mississauga" + the specific service (fixes both local intent and the duplicate-title issue from the full audit).
8. 🟡 **Medium** — Claim and optimize Bing Places (feeds ChatGPT/Copilot/Alexa) and Apple Business Connect.
9. 🟡 **Medium** — Bump `geo` coordinates to 5-decimal precision (values are already in your Maps embed URL — just copy them into the schema).
10. 🟢 **Low** — Pursue Chamber of Commerce / BBB accreditation and local press/best-of-list placements to build local authority and AI-citation signals.

---

## What This Analysis Could NOT Assess

- Live GBP dashboard data (review count, response rate, post activity, Q&A migration status, primary/secondary categories as actually configured)
- Real-time local pack ranking position or geo-grid visibility
- Domain Authority / comprehensive backlink profile
- Review velocity over time (the "18-day rule" requires historical GBP Insights data)
- Apple Business Connect / Bing Places listing status
- Chamber of Commerce / BBB membership status

**To fill these gaps:** pull data directly from the Google Business Profile dashboard, or run `/seo maps` (if DataForSEO MCP is connected) for geo-grid rank tracking and live GBP audit, and `/seo backlinks` for authority/citation analysis.
