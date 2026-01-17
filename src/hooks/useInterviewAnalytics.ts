'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  InterviewPerformance,
  CategoryPerformance,
  SessionSummary,
  WeeklyProgress,
  SavedAnswer,
  QuestionCategory,
  MockInterviewSession,
} from '@/types/interview-prep';
import {
  getInterviewPerformance,
  getSessionHistory,
  getWeeklyProgress,
  getCategoryPerformance,
  getSavedAnswers,
  getFavoriteAnswers,
  saveSession,
  saveAnswer as saveAnswerToData,
  toggleAnswerFavorite as toggleFavoriteInData,
  updateAnswer as updateAnswerInData,
  deleteAnswer as deleteAnswerInData,
  calculateOverallStats,
  getStrengthsAndWeaknesses,
} from '@/data/interview-analytics';

interface UseInterviewAnalyticsReturn {
  // Performance data
  performance: InterviewPerformance;
  categoryBreakdown: CategoryPerformance[];
  weeklyProgress: WeeklyProgress[];
  recentSessions: SessionSummary[];

  // Computed stats
  totalPracticeHours: number;
  averageSessionLength: number;
  questionsPerSession: number;
  improvementRate: number;

  // Strengths and weaknesses
  strengths: CategoryPerformance[];
  weaknesses: CategoryPerformance[];

  // Saved answers
  savedAnswers: SavedAnswer[];
  favoriteAnswers: SavedAnswer[];

  // Actions
  recordSession: (session: MockInterviewSession) => SessionSummary;
  saveAnswer: (
    questionId: string,
    question: string,
    answer: string,
    category: QuestionCategory
  ) => SavedAnswer;
  toggleFavorite: (answerId: string) => boolean;
  updateAnswer: (answerId: string, newAnswer: string) => SavedAnswer | undefined;
  deleteAnswer: (answerId: string) => boolean;
  refreshData: () => void;

  // Utility functions
  getCategoryScore: (category: QuestionCategory) => number;
  getCategoryTrend: (category: QuestionCategory) => 'improving' | 'stable' | 'declining';
  getRecommendedCategories: () => QuestionCategory[];
}

export function useInterviewAnalytics(): UseInterviewAnalyticsReturn {
  // State for triggering re-renders when data changes
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Get performance data
  const performance = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = refreshCounter; // Dependency to trigger recalculation
    return getInterviewPerformance();
  }, [refreshCounter]);

  const categoryBreakdown = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = refreshCounter;
    return getCategoryPerformance();
  }, [refreshCounter]);

  const weeklyProgress = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = refreshCounter;
    return getWeeklyProgress();
  }, [refreshCounter]);

  const recentSessions = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = refreshCounter;
    return getSessionHistory(5);
  }, [refreshCounter]);

  // Computed stats
  const stats = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = refreshCounter;
    return calculateOverallStats();
  }, [refreshCounter]);

  const { totalPracticeHours, averageSessionLength, questionsPerSession, improvementRate } = stats;

  // Strengths and weaknesses
  const { strengths, weaknesses } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = refreshCounter;
    return getStrengthsAndWeaknesses();
  }, [refreshCounter]);

  // Saved answers
  const savedAnswers = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = refreshCounter;
    return getSavedAnswers();
  }, [refreshCounter]);

  const favoriteAnswers = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = refreshCounter;
    return getFavoriteAnswers();
  }, [refreshCounter]);

  // Record a completed session
  const recordSession = useCallback((session: MockInterviewSession): SessionSummary => {
    const summary = saveSession(session);
    setRefreshCounter((c) => c + 1);
    return summary;
  }, []);

  // Save an answer to the answer bank
  const saveAnswer = useCallback(
    (
      questionId: string,
      question: string,
      answer: string,
      category: QuestionCategory
    ): SavedAnswer => {
      const saved = saveAnswerToData(questionId, question, answer, category);
      setRefreshCounter((c) => c + 1);
      return saved;
    },
    []
  );

  // Toggle favorite status
  const toggleFavorite = useCallback((answerId: string): boolean => {
    const result = toggleFavoriteInData(answerId);
    setRefreshCounter((c) => c + 1);
    return result;
  }, []);

  // Update an answer
  const updateAnswer = useCallback(
    (answerId: string, newAnswer: string): SavedAnswer | undefined => {
      const updated = updateAnswerInData(answerId, newAnswer);
      if (updated) {
        setRefreshCounter((c) => c + 1);
      }
      return updated;
    },
    []
  );

  // Delete an answer
  const deleteAnswer = useCallback((answerId: string): boolean => {
    const deleted = deleteAnswerInData(answerId);
    if (deleted) {
      setRefreshCounter((c) => c + 1);
    }
    return deleted;
  }, []);

  // Refresh data manually
  const refreshData = useCallback(() => {
    setRefreshCounter((c) => c + 1);
  }, []);

  // Get score for a specific category
  const getCategoryScore = useCallback(
    (category: QuestionCategory): number => {
      const categoryData = categoryBreakdown.find((c) => c.category === category);
      return categoryData?.averageScore ?? 0;
    },
    [categoryBreakdown]
  );

  // Get trend for a specific category
  const getCategoryTrend = useCallback(
    (category: QuestionCategory): 'improving' | 'stable' | 'declining' => {
      const categoryData = categoryBreakdown.find((c) => c.category === category);
      return categoryData?.trend ?? 'stable';
    },
    [categoryBreakdown]
  );

  // Get recommended categories to practice (lowest scores or declining)
  const getRecommendedCategories = useCallback((): QuestionCategory[] => {
    const sorted = [...categoryBreakdown].sort((a, b) => {
      // Prioritize declining trends
      if (a.trend === 'declining' && b.trend !== 'declining') return -1;
      if (b.trend === 'declining' && a.trend !== 'declining') return 1;
      // Then sort by score (lower first)
      return a.averageScore - b.averageScore;
    });

    // Return bottom 3 categories
    return sorted.slice(0, 3).map((c) => c.category);
  }, [categoryBreakdown]);

  return {
    // Performance data
    performance,
    categoryBreakdown,
    weeklyProgress,
    recentSessions,

    // Computed stats
    totalPracticeHours,
    averageSessionLength,
    questionsPerSession,
    improvementRate,

    // Strengths and weaknesses
    strengths,
    weaknesses,

    // Saved answers
    savedAnswers,
    favoriteAnswers,

    // Actions
    recordSession,
    saveAnswer,
    toggleFavorite,
    updateAnswer,
    deleteAnswer,
    refreshData,

    // Utility functions
    getCategoryScore,
    getCategoryTrend,
    getRecommendedCategories,
  };
}
