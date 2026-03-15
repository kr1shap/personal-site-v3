Plan: Apple Music Playlist Embed

Goal

- Embed an Apple Music playlist into the Next.js portfolio site with a reusable, responsive component and an optional Music section on the home page.

Steps

1. Create a client component `ApplePlaylistEmbed.tsx` under app/components that renders the Apple Music iframe and accepts props:
   - `playlistId` (string)
   - `width` / `height` / `responsive` (optional)
   - `title` / `ariaLabel` for accessibility
     Implement as a lightweight iframe wrapper and use `useEffect` only if dynamic sizing or messaging is required.

2. Create `MusicSection.tsx` under app/(home)/\_sections to host the embed and explanatory text. Mark as a client component only if it uses lifecycle hooks; otherwise import the client embed inside it.

3. Import `MusicSection` into app/(home)/page.tsx in the desired location (new section or inside Projects/Footer).

4. Add responsive CSS utilities to ensure the iframe scales on narrow screens and remains accessible (focusable title, `title` attribute, `aria-label`).

5. Test locally: run the Next.js dev server and verify the playlist loads and is responsive across breakpoints. If the iframe is blocked by embed policies, consider using `next/dynamic` with `ssr: false` and/or a static fallback link.

6. (Optional) Add a small wrapper to dynamically load the embed only on interaction (click-to-load) to reduce third-party requests on initial load.

Notes

- Use a client component (`"use client"`) for any code that accesses `window` or uses React hooks; otherwise the iframe HTML can be rendered from a server component.
- Apple Music provides embeddable iframe snippets; you can paste that into the iframe `src` and parameterize the playlist ID.
- Placement options: create a dedicated MusicSection (recommended) or add to ProjectsSection or Footer for compactness.

Example iframe snippet (parameterize `playlistId`):

<iframe allow="autoplay *; encrypted-media *;" frameBorder="0" height="450" style="width:100%;max-width:900px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" src={`https://embed.music.apple.com/us/playlist/${playlistId}`} title={title}></iframe>

Next actions

- Choose placement (new MusicSection vs existing Projects/Footer).
- I can scaffold the component and section now if you want—pick placement or say "wherever you prefer".
