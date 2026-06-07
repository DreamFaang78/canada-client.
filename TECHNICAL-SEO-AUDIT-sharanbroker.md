# Technical SEO Audit — sharanbroker.com

**Date:** 2026-06-07 | **Platform:** Next.js 14 (App Router) on Vercel | **Pages checked:** homepage + /about, /services, /contact, /get-a-quote, /admin, /testimonials, /services/home-insurance

## Technical Score: 51/100

| Category | Status | Score |
|---|---|---|
| Crawlability | ⚠️ Warn | 40/100 |
| Indexability | ⚠️ Warn | 45/100 |
| Security | ⚠️ Warn | 50/100 |
| URL Structure | ✅ Pass | 80/100 |
| Mobile | ✅ Pass | 85/100 |
| Core Web Vitals | ⚠️ Warn (lab estimate — see limitations) | 45/100 |
| Structured Data | ⚠️ Warn | 50/100 |
| JS Rendering | ✅ Pass | 85/100 |
| IndexNow | ❌ Fail | 0/100 |

---

## 🔴 Critical Issues (fix immediately)

### 1. Sitemap and robots.txt reference `localhost:3000`
```
$ curl https://www.sharanbroker.com/robots.txt
Sitemap: http://localhost:3000/sitemap.xml

$ curl https://www.sharanbroker.com/sitemap.xml
<loc>http://localhost:3000/about</loc> ...
```
- **THINK (first principle):** A sitemap exists to tell crawlers where content lives. One pointing to `localhost:3000` tells Googlebot nothing usable — it's the indexing equivalent of a broken link on every single URL in the file.
- **Root cause:** `process.env.NEXT_PUBLIC_SITE_URL` is set to `http://localhost:3000` in the Vercel production environment, overriding the code fallback (`https://thebig.ca`, itself wrong — see #2) in [app/sitemap.ts](app/sitemap.ts) and [app/robots.ts](app/robots.ts).
- **CONNECT-system:** This is the same root cause behind the domain-mismatch findings in the schema/OG audit — fixing the env var resolves multiple findings across categories (technical, schema, on-page) in one deploy.
- **ACCEPT (falsifiability):** `curl https://www.sharanbroker.com/sitemap.xml | grep -c "sharanbroker.com"` should return a count equal to the number of URLs in the file (currently returns 0).
- **GROW (leading indicator):** Watch Google Search Console → Sitemaps → "Discovered URLs" climb from 0 toward 14+ after resubmission.

### 2. No security headers beyond HSTS
```
$ curl -I https://www.sharanbroker.com/
Strict-Transport-Security: max-age=63072000
```
Missing: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- **THINK:** These headers are baseline hardening against clickjacking (X-Frame-Options/CSP `frame-ancestors`), MIME-sniffing attacks (X-Content-Type-Options), and referrer leakage (Referrer-Policy). Their absence isn't a ranking factor directly, but Google's "Safe Browsing"/site-reputation signals and Lighthouse's Best Practices score both weight this — and a security incident on a licensed financial-services site (insurance broker handling PII via the quote form) carries real reputational and compliance risk.
- **Fix:** Add a `headers()` block in `next.config.mjs`:
```js
async headers() {
  return [{
    source: "/(.*)",
    headers: [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ],
  }];
}
```
A full CSP requires careful scoping (you load Google Fonts, Google Maps embeds, Supabase, and Resend) — start with the four headers above (zero risk of breaking the site), then layer in CSP with `report-only` mode first.
- **ACCEPT:** Re-run `curl -I` — all four headers should appear in the response.
- **GROW:** Securityheaders.com grade should move from current "F"/"D" range toward "A".

---

## 🟠 High Priority (fix within 1 week)

### 3. `/admin` is crawlable-blocked but not noindex'd — index-without-content risk
`robots.txt` disallows `/admin` and `/admin/*`, but the page itself serves `<meta name="robots" content="index, follow">`. Because the page is *blocked from crawling*, Google can still list the bare URL in search results (with a "No information is available for this page" snippet) if it's discovered via any external link.
- **THINK:** Disallow ≠ noindex. Google's own guidance: to fully exclude a page, either (a) allow crawling + serve `noindex`, or (b) accept that a disallowed-but-linked URL may appear as a bare URL in results.
- **Fix:** Add `robots: { index: false, follow: false }` to the `/admin` route's metadata, AND remove the `Disallow` rule for `/admin` in `robots.txt` so Googlebot can actually see and honor the noindex tag (per the Dec 2025 JS-SEO guidance: serve robots directives in raw HTML, and don't block the page Google needs to read the directive from).
- **CONNECT-system:** This is a one-line metadata change; doesn't block or depend on anything else.
- **ACCEPT:** `curl https://www.sharanbroker.com/admin | grep -o 'noindex'` should return a match; GSC URL Inspection for `/admin` should show "Excluded by 'noindex' tag."

### 4. No `<link rel="canonical">` anywhere on the site
Checked: homepage, /about, /services, /contact, /testimonials, /services/home-insurance — **zero** canonical tags found in raw HTML.
- **THINK:** Canonical tags are the strongest signal for telling Google "this is the authoritative URL for this content" — particularly important here because (a) the schema/OG tags currently point to a *different domain* (`thebig.ca` — see schema audit), creating real ambiguity about which domain is canonical, and (b) both `www` and non-www variants resolve (with redirects) which without canonicals relies entirely on redirect behavior to avoid duplicate-host indexing.
- **Fix:** Add `alternates: { canonical: "https://www.sharanbroker.com{path}" }` to each page's metadata export (Next.js `metadataBase` + relative canonical paths is the cleanest pattern — once `NEXT_PUBLIC_SITE_URL` is corrected, `metadataBase` will resolve correctly and per-page `alternates.canonical: "/about"` etc. will "just work").
- **ACCEPT:** View-source on each page should show a self-referencing `<link rel="canonical" href="https://www.sharanbroker.com/...">`.

