import {
  QuestionCategory,
  DifficultyLevel,
  InterviewQuestion,
  InterviewAnswer,
  MockInterviewSession,
  CATEGORY_LABELS,
  DIFFICULTY_CONFIG,
  CATEGORY_COLORS,
} from '@/types/interview-prep';

/**
 * Format duration in seconds to a readable string (MM:SS or HH:MM:SS)
 */
export function formatDuration(seconds: number): string {
  if (seconds < 0) return '0:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format duration in seconds to a human-readable string
 */
export function formatDurationLong(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    const hourStr = `${hours} hour${hours !== 1 ? 's' : ''}`;
    if (minutes > 0) {
      return `${hourStr} ${minutes} min`;
    }
    return hourStr;
  }

  return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
}

/**
 * Get human-readable label for a category
 */
export function getCategoryLabel(category: QuestionCategory): string {
  return CATEGORY_LABELS[category] || category;
}

/**
 * Get difficulty configuration (label and color)
 */
export function getDifficultyConfig(difficulty: DifficultyLevel): { label: string; color: string } {
  return DIFFICULTY_CONFIG[difficulty];
}

/**
 * Get category color class
 */
export function getCategoryColor(category: QuestionCategory): string {
  return CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-800';
}

/**
 * Calculate average score from answers
 */
export function calculateAverageScore(answers: InterviewAnswer[]): number {
  if (answers.length === 0) return 0;

  const ratedAnswers = answers.filter((a) => a.selfRating !== undefined);
  if (ratedAnswers.length === 0) return 0;

  const sum = ratedAnswers.reduce((total, a) => total + (a.selfRating || 0), 0);
  return Math.round((sum / ratedAnswers.length) * 10) / 10;
}

/**
 * Calculate session score based on answers
 */
export function calculateSessionScore(session: MockInterviewSession): number {
  return calculateAverageScore(session.answers);
}

/**
 * Validate STAR method structure in an answer
 * Returns an object with which STAR components are present
 */
