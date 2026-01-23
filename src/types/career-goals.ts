// Career Goal Types and Constants

// Union Types
export type GoalStatus = 'active' | 'completed' | 'paused' | 'archived';
export type GoalPriority = 'high' | 'medium' | 'low';
export type GoalCategory =
  | 'career-advancement'
  | 'skill-development'
  | 'networking'
  | 'education'
  | 'certification'
  | 'job-search'
  | 'personal-brand'
  | 'work-life-balance';
export type MilestoneStatus = 'pending' | 'in-progress' | 'completed' | 'skipped';
export type AchievementType =
  | 'goal-completed'
  | 'streak'
  | 'milestone-master'
  | 'category-expert'
  | 'early-bird'
  | 'consistency';
export type GoalSortOption =
  | 'priority'
  | 'dueDate'
  | 'progress'
  | 'createdAt'
  | 'title';

// Core Interfaces
export interface Milestone {
  id: string;
  title: string;
  description?: string;
  status: MilestoneStatus;
  dueDate?: string;
  completedAt?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  status: GoalStatus;
  priority: GoalPriority;
  progress: number; // 0-100
  milestones: Milestone[];
  startDate: string;
  targetDate: string;
  completedAt?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  type: AchievementType;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string;
}

export interface GoalFilter {
  statuses?: GoalStatus[];
  priorities?: GoalPriority[];
  categories?: GoalCategory[];
  searchQuery?: string;
  hasOverdue?: boolean;
}

export interface GoalStatistics {
  total: number;
  byStatus: Record<GoalStatus, number>;
  completionRate: number;
  currentStreak: number;
  overdueGoals: number;
}

// Input Types for Mutations
export interface CreateGoalInput {
  title: string;
  description: string;
  category: GoalCategory;
  priority: GoalPriority;
  targetDate: string;
  startDate?: string;
  tags?: string[];
  milestones?: CreateMilestoneInput[];
}

export interface UpdateGoalInput {
  title?: string;
  description?: string;
  category?: GoalCategory;
  priority?: GoalPriority;
  status?: GoalStatus;
  targetDate?: string;
  tags?: string[];
}

export interface CreateMilestoneInput {
  title: string;
  description?: string;
  dueDate?: string;
}

export interface UpdateMilestoneInput {
  title?: string;
  description?: string;
  status?: MilestoneStatus;
  dueDate?: string;
}

// Configuration Constants
export const GOAL_STATUS_LABELS: Record<GoalStatus, string> = {
  active: 'Active',
  completed: 'Completed',
  paused: 'Paused',
  archived: 'Archived',
};

export const GOAL_STATUS_COLORS: Record<GoalStatus, string> = {
  active: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  paused: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  archived: 'bg-gray-100 text-gray-800 border-gray-200',
};

export const GOAL_PRIORITY_LABELS: Record<GoalPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const GOAL_PRIORITY_COLORS: Record<GoalPriority, string> = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-orange-100 text-orange-800 border-orange-200',
  low: 'bg-slate-100 text-slate-800 border-slate-200',
};

export const GOAL_CATEGORY_LABELS: Record<GoalCategory, string> = {
  'career-advancement': 'Career Advancement',
  'skill-development': 'Skill Development',
  networking: 'Networking',
  education: 'Education',
  certification: 'Certification',
  'job-search': 'Job Search',
  'personal-brand': 'Personal Brand',
  'work-life-balance': 'Work-Life Balance',
};

export const GOAL_CATEGORY_COLORS: Record<GoalCategory, string> = {
  'career-advancement': 'bg-purple-100 text-purple-800 border-purple-200',
  'skill-development': 'bg-blue-100 text-blue-800 border-blue-200',
  networking: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  education: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  certification: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'job-search': 'bg-amber-100 text-amber-800 border-amber-200',
  'personal-brand': 'bg-pink-100 text-pink-800 border-pink-200',
  'work-life-balance': 'bg-teal-100 text-teal-800 border-teal-200',
};

export const GOAL_CATEGORY_ICONS: Record<GoalCategory, string> = {
  'career-advancement': 'TrendingUp',
  'skill-development': 'BookOpen',
  networking: 'Users',
  education: 'GraduationCap',
  certification: 'Award',
  'job-search': 'Search',
  'personal-brand': 'Star',
  'work-life-balance': 'Heart',
};

export const MILESTONE_STATUS_LABELS: Record<MilestoneStatus, string> = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
  skipped: 'Skipped',
};

export const MILESTONE_STATUS_COLORS: Record<MilestoneStatus, string> = {
  pending: 'bg-gray-100 text-gray-800 border-gray-200',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  skipped: 'bg-slate-100 text-slate-500 border-slate-200',
};

export const ACHIEVEMENT_TYPE_LABELS: Record<AchievementType, string> = {
  'goal-completed': 'Goal Achiever',
  streak: 'Streak Master',
  'milestone-master': 'Milestone Master',
  'category-expert': 'Category Expert',
  'early-bird': 'Early Bird',
  consistency: 'Consistency Champion',
};

export const ACHIEVEMENT_COLORS: Record<AchievementType, string> = {
  'goal-completed': 'bg-green-500',
  streak: 'bg-orange-500',
  'milestone-master': 'bg-blue-500',
  'category-expert': 'bg-purple-500',
  'early-bird': 'bg-amber-500',
  consistency: 'bg-teal-500',
};

export const GOAL_SORT_LABELS: Record<GoalSortOption, string> = {
  priority: 'Priority',
  dueDate: 'Due Date',
  progress: 'Progress',
  createdAt: 'Date Created',
  title: 'Title',
};

// Default Values
export const DEFAULT_GOAL_VALUES: Partial<CareerGoal> = {
  status: 'active',
  priority: 'medium',
  progress: 0,
  milestones: [],
  tags: [],
};

export const DEFAULT_MILESTONE_VALUES: Partial<Milestone> = {
  status: 'pending',
};

// Validation Constants
export const GOAL_TITLE_MIN_LENGTH = 3;
export const GOAL_TITLE_MAX_LENGTH = 100;
export const GOAL_DESCRIPTION_MAX_LENGTH = 500;
export const MILESTONE_TITLE_MIN_LENGTH = 2;
export const MILESTONE_TITLE_MAX_LENGTH = 100;
export const MAX_MILESTONES_PER_GOAL = 20;
export const MAX_TAGS_PER_GOAL = 10;

// All available statuses for filtering
export const ALL_GOAL_STATUSES: GoalStatus[] = ['active', 'completed', 'paused', 'archived'];
export const ALL_GOAL_PRIORITIES: GoalPriority[] = ['high', 'medium', 'low'];
export const ALL_GOAL_CATEGORIES: GoalCategory[] = [
  'career-advancement',
  'skill-development',
  'networking',
  'education',
  'certification',
  'job-search',
  'personal-brand',
  'work-life-balance',
];
export const ALL_MILESTONE_STATUSES: MilestoneStatus[] = [
  'pending',
  'in-progress',
  'completed',
  'skipped',
];
export const ALL_GOAL_SORT_OPTIONS: GoalSortOption[] = [
  'priority',
  'dueDate',
  'progress',
  'createdAt',
  'title',
];
