"use client";

interface ApplePlaylistEmbedProps {
  playlistId: string;
  playlistSlug: string;
  storefront?: string;
  title?: string;
  ariaLabel?: string;
  height?: number;
  responsive?: boolean;
  className?: string;
}

export default function ApplePlaylistEmbed({
  playlistId,
  playlistSlug,
  storefront = "ca",
  title = "Apple Music playlist",
  ariaLabel,
  height = 450,
  responsive = true,
  className = "",
}: ApplePlaylistEmbedProps) {
  const src = `https://embed.music.apple.com/${storefront}/playlist/${playlistSlug}/${playlistId}`;

  return (
    <div
      className={[
        "overflow-hidden rounded-4xl border-[3px] border-(--dark-blue) bg-white/70 p-3 shadow-(--card-shadow) backdrop-blur-sm sm:p-4",
        className,
      ].join(" ")}
    >
      <iframe
        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
        aria-label={ariaLabel ?? title}
        className={[
          "block w-full rounded-[1.4rem] border-0 bg-transparent",
          responsive ? "min-h-[420px] sm:min-h-[450px]" : "",
        ].join(" ")}
        height={height}
        loading="lazy"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src={src}
        title={title}
      />
    </div>
  );
}
