export interface VolunteerEntry {
  title: string;
  description: string;
  bullets: string[];
  img: string;
}

export interface VolunteerData {
  volunteer: VolunteerEntry[];
}
