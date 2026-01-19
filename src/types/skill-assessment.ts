// Skill Assessment System Types

// Skill Categories
export type SkillCategory =
  | 'programming'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'soft-skills'
  | 'leadership'
  | 'communication'
  | 'problem-solving'
  | 'data-science';

// Assessment Difficulty
export type AssessmentDifficulty = 'beginner' | 'intermediate' | 'advanced';

// Question Types
export type QuestionType = 'multiple-choice' | 'true-false' | 'code-completion' | 'scenario-based';

// Assessment Question
export interface AssessmentQuestion {
  id: string;
  question: string;
  type: QuestionType;
  category: SkillCategory;
  difficulty: AssessmentDifficulty;
  options: string[];
  correctAnswer: number; // Index of correct answer in options array
  explanation: string;
  points: number;
  timeLimit: number; // in seconds
  tags: string[];
  codeSnippet?: string; // For code-completion questions
}

// Assessment Definition
export interface SkillAssessment {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  difficulty: AssessmentDifficulty;
  questions: AssessmentQuestion[];
  passingScore: number; // Percentage required to pass
  timeLimit: number; // Total time in seconds
  totalPoints: number;
  badge: AssessmentBadge;
  prerequisites?: string[]; // Assessment IDs that should be completed first
  createdAt: string;
  updatedAt: string;
}

