import {
  InterviewPerformance,
  CategoryPerformance,
  SessionSummary,
  WeeklyProgress,
  SavedAnswer,
  QuestionCategory,
  MockInterviewSession,
  InterviewAnswer,
} from '@/types/interview-prep';

// Mock saved answers for the answer bank
export const savedAnswers: SavedAnswer[] = [
  {
    id: 'sa-1',
    questionId: 'q-1',
    question: 'Tell me about a time when you had to deal with a difficult team member. How did you handle it?',
    answer: 'In my previous role at TechCorp, I worked with a colleague who frequently missed deadlines and was defensive when approached. I scheduled a private one-on-one meeting to understand their perspective. I discovered they were overwhelmed with competing priorities from multiple managers. Together, we created a priority matrix and I helped advocate for clearer expectations with leadership. Within a month, their delivery improved significantly and we developed a strong working relationship.',
    category: 'behavioral',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-02-15T14:20:00Z',
    isFavorite: true,
    tags: ['teamwork', 'conflict-resolution'],
  },
  {
    id: 'sa-2',
    questionId: 'q-10',
    question: 'What is the virtual DOM and how does it improve performance in React?',
    answer: 'The virtual DOM is a lightweight JavaScript representation of the actual DOM tree. When state changes in a React application, React first updates the virtual DOM, then compares it with the previous version using a diffing algorithm. This process, called reconciliation, identifies the minimum number of changes needed. React then batches these updates and applies them to the real DOM in a single operation. This approach is more efficient than direct DOM manipulation because: 1) DOM operations are expensive, 2) Batching reduces reflows and repaints, 3) The diffing algorithm optimizes what needs to change.',
    category: 'technical',
    createdAt: '2024-01-25T09:15:00Z',
    updatedAt: '2024-01-25T09:15:00Z',
    isFavorite: true,
    tags: ['react', 'performance'],
  },
  {
    id: 'sa-3',
    questionId: 'q-34',
    question: 'Tell me about yourself and your background.',
    answer: 'I\'m a software engineer with 5 years of experience specializing in full-stack development. Currently at InnovateTech, I lead the frontend architecture for our main product, serving 500K+ users. I\'ve driven key initiatives including migrating our legacy jQuery codebase to React, which improved performance by 40%. Previously at StartupXYZ, I built the core payment system from scratch. I\'m particularly passionate about developer experience and have contributed to several open-source projects. I\'m excited about this role because it combines my technical expertise with the opportunity to mentor others and work on challenging scalability problems.',
    category: 'behavioral',
    createdAt: '2024-02-01T11:00:00Z',
    updatedAt: '2024-02-10T16:45:00Z',
    isFavorite: true,
    tags: ['introduction', 'background'],
  },
  {
    id: 'sa-4',
    questionId: 'q-22',
    question: 'Design a URL shortening service like bit.ly.',
    answer: 'Key requirements: Generate short URLs, redirect to original, handle high read volume, track analytics. Architecture: 1) API Gateway for rate limiting and routing, 2) Application servers (stateless) for URL generation using base62 encoding, 3) Distributed database (Cassandra) for URL mappings with high write throughput, 4) Redis cache for frequently accessed URLs, 5) CDN for redirect responses. For the short code: use a counter-based approach with multiple ranges assigned to different servers to avoid collisions. For analytics: async event processing with Kafka to track clicks without affecting redirect latency. Scale estimates: 100M URLs created/month, 10B redirects/month = ~4000 reads/second.',
    category: 'system-design',
    createdAt: '2024-02-05T14:30:00Z',
    updatedAt: '2024-02-20T10:00:00Z',
    isFavorite: false,
    tags: ['scalability', 'system-design'],
  },
  {
    id: 'sa-5',
    questionId: 'q-3',
    question: 'Tell me about a time you failed. What did you learn from it?',
    answer: 'Early in my career, I launched a feature without adequate user testing because I was confident in my technical implementation. The feature worked perfectly from a code perspective, but users found it confusing and adoption was only 15%. I learned that technical excellence doesn\'t guarantee user success. Since then, I\'ve become an advocate for user research and testing. I now always push for user interviews, A/B testing, and iterative feedback loops. This experience fundamentally changed how I approach product development - I now start with the user problem, not the technical solution.',
    category: 'behavioral',
    createdAt: '2024-02-08T13:20:00Z',
    updatedAt: '2024-02-08T13:20:00Z',
    isFavorite: false,
    tags: ['failure', 'growth'],
  },
];

