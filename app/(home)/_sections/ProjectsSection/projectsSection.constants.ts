import type { ProjectsData } from "@/app/lib/types/projects";

export const CATEGORY_ORDER: Array<keyof ProjectsData> = [
  "mobile",
  "webdev",
  "other",
];

export const CATEGORY_LABELS: Record<keyof ProjectsData, string> = {
  mobile: "mobile",
  webdev: "more web dev",
  other: "other",
};
