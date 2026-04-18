# LMS Website v5 — Hermes-Class Rebuild

**Status:** In progress (overnight run 2026-04-18)
**Branch:** `feat/v5-hermes-aesthetic`
**Goal:** Rebuild homepage surface to Hermes Agent quality — futuristic but calming, cutting edge, research-lab feel. Make Blake say "wow."

## Direction

> "An agent that grows with you" — Hermes' landing is a terminal manual you can scroll, not a SaaS pitch. The wow moment is the WebGL band-scan shader that tears the hero image into horizontal glitches as your cursor moves, then settles. Monochrome warmth (amber on roasted-brown), restraint everywhere else.

LMS translates this to: **plum-warm-black + LMS purple as the single accent**, Fraunces display serif + JetBrains Mono metadata chrome, band-scan shader on hero, numbered-step scroll ("1. Audit / 2. Build / 3. Scale"), terminal-style CTAs.

## North star references

| Site | Lift |
| --- | --- |
| hermes-agent.nousresearch.com | Palette warmth, shader hero, 600ms/6px reveals, metadata labels, terminal CTAs |
| nousresearch.com | "OUTPUT 96 / SEED: 3573860127" typographic ornament |
| cmcc.vc | Type/grid restraint, arrow motif, geometric footer block |
| makemepulse.com | Image-trail cursor on services grid |
| cyclemon.com | Chaptered scroll for case studies |
| latecheckout.studio | Parallax prop drift (restrained, 2 elements max) |

## Design system

**Color (additive — existing tokens kept for subpages):**
- `--v5-bg-warm: #0C0914` (plum-warm-black, replaces pure #09090B for hero/dark sections)
- `--v5-bg-paper: #F7F3EB` (warm white for light sections, replaces #FAFAFA optionally)
- `--v5-fg-warm: #F5F2EE` (warm paper text on dark)
- `--v5-accent: #7C3AED` (LMS purple — the ONE accent)
- `--v5-accent-glow: #C89EFE` (soft lavender glow)
- `--v5-accent-dim: rgba(124, 58, 237, 0.15)`
- `--v5-muted: rgba(245, 242, 238, 0.5)`
- `--v5-border: rgba(245, 242, 238, 0.08)`

**Type:**
- Display: `Fraunces` (variable, SOFT+OPSZ+WGHT axes — Mondwest-adjacent editorial warmth)
- Body: `Geist Sans` (keep)
- Mono/metadata: `JetBrains Mono` (replaces Geist Mono on v5 sections for sharper terminal feel)

**Motion:**
- Single easing: `cubic-bezier(.4, 0, .2, 1)`
- Reveal spec: 600ms ease-out, 6px Y-translate, `both` fill-mode
- Ambient loops: 12s linear infinite
- Letter-spacing eyebrows: 0.4em–0.55em uppercase
- NO parallax on text. Only art moves.

**Chrome ornaments:**
- Metadata labels: `OUTPUT 42 · SEED: 5f3a91c · v5.0.0` at section corners
- Barber-pole march animation on selected borders
- Blink on terminal cursors
- Numbered step prefixes (`01 /`, `02 /`)

## Homepage architecture (v5)

```
[Nav — v5 restyle, thin border bottom, Fraunces mark]
[Hero — band-scan shader + Fraunces display "One operator. Every capability." + terminal-style install CTA]
[Metadata strip — OUTPUT/SEED/v5.0.0 ornament + client marquee in JetBrains Mono]
[Numbered scroll — 01 AUDIT · 02 BUILD · 03 SCALE · 04 COMPOUND — pinned, 6px reveals]
[Capability matrix — image-trail cursor grid, 6 tiles]
[Case study chapter — Cyclemon-style anchored scroll, 3 flagship clients]
[System diagram — R3F warm-plum scene, slow 12s ambient rotation]
[Trust band — logos + stats in mono]
[Terminal CTA — "curl -sSL linear.sh | sh" style replacement for "Start your build"]
[Footer — CMCC block stack signature]
```

## Tech additions

- **Fraunces + JetBrains Mono** via `next/font/google` (self-hosted, no runtime fetch)
- **OGL or custom shader** in R3F `shaderMaterial` for band-scan (port the Hermes uniforms: `t, bands[12], r, imgSize, mouse, vel, tex`)
- **Canvas 2D cursor trail** for image-trail grid (no WebGL cost — same pattern as makemepulse)
- **ScrollTrigger pin** for numbered-step section
- **`next/image`** with `placeholder="blur"` on case study art
- **Art pack** generated via `nano-banana-2` (Gemini image gen) — hero field, section bg, case-study title plates

## Phased buildout (overnight)

| Phase | Deliverable | Files |
| --- | --- | --- |
| 0 | PRD + branch | `PRD-v5.md`, `feat/v5-hermes-aesthetic` |
| 1 | Tokens + fonts + globals | `styles/tokens.css`, `app/layout.tsx`, `styles/globals.css` |
| 2 | Band-scan shader | `components/v5/BandScanShader.tsx` |
| 3 | Hero | `components/v5/HeroV5.tsx` |
| 4 | Metadata chrome | `components/v5/MetadataLabel.tsx`, `components/v5/NumberedPrefix.tsx` |
| 5 | Numbered scroll | `components/v5/NumberedSteps.tsx` |
| 6 | Image-trail grid | `components/v5/ImageTrailGrid.tsx`, `components/v5/CapabilityMatrix.tsx` |
| 7 | Case study chapter | `components/v5/CaseStudyChapter.tsx` |
| 8 | Terminal CTA | `components/v5/TerminalCTA.tsx` |
| 9 | Nav + Footer restyle | `components/ui/Navbar.tsx`, `components/ui/Footer.tsx` |
| 10 | Art pack | `public/v5/*.png` via Gemini |
| 11 | Swap page | `app/page.tsx` |
| 12 | Typecheck + build + preview | `bun run typecheck`, `bun run build`, push, Vercel preview |
| 13 | Slack DM Blake | preview URL + summary |

## Out of scope (tonight)

- Service subpages (`/services/*`) — preserved as-is
- `/about`, `/contact`, `/work`, `/ai-tools` — preserved
- Blog infrastructure — not started
- SEO schema adjustments — next session
- Mobile-specific 3D degradation beyond graceful-disable — next session

## Success criteria

1. Homepage loads on preview deploy without console errors
2. Typecheck + build pass cleanly
3. Band-scan shader renders and reacts to cursor
4. Numbered-step scroll pins and reveals cleanly
5. Image-trail grid leaves cursor trail
6. Blake's first reaction: "wow"