// Mock session history
export const sessionHistory: SessionSummary[] = [
  {
    id: 'session-1',
    date: '2024-02-25T10:00:00Z',
    questionsAnswered: 5,
    averageScore: 4.2,
    duration: 1800,
    categories: ['behavioral', 'technical'],
  },
  {
    id: 'session-2',
    date: '2024-02-23T14:30:00Z',
    questionsAnswered: 8,
    averageScore: 3.8,
    duration: 2400,
    categories: ['system-design', 'technical'],
  },
  {
    id: 'session-3',
    date: '2024-02-20T09:15:00Z',
    questionsAnswered: 6,
    averageScore: 4.5,
    duration: 2100,
    categories: ['behavioral', 'situational'],
  },
  {
    id: 'session-4',
    date: '2024-02-18T16:00:00Z',
    questionsAnswered: 4,
    averageScore: 3.5,
    duration: 1200,
    categories: ['coding'],
  },
  {
    id: 'session-5',
    date: '2024-02-15T11:30:00Z',
    questionsAnswered: 7,
    averageScore: 4.0,
    duration: 2520,
    categories: ['behavioral', 'technical', 'situational'],
  },
  {
    id: 'session-6',
    date: '2024-02-12T10:00:00Z',
    questionsAnswered: 5,
    averageScore: 3.6,
    duration: 1500,
    categories: ['system-design'],
  },
  {
    id: 'session-7',
    date: '2024-02-10T15:45:00Z',
    questionsAnswered: 6,
    averageScore: 4.3,
    duration: 1980,
    categories: ['behavioral', 'case-study'],
  },
  {
    id: 'session-8',
    date: '2024-02-08T09:00:00Z',
    questionsAnswered: 5,
    averageScore: 3.9,
    duration: 1650,
    categories: ['technical', 'coding'],
  },
];

// Mock weekly progress data
export const weeklyProgress: WeeklyProgress[] = [
  {
    week: 'Week 8',
    weekStart: '2024-02-19',
    weekEnd: '2024-02-25',
    sessionsCompleted: 3,
    questionsAnswered: 19,
    averageScore: 4.1,
    totalPracticeTime: 6300,
  },
  {
    week: 'Week 7',
    weekStart: '2024-02-12',
    weekEnd: '2024-02-18',
    sessionsCompleted: 2,
    questionsAnswered: 11,
    averageScore: 3.8,
    totalPracticeTime: 3480,
  },
  {
    week: 'Week 6',
    weekStart: '2024-02-05',
    weekEnd: '2024-02-11',
    sessionsCompleted: 3,
    questionsAnswered: 16,
    averageScore: 4.0,
    totalPracticeTime: 5130,
  },
  {
    week: 'Week 5',
    weekStart: '2024-01-29',
    weekEnd: '2024-02-04',
    sessionsCompleted: 2,
    questionsAnswered: 10,
    averageScore: 3.5,
    totalPracticeTime: 3000,
  },
  {
    week: 'Week 4',
    weekStart: '2024-01-22',
    weekEnd: '2024-01-28',
    sessionsCompleted: 4,
    questionsAnswered: 22,
    averageScore: 3.7,
    totalPracticeTime: 7200,
  },
  {
    week: 'Week 3',
    weekStart: '2024-01-15',
    weekEnd: '2024-01-21',
    sessionsCompleted: 2,
    questionsAnswered: 8,
    averageScore: 3.3,
    totalPracticeTime: 2400,
  },
];

// Mock category performance
export const categoryPerformance: CategoryPerformance[] = [
  {
    category: 'behavioral',
    questionsPracticed: 28,
    averageScore: 4.2,
    trend: 'improving',
  },
  {
    category: 'technical',
    questionsPracticed: 22,
    averageScore: 3.8,
    trend: 'stable',
  },
  {
    category: 'situational',
    questionsPracticed: 15,
    averageScore: 4.0,
    trend: 'improving',
  },
  {
    category: 'system-design',
    questionsPracticed: 12,
    averageScore: 3.5,
    trend: 'improving',
  },
  {
    category: 'coding',
    questionsPracticed: 18,
    averageScore: 3.6,
    trend: 'declining',
  },
  {
    category: 'case-study',
    questionsPracticed: 8,
    averageScore: 3.9,
    trend: 'stable',
  },
];

// Overall performance data
export const interviewPerformance: InterviewPerformance = {
  totalSessions: 16,
  totalQuestionsPracticed: 86,
  totalPracticeTime: 27510, // in seconds (~7.6 hours)
  averageScore: 3.85,
  categoryBreakdown: categoryPerformance,
  recentSessions: sessionHistory,
  weeklyProgress: weeklyProgress,
  strengths: [
    'Behavioral questions - Strong STAR method usage',
    'Situational questions - Good problem-solving approach',
    'Communication - Clear and structured responses',
  ],
  areasToImprove: [
    'Coding questions - Practice more algorithm problems',
    'System design - Work on scalability discussions',
    'Time management - Some answers run too long',
  ],
  lastPracticeDate: '2024-02-25T10:00:00Z',
};

// Helper functions

export function getInterviewPerformance(): InterviewPerformance {
  return interviewPerformance;
}

