import Image from "next/image";

interface LogoTextProps {
  text: string;
  logoSrc?: string;
}

export default function LogoText({ text, logoSrc }: LogoTextProps) {
  return (
    <div className="inline-flex items-center gap-2 w-fit">
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt=""
          aria-hidden="true"
          width={44}
          height={50}
          className="w-11 h-12.5 object-cover rounded-sm bg-(--cream-grey)"
          onError={(event) => {
            (event.currentTarget as HTMLImageElement).src = "/lumaBlue.png";
          }}
        />
      ) : (
        <div
          className="w-11 h-12.5 rounded-sm bg-(--cream-grey)"
          aria-hidden="true"
        />
      )}

      <p
        className="
          m-0 text-(--dark-blue)
          text-[3.125rem] max-sm:text-[2.375rem]
          leading-none text-right whitespace-nowrap
          [text-shadow:0_-1px_10px_rgba(69,99,149,0.5)]
        "
      >
        {text}
      </p>
    </div>
  );
}