### 5. Two-hop redirect chain for non-www HTTP requests
```
http://sharanbroker.com/  →(308)→  https://sharanbroker.com/  →(307)→  https://www.sharanbroker.com/
```
- **THINK:** Each redirect hop adds latency (extra round-trip) and dilutes a small amount of link equity. Two hops isn't severe, but it's avoidable — and the second hop is a 307 (temporary) where a 301/308 (permanent) is more appropriate for a permanent www-canonicalization decision.
- **Fix:** In Vercel project settings or `next.config.mjs` redirects, configure a single rule: `http://sharanbroker.com/*` → `https://www.sharanbroker.com/*` (308), bypassing the intermediate hop.
- **ACCEPT:** `curl -s -o /dev/null -w "%{num_redirects}" -L http://sharanbroker.com/` should return `1`, not `2`.

---

## 🟡 Medium Priority (fix within 1 month)

### 6. IndexNow not implemented
No `/indexnow-key.txt` or `.well-known/indexnow` key file found (both return 404).
- **THINK:** IndexNow lets you push new/changed URLs directly to Bing, Yandex, and Naver — which matters because Bing's index feeds ChatGPT, Copilot, and Alexa (cross-reference your GEO/AI-visibility goals). For a small site that updates content periodically (like your pending Travel Insurance launch), this is a low-effort way to get faster pickup outside the Google ecosystem.
- **Fix:** Generate an IndexNow key, host it at `/{key}.txt`, and add a small script/webhook to ping `https://api.indexnow.org/indexnow` on deploy or content change.
- **GROW:** Monitor Bing Webmaster Tools → URL Submission API quota usage as a sign it's wired up and being used.

### 7. AI crawler access not explicitly configured
`robots.txt` only has a generic `User-agent: *` rule — no explicit directives for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, etc.
- **THINK:** This isn't wrong — by default these crawlers are allowed under the wildcard rule, which is generally the right call for a local-business site that *wants* AI citation (per the GEO context: "AI usage for local recommendations" is up to 45%). But it's worth being a deliberate choice rather than a default.
- **Recommendation:** No change needed unless you specifically want to opt out of AI training (`GPTBot`, `Google-Extended`, `Bytespider`) while still allowing citation crawlers (`ChatGPT-User`, `PerplexityBot`). Cross-reference `/seo geo` for the full AI-visibility strategy before making this change — don't block first and ask questions later.

### 8. Structured data domain mismatch (cross-referenced from schema/local audits)
The `LocalBusiness`/`Person` JSON-LD `@id`, `url`, and `image` fields reference `https://thebig.ca` (which 404s for the image asset) instead of `https://www.sharanbroker.com`. This is the same `NEXT_PUBLIC_SITE_URL` root cause as #1 — flagging here for completeness since it's also a crawlability/indexability concern (Google may attribute the entity to the wrong domain).
- See the full audit and local-SEO report for the corrected JSON-LD block.

---

## ✅ What's Working Well

- **HTTPS enforced** with valid cert and HSTS (`max-age=63072000`) — strong baseline.
- **Server-side rendering confirmed**: hero copy ("Insurance That...") is present in the raw HTML response — no JS-rendering indexability risk for primary content (Next.js App Router SSR is doing its job).
- **Clean URL structure**: `/services/home-insurance`, `/services/auto-insurance` etc. — descriptive, hyphenated, logical hierarchy, all within 2 clicks of homepage.
- **Mobile viewport meta present and correct**: `width=device-width, initial-scale=1`.
- **`robots.txt` exists and is valid** (aside from the localhost sitemap reference) — correctly disallows `/admin` and `/api`.
- **`meta name="robots" content="index, follow"`** present and correct on all public pages.
- **No mixed-content risk detected** — all resources loaded over HTTPS.

---

## Core Web Vitals — Limitation Notice

I could not retrieve live CrUX field data (PageSpeed Insights API quota was exhausted for this project: `429 rateLimitExceeded`). Based on lab-level signal proxies:
- 4 hero/service images are served unoptimized at **1-2.7MB each** via raw `<img>` tags (not `next/image`) — this is very likely suppressing LCP into the "Poor" range (>4s) on mobile/4G. (Full detail in the site-audit report's Performance section.)
- **Recommendation:** Once PSI quota resets (~24h) or with a different API key, run `python scripts/pagespeed_check.py https://www.sharanbroker.com --json` for real mobile/desktop LCP, INP, and CLS — then re-score this category with field data.

---

## Action Plan Summary (dependency-sequenced)

1. **Fix `NEXT_PUBLIC_SITE_URL`** in Vercel → unblocks #1 (sitemap/robots), #8 (schema domain), and most of #4 (canonical generation will resolve correctly via `metadataBase`)
2. **Add canonical tags** to page metadata (depends on #1 being fixed first, or canonicals will point to the wrong domain)
3. **Add security headers** to `next.config.mjs` (independent — do anytime)
4. **Add `noindex` to `/admin`** + remove its `Disallow` rule (independent — do anytime)
5. **Consolidate the redirect chain** for non-www HTTP (independent, low effort)
6. **Implement IndexNow** (independent, do after #1 since it benefits from a correct sitemap)
7. **Compress hero images / migrate to `next/image`** (biggest CWV lever — see full audit for specifics)

---

Would you like a PDF version of this report? Run `/seo google report full`.
