// Interview Preparation Hub Types

// Question Categories
export type QuestionCategory =
  | 'behavioral'
  | 'technical'
  | 'situational'
  | 'case-study'
  | 'system-design'
  | 'coding';

// Difficulty Levels
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// Interview Question
export interface InterviewQuestion {
  id: string;
  question: string;
  category: QuestionCategory;
  difficulty: DifficultyLevel;
  company?: string;
  tags: string[];
  sampleAnswer?: string;
  tips?: string[];
  followUps?: string[];
  timesAsked: number;
  createdAt: string;
}

// Mock Interview Session Status
export type SessionStatus = 'not-started' | 'in-progress' | 'paused' | 'completed';

// Mock Interview Settings
export interface MockInterviewSettings {
  questionCount: number;
  timePerQuestion: number; // in seconds
  categories: QuestionCategory[];
  difficulties: DifficultyLevel[];
  includeFollowUps: boolean;
}

// Interview Answer
export interface InterviewAnswer {
  questionId: string;
  answer: string;
  duration: number; // in seconds
  recordingUrl?: string;
  notes?: string;
  selfRating?: 1 | 2 | 3 | 4 | 5;
  submittedAt: string;
}

// Mock Interview Session
export interface MockInterviewSession {
  id: string;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  answers: InterviewAnswer[];
  status: SessionStatus;
  startedAt?: string;
  completedAt?: string;
  totalDuration: number; // in seconds
  settings: MockInterviewSettings;
}

// Performance Trend
export type PerformanceTrend = 'improving' | 'stable' | 'declining';

// Category Performance
export interface CategoryPerformance {
  category: QuestionCategory;
  questionsPracticed: number;
  averageScore: number;
  trend: PerformanceTrend;
}

// Session Summary
export interface SessionSummary {
  id: string;
  date: string;
  questionsAnswered: number;
  averageScore: number;
  duration: number; // in seconds
  categories: QuestionCategory[];
}

// Weekly Progress
export interface WeeklyProgress {
  week: string;
  weekStart: string;
  weekEnd: string;
  sessionsCompleted: number;
  questionsAnswered: number;
  averageScore: number;
  totalPracticeTime: number; // in seconds
}

// Overall Interview Performance
export interface InterviewPerformance {
  totalSessions: number;
  totalQuestionsPracticed: number;
  totalPracticeTime: number; // in seconds
  averageScore: number;
  categoryBreakdown: CategoryPerformance[];
  recentSessions: SessionSummary[];
  weeklyProgress: WeeklyProgress[];
  strengths: string[];
  areasToImprove: string[];
  lastPracticeDate?: string;
}

// Saved Answer for Answer Bank
export interface SavedAnswer {
  id: string;
  questionId: string;
  question: string;
  answer: string;
  category: QuestionCategory;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  tags?: string[];
}

// Question Filter Options
export interface QuestionFilters {
  search?: string;
  categories?: QuestionCategory[];
  difficulties?: DifficultyLevel[];
  company?: string;
  tags?: string[];
}

// Question Sort Options
export type QuestionSortOption = 'newest' | 'oldest' | 'most-asked' | 'difficulty-asc' | 'difficulty-desc';

// Session Setup Form Data
export interface SessionSetupFormData {
  questionCount: number;
  timePerQuestion: number;
  categories: QuestionCategory[];
  difficulties: DifficultyLevel[];
  includeFollowUps: boolean;
}

// Timer State
export interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
}

// Category Labels for UI
export const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  behavioral: 'Behavioral',
  technical: 'Technical',
  situational: 'Situational',
  'case-study': 'Case Study',
  'system-design': 'System Design',
  coding: 'Coding',
};

// Difficulty Labels and Colors for UI
export const DIFFICULTY_CONFIG: Record<DifficultyLevel, { label: string; color: string }> = {
  easy: { label: 'Easy', color: 'bg-green-100 text-green-800' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  hard: { label: 'Hard', color: 'bg-red-100 text-red-800' },
};

// Category Colors for UI
export const CATEGORY_COLORS: Record<QuestionCategory, string> = {
  behavioral: 'bg-blue-100 text-blue-800',
  technical: 'bg-purple-100 text-purple-800',
  situational: 'bg-orange-100 text-orange-800',
  'case-study': 'bg-pink-100 text-pink-800',
  'system-design': 'bg-indigo-100 text-indigo-800',
  coding: 'bg-cyan-100 text-cyan-800',
};

// Default Mock Interview Settings
export const DEFAULT_MOCK_INTERVIEW_SETTINGS: MockInterviewSettings = {
  questionCount: 5,
  timePerQuestion: 180, // 3 minutes
  categories: ['behavioral', 'technical', 'situational'],
  difficulties: ['easy', 'medium'],
  includeFollowUps: false,
};
