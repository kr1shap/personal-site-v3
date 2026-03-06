export interface Skill {
  name: string;
  img_url: string;
}

export interface SkillSet {
  ProgrammingLanguages: Skill[];
  Frameworks: Skill[];
  Tools: Skill[];
}