export function getSessionHistory(limit?: number): SessionSummary[] {
  const sorted = [...sessionHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getSessionById(id: string): SessionSummary | undefined {
  return sessionHistory.find((s) => s.id === id);
}

export function getWeeklyProgress(weeks?: number): WeeklyProgress[] {
  return weeks ? weeklyProgress.slice(0, weeks) : weeklyProgress;
}

export function getCategoryPerformance(): CategoryPerformance[] {
  return categoryPerformance;
}

export function getCategoryPerformanceByCategory(
  category: QuestionCategory
): CategoryPerformance | undefined {
  return categoryPerformance.find((c) => c.category === category);
}

export function getSavedAnswers(): SavedAnswer[] {
  return savedAnswers;
}

export function getSavedAnswerById(id: string): SavedAnswer | undefined {
  return savedAnswers.find((a) => a.id === id);
}

export function getSavedAnswersByCategory(category: QuestionCategory): SavedAnswer[] {
  return savedAnswers.filter((a) => a.category === category);
}

export function getFavoriteAnswers(): SavedAnswer[] {
  return savedAnswers.filter((a) => a.isFavorite);
}

export function getAnswerStats(): {
  total: number;
  favorites: number;
  byCategory: Record<QuestionCategory, number>;
} {
  const byCategory = {} as Record<QuestionCategory, number>;
  savedAnswers.forEach((a) => {
    byCategory[a.category] = (byCategory[a.category] || 0) + 1;
  });

  return {
    total: savedAnswers.length,
    favorites: savedAnswers.filter((a) => a.isFavorite).length,
    byCategory,
  };
}

export function calculateOverallStats(): {
  totalPracticeHours: number;
  averageSessionLength: number;
  questionsPerSession: number;
  improvementRate: number;
} {
  const totalHours = interviewPerformance.totalPracticeTime / 3600;
  const avgSessionLength =
    interviewPerformance.totalPracticeTime / interviewPerformance.totalSessions / 60;
  const questionsPerSession =
    interviewPerformance.totalQuestionsPracticed / interviewPerformance.totalSessions;

  // Calculate improvement rate from weekly progress
  const recentWeeks = weeklyProgress.slice(0, 4);
  const olderWeeks = weeklyProgress.slice(4);
  const recentAvg =
    recentWeeks.reduce((sum, w) => sum + w.averageScore, 0) / recentWeeks.length;
  const olderAvg =
    olderWeeks.length > 0
      ? olderWeeks.reduce((sum, w) => sum + w.averageScore, 0) / olderWeeks.length
      : recentAvg;
  const improvementRate = ((recentAvg - olderAvg) / olderAvg) * 100;

  return {
    totalPracticeHours: Math.round(totalHours * 10) / 10,
    averageSessionLength: Math.round(avgSessionLength),
    questionsPerSession: Math.round(questionsPerSession * 10) / 10,
    improvementRate: Math.round(improvementRate * 10) / 10,
  };
}

export function getStrengthsAndWeaknesses(): {
  strengths: CategoryPerformance[];
  weaknesses: CategoryPerformance[];
} {
  const sorted = [...categoryPerformance].sort(
    (a, b) => b.averageScore - a.averageScore
  );
  return {
    strengths: sorted.slice(0, 2),
    weaknesses: sorted.slice(-2).reverse(),
  };
}

// Mock function to simulate saving a new session
export function saveSession(session: MockInterviewSession): SessionSummary {
  const avgScore =
    session.answers.reduce((sum, a) => sum + (a.selfRating || 3), 0) /
    session.answers.length;

  const summary: SessionSummary = {
    id: `session-${Date.now()}`,
    date: new Date().toISOString(),
    questionsAnswered: session.answers.length,
    averageScore: Math.round(avgScore * 10) / 10,
    duration: session.totalDuration,
    categories: [...new Set(session.questions.map((q) => q.category))],
  };

  // In a real app, this would persist to a database
  sessionHistory.unshift(summary);

  return summary;
}

// Mock function to simulate saving an answer
export function saveAnswer(
  questionId: string,
  question: string,
  answer: string,
  category: QuestionCategory
): SavedAnswer {
  const newAnswer: SavedAnswer = {
    id: `sa-${Date.now()}`,
    questionId,
    question,
    answer,
    category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isFavorite: false,
  };

  // In a real app, this would persist to a database
  savedAnswers.push(newAnswer);

  return newAnswer;
}

// Mock function to toggle favorite
export function toggleAnswerFavorite(answerId: string): boolean {
  const answer = savedAnswers.find((a) => a.id === answerId);
  if (answer) {
    answer.isFavorite = !answer.isFavorite;
    answer.updatedAt = new Date().toISOString();
    return answer.isFavorite;
  }
  return false;
}

// Mock function to update an answer
export function updateAnswer(answerId: string, newAnswer: string): SavedAnswer | undefined {
  const answer = savedAnswers.find((a) => a.id === answerId);
  if (answer) {
    answer.answer = newAnswer;
    answer.updatedAt = new Date().toISOString();
    return answer;
  }
  return undefined;
}

// Mock function to delete an answer
export function deleteAnswer(answerId: string): boolean {
  const index = savedAnswers.findIndex((a) => a.id === answerId);
  if (index !== -1) {
    savedAnswers.splice(index, 1);
    return true;
  }
  return false;
}
