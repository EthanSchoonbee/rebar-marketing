# Rebar Design Philosophy

This project is inspired by the premium, minimal, editorial feeling of Quinn Global Tax Law. It must not copy Quinn's exact branding, layout, images, logo, or copy. The goal is to translate that calm advisory language into a construction management product.

## Mood

- Premium, minimal, editorial, and operationally serious.
- Warm rather than sterile.
- Confident without being loud.
- Construction-aware without using cliches.
- More refined annual report than startup splash page.

## Palette

```css
:root {
  --color-cream: #f4efe6;
  --color-warm-white: #fbf7ef;
  --color-charcoal: #241f1c;
  --color-dark-brown: #352823;
  --color-muted-brown: #5d4b42;
  --color-rust: #b65a2e;
  --color-soft-rust: #d77a45;
  --color-muted-green: #b9c7a8;
  --color-border: rgba(36, 31, 28, 0.14);
}
```

Use cream and warm white as the primary canvas, dark brown/charcoal for high-contrast sections, and rust as the accent. Muted green should be rare and secondary.

## Typography

- Display: `Newsreader`, Georgia, serif.
- Body: `Inter`, Helvetica Neue, Arial, sans-serif.
- Headings should be oversized, editorial, and line-height tight.
- Body copy should be calm, readable, and restrained.
- Use uppercase only for small section labels and metadata.

## Layout

- Single-page flow: navigation, hero, services, positioning, metrics, testimonial, insight, contact CTA, footer.
- Use thin borders and horizontal rules instead of heavy cards.
- Services should be numbered rows.
- Use split editorial sections with asymmetry.
- Keep generous vertical spacing and controlled line lengths.
- Avoid center-aligned SaaS hero sections.

## Imagery

- Use muted construction, architecture, site-planning, structural, or materials imagery.
- Favor aerials, plans, concrete, steel, site details, and refined document textures.
- Avoid handshakes, smiling teams, generic laptops, cartoons, and bright tech gradients.

## Motion

- Fade and small upward movement on reveal.
- Slight link or row movement on hover.
- No bouncy animation, scroll hijacking, parallax, cursor tricks, or decorative blobs.
