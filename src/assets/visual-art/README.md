# Visual Artwork Asset Contract

This directory is the visual-only layer for the portfolio's hybrid architecture.

The React DOM remains the only source for navigation, headings, body copy, buttons,
metadata, cards, lists, hover states, focus states, modal content, and interaction.
Artwork must use `pointer-events: none` and must never contain clickable UI.

## Rendering contract

- Design canvas: `2048 x 1152` pixels (`16:9`).
- Source format: PNG. Desktop production uses visually approved WebP copies.
- Color space: sRGB.
- Final clean artwork must contain no text, navigation, cards, buttons, icons, labels,
  signatures, metadata, or other UI.
- Keep the visual composition aligned to the corresponding 01-05 reference render.
- Do not repaint these visuals with CSS gradients or low-quality glass simulations.
- `ReferenceArtwork.jsx` uses the desktop WebP production asset on desktop.
- Mobile continues to use the responsive real DOM and dedicated mobile WebP artwork.

## 01 Hero

Source file: `hero-clean-visual.png`
Production file: `hero-clean-desktop.webp`

May contain only:

- Warm ivory spatial background.
- Right-side transparent twisted glass sculpture.
- Blue-gray sphere and right-side cream sphere.
- Light, ground shadow, and optical refraction.

Must not contain:

- Brand or navigation.
- Current-status card.
- Main title, body copy, buttons, location, role, live archive, scroll cue, or any UI.

## 02 About

Source file: `about-clean-visual.png`
Production file: `about-clean-desktop.webp`

May contain only:

- Warm ivory background.
- Right-side vertical transparent glass film.
- Blue-gray sphere, lower-right cream sphere, light, ground, and shadow.

Must not contain:

- About headings or copy.
- Statistics, capability icons, timeline, signature, or any UI/text.

## 03 Projects

Source file: `projects-clean-visual.png`
Production file: `projects-clean-desktop.webp`

May contain only:

- Warm ivory background.
- Top/right transparent folded-glass ribbon.
- Right blue-gray sphere, middle cream sphere, lower-left cream sphere.
- Light and ground shadow.

Must not contain:

- Projects headings or copy.
- Project cards, card borders, icons, flow indicators, detail links, footer metadata,
  or any UI/text.

## 04 Capabilities

Source file: `capabilities-clean-visual.png`
Production file: `capabilities-clean-desktop.webp`

May contain only:

- Warm ivory background.
- Right-side transparent glass ring.
- Lower-left blue-gray sphere, cream sphere, light, and ground shadow.

Must not contain:

- Capabilities headings or copy.
- Capability rows, numbers, icons, dots, arrows, footer metadata, or any UI/text.

## 05 Contact

Source file: `contact-clean-visual.png`
Production file: `contact-clean-desktop.webp`

May contain only:

- Warm ivory background.
- Right-side transparent glass architecture and horizontal glass structure.
- Lower-right blue-gray sphere, light, ground, and shadow.

Must not contain:

- Contact headings or copy.
- Buttons, email row, cooperation-direction card, or any UI/text.

## Debug calibration

Full reference renders are calibration-only and never render in production by
default. Use one of these URL parameters during local comparison:

- `?debugReference=0.25`
- `?debugReference=0.5`
- `?debugReference=0.75`
- `?debugReference=1`

Use `?debugReference=0` or remove the parameter to return to production rendering.
