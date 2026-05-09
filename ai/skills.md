# Rebar Codex Working Skills

Use this file as a persistent checklist for future Rebar prompts.

## Product Writing Skill

- Write like a premium operational partner, not a generic SaaS vendor.
- Lead with clarity, risk reduction, schedule control, and executive visibility.
- Use short editorial phrases:
  - "Complex builds made clear."
  - "One source for the work behind the work."
  - "Fewer handoffs. Faster decisions."
  - "Field reality, office certainty."
- Avoid:
  - "Unlock your potential"
  - "Disrupt construction"
  - "Revolutionary platform"
  - "All-in-one solution" unless it is made concrete.

## Frontend Implementation Skill

- Build first-screen experiences as usable pages, not landing-page theater.
- Prefer split editorial sections, numbered rows, fine rules, large type, and restrained interactions.
- Use React only where interactivity is needed: mobile nav, reveal motion, filters, calculators, demos.
- Keep Astro pages mostly content-oriented and easy to scan.
- Use a 12-column desktop grid where section composition benefits from it.
- Avoid nested cards, pill-heavy UI, decorative blobs, oversized rounded rectangles, and icon clutter.

## Accessibility Skill

- Every interactive element must be keyboard reachable.
- Use focus-visible styles.
- Keep color contrast high on cream and dark sections.
- Do not hide important page meaning inside imagery.
- Ensure mobile navigation has `aria-expanded`, `aria-controls`, and close behavior.

## Performance Skill

- Use plain CSS for layout and motion.
- Defer non-critical hydration.
- Keep image usage intentional and use `loading="lazy"` below the hero.
- Use `font-display=swap` for web fonts.

## Maintenance Skill

- Prefer editing existing components and tokens before adding new abstractions.
- Keep future sections consistent with the established design language.
- When adding pages later, reuse the same Header, Footer, SectionLabel, SplitSection, ServiceRow, MetricBlock, TestimonialBlock, InsightCard, ContactCTA, and Reveal patterns.