export function validateSTARStructure(answer: string): {
  hasSituation: boolean;
  hasTask: boolean;
  hasAction: boolean;
  hasResult: boolean;
  score: number;
  feedback: string[];
} {
  const lowerAnswer = answer.toLowerCase();
  const feedback: string[] = [];

  // Keywords that indicate each STAR component
  const situationKeywords = [
    'situation',
    'context',
    'background',
    'scenario',
    'when i was',
    'at my previous',
    'in my role',
    'there was a time',
    'i was working',
  ];
  const taskKeywords = [
    'task',
    'goal',
    'objective',
    'responsible for',
    'needed to',
    'had to',
    'my job was',
    'challenge was',
    'problem was',
  ];
  const actionKeywords = [
    'action',
    'i did',
    'i decided',
    'i took',
    'i implemented',
    'i created',
    'i developed',
    'i organized',
    'i led',
    'i started',
    'my approach',
  ];
  const resultKeywords = [
    'result',
    'outcome',
    'achieved',
    'led to',
    'resulted in',
    'improved',
    'increased',
    'decreased',
    'saved',
    'success',
    'learned',
    'impact',
  ];

  const hasSituation = situationKeywords.some((k) => lowerAnswer.includes(k));
  const hasTask = taskKeywords.some((k) => lowerAnswer.includes(k));
  const hasAction = actionKeywords.some((k) => lowerAnswer.includes(k));
  const hasResult = resultKeywords.some((k) => lowerAnswer.includes(k));

  if (!hasSituation) feedback.push('Consider adding more context about the situation');
  if (!hasTask) feedback.push('Clarify what your specific task or goal was');
  if (!hasAction) feedback.push('Describe the specific actions you took');
  if (!hasResult) feedback.push('Include the results or outcomes of your actions');

  const components = [hasSituation, hasTask, hasAction, hasResult];
  const score = components.filter(Boolean).length;

  return {
    hasSituation,
    hasTask,
    hasAction,
    hasResult,
    score,
    feedback: feedback.length > 0 ? feedback : ['Great job including all STAR components!'],
  };
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Shuffle questions while maintaining some ordering preferences
 */
export function shuffleQuestions(questions: InterviewQuestion[]): InterviewQuestion[] {
  return shuffleArray(questions);
}

/**
 * Filter questions by difficulty levels
 */
export function filterByDifficulty(
  questions: InterviewQuestion[],
  difficulties: DifficultyLevel[]
): InterviewQuestion[] {
  if (difficulties.length === 0) return questions;
  return questions.filter((q) => difficulties.includes(q.difficulty));
}

/**
 * Filter questions by categories
 */
export function filterByCategories(
  questions: InterviewQuestion[],
  categories: QuestionCategory[]
): InterviewQuestion[] {
  if (categories.length === 0) return questions;
  return questions.filter((q) => categories.includes(q.category));
}

/**
 * Generate a study plan based on target date and weak areas
 */
export function generateStudyPlan(
  targetDate: Date,
  weakCategories: QuestionCategory[],
  questionsPerDay: number = 5
): {
  daysUntilTarget: number;
  totalQuestions: number;
  dailyPlan: { category: QuestionCategory; count: number }[];
  recommendations: string[];
} {
  const now = new Date();
  const daysUntilTarget = Math.max(
    1,
    Math.ceil((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );
  const totalQuestions = daysUntilTarget * questionsPerDay;

  // Distribute questions across weak categories
  const categoriesCount = weakCategories.length || 1;
  const questionsPerCategory = Math.ceil(questionsPerDay / categoriesCount);

  const dailyPlan = weakCategories.map((category) => ({
    category,
    count: questionsPerCategory,
  }));

  // If no weak categories specified, create a balanced plan
  if (weakCategories.length === 0) {
    const allCategories: QuestionCategory[] = [
      'behavioral',
      'technical',
      'situational',
    ];
    dailyPlan.push(
      ...allCategories.map((category) => ({
        category,
        count: Math.ceil(questionsPerDay / allCategories.length),
      }))
    );
  }

  const recommendations: string[] = [];

  if (daysUntilTarget < 7) {
    recommendations.push('Focus on your most common question types');
    recommendations.push('Practice with timed sessions to improve speed');
  } else if (daysUntilTarget < 14) {
    recommendations.push('Balance practice across all categories');
    recommendations.push('Start doing full mock interviews');
  } else {
    recommendations.push('Build a strong foundation in fundamentals');
    recommendations.push('Focus extra time on weak areas');
    recommendations.push('Gradually increase difficulty level');
  }

  if (weakCategories.includes('coding')) {
    recommendations.push('Practice coding problems daily on LeetCode or similar');
  }

  if (weakCategories.includes('system-design')) {
    recommendations.push('Study system design patterns and review case studies');
  }

  return {
    daysUntilTarget,
    totalQuestions,
    dailyPlan,
    recommendations,
  };
}

/**
 * Get a score color based on the score value
 */
export function getScoreColor(score: number): string {
  if (score >= 4.5) return 'text-green-600';
  if (score >= 4.0) return 'text-green-500';
  if (score >= 3.5) return 'text-yellow-600';
  if (score >= 3.0) return 'text-yellow-500';
  if (score >= 2.5) return 'text-orange-500';
  return 'text-red-500';
}

/**
 * Get a score background color based on the score value
 */
export function getScoreBgColor(score: number): string {
  if (score >= 4.5) return 'bg-green-100';
  if (score >= 4.0) return 'bg-green-50';
  if (score >= 3.5) return 'bg-yellow-100';
  if (score >= 3.0) return 'bg-yellow-50';
  if (score >= 2.5) return 'bg-orange-100';
  return 'bg-red-100';
}

/**
 * Get score label based on score value
 */
export function getScoreLabel(score: number): string {
  if (score >= 4.5) return 'Excellent';
  if (score >= 4.0) return 'Very Good';
  if (score >= 3.5) return 'Good';
  if (score >= 3.0) return 'Satisfactory';
  if (score >= 2.5) return 'Needs Work';
  return 'Needs Improvement';
}

/**
 * Get trend icon and color
 */
export function getTrendDisplay(trend: 'improving' | 'stable' | 'declining'): {
  icon: string;
  color: string;
  label: string;
} {
  switch (trend) {
    case 'improving':
      return { icon: '↑', color: 'text-green-600', label: 'Improving' };
    case 'stable':
      return { icon: '→', color: 'text-yellow-600', label: 'Stable' };
    case 'declining':
      return { icon: '↓', color: 'text-red-600', label: 'Needs Attention' };
  }
}

/**
 * Calculate word count
 */
export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

/**
 * Check if answer meets minimum length requirements
 */
export function isAnswerLengthValid(
  answer: string,
  minWords: number = 50
): { valid: boolean; wordCount: number; message: string } {
  const wordCount = countWords(answer);
  const valid = wordCount >= minWords;

  let message = '';
  if (!valid) {
    message = `Your answer has ${wordCount} words. Aim for at least ${minWords} words for a complete response.`;
  } else if (wordCount > 300) {
    message = `Your answer has ${wordCount} words. Consider being more concise (ideal: 100-200 words).`;
  } else {
    message = `Good length: ${wordCount} words.`;
  }

  return { valid, wordCount, message };
}

/**
 * Generate a unique session ID
 */
export function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a unique answer ID
 */
export function generateAnswerId(): string {
  return `answer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format a date relative to now
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      if (diffMinutes < 1) return 'Just now';
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  }

  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) !== 1 ? 's' : ''} ago`;

  return date.toLocaleDateString();
}

/**
 * Get estimated time to complete questions
 */
export function getEstimatedTime(
  questionCount: number,
  secondsPerQuestion: number = 180
): string {
  const totalSeconds = questionCount * secondsPerQuestion;
  return formatDurationLong(totalSeconds);
}

/**
 * Calculate completion percentage
 */
export function calculateCompletionPercentage(
  current: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}

/**
 * Get motivational message based on performance
 */
export function getMotivationalMessage(score: number, trend: string): string {
  if (score >= 4.5 && trend === 'improving') {
    return "Outstanding progress! You're interview-ready!";
  }
  if (score >= 4.0) {
    return "Great job! Keep up the excellent work!";
  }
  if (score >= 3.5 && trend === 'improving') {
    return "You're improving steadily. Keep practicing!";
  }
  if (score >= 3.0) {
    return "Good progress. Focus on your weak areas to level up.";
  }
  return "Every practice session makes you better. Keep going!";
}

/**
 * Validate session settings
 */
export function validateSessionSettings(settings: {
  questionCount: number;
  timePerQuestion: number;
  categories: QuestionCategory[];
  difficulties: DifficultyLevel[];
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (settings.questionCount < 1 || settings.questionCount > 20) {
    errors.push('Question count must be between 1 and 20');
  }

  if (settings.timePerQuestion < 30 || settings.timePerQuestion > 600) {
    errors.push('Time per question must be between 30 seconds and 10 minutes');
  }

  if (settings.categories.length === 0) {
    errors.push('Please select at least one category');
  }

  if (settings.difficulties.length === 0) {
    errors.push('Please select at least one difficulty level');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
