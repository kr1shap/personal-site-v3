export interface ProjectEntry {
  title: string;
  stack: string;
  description: string;
  bullets: string[];
  img: string;
  url: string;
  date: string;
}

export interface ProjectsData {
  projects: ProjectEntry[];
}