// Assessment Badge
export interface AssessmentBadge {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

// User's Answer to a Question
export interface UserAnswer {
  questionId: string;
  selectedAnswer: number | null;
  isCorrect: boolean;
  timeSpent: number; // in seconds
  answeredAt: string;
}

// Assessment Session Status
export type AssessmentSessionStatus = 'not-started' | 'in-progress' | 'paused' | 'completed' | 'abandoned';

// Assessment Session
export interface AssessmentSession {
  id: string;
  assessmentId: string;
  userId: string;
  status: AssessmentSessionStatus;
  questions: AssessmentQuestion[];
  currentQuestionIndex: number;
  answers: UserAnswer[];
  startedAt?: string;
  completedAt?: string;
  pausedAt?: string;
  totalTimeSpent: number; // in seconds
  timeRemaining: number; // in seconds
}

// Assessment Result
export interface AssessmentResult {
  id: string;
  sessionId: string;
  assessmentId: string;
  assessmentTitle: string;
  userId: string;
  score: number; // Points earned
  totalPoints: number;
  percentage: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  completedAt: string;
  badge?: AssessmentBadge;
  categoryBreakdown: CategoryScore[];
  questionResults: QuestionResult[];
}

// Score breakdown by category
export interface CategoryScore {
  category: SkillCategory;
  correct: number;
  total: number;
  percentage: number;
}

// Individual question result
export interface QuestionResult {
  questionId: string;
  question: string;
  userAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
  points: number;
  earnedPoints: number;
  timeSpent: number;
  explanation: string;
}

// User's Assessment History
export interface AssessmentHistory {
  assessmentId: string;
  assessmentTitle: string;
  category: SkillCategory;
  attempts: AssessmentAttempt[];
  bestScore: number;
  lastAttemptDate: string;
  hasPassed: boolean;
  earnedBadge?: AssessmentBadge;
}

// Single Attempt Record
export interface AssessmentAttempt {
  id: string;
  sessionId: string;
  score: number;
  percentage: number;
  passed: boolean;
  timeSpent: number;
  completedAt: string;
}

// User's Overall Assessment Stats
export interface UserAssessmentStats {
  totalAssessmentsCompleted: number;
  totalAssessmentsPassed: number;
  totalPointsEarned: number;
  averageScore: number;
  totalTimeSpent: number; // in seconds
  badgesEarned: AssessmentBadge[];
  categoryPerformance: CategoryPerformance[];
  recentResults: AssessmentResult[];
  streak: number; // Days in a row with assessments
  lastAssessmentDate?: string;
}

// Performance per category
export interface CategoryPerformance {
  category: SkillCategory;
  assessmentsCompleted: number;
  averageScore: number;
  bestScore: number;
  totalQuestionsPracticed: number;
  correctAnswers: number;
  trend: 'improving' | 'stable' | 'declining';
}

// Skill Gap Analysis
export interface SkillGap {
  skill: string;
  category: SkillCategory;
  currentLevel: number; // 0-100
  requiredLevel: number; // 0-100
  gap: number; // requiredLevel - currentLevel
  recommendedAssessments: string[]; // Assessment IDs
  priority: 'high' | 'medium' | 'low';
}

// Job Skill Matching
export interface SkillMatch {
  jobId: string;
  jobTitle: string;
  requiredSkills: RequiredSkill[];
  userSkills: UserSkillLevel[];
  overallMatch: number; // 0-100 percentage
  gaps: SkillGap[];
}

// Required skill for a job
export interface RequiredSkill {
  skill: string;
  category: SkillCategory;
  requiredLevel: number; // 0-100
  importance: 'required' | 'preferred' | 'nice-to-have';
}

// User's skill level
export interface UserSkillLevel {
  skill: string;
  category: SkillCategory;
  level: number; // 0-100, calculated from assessment scores
  assessmentsBasis: string[]; // Assessment IDs used to calculate this level
  lastAssessedAt?: string;
  verified: boolean; // Has passed an assessment for this skill
}

// Assessment Filters
export interface AssessmentFilters {
  search?: string;
  categories?: SkillCategory[];
  difficulties?: AssessmentDifficulty[];
  status?: 'all' | 'completed' | 'not-started' | 'in-progress';
  hasBadge?: boolean;
}

// Assessment Sort Options
export type AssessmentSortOption =
  | 'title-asc'
  | 'title-desc'
  | 'difficulty-asc'
  | 'difficulty-desc'
  | 'newest'
  | 'oldest'
  | 'most-popular';

// Session Settings
export interface AssessmentSessionSettings {
  shuffleQuestions: boolean;
  showTimer: boolean;
  showProgress: boolean;
  allowSkip: boolean;
  allowReview: boolean;
  autoSubmitOnTimeout: boolean;
}

// Default Session Settings
export const DEFAULT_SESSION_SETTINGS: AssessmentSessionSettings = {
  shuffleQuestions: true,
  showTimer: true,
  showProgress: true,
  allowSkip: true,
  allowReview: true,
  autoSubmitOnTimeout: true,
};

// Category Labels for UI
export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  programming: 'Programming',
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  database: 'Database',
  devops: 'DevOps',
  'soft-skills': 'Soft Skills',
  leadership: 'Leadership',
  communication: 'Communication',
  'problem-solving': 'Problem Solving',
  'data-science': 'Data Science',
};

// Category Colors for UI
export const SKILL_CATEGORY_COLORS: Record<SkillCategory, string> = {
  programming: 'bg-blue-100 text-blue-800',
  frontend: 'bg-purple-100 text-purple-800',
  backend: 'bg-green-100 text-green-800',
  database: 'bg-orange-100 text-orange-800',
  devops: 'bg-cyan-100 text-cyan-800',
  'soft-skills': 'bg-pink-100 text-pink-800',
  leadership: 'bg-indigo-100 text-indigo-800',
  communication: 'bg-yellow-100 text-yellow-800',
  'problem-solving': 'bg-red-100 text-red-800',
  'data-science': 'bg-teal-100 text-teal-800',
};

// Difficulty Config for UI
export const ASSESSMENT_DIFFICULTY_CONFIG: Record<AssessmentDifficulty, { label: string; color: string; points: number }> = {
  beginner: { label: 'Beginner', color: 'bg-green-100 text-green-800', points: 10 },
  intermediate: { label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800', points: 20 },
  advanced: { label: 'Advanced', color: 'bg-red-100 text-red-800', points: 30 },
};

// Question Type Labels
export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  'multiple-choice': 'Multiple Choice',
  'true-false': 'True/False',
  'code-completion': 'Code Completion',
  'scenario-based': 'Scenario Based',
};
