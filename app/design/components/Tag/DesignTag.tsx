export function DesignTag(tag: string) {
  return (
    <span
      key={tag}
      className="inline-block px-3 py-0.5 rounded-full text-[15px] text-[#f6f7ed] bg-[#456395]"
    >
      {tag}
    </span>
  );
}

export default function DesignTagList({ tags }: { tags: string[] }) {
  return (
    <>
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block px-3 py-0.5 rounded-full text-[15px] text-[#f6f7ed] bg-[#456395]"
        >
          {tag}
        </span>
      ))}
    </>
  );
}
