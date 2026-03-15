import { FaApple, FaArrowUpRightFromSquare } from "react-icons/fa6";
import ApplePlaylistEmbed from "@/app/components/ApplePlaylistEmbed";

export default function MusicSection() {
  return (
    <section
      id="music"
      className="w-full px-4 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(340px,1.15fr)] lg:items-center lg:gap-12">
        <div className="flex flex-col gap-5 lg:justify-center">
          <div>
            <h2 className="text-[clamp(3.125rem,13vw,7.5rem)] leading-[0.95] text-(--dull-blue)">
              playlist
            </h2>
            <p className="-mt-1 text-[clamp(1.5rem,4.2vw,2.5rem)] leading-none text-(--dull-grey)">
              a few tracks that fit the site
            </p>
          </div>

        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-5 -top-5 h-28 rounded-full bg-(--bright-blue)/12 blur-3xl"
          />
          <div className="relative">
            {/* playlist ID isnt private so idc lol */}
            <ApplePlaylistEmbed
              playlistId="pl.u-11zBJyyFN4KLAr7"
              playlistSlug="website-playlist"
              storefront="ca"
              title="Website playlist on Apple Music"
              ariaLabel="Embedded Apple Music playlist for the website"
              height={450}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
