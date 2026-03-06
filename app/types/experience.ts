export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  description: string;
  bullets: string[];
  img: string;
  date: string;
}

export interface ExperienceData {
  experience: ExperienceEntry[];
}
