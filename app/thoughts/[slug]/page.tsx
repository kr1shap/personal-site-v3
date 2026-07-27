import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getThoughtsData } from "@/app/lib/portfolioData";
import {
  slugifyArticleTitle,
  type ArticleBlock,
  type ArticleThought,
} from "@/app/lib/types/thoughts";

import styles from "./article.module.css";

interface PageParams {
  params: Promise<{ slug: string }>;
}

/**
 * static + dynamic:
 *   • dynamicParams=false locks routes down — unknown slugs serve 404
 *     without spinning up the runtime. The dataset is fully static, so
 *     we don't need request-time evaluation.
 *   • generateStaticParams enumerates slugs at build.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const { thoughts } = getThoughtsData();
  return thoughts
    .filter((t): t is ArticleThought => t.type === "article")
    .map((article) => ({ slug: slugifyArticleTitle(article.title) }));
}

/**
 * Per-article metadata so the tab title and link unfurls read properly
 * when a thought gets shared.
 */
export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const { thoughts } = getThoughtsData();
  const article = thoughts.find(
    (t): t is ArticleThought =>
      t.type === "article" && slugifyArticleTitle(t.title) === slug,
  );
  if (!article) return { title: "thought not found" };
  return {
    title: `krisha's thoughts — ${article.title}`,
    description: article.preview,
  };
}

export default async function ArticlePage({ params }: PageParams) {
  const { slug } = await params;
  const { thoughts } = getThoughtsData();
  const article = thoughts.find(
    (t): t is ArticleThought =>
      t.type === "article" && slugifyArticleTitle(t.title) === slug,
  );
  if (!article) notFound();

  return (
    <article className={styles.articleContainer}>
      <div className={styles.headerNav}>
        <Link
          href="/thoughts"
          className={styles.backLink}
          aria-label="Back to thoughts"
        >
          <span aria-hidden className={styles.backArrow}>
            ←
          </span>
          back to thoughts
        </Link>
      </div>

      <div className="mb-12">
        <h1 className="text-[clamp(2.5rem,8.5vw,6.25rem)] leading-[1.05] text-[#456395] break-words hyphens-none">
          {article.title}
        </h1>
        <p className="text-[clamp(1.1rem,3.2vw,1.75rem)] mt-1 text-[#757272]">
          a thought{article.date ? ` · ${article.date}` : ""}
        </p>
      </div>

      <div className={styles.body}>
        {article.body.map((block, i) => renderBlock(block, i))}
      </div>
    </article>
  );
}

function renderBlock(block: ArticleBlock, key: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={key} className={styles.paragraph}>
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 key={key} className={styles.heading}>
          {block.text}
        </h2>
      );
    case "image":
      return (
        <figure key={key} className={styles.figure}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt ?? ""}
            className={styles.bodyImage}
          />
          {block.caption ? (
            <figcaption className={styles.caption}>{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case "quote":
      return (
        <blockquote key={key} className={styles.quote}>
          <p className={styles.quoteText}>&ldquo;{block.text}&rdquo;</p>
          {block.source ? (
            <cite className={styles.quoteSource}>&mdash; {block.source}</cite>
          ) : null}
        </blockquote>
      );
    case "list":
      return (
        <ul key={key} className={styles.list}>
          {block.items.map((item, i) => (
            <li key={i} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      );
    default: {
      return <></>
    }
  }
}
