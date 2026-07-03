export interface BadgeConfig {
  text: string
  icon: string
  color: string
}

export interface ColorScheme {
  primary: string
  secondary: string
  hover: string
}

export interface LinksConfig {
  showGithub: boolean
  showCaseStudy: boolean
}

export interface CategoryConfig {
  badge: BadgeConfig
  colors: ColorScheme
  links: LinksConfig
}

export interface ProjectData {
  id: string
  title: string
  category: string
  description: string
  icon: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
  collaborators?: number
  developmentTime?: string
  showTechCard?: boolean
  showProductionLink?: boolean
}

export interface ProjectSlide {
  cards: ProjectData[]
}
