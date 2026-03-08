# Components Reference

This document lists the main UI components in the repo, their purpose, props, and quick maintenance notes. Keep this file updated when adding or changing components.

---

## Location

- All project components live under: `app/components`
- Cards are under: `app/components/cards`
- Sticky site-level components are under: `app/components/stickyComponents`

---

## Global notes

- Styling: Tailwind utility classes are used throughout. Project also uses a small set of CSS variables in `app/globals.css` (e.g. `--dull-blue`, `--cream`, `--section-header-size`). Prefer `text-(--token)` / `bg-(--token)` patterns used across the codebase to keep class names consistent with existing config.
- Font: `Gamja Flower` is the primary brand font (imported in `globals.css`).
- Animations: `framer-motion` is used in a couple of components — do not remove without checking usages.

---

## Components (alphabetical)

### CustomCursor

- Path: `app/components/CustomCursor.tsx`
- Purpose: Custom cursor visual that follows pointer on fine-pointer devices and shows interactive/pressed states.
- Usage: Place once at app-level (e.g. layout) so it can register global pointer events.
- Notes: Active only when `(hover: hover) and (pointer: fine)` matches. Avoid heavy DOM updates inside the loop.

### IconLabelButton

- Path: `app/components/IconLabelButton.tsx`
- Purpose: Small button combining an icon (image) and a label. Used for category/section actions.
- Props: `label: string`, `imageSrc: string`, `onClick?: () => void`, `className?: string`, `iconClassName?: string`, `labelClassName?: string`.
- Notes: keep label short; image fallback to `/lumaBlue.png` is handled within the component.

### LogoText

- Path: `app/components/LogoText.tsx`
- Purpose: Inline brand/logo text with optional symbol or image. Used for link-like labels (e.g. social links).
- Props: `text: string`, `logoSrc?: string`, `symbol?: ReactNode`.
- Notes: uses small text-shadow; update `text-(--dark-blue)` token if color changes are required globally.

### RoundedButton

- Path: `app/components/RoundedButton.tsx`
- Purpose: Prominent rounded CTA button with chunky border and shadow.
- Props: `label: string`, `onClick?: () => void`.
- Notes: uses `border-(--dull-blue)` and `bg-(--cream)` tokens — change tokens in `globals.css` for global updates.

### SkillBadge

- Path: `app/components/SkillBadge.tsx`
- Purpose: Badge for displaying skill icon and name in a grid. Used in `SkillsSection`.
- Props: `name: string`, `imageSrc: string`.
- Notes: keeps image square and label centered underneath.

### SpeechBubble

- Path: `app/components/SpeechBubble.tsx`
- Purpose: Small floating/animated label (e.g. "fav!") using `framer-motion`.
- Props: `text: string`, `className?: string`.
- Notes: subtle float animation; avoid adding complex layout inside the bubble.

---

## Cards

### DetailPopup

- Path: `app/components/cards/DetailPopup.tsx`
- Purpose: Modal used by `ProjectCard` and `ExperienceCard` to show expanded details.
- Props: `isOpen: boolean`, `onClose: () => void`, `type: 'project' | 'experience'`, `data: ProjectEntry | ExperienceEntry`.
- Notes: prevents body scroll while open; clicking overlay or pressing Escape closes the modal. Uses `--popup-overlay`, `--cream`, and `--dull-blue` tokens for consistent visuals.

### ExperienceCard

- Path: `app/components/cards/ExperienceCard.tsx`
- Purpose: Summary card for a single experience entry. Clicking opens `DetailPopup`.
- Props: `experience: ExperienceEntry`, `onClick?: () => void`.
- Notes: image fallback handled in component.

### ProjectCard

- Path: `app/components/cards/ProjectCard.tsx`
- Purpose: Summary card for a single project. Clicking opens `DetailPopup`.
- Props: `project: ProjectEntry`, `onClick?: () => void`.
- Notes: uses `aspect-314/154` screenshot area; keep screenshot aspect ratio images consistent.

---

## Sticky / Layout components

### Footer

- Path: `app/components/stickyComponents/Footer.tsx`
- Purpose: Bottom footer with contact links and mascot.
- Notes: links live in `FOOTER_LINKS` constant at the top. Adjust typography sizes there if needed.

### NavBar

- Path: `app/components/stickyComponents/Navbar.tsx`
- Purpose: Top navigation bar with desktop links and a toggleable mobile scattered menu.
- Notes: uses `framer-motion` for the mobile menu and the hamburger animation. Scroll state toggles a translucent backdrop. If changing link placement for the mobile scattered menu, update `NAV_LINKS`.

---
