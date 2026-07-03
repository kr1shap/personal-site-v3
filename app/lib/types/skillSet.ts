export interface Skill {
  name: string;
  img_url: string;
  isFavourite?: boolean;
  note?: string; 
}

export interface SkillSet {
  ProgrammingLanguages: Skill[];
  FrameworksTools: Skill[];
  Databases: Skill[];
  Build_Deployment: Skill[];
  Security_Monitoring: Skill[]
  Tools_Other: Skill[];
}
