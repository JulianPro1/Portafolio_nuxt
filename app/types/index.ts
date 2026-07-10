
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
export * from './about';
export * from './portfolio-preview';
export * from './contact';

