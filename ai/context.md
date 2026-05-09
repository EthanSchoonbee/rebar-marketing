# Rebar Project Context

Rebar is a single-page Astro marketing website for a construction management tool. The site should position Rebar as a calm, high-trust operating layer for construction teams managing schedules, costs, subcontractors, documents, and field execution.

## Product Positioning

- Audience: owners, general contractors, project executives, operations leads, and construction managers.
- Core promise: complex construction work made clear.
- Emotional tone: calm authority, premium advisory, operational precision.
- Avoid generic SaaS language, loud startup visuals, cartoon construction motifs, and overpromising automation claims.
- Favor language about fewer handoffs, cleaner decisions, site-to-office clarity, cost control, risk visibility, and predictable delivery.

## Current Build

- Framework: Astro.
- Interactive components: React.
- Styling: global CSS with custom properties.
- Page model: one production-quality marketing homepage.
- Assets: remote editorial construction/architecture imagery, with muted treatment.

## Architecture

- `src/pages/index.astro` owns document metadata and renders the page.
- `src/components/` contains reusable React components for the homepage sections.
- `src/styles/global.css` contains the design system, layout primitives, responsive rules, and component styling.
- `ai/` stores persistent project guidance for future prompts.

## Coding Standards

- Keep components small, named, and content-driven.
- Prefer semantic HTML: `header`, `main`, `section`, `article`, `footer`, `nav`.
- Use accessible labels for icon/menu buttons and meaningful image alt text.
- Keep motion subtle and respect `prefers-reduced-motion`.
- Use CSS variables for colors, spacing, typography, and layout widths.
- Avoid large dependencies for simple UI behavior.
- Keep copy original; do not copy Quinn Global Tax Law wording beyond general structural inspiration.

## Verification Expectations

- Run `pnpm install` after dependency changes.
- Run `pnpm build` before handoff.
- Start `pnpm run dev` when the user should be able to preview locally.
- Check desktop and mobile layouts when visual changes are substantial.
