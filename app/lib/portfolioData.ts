import type { ExperienceData } from "@/app/types/experience";
import type { ProjectsData } from "@/app/types/projects";
import type { SkillSet } from "@/app/types/skillSet";
import type { VolunteerData } from "@/app/types/volunteer";

import experienceData from "@/app/data/experience.json";
import projectsData from "@/app/data/projects.json";
import skillSetData from "@/app/data/skillSet.json";
import volunteerData from "@/app/data/volunteer.json";

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
