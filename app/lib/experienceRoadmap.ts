export function sortExperiencesByRecency<T extends { date: string }>(
  entries: readonly T[],
): T[] {
  const seasonOrder = {
    winter: 0,
    spring: 1,
    summer: 2,
    fall: 3,
  } as const;

  const timelineValue = (date: string) => {
    const match = date.toLowerCase().match(/(winter|spring|summer|fall)\s+(\d{4})/);
    if (!match) return Number.POSITIVE_INFINITY;

    const season = match[1] as keyof typeof seasonOrder;
    return Number(match[2]) * 4 + seasonOrder[season];
  };

  return [...entries].sort(
    (left, right) => timelineValue(right.date) - timelineValue(left.date),
  );
}
