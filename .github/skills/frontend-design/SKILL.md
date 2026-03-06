---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Responsiveness

- All designs MUST be responsive across all device sizes (mobile, tablet, desktop).
- Adjust font sizes, spacing, layout, and component structure per breakpoint as needed.
- Use relative units (rem, %, vw/vh) over fixed px values where appropriate.

## Typography & Branding Consistency

- Keep font sizes consistent across the project for branding cohesion.
- Headers of the same hierarchy/style must share the same font size and weight across all pages and components.
- The default font is **Gamja Flower** (already imported), falling back to system-ui. Do not override this globally unless explicitly asked.
- **NEVER** use generic/overused font families such as Inter, Roboto, Arial, or system-ui as a primary font. These produce a generic, AI-generated look.

## Design Aesthetic

- **Do NOT** use purple gradients, generic glassmorphism, or any aesthetic that reads as "vibecoded" or AI-generated.
- Do not default to clichéd color schemes (e.g., purple-on-white, blue-on-dark).
- Base all design decisions on:
  1. The Figma file or design reference provided by the user, OR
  2. What is already established in the repo (existing colors, spacing, style patterns), OR
  3. If the codebase is boilerplate with no established style — use your best creative judgment while staying intentional and context-specific.
- Use the CSS variables already defined in `globals.css` as the color palette (dull blue, dark blue, bright blue, cream, cream-grey, dull grey, etc.).

## Tailwind & Color Usage

- Use Tailwind CSS for component/page styling instead of sidecar pure CSS files when implementing UI.
- For common colors, prefer existing or very similar colors from `globals.css`.
- If a reusable color is missing and appears across multiple components, add it to `globals.css` with a reusable, generic token name.
- Do not create overly unique color tokens tied to only one specific component.
- If a color is used by only one component and is not a shared token candidate, hardcode it directly in that component.

## Code Quality

- Write production-level CSS/component code.
- Keep comments minimal and meaningful; avoid excessive comments that make code look AI-generated.
- Do not include Figma node IDs in code comments.
- If Figma reference is needed, include it as a short summary note rather than node-number comments.
- Code must be well-structured and maintainable — avoid one-off hacks or magic numbers without explanation.

## Component Structure

- All global/reusable components must live in `/components`.
- Page-specific components that won't be reused can live within their respective page folders under `/app`.
- Components should be self-contained with clearly scoped styles.

## Libraries

- You may suggest third-party libraries (e.g., Framer Motion, GSAP, Radix UI) when they add clear value.
- **Always ask for explicit permission before installing any new package.**

## What to Avoid

- Generic AI aesthetics: overused fonts (Inter, Roboto, Arial, system fonts), purple gradients on white, predictable card-grid-hero layouts.
- Cookie-cutter patterns that lack context-specific character.
- Designs that don't reflect the project's established visual identity or provided Figma/design brief.
