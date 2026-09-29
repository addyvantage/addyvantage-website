# Portfolio content review

This site uses public source, the live PebbleCode prototype, and owner-supplied professional context. Review this file before strengthening any claim.

## Confirmed enough for current wording

- Name, public handles, contact email, KIIT programme and class year: existing site, public résumé, and owner context.
- PebbleCode: public repository README and live session show the coding workspace, test cases, and mentor panel. The case-study capture is from the live prototype.
- Tuku: public Go repository documents CLI, daemon, SQLite task state, checkpoints, handoffs, and explicit scope limits.
- Epistemic Audit Engine: public repository contains FastAPI pipeline, Next.js interface, risk aggregator, evaluation harness, and the interface screenshot used here.
- FairHire AI and DealLens AI: public repositories support their modest experiment descriptions.
- American Express apprenticeship start and high-level role: owner-supplied context. No internal contributions are described.
- Sole-contributor role wording (PebbleCode, Tuku, Epistemic Audit Engine): GitHub contributors API lists only `addyvantage` for each repository (checked 29 Sep 2026). "2026" periods come from each repository's public created/pushed dates.
- Epistemic Audit Engine live link: https://epistemic-audit-engine.vercel.app returned the project's interface (checked 29 Sep 2026). Backend availability for visitors was not tested; the site claims only a live prototype.
- Tuku command excerpt: copied from the public README's "Common command flow", with `go run ./cmd/tuku` shortened to the built `tuku` binary.
- Public enquiry address: build@addyvantage.me (owner-supplied). The personal Gmail address is no longer shown anywhere on the site.
- Portrait: owner-supplied photograph, cropped to 4:5 and shown in greyscale with CSS. The asset file keeps the original colour; no retouching.

## Hotel PMS and AxedStack (checked 29 Sep 2026)

Evidence: the private repository (remote nestsuite-ai/pms_axedtax, local checkout "Nest PMS", HEAD bfc3b4b), its SOW transcription, the 29 July progress report, and owner answers. Not published: client name, product brand, contract price, hostnames, credentials, and screenshots.

- Owner-confirmed: freelance work through AxedStack; client stays unnamed; collaborators are credited as Avi Mehta and Shrey Singh; AI-assisted development is not mentioned.
- Verified in code: Laravel modular monolith (28 modules, 82 tables), PostgreSQL FORCE row-level security, reservation exclusion constraint (no double booking), append-only ledger and audits, gapless invoice counter, night audit with business date, Filament back office with a front-desk board, platform panel, Next.js booking site, Expo staff/guest app with an offline queue, Channex / Razorpay / Stripe / WhatsApp / Xero adapters, 157 OpenAPI operations, 5 roles and 30 permissions, about 1,770 backend test cases and 6 e2e specs.
- Verified from git: the contribution areas listed on the case study map to Aditya's own PRs and commits, and he merged most of the team's pull requests. Commit-share percentages are deliberately not published.
- Owner-confirmed: the git author "Megasthenes" is Shrey Singh.
- Status: runs in a production-style environment with demo tenants only; no hotel or real guests; UAT and external certifications outstanding.

## Epistemic Audit Engine live state (checked 29 Sep 2026)

- "Backend not ready" is a cold start: the Render free instance takes about 22 s to wake, and the frontend health check gives up after about 8 s.
- Once warm, the deployed backend returns every claim as UNCERTAIN because Wikipedia rate-limits its User-Agent (HTTP 429). A contact-bearing User-Agent returns 200. Patch prepared outside this repo; not deployed.
- The case-study result image is a genuine local run of GitHub HEAD with that patch.

## AgStack

Resolved: "AgStack" in the owner's request meant AxedStack. The freelance work is the Hotel PMS above.

## Needs owner verification before publication of stronger claims

1. Has the B.Tech degree formally been awarded? The site currently uses “Class of 2026.”
2. Is the Google Drive résumé ready for public use? The linked version omits the apprenticeship and contains unverified NUS percentage and impact figures. It is deliberately absent from navigation.
3. Can the NUS programme dates, exact role, deliverables, and any measured results be supported by a report or certificate? The site calls it a team programme project.
4. Are there approved details or public artifacts from Sukrit or any client collaboration that can be shown? The site makes only broad descriptions.
5. Which PebbleCode cloud features are enabled in the public deployment, and are there permission-safe demo credentials or a short recording of a complete recovery loop?
6. Are the publication dates of old blog drafts documented? The retained pages are labeled undated and their reading times are calculated from the current text.
7. Is MCP Zero a working, shareable project? It is described only as an idea in a note until code or a demo is supplied.

## Keep private

Internal American Express systems, coworkers, acronyms, tasks, dashboards, security details, and metrics; unreleased client work and budgets; personal health, finances, family, relationships, and exact home location.
