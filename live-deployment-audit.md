# Live Deployment Audit

## Public domains checked

- `https://www.abhiarafoundation.com`
- `https://www.abhiarafoundation.org`

## Current findings

- Both domains return the same frontend asset set.
- The live homepage still shows the old eight-photo programme grid.
- The children’s education photo is still shown under Environment and Animals on the live site.
- The corrected three active programme cards and five photo-free Coming Soon cards are not yet live.
- The live homepage does show the updated `❤️🙏 Donation` navigation label.
- The live Volunteer bundle contains the simplified volunteer-only wording and no Internship text.
- The live FAQ bundle is absent, so the new dedicated FAQ page is not yet deployed.
- Both `/api/health` endpoints return the static HTML page instead of an API response, so the payment routing fix is not yet live on Vercel.
- No payment or auto-debit action was performed during this audit.

## Route review

The live `/faq` route currently opens the site’s 404 page, so the new public FAQ has not been deployed. The live `/volunteer` route is current and correctly shows the simple volunteer-only page. It contains no Careers, internship, CV, salary, or job-application section.

The live `/careers` route correctly redirects to `/volunteer` and preserves the query string. The live donation page contains the one-time Razorpay form, accurate 80G pending wording, the `❤️🙏 Donation` label, three real support photos, and the current compliance details. The payment form was not submitted. The QR merchant-number privacy treatment could not be confirmed from the initial viewport because the QR section is lower on the page.

The live donation page’s first full content view confirms the three-photo layout and current one-time payment wording. The browser did not move to the lower QR section, so the code-level QR privacy verification remains the reliable check until the newest build is deployed. The live `/programs` page separates five Coming Soon areas, but it still contains older unverified targets, dates, and activity claims. The newest homepage cleanup and FAQ checkpoint therefore have not reached the public Vercel deployment.

The live `.org` homepage matches the `.com` deployment and still shows the old programme grid and wording. The `.org/faq` route also opens the 404 page. This confirms that both public domains are on the same older Vercel build rather than the latest `a39ffcd3` checkpoint.

## 11 September 2026 production publish

- Latest deployable GitHub commit: `51535570` on `main`.
- Vercel project: `abhiara-foundation-mumbai-odisha`.
- The prior immediate build failures were caused by the obsolete `@vercel/node@3` runtime pin in `vercel.json`. The pin was removed and local TypeScript, Vitest, JSON, and production build checks passed.
- Required production variables were added in Vercel: `DATABASE_URL`, `JWT_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and public config `VITE_RAZORPAY_KEY_ID`. No secret values are recorded here.
- The Razorpay live key pair was regenerated with a 24-hour transition window. The new credentials passed a non-charging authentication test. Subscriptions, plans, mandates, and auto debit remain unchanged.
- Vercel deployment for commit `51535570` is currently building. Public-domain verification must wait until it reports `Ready`.

### Runtime error found after build

- Source: Vercel runtime logs for deployment `D4LEsSxCkh9fJpJKmedK2szi2DTU`.
- Requests to `/api/trpc/cms.social.listActive,cms.settings.list` returned HTTP 500.
- Exact cause: Node ESM could not resolve the extensionless import `/var/task/server/_core/oauth` from `/var/task/api/index.js` and raised `ERR_MODULE_NOT_FOUND`.
- Fix: all local imports in the Vercel API runtime dependency graph now use explicit `.js` extensions. This includes `api/`, server core modules, routers, database helpers, storage helpers, shared modules, and schema references.
- Verification: TypeScript passed, 13 test files and 65 tests passed, production build passed, and the source audit found no remaining executable extensionless relative imports in the Vercel API dependency graph.

### Deployment and live API verification

- Vercel production deployment for commit `8fbab62d` completed with status `Ready` in 41 seconds.
- A read-only `cms.social.listActive` tRPC request returned HTTP 200 JSON on the deployment URL, `www.abhiarafoundation.com`, and `www.abhiarafoundation.org`.
- An intentionally invalid `donation.createOrder` request returned HTTP 400 JSON on all three origins. This confirms the API route and validation layer are active without creating an order or payment.
- `/api/health` remains HTTP 404 because the current Vercel rewrites expose the tRPC and OAuth paths only; this does not affect the verified donation API route.
- No payment, subscription, plan, mandate, or auto-debit action was created during verification.

### Live public content verified after deployment

- `https://www.abhiarafoundation.com/faq` shows the new public FAQ with verified questions about current work, one-time donations, 80G pending status, privacy, volunteering, and contact details.
- `https://www.abhiarafoundation.com/impact` shows the new Monthly Impact archive with four monthly records, registered media, ongoing Shiksha Sathi support, and the approved official Instagram Reel listed separately from field results.
- `https://www.abhiarafoundation.com/donate` shows `SECURE ONE TIME PAYMENT`, no public Razorpay branding, accurate 80G-under-process language, a one-time-only form, the verified UPI and bank details, the latest three-photo layout, and accurate Donation Acknowledgement wording.
- The public donation page does not claim automatic monthly debit, subscriptions, mandates, or current 80G tax deduction.

### Volunteer and Careers verification

- `https://www.abhiarafoundation.com/volunteer` shows only simple volunteer information and no full-time jobs, internships, CV requests, salaries, or formal application requirements.
- The deployed application retains the old `/careers` retirement redirect to `/volunteer`; the browser session timed out when reading the final redirected URL, so the destination page was verified directly.
