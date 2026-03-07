export interface Skill {
  name: string;
  img_url: string;
  isFavourite?: boolean;
}

export interface SkillSet {
  ProgrammingLanguages: Skill[];
  FrameworksTools: Skill[];
  Databases: Skill[];
  DevOps_Cloud: Skill[];
  Tools_Other: Skill[];
}
