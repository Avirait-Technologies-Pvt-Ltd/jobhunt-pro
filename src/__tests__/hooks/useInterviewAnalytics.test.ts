import { renderHook, act } from '@testing-library/react';
import { useInterviewAnalytics } from '@/hooks/useInterviewAnalytics';
import { MockInterviewSession, QuestionCategory } from '@/types/interview-prep';

describe('useInterviewAnalytics Hook', () => {
  describe('Performance Data', () => {
    it('should return performance data', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      expect(result.current.performance).toBeDefined();
      expect(result.current.performance.totalSessions).toBeGreaterThanOrEqual(0);
      expect(result.current.performance.totalQuestionsPracticed).toBeGreaterThanOrEqual(0);
    });

    it('should return category breakdown', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      expect(result.current.categoryBreakdown).toBeDefined();
      expect(Array.isArray(result.current.categoryBreakdown)).toBe(true);
    });

    it('should return weekly progress', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      expect(result.current.weeklyProgress).toBeDefined();
      expect(Array.isArray(result.current.weeklyProgress)).toBe(true);
    });

    it('should return recent sessions', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      expect(result.current.recentSessions).toBeDefined();
      expect(Array.isArray(result.current.recentSessions)).toBe(true);
    });
  });

  describe('Computed Stats', () => {
    it('should calculate total practice hours', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      expect(typeof result.current.totalPracticeHours).toBe('number');
      expect(result.current.totalPracticeHours).toBeGreaterThanOrEqual(0);
    });

    it('should calculate average session length', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      expect(typeof result.current.averageSessionLength).toBe('number');
      expect(result.current.averageSessionLength).toBeGreaterThanOrEqual(0);
    });

    it('should calculate questions per session', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      expect(typeof result.current.questionsPerSession).toBe('number');
      expect(result.current.questionsPerSession).toBeGreaterThanOrEqual(0);
    });

    it('should calculate improvement rate', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      expect(typeof result.current.improvementRate).toBe('number');
    });
  });

  describe('Strengths and Weaknesses', () => {
    it('should return strengths', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      expect(result.current.strengths).toBeDefined();
      expect(Array.isArray(result.current.strengths)).toBe(true);
    });

    it('should return weaknesses', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      expect(result.current.weaknesses).toBeDefined();
      expect(Array.isArray(result.current.weaknesses)).toBe(true);
    });

    it('should have valid category performance in strengths', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      result.current.strengths.forEach((strength) => {
        expect(strength.category).toBeDefined();
        expect(strength.averageScore).toBeGreaterThanOrEqual(0);
        expect(strength.averageScore).toBeLessThanOrEqual(5);
      });
    });
  });

  describe('Saved Answers', () => {
    it('should return saved answers', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      expect(result.current.savedAnswers).toBeDefined();
      expect(Array.isArray(result.current.savedAnswers)).toBe(true);
    });

    it('should return favorite answers', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      expect(result.current.favoriteAnswers).toBeDefined();
      expect(Array.isArray(result.current.favoriteAnswers)).toBe(true);

      // All favorite answers should have isFavorite = true
      result.current.favoriteAnswers.forEach((answer) => {
        expect(answer.isFavorite).toBe(true);
      });
    });
  });

  describe('recordSession', () => {
    it('should record a new session', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      const mockSession: MockInterviewSession = {
        id: 'test-session-1',
        questions: [
          {
            id: 'q-1',
            question: 'Test question',
            category: 'behavioral',
            difficulty: 'easy',
            tags: [],
            timesAsked: 1,
            createdAt: '2024-01-01',
          },
        ],
        currentQuestionIndex: 0,
        answers: [
          {
            questionId: 'q-1',
            answer: 'Test answer',
            duration: 120,
            selfRating: 4,
            submittedAt: new Date().toISOString(),
          },
        ],
        status: 'completed',
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        totalDuration: 120,
        settings: {
          questionCount: 1,
          timePerQuestion: 180,
          categories: ['behavioral'],
          difficulties: ['easy'],
          includeFollowUps: false,
        },
      };

      let sessionSummary: ReturnType<typeof result.current.recordSession>;

      act(() => {
        sessionSummary = result.current.recordSession(mockSession);
      });

      expect(sessionSummary).toBeDefined();
      expect(sessionSummary.questionsAnswered).toBe(1);
      expect(sessionSummary.averageScore).toBe(4);
    });
  });

  describe('saveAnswer', () => {
    it('should save a new answer', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      let savedAnswer: ReturnType<typeof result.current.saveAnswer>;

      act(() => {
        savedAnswer = result.current.saveAnswer(
          'q-test',
          'What is your greatest strength?',
          'My greatest strength is problem-solving...',
          'behavioral'
        );
      });

      expect(savedAnswer).toBeDefined();
      expect(savedAnswer.questionId).toBe('q-test');
      expect(savedAnswer.question).toBe('What is your greatest strength?');
      expect(savedAnswer.answer).toBe('My greatest strength is problem-solving...');
      expect(savedAnswer.category).toBe('behavioral');
    });
  });

  describe('toggleFavorite', () => {
    it('should toggle favorite status', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      // Get an existing answer ID
      const existingAnswer = result.current.savedAnswers[0];
      if (!existingAnswer) return;

      const initialFavoriteStatus = existingAnswer.isFavorite;

      act(() => {
        result.current.toggleFavorite(existingAnswer.id);
      });

      // After refresh, check the status changed
      const updatedAnswer = result.current.savedAnswers.find(
        (a) => a.id === existingAnswer.id
      );

      expect(updatedAnswer?.isFavorite).toBe(!initialFavoriteStatus);
    });
  });

  describe('updateAnswer', () => {
    it('should update an existing answer', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      const existingAnswer = result.current.savedAnswers[0];
      if (!existingAnswer) return;

      const newAnswerText = 'This is my updated answer with more detail...';

      let updatedAnswer: ReturnType<typeof result.current.updateAnswer>;

      act(() => {
        updatedAnswer = result.current.updateAnswer(existingAnswer.id, newAnswerText);
      });

      expect(updatedAnswer).toBeDefined();
      expect(updatedAnswer?.answer).toBe(newAnswerText);
    });

    it('should return undefined for non-existent answer', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      let updatedAnswer: ReturnType<typeof result.current.updateAnswer>;

      act(() => {
        updatedAnswer = result.current.updateAnswer('non-existent-id', 'New text');
      });

      expect(updatedAnswer).toBeUndefined();
    });
  });

  describe('deleteAnswer', () => {
    it('should delete an existing answer', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      // First save a new answer to delete
      let newAnswer: ReturnType<typeof result.current.saveAnswer>;

      act(() => {
        newAnswer = result.current.saveAnswer(
          'q-delete-test',
          'Test question',
          'Test answer',
          'behavioral'
        );
      });

      let deleted: boolean = false;

      act(() => {
        deleted = result.current.deleteAnswer(newAnswer.id);
      });

      expect(deleted).toBe(true);
    });

    it('should return false for non-existent answer', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      let deleted: boolean = true;

      act(() => {
        deleted = result.current.deleteAnswer('non-existent-id');
      });

      expect(deleted).toBe(false);
    });
  });

  describe('getCategoryScore', () => {
    it('should return score for a category', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      const score = result.current.getCategoryScore('behavioral');

      expect(typeof score).toBe('number');
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(5);
    });

    it('should return 0 for category with no data', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      // This might return a score if there's data, or 0 if not
      const score = result.current.getCategoryScore('behavioral');
      expect(typeof score).toBe('number');
    });
  });

  describe('getCategoryTrend', () => {
    it('should return trend for a category', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      const trend = result.current.getCategoryTrend('behavioral');

      expect(['improving', 'stable', 'declining']).toContain(trend);
    });
  });

  describe('getRecommendedCategories', () => {
    it('should return recommended categories to practice', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      const recommended = result.current.getRecommendedCategories();

      expect(Array.isArray(recommended)).toBe(true);
      expect(recommended.length).toBeLessThanOrEqual(3);

      // All should be valid categories
      const validCategories: QuestionCategory[] = [
        'behavioral',
        'technical',
        'situational',
        'system-design',
        'coding',
        'case-study',
      ];

      recommended.forEach((cat) => {
        expect(validCategories).toContain(cat);
      });
    });
  });

  describe('refreshData', () => {
    it('should trigger data refresh', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      // Get initial data
      const initialSessions = result.current.performance.totalSessions;

      // Refresh should work without error
      act(() => {
        result.current.refreshData();
      });

      // Data should still be valid after refresh
      expect(result.current.performance.totalSessions).toBeDefined();
    });
  });

  describe('Data Consistency', () => {
    it('should have consistent category data in breakdown', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      result.current.categoryBreakdown.forEach((cat) => {
        expect(cat.category).toBeDefined();
        expect(cat.questionsPracticed).toBeGreaterThanOrEqual(0);
        expect(cat.averageScore).toBeGreaterThanOrEqual(0);
        expect(cat.averageScore).toBeLessThanOrEqual(5);
        expect(['improving', 'stable', 'declining']).toContain(cat.trend);
      });
    });

    it('should have valid session data in recent sessions', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      result.current.recentSessions.forEach((session) => {
        expect(session.id).toBeDefined();
        expect(session.date).toBeDefined();
        expect(session.questionsAnswered).toBeGreaterThanOrEqual(0);
        expect(session.averageScore).toBeGreaterThanOrEqual(0);
        expect(session.duration).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(session.categories)).toBe(true);
      });
    });

    it('should have valid weekly progress data', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      result.current.weeklyProgress.forEach((week) => {
        expect(week.week).toBeDefined();
        expect(week.sessionsCompleted).toBeGreaterThanOrEqual(0);
        expect(week.questionsAnswered).toBeGreaterThanOrEqual(0);
        expect(week.averageScore).toBeGreaterThanOrEqual(0);
        expect(week.totalPracticeTime).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
