# LMS Website v6 — Palantir × CMCC × LMS

**Status:** In progress (overnight run 2026-04-18 late)
**Branch:** `feat/v6-palantir` (off `main`)
**Predecessor:** `feat/v5-hermes-aesthetic` preserved on origin for reuse on a future product.
**Goal:** Rebuild the LMS homepage to feel like intelligence infrastructure, not a marketing agency.

## Direction

Palantir.com is built on five concrete levers — typographic grammar, dense index grids, KPI-first case cards, pre-rendered ontology video, and a single `.15s cubic-bezier(.645,.045,.355,1)` snap easing. We steal those levers, keep LMS brand (Geist + `#7C3AED` purple), and add calm operator ornaments (command palette, live ops ticker, SoCal coverage map, terminal deploy log) that CMCC-level restraint would never reach for but that separate LMS from every other agency site on the internet.

North stars: **palantir.com**, **cmcc.vc**, **linear.app** (rhythm only). Secondary lifts: **magicui.design/docs/components/terminal**, **magicui.design/docs/components/number-ticker**, **ui.aceternity.com/components/world-map**, command-palette registry on 21st.dev.

## Design system

**Palette (opt-in via `.v6-dark` — non-destructive to v4 tokens):**
- `--v6-bg: #0F0B14` (plum-warm-black, keeps LMS purple DNA; darker than Hermes `#0C0914`, less warm so it reads as ops not editorial)
- `--v6-bg-1: #17121F` (surface)
- `--v6-bg-2: #1E1827` (raised surface)
- `--v6-border: rgba(245, 242, 238, 0.08)`
- `--v6-border-hot: rgba(124, 58, 237, 0.32)` (accent border on hover/active)
- `--v6-fg: #FAFAFA` (primary text)
- `--v6-fg-2: rgba(250, 250, 250, 0.66)` (secondary)
- `--v6-fg-3: rgba(250, 250, 250, 0.38)` (muted)
- `--v6-accent: #7C3AED` (LMS purple — the single accent)
- `--v6-accent-soft: #A78BFA`
- `--v6-accent-hot: #C4B5FD`

**Type (NO new fonts — Geist is the brand, honored):**
- Display: `--font-geist-sans` at huge sizes, weight 400–500, tight tracking `-0.02em`
- Body: `--font-geist-sans` 17px, line-height 1.55
- Earmark (the Palantir-signature uppercase label): `--font-geist-mono` at 10–11px, `letter-spacing: 0.08em–0.12em`, uppercase, often paired with a purple `·` separator

**Motion (Palantir `.15s` snap + 400ms reveals):**
- Snap ease: `cubic-bezier(.645, .045, .355, 1)` on all hover transforms, 150ms duration, 100ms background-color delay (never animated colors — swapped)
- Reveal: `power2.out` 400ms, 8px Y-translate, fill-mode both
- Stagger: `transition-delay: calc(var(--item-index) * 60ms + 120ms)` via CSS vars
- No parallax on text. Ambient motion only on hero terminal + live feed tick.

**Ornaments:**
- Earmark labels on every card: `CLIENT · MFG`, `PLAYBOOK · AMAZON-SEO`, `DEPLOY · STAGE-2`
- Live ops feed: small fixed-position ticker in hero — "LEAD CAPTURED · 14s ago"
- Status pulse: 1.5s ease-in-out infinite, accent soft-glow
- Directory-list hairlines: 1px purple @ 12% opacity

## Homepage architecture

```
[Nav v6] dark plum, Geist Mono earmarks, ⌘K chip
[HeroV6] — left half: OPERATING SYSTEM earmark + Geist display headline
                          + small live ops feed ticker + ⌘K hint
                   right half: DeployTerminal typing fake LMS workflow
[EarmarkBar] horizontal rule of OS tagline + stack metadata
[CapabilityBento] — 2×2 OS modules with live-ticking counters per tile
[SystemLayersV6] — v4 4D scene, retuned colors, Palantir headline wrap
[DirectoryList] — 30-item `layoutListBlock` of every offering + category
[CoverageMap] — SoCal-scoped Aceternity-style SVG with arc animations
[ImpactSpotlight] — 3 KPI-first case chapters (big number, context below)
[FinalCTAV6] — "REQUEST DEPLOY" with terminal chrome
[Footer v6] — CMCC 7-block stack + directory-list footer nav
```

## v4 elements preserved

- `components/three/SystemLayers.tsx` — the 4D animated scene, retuned to v6 palette at the section wrapper level
- `components/three/ParticleField.tsx` — optional ambient in hero bg

## New components in `components/v6/`

1. `HeroV6.tsx` — 2-column hero, live ops ticker, Geist display, ⌘K chip
2. `LiveOpsFeed.tsx` — ticker of fake-but-plausible ops events, interval-driven
3. `DeployTerminal.tsx` — Magic UI-pattern terminal typing LMS deploy log
4. `CommandPalette.tsx` — ⌘K global navigator, fuzzy match
5. `Earmark.tsx` — the uppercase label primitive (CLIENT/DEPLOY/OS)
6. `CapabilityBento.tsx` — 2×2 OS modules with live metric counters
7. `NumberTicker.tsx` — live-feeling count-up metric
8. `DirectoryList.tsx` — Palantir layoutListBlock pattern
9. `CoverageMap.tsx` — SoCal SVG topography + animated arcs
10. `ImpactSpotlight.tsx` — KPI-first case chapters
11. `EarmarkBar.tsx` — horizontal section seam with OS tagline + metadata
12. `FinalCTAV6.tsx` — terminal-style deploy CTA
13. `SystemLayersV6.tsx` — wrapper around existing SystemLayers with v6 chrome

## Tech stack additions

- `cmdk` package for command palette (battle-tested, Raycast-style)
- No new fonts (Geist is the brand)
- No new 3D libraries (existing R3F stack covers SystemLayers)

## Phased buildout (tonight)

| Phase | Deliverable |
| --- | --- |
| 0 | Branch + PRD + install cmdk |
| 1 | Tokens + motion + Earmark primitive |
| 2 | HeroV6 + LiveOpsFeed + DeployTerminal |
| 3 | CommandPalette |
| 4 | EarmarkBar + CapabilityBento + NumberTicker |
| 5 | DirectoryList |
| 6 | SystemLayersV6 wrapper |
| 7 | CoverageMap (SVG SoCal) |
| 8 | ImpactSpotlight |
| 9 | FinalCTAV6 |
| 10 | Nav + Footer v6 |
| 11 | Wire page.tsx, typecheck, build |
| 12 | Push, Vercel preview, Slack DM |
| 13 | (Stretch) Hyperframes boot intro |

## Success criteria

- Preview deploys clean
- Typecheck + prod build pass
- ⌘K navigates the site
- Live ops feed ticks plausibly
- Terminal types a full deploy log
- Directory list reads as "intelligence network", not "services grid"
- SoCal coverage map animates arcs
- Blake's reaction: "this is it"

## Out of scope tonight

- Service subpages (preserved as-is)
- Blog infrastructure
- New SEO schema
- Mobile deep-degradation of terminal/map beyond graceful hide
