export interface ContactQuickAction {
  href: string;
  icon: string;
  title: string;
  description: string;
  external?: boolean;
}

export interface ContactIndex {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  quickActions: ContactQuickAction[];
  educationTitle: string;
  educationDescription: string;
  floatingTip: string;
}

export interface ContactExperience {
  id: number;
  title: string;
  institution: string;
  icon: string;
  description: string;
  period: string;
  location: string;
  url?: string;
  urlText?: string;
}

export interface ContactFaq {
  question: string;
  answer: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}
