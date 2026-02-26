---
name: lms-design-system
description: Design system and brand foundation for Linear Marketing Solutions (LMS). Establishes tokens, typography (Syne, DM Sans, JetBrains Mono), logos, animations, and globals for the Next.js site. Use proactively when building or extending the LMS design system; nothing else gets built until this foundation is done.
---

# Design System & Brand Foundation — Linear Marketing Solutions (LMS)

You are building the design system foundation for Linear Marketing Solutions (LMS), an AI-powered business operating system and marketing agency. This is the single most important step — every other component will inherit from what you establish here.

## IMPORTANT CONTEXT

The current site is a single index.html file with all CSS embedded inline. We are moving to a proper Next.js/React component architecture. The existing CSS uses Inter and Archivo fonts, a white background (#ffffff), and a purple/indigo gradient accent. These are being completely replaced. **Do NOT reference or import the old styles.css** — build the new token system from scratch as specified. The old font imports (Inter, Archivo) should be removed and replaced with Syne, DM Sans, and JetBrains Mono.

---

## Brand Identity

- **Company:** Linear Marketing Solutions
- **Tagline:** Strategy. Creative. AI. Execution. Linear Marketing Solutions does it all.
- **Positioning:** Not a marketing agency. An AI-powered business operating system for companies ready to compete at the frontier.
- **Tone:** Precise. Forward. Confident. Human. Not corporate, not hype-driven — earned authority.

---

## Visual Direction

The site should feel like a company that exists slightly ahead of its time. Think: the interface of a tool that powerful people use quietly. Dark, intentional, architectural. Not flashy — purposeful. The feeling should be: "these people are already operating in the future."

- **Mode:** Dark-first. Background is near-black #0A0A0F not pure black. Creates depth without harshness.
- **Accent System:** Two-color gradient system. Primary: Electric Indigo #6366F1. Secondary: Cyan #06B6D4. These appear as gradients on key elements — logo slash, CTAs, highlighted text, glow effects — never flat fills across large areas.
- **Glow Philosophy:** Subtle ambient glow on interactive elements and section dividers. Not neon, not gaming — more like bioluminescence. Soft, purposeful.

**Surface Colors:**
- Background: #0A0A0F
- Surface 1 (cards): #111118
- Surface 2 (elevated cards): #1A1A24
- Border: rgba(255,255,255,0.06)
- Border accent: rgba(99,102,241,0.3)

**Text:**
- Primary: #F0F0F5
- Secondary: #8B8B9E
- Muted: #4A4A5E
- Gradient text: linear-gradient(135deg, #6366F1, #06B6D4)

---

## Typography

- **Display/Headings:** Syne (Google Fonts) — geometric, architectural, distinctive. Import weights 700 and 800.
- **Body:** DM Sans (Google Fonts) — clean, modern, highly readable. Import weights 300, 400, 500.
- **Mono/Code/Labels:** JetBrains Mono — for stat numbers, technical labels, terminal-style elements.

**Scale:** Use a strict type scale.
- Display: 72px/80px
- H1: 56px
- H2: 40px
- H3: 28px
- Body: 16px/28px line height
- Small: 13px

---

## Logo — Updated Treatment

The existing logo is "Linear/MS" — the slash is the brand mark. Keep this but upgrade it:

1. Create an SVG logo where "Linear" is in Syne 800 weight, white.
2. The "/" slash gets the full gradient treatment (indigo to cyan) with a subtle glow filter applied.
3. "MS" is smaller, secondary weight, positioned baseline-right of the slash.
4. Export as: **logo-full.svg**, **logo-mark.svg** (just the slash as standalone icon), **logo-white.svg**, **logo-dark.svg**.
5. All SVGs should be clean, scalable, and export-ready for PNG conversion at any size.

---

## CSS Custom Properties — Full Token System

Create a `/styles/tokens.css` file with ALL of the following as CSS custom properties:

```css
:root {
  /* Colors */
  --color-bg: #0A0A0F;
  --color-surface-1: #111118;
  --color-surface-2: #1A1A24;
  --color-border: rgba(255,255,255,0.06);
  --color-border-accent: rgba(99,102,241,0.3);
  --color-text-primary: #F0F0F5;
  --color-text-secondary: #8B8B9E;
  --color-text-muted: #4A4A5E;
  --color-accent-primary: #6366F1;
  --color-accent-secondary: #06B6D4;
  --gradient-brand: linear-gradient(135deg, #6366F1, #06B6D4);
  --gradient-glow: radial-gradient(ellipse at center, rgba(99,102,241,0.15), transparent 70%);

  /* Typography */
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 48px;
  --space-2xl: 80px;
  --space-3xl: 120px;

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 32px;

  /* Shadows */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04);
  --shadow-glow: 0 0 40px rgba(99,102,241,0.2);
  --shadow-glow-cyan: 0 0 40px rgba(6,182,212,0.15);

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Animation System

Install and configure Framer Motion. Create a `/lib/animations.ts` file with reusable variants:

- **fadeUp:** elements fade in while translating up 20px
- **fadeIn:** simple opacity fade
- **staggerContainer:** parent variant that staggers children by 0.1s
- **scaleIn:** subtle scale from 0.96 to 1 with fade
- **glowPulse:** keyframe animation for ambient glow elements

---

## Global Styles

Create `/styles/globals.css` that:

1. Sets background to `var(--color-bg)` on html and body
2. Applies smooth scrolling
3. Creates a subtle noise texture overlay on the body using an SVG filter (not an image file)
4. Sets default text color and font
5. Creates utility classes: `.gradient-text`, `.gradient-border`, `.glow-sm`, `.glow-md`
6. Removes all default margins/padding (CSS reset)
7. Creates a consistent scrollbar style matching the dark theme

---

## File Structure to Create

```
/styles/
  tokens.css
  globals.css
/lib/
  animations.ts
/public/
  logo-full.svg
  logo-mark.svg
  logo-white.svg
  logo-dark.svg
/components/
  ui/   (empty, ready for Agent 2)
```

---

## Deliverable Checklist Before Moving to Agent 2

- [ ] All CSS tokens defined and working
- [ ] Google Fonts imported (Syne, DM Sans, JetBrains Mono)
- [ ] Framer Motion installed
- [ ] All 4 logo SVG variants created and in /public
- [ ] Animation library file created
- [ ] Global styles applied and body shows dark background
- [ ] Commit everything to GitHub with message: "feat: design system foundation"
