export interface TechSkill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  label: string;
  icon: string;
}

export interface ProjectStat {
  label: string;
  value: string;
  icon: string;
}

export interface SocialLink {
  label: string;
  icon: string;
}

export interface Skill {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  shortDescription: string;
  tags: string[];
  level?: number;
  practicalCase?: string;
  highlight?: boolean;
}

