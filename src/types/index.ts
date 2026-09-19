export type StoryCategory = 
  | 'All'
  | 'History'
  | 'Psychology'
  | 'Philosophy'
  | 'Science'
  | 'Society'
  | 'Technology'
  | 'Personal';

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Exclude<StoryCategory, 'All'>;
  date: string;
  readingTime: string;
  shortDescription: string;
  fullArticle: string[];
  keyTakeaway?: string;
  tags: string[];
  featured?: boolean;
}

export type OpinionCategory = 
  | 'ALL'
  | 'ESSAYS'
  | 'OPINIONS'
  | 'PERSONAL NOTES'
  | 'COPYWRITING'
  | 'IDEAS';

export interface Opinion {
  id: string;
  slug: string;
  title: string;
  category: Exclude<OpinionCategory, 'ALL'>;
  date: string;
  readingTime: string;
  summary: string;
  corePerspective: string;
  fullContent: string[];
  tags: string[];
}

export type LearningStatus = 
  | 'Exploring'
  | 'Learning'
  | 'Practicing'
  | 'Applied'
  | 'Deep Dive';

export interface LearningItem {
  id: string;
  subject: string;
  category: 'Communication' | 'Story & Writing' | 'Sales & Business' | 'Tech & Systems' | 'Psychology & Thinking' | 'Finance';
  status: LearningStatus;
  statusDescription: string;
  whatILearned: string;
  booksAndSources: string[];
  notesAndInsights: string[];
  currentProjects: string[];
  lastUpdated: string;
}

export type ProjectStatus = 
  | 'Idea'
  | 'Experiment'
  | 'Building'
  | 'Completed'
  | 'Archived';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  whatIBuilt: string;
  whatILearned: string;
  technologies: string[];
  status: ProjectStatus;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  whatIDid: string[];
  whatILearned: string[];
  whatChanged: string;
  keyCompetencies: string[];
}

export interface SocialItem {
  id: string;
  platform: string;
  handle: string;
  url: string;
  description: string;
  badge?: string;
}

export interface ProfileData {
  name: string;
  shortName: string;
  headlineOptions: string[];
  tagline: string;
  location: string;
  statusNote: string;
  bioShort: string;
  bioNarrative: string[];
  email: string;
  whatsapp?: string;
  instagram: string;
  photoUrl?: string;
  cvUrl?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
  tiktok?: string;
}
