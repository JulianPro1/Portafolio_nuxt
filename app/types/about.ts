export interface AgentFileContent {
  title: string;
  content: string;
}

export type AgentFilesMap = Record<string, AgentFileContent>;

export type AboutWidgetType = 
  | 'JsonConfigCard' 
  | 'GithubContributionsCard' 
  | 'AgentEditorCard' 
  | 'TerminalGraduationCard' 
  | 'QualityDashboardCard';

export interface AboutStep {
  index: number;
  title: string;
  widgetType: AboutWidgetType;
  contentSlug: string;
}

export interface AboutSectionConfig {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  steps: AboutStep[];
}
