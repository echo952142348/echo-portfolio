# Visual Artwork Asset Contract

This directory is the visual-only layer for the portfolio's hybrid architecture.

The React DOM remains the only source for navigation, headings, body copy, buttons,
metadata, cards, lists, hover states, focus states, modal content, and interaction.
Artwork must use `pointer-events: none` and must never contain clickable UI.

## Rendering contract

- Design canvas: `2048 x 1152` pixels (`16:9`).
- Current integration format: PNG. Do not convert to WebP until layout,
  typography, and micro UI calibration are visually approved.
- Color space: sRGB.
- Final clean artwork must contain no text, navigation, cards, buttons, icons, labels,
  signatures, metadata, or other UI.
- Keep the visual composition aligned to the corresponding 01-05 reference render.
- Do not repaint these visuals with CSS gradients or low-quality glass simulations.
- When a clean file exists, `ReferenceArtwork.jsx` uses it on desktop. Until then,
  the current region assets remain the fallback.
- Mobile continues to use the responsive real DOM and existing lightweight region
  artwork; the 2048 x 1152 clean source is not used as the mobile fallback image.

## 01 Hero

Final file: `hero-clean-visual.png`

May contain only:

- Warm ivory spatial background.
- Right-side transparent twisted glass sculpture.
- Blue-gray sphere and right-side cream sphere.
- Light, ground shadow, and optical refraction.

Must not contain:

- Brand or navigation.
- Current-status card.
- Main title, body copy, buttons, location, role, live archive, scroll cue, or any UI.

Current transitional fallback:

- `hero-glass-visual.webp`
- `hero-sphere-visual.webp`
- `hero-cream-sphere-visual.webp`

## 02 About

Final file: `about-clean-visual.png`

May contain only:

- Warm ivory background.
- Right-side vertical transparent glass film.
- Blue-gray sphere, lower-right cream sphere, light, ground, and shadow.

Must not contain:

- About headings or copy.
- Statistics, capability icons, timeline, signature, or any UI/text.

Current transitional fallback:

- `about-glass-visual.webp`
- `about-cream-sphere-visual.webp`

## 03 Projects

Final file: `projects-clean-visual.png`

May contain only:

- Warm ivory background.
- Top/right transparent folded-glass ribbon.
- Right blue-gray sphere, middle cream sphere, lower-left cream sphere.
- Light and ground shadow.

Must not contain:

- Projects headings or copy.
- Project cards, card borders, icons, flow indicators, detail links, footer metadata,
  or any UI/text.

Current transitional fallback:

- `projects-glass-visual.webp`

## 04 Capabilities

Final file: `capabilities-clean-visual.png`

May contain only:

- Warm ivory background.
- Right-side transparent glass ring.
- Lower-left blue-gray sphere, cream sphere, light, and ground shadow.

Must not contain:

- Capabilities headings or copy.
- Capability rows, numbers, icons, dots, arrows, footer metadata, or any UI/text.

Current transitional fallback:

- `capabilities-ring-visual.webp`
- `capabilities-sphere-visual.webp`

## 05 Contact

Final file: `contact-clean-visual.png`

May contain only:

- Warm ivory background.
- Right-side transparent glass architecture and horizontal glass structure.
- Lower-right blue-gray sphere, light, ground, and shadow.

Must not contain:

- Contact headings or copy.
- Buttons, email row, cooperation-direction card, or any UI/text.

Current transitional fallback:

- `contact-building-visual.webp`
- `contact-sphere-visual.webp`

## Debug calibration

Full reference renders are calibration-only and never render in production by
default. Use one of these URL parameters during local comparison:

- `?debugReference=0.25`
- `?debugReference=0.5`
- `?debugReference=0.75`
- `?debugReference=1`

Use `?debugReference=0` or remove the parameter to return to production rendering.
