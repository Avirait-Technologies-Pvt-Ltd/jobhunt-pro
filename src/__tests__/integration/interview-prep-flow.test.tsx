import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook, act } from '@testing-library/react';
import { useMockInterview } from '@/hooks/useMockInterview';
import { useInterviewAnalytics } from '@/hooks/useInterviewAnalytics';
import {
  interviewQuestions,
  filterQuestions,
  sortQuestions,
  getQuestionById,
  getQuestionsByCategory,
  getRandomQuestions,
  getQuestionStats,
} from '@/data/interview-questions';
import {
  getInterviewPerformance,
  getSessionHistory,
  getCategoryPerformance,
} from '@/data/interview-analytics';

// Use fake timers for timer-related tests
jest.useFakeTimers();

describe('Interview Prep Integration Tests', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('Question Bank Data Flow', () => {
    it('should have valid question data structure', () => {
      expect(interviewQuestions.length).toBeGreaterThan(0);

      interviewQuestions.forEach((question) => {
        expect(question.id).toBeDefined();
        expect(question.question).toBeDefined();
        expect(question.category).toBeDefined();
        expect(question.difficulty).toBeDefined();
        expect(question.tags).toBeDefined();
        expect(Array.isArray(question.tags)).toBe(true);
      });
    });

    it('should filter questions by category', () => {
      const behavioralQuestions = getQuestionsByCategory('behavioral');

      expect(behavioralQuestions.length).toBeGreaterThan(0);
      behavioralQuestions.forEach((q) => {
        expect(q.category).toBe('behavioral');
      });
    });

    it('should filter questions with multiple criteria', () => {
      const filtered = filterQuestions({
        categories: ['behavioral', 'technical'],
        difficulties: ['easy', 'medium'],
      });

      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((q) => {
        expect(['behavioral', 'technical']).toContain(q.category);
        expect(['easy', 'medium']).toContain(q.difficulty);
      });
    });

    it('should sort questions by most asked', () => {
      const sorted = sortQuestions([...interviewQuestions], 'most-asked');

      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].timesAsked).toBeGreaterThanOrEqual(sorted[i + 1].timesAsked);
      }
    });

    it('should get random questions for a session', () => {
      const random1 = getRandomQuestions(5);
      const random2 = getRandomQuestions(5);

      expect(random1.length).toBe(5);
      expect(random2.length).toBe(5);

      // Due to randomization, these might occasionally be the same
      // but the function should work
      random1.forEach((q) => {
        expect(q.id).toBeDefined();
      });
    });

    it('should get question statistics', () => {
      const stats = getQuestionStats();

      expect(stats.total).toBe(interviewQuestions.length);
      expect(stats.byCategory).toBeDefined();
      expect(stats.byDifficulty).toBeDefined();

      // Sum of categories should equal total
      const categorySum = Object.values(stats.byCategory).reduce((a, b) => a + b, 0);
      expect(categorySum).toBe(stats.total);
    });
  });

  describe('Mock Interview Session Flow', () => {
    it('should complete a full mock interview session', () => {
      const { result } = renderHook(() => useMockInterview());

      // Start session
      act(() => {
        result.current.startSession({
          questionCount: 3,
          timePerQuestion: 60,
          categories: ['behavioral'],
          difficulties: ['easy', 'medium'],
        });
      });

      expect(result.current.isSessionActive).toBe(true);
      expect(result.current.totalQuestions).toBe(3);
      expect(result.current.currentQuestionIndex).toBe(0);

      // Answer first question
      act(() => {
        result.current.updateCurrentAnswer('My answer to question 1');
      });

      act(() => {
        result.current.submitAnswer('My answer to question 1', 4);
      });

      expect(result.current.session?.answers.length).toBe(1);

      // Navigate to next question
      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.currentQuestionIndex).toBe(1);

      // Answer second question
      act(() => {
        result.current.updateCurrentAnswer('My answer to question 2');
        result.current.submitAnswer('My answer to question 2', 3);
      });

      // Navigate to last question
      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.currentQuestionIndex).toBe(2);

      // Answer third question and end session
      act(() => {
        result.current.updateCurrentAnswer('My answer to question 3');
        result.current.submitAnswer('My answer to question 3', 5);
      });

      act(() => {
        result.current.endSession();
      });

      expect(result.current.isSessionCompleted).toBe(true);
      expect(result.current.session?.status).toBe('completed');
      expect(result.current.session?.answers.length).toBe(3);
    });

    it('should handle pause and resume', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession();
      });

      const timeBeforePause = result.current.timeRemaining;

      // Pause session
      act(() => {
        result.current.pauseSession();
      });

      expect(result.current.isSessionPaused).toBe(true);
      expect(result.current.isTimerRunning).toBe(false);

      // Advance time while paused
      act(() => {
        jest.advanceTimersByTime(10000);
      });

      // Timer should not have changed
      expect(result.current.timeRemaining).toBe(timeBeforePause);

      // Resume session
      act(() => {
        result.current.resumeSession();
      });

      expect(result.current.isSessionActive).toBe(true);
      expect(result.current.isTimerRunning).toBe(true);
    });

    it('should navigate through questions and preserve answers', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ questionCount: 3 });
      });

      // Answer question 0
      act(() => {
        result.current.updateCurrentAnswer('Answer for question 0');
      });

      // Go to question 1
      act(() => {
        result.current.nextQuestion();
      });

      // Answer question 1
      act(() => {
        result.current.updateCurrentAnswer('Answer for question 1');
      });

      // Go back to question 0
      act(() => {
        result.current.previousQuestion();
      });

      // Answer should be preserved
      expect(result.current.currentAnswer).toBe('Answer for question 0');

      // Go back to question 1
      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.currentAnswer).toBe('Answer for question 1');
    });
  });

  describe('Analytics Integration', () => {
    it('should have consistent analytics data', () => {
      const performance = getInterviewPerformance();
      const sessions = getSessionHistory();
      const categoryPerf = getCategoryPerformance();

      expect(performance).toBeDefined();
      expect(performance.totalSessions).toBeGreaterThanOrEqual(0);
      expect(performance.averageScore).toBeGreaterThanOrEqual(0);
      expect(performance.averageScore).toBeLessThanOrEqual(5);

      expect(Array.isArray(sessions)).toBe(true);
      expect(Array.isArray(categoryPerf)).toBe(true);
    });

    it('should record session and update analytics', () => {
      const { result: interviewResult } = renderHook(() => useMockInterview());
      const { result: analyticsResult } = renderHook(() => useInterviewAnalytics());

      // Start and complete a session
      act(() => {
        interviewResult.current.startSession({
          questionCount: 2,
          categories: ['behavioral'],
          difficulties: ['easy'],
        });
      });

      act(() => {
        interviewResult.current.updateCurrentAnswer('Test answer 1');
        interviewResult.current.submitAnswer('Test answer 1', 4);
        interviewResult.current.nextQuestion();
      });

      act(() => {
        interviewResult.current.updateCurrentAnswer('Test answer 2');
        interviewResult.current.submitAnswer('Test answer 2', 5);
        interviewResult.current.endSession();
      });

      // Record the session
      const session = interviewResult.current.session!;
      let sessionSummary: ReturnType<typeof analyticsResult.current.recordSession>;

      act(() => {
        sessionSummary = analyticsResult.current.recordSession(session);
      });

      expect(sessionSummary).toBeDefined();
      expect(sessionSummary.questionsAnswered).toBe(2);
      expect(sessionSummary.averageScore).toBe(4.5);
    });

    it('should save and manage answers in answer bank', () => {
      const { result } = renderHook(() => useInterviewAnalytics());

      let savedAnswer: ReturnType<typeof result.current.saveAnswer>;

      // Save an answer
      act(() => {
        savedAnswer = result.current.saveAnswer(
          'q-integration-test',
          'What is your greatest strength?',
          'My greatest strength is my ability to learn quickly and adapt to new situations.',
          'behavioral'
        );
      });

      expect(savedAnswer.id).toBeDefined();
      expect(savedAnswer.answer).toContain('learn quickly');

      // Update the answer
      act(() => {
        result.current.updateAnswer(savedAnswer.id, 'Updated: I am a fast learner with strong problem-solving skills.');
      });

      const updated = result.current.savedAnswers.find((a) => a.id === savedAnswer.id);
      expect(updated?.answer).toContain('Updated');

      // Toggle favorite
      act(() => {
        result.current.toggleFavorite(savedAnswer.id);
      });

      const favorited = result.current.savedAnswers.find((a) => a.id === savedAnswer.id);
      expect(favorited?.isFavorite).toBe(true);

      // Delete the answer
      act(() => {
        result.current.deleteAnswer(savedAnswer.id);
      });

      const deleted = result.current.savedAnswers.find((a) => a.id === savedAnswer.id);
      expect(deleted).toBeUndefined();
    });
  });

  describe('Timer Integration', () => {
    it('should count down timer during active session', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ timePerQuestion: 60 });
      });

      expect(result.current.timeRemaining).toBe(60);

      // Advance 10 seconds
      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(result.current.timeRemaining).toBe(50);

      // Advance 50 more seconds
      act(() => {
        jest.advanceTimersByTime(50000);
      });

      expect(result.current.timeRemaining).toBe(0);
      expect(result.current.isTimerRunning).toBe(false);
    });

    it('should reset timer when navigating questions', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ questionCount: 3, timePerQuestion: 60 });
      });

      // Use some time
      act(() => {
        jest.advanceTimersByTime(30000);
      });

      expect(result.current.timeRemaining).toBe(30);

      // Navigate to next question
      act(() => {
        result.current.nextQuestion();
      });

      // Timer should reset
      expect(result.current.timeRemaining).toBe(60);
    });

    it('should manually reset timer', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ timePerQuestion: 60 });
      });

      // Use some time
      act(() => {
        jest.advanceTimersByTime(45000);
      });

      expect(result.current.timeRemaining).toBe(15);

      // Reset timer
      act(() => {
        result.current.resetTimer();
      });

      expect(result.current.timeRemaining).toBe(60);
      expect(result.current.isTimerRunning).toBe(true);
    });
  });

  describe('Category and Difficulty Selection', () => {
    it('should only include questions matching selected criteria', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({
          questionCount: 10,
          categories: ['technical'],
          difficulties: ['hard'],
        });
      });

      result.current.session?.questions.forEach((q) => {
        expect(q.category).toBe('technical');
        expect(q.difficulty).toBe('hard');
      });
    });

    it('should handle multiple category selection', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({
          questionCount: 10,
          categories: ['behavioral', 'situational'],
          difficulties: ['easy', 'medium', 'hard'],
        });
      });

      result.current.session?.questions.forEach((q) => {
        expect(['behavioral', 'situational']).toContain(q.category);
      });
    });
  });

  describe('End-to-End User Flow', () => {
    it('should simulate complete user journey', () => {
      // 1. User views question bank
      const stats = getQuestionStats();
      expect(stats.total).toBeGreaterThan(0);

      // 2. User filters questions
      const filteredQuestions = filterQuestions({
        categories: ['behavioral'],
        difficulties: ['easy', 'medium'],
      });
      expect(filteredQuestions.length).toBeGreaterThan(0);

      // 3. User starts mock interview
      const { result: interviewHook } = renderHook(() => useMockInterview());
      const { result: analyticsHook } = renderHook(() => useInterviewAnalytics());

      act(() => {
        interviewHook.current.startSession({
          questionCount: 2,
          timePerQuestion: 120,
          categories: ['behavioral'],
          difficulties: ['easy', 'medium'],
        });
      });

      // 4. User answers questions
      act(() => {
        interviewHook.current.updateCurrentAnswer('This is my detailed answer using the STAR method. In my previous role, I had a situation where I needed to lead a team project.');
        interviewHook.current.submitAnswer('This is my detailed answer...', 4);
      });

      act(() => {
        interviewHook.current.nextQuestion();
      });

      act(() => {
        interviewHook.current.updateCurrentAnswer('Another comprehensive answer demonstrating my skills and experience in this area.');
        interviewHook.current.submitAnswer('Another comprehensive answer...', 5);
      });

      // 5. User ends session
      act(() => {
        interviewHook.current.endSession();
      });

      expect(interviewHook.current.isSessionCompleted).toBe(true);

      // 6. User views session summary
      const session = interviewHook.current.session!;
      expect(session.answers.length).toBe(2);

      // 7. Session is recorded in analytics
      let summary: ReturnType<typeof analyticsHook.current.recordSession>;
      act(() => {
        summary = analyticsHook.current.recordSession(session);
      });

      expect(summary.questionsAnswered).toBe(2);
      expect(summary.averageScore).toBe(4.5);

      // 8. User saves a good answer
      act(() => {
        analyticsHook.current.saveAnswer(
          session.questions[0].id,
          session.questions[0].question,
          session.answers[0].answer,
          session.questions[0].category
        );
      });

      // 9. User views analytics
      const performance = analyticsHook.current.performance;
      expect(performance.totalSessions).toBeGreaterThan(0);
    });
  });
});
