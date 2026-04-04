import type { ExperienceData } from "@/app/lib/types/experience";
import type { ProjectsData } from "@/app/lib/types/projects";
import type { SkillSet } from "@/app/lib/types/skillSet";
import type { VolunteerData } from "@/app/lib/types/volunteer";

import experienceData from "./data/experience.json";
import projectsData from "./data/projects.json";
import skillSetData from "./data/skillSet.json";
import volunteerData from "./data/volunteer.json";

export function getExperienceData(): ExperienceData {
  return experienceData as ExperienceData;
}

export function getProjectsData(): ProjectsData {
  return projectsData as ProjectsData;
}

export function getSkillSetData(): SkillSet {
  return skillSetData as SkillSet;
}

export function getVolunteerData(): VolunteerData {
  return volunteerData as VolunteerData;
}
