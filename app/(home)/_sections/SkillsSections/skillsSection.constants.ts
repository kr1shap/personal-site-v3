import type { SkillSet } from "@/app/lib/types/skillSet";

export const CATEGORY_LABELS: Record<keyof SkillSet, string> = {
  ProgrammingLanguages: "languages",
  FrameworksTools: "frameworks/libs",
  Databases: "databases",
  DevOps_Cloud: "devops",
  Tools_Other: "tools",
};

export const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS) as (keyof SkillSet)[];

export const CATEGORY_ICON = "/bluebutton.png";

export const getSkillsGridMotionProps = (prefersReducedMotion: boolean) => ({
  initial: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 8,
    scale: prefersReducedMotion ? 1 : 0.99,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: prefersReducedMotion ? 0.2 : 0.34,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : -6,
    scale: prefersReducedMotion ? 1 : 0.99,
    transition: {
      duration: prefersReducedMotion ? 0.12 : 0.18,
      ease: [0.4, 0, 1, 1] as [number, number, number, number],
    },
  },
});

export const getSkillItemMotionProps = (
  prefersReducedMotion: boolean,
  index: number,
) => ({
  initial: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 12,
    scale: prefersReducedMotion ? 1 : 0.92,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: prefersReducedMotion ? index * 0.012 : index * 0.03,
      duration: prefersReducedMotion ? 0.16 : 0.46,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : -8,
    scale: prefersReducedMotion ? 1 : 0.95,
    transition: {
      duration: prefersReducedMotion ? 0.1 : 0.16,
      ease: [0.4, 0, 1, 1] as [number, number, number, number],
    },
  },
});
