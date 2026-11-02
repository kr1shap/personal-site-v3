import Link from "next/link";
import {
  slugifyArticleTitle,
  type ArticleThought,
} from "@/app/lib/types/thoughts";

export default function ThoughtPreviewCard({
  thought,
  headingAs: Heading = "h3",
  className = "",
}: {
  thought: ArticleThought;
  headingAs?: "h2" | "h3";
  className?: string;
}) {
  return (
    <Link
      href={`/thoughts/${slugifyArticleTitle(thought.title)}`}
      aria-label={thought.title}
      className={`group flex min-h-[10.5rem] flex-col rounded-[0.5rem] border-2 border-[#456395]/35 bg-[#fbf7ee] px-5 py-4 text-[#1f2545] no-underline shadow-[3px_4px_10.4px_0px_rgba(69,99,149,0.18)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[#456395] hover:shadow-[3px_7px_18px_0px_rgba(69,99,149,0.24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#145bd2] ${className}`}
    >
      <span className="mb-2 text-[0.9rem] font-semibold lowercase tracking-[0.06em] text-[#456395]/75">
        {thought.date ?? "undated"}
      </span>
      <Heading className="m-0 text-[2rem] leading-[1.02] text-[#1c4b9a]">
        {thought.title}
      </Heading>
      <p className="mb-4 mt-3 line-clamp-3 text-[1.05rem] leading-snug text-[#4a4f73]">
        {thought.preview}
      </p>
      <span className="mt-auto text-[1rem] font-semibold text-[#456395] transition-colors group-hover:text-[#145bd2]">
        open thought →
      </span>
    </Link>
  );
}
