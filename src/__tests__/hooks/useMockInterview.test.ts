import { renderHook, act } from '@testing-library/react';
import { useMockInterview } from '@/hooks/useMockInterview';
import { MockInterviewSettings } from '@/types/interview-prep';

// Mock the timer functions
jest.useFakeTimers();

describe('useMockInterview Hook', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have null session initially', () => {
      const { result } = renderHook(() => useMockInterview());
      expect(result.current.session).toBeNull();
    });

    it('should have null currentQuestion initially', () => {
      const { result } = renderHook(() => useMockInterview());
      expect(result.current.currentQuestion).toBeNull();
    });

    it('should have isSessionActive as false initially', () => {
      const { result } = renderHook(() => useMockInterview());
      expect(result.current.isSessionActive).toBe(false);
    });

    it('should have empty currentAnswer initially', () => {
      const { result } = renderHook(() => useMockInterview());
      expect(result.current.currentAnswer).toBe('');
    });
  });

  describe('startSession', () => {
    it('should start a new session with default settings', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession();
      });

      expect(result.current.session).not.toBeNull();
      expect(result.current.isSessionActive).toBe(true);
      expect(result.current.session?.status).toBe('in-progress');
    });

    it('should start a session with custom settings', () => {
      const { result } = renderHook(() => useMockInterview());

      const customSettings: Partial<MockInterviewSettings> = {
        questionCount: 3,
        timePerQuestion: 120,
        categories: ['behavioral'],
        difficulties: ['easy'],
      };

      act(() => {
        result.current.startSession(customSettings);
      });

      expect(result.current.session?.settings.questionCount).toBe(3);
      expect(result.current.session?.settings.timePerQuestion).toBe(120);
      expect(result.current.session?.settings.categories).toContain('behavioral');
    });

    it('should set the first question as current', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession();
      });

      expect(result.current.currentQuestion).not.toBeNull();
      expect(result.current.currentQuestionIndex).toBe(0);
    });

    it('should initialize the timer', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ timePerQuestion: 180 });
      });

      expect(result.current.timeRemaining).toBe(180);
      expect(result.current.isTimerRunning).toBe(true);
    });

    it('should have correct totalQuestions', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ questionCount: 5 });
      });

      expect(result.current.totalQuestions).toBe(5);
    });
  });

  describe('pauseSession / resumeSession', () => {
    it('should pause an active session', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession();
      });

      act(() => {
        result.current.pauseSession();
      });

      expect(result.current.isSessionPaused).toBe(true);
      expect(result.current.isSessionActive).toBe(false);
      expect(result.current.isTimerRunning).toBe(false);
    });

    it('should resume a paused session', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession();
      });

      act(() => {
        result.current.pauseSession();
      });

      act(() => {
        result.current.resumeSession();
      });

      expect(result.current.isSessionActive).toBe(true);
      expect(result.current.isSessionPaused).toBe(false);
      expect(result.current.isTimerRunning).toBe(true);
    });

    it('should not pause if no session is active', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.pauseSession();
      });

      expect(result.current.session).toBeNull();
    });
  });

  describe('endSession', () => {
    it('should end the session', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession();
      });

      act(() => {
        result.current.endSession();
      });

      expect(result.current.isSessionCompleted).toBe(true);
      expect(result.current.session?.status).toBe('completed');
    });

    it('should stop the timer', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession();
      });

      act(() => {
        result.current.endSession();
      });

      expect(result.current.isTimerRunning).toBe(false);
    });

    it('should save current answer if present', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession();
      });

      act(() => {
        result.current.updateCurrentAnswer('My answer to this question');
      });

      act(() => {
        result.current.endSession();
      });

      expect(result.current.session?.answers.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation (nextQuestion / previousQuestion)', () => {
    it('should navigate to next question', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ questionCount: 3 });
      });

      const firstQuestionId = result.current.currentQuestion?.id;

      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.currentQuestionIndex).toBe(1);
      expect(result.current.currentQuestion?.id).not.toBe(firstQuestionId);
    });

    it('should navigate to previous question', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ questionCount: 3 });
      });

      act(() => {
        result.current.nextQuestion();
      });

      act(() => {
        result.current.previousQuestion();
      });

      expect(result.current.currentQuestionIndex).toBe(0);
    });

    it('should not go before first question', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession();
      });

      act(() => {
        result.current.previousQuestion();
      });

      expect(result.current.currentQuestionIndex).toBe(0);
    });

    it('should not go past last question', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ questionCount: 2 });
      });

      act(() => {
        result.current.nextQuestion();
      });

      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.currentQuestionIndex).toBe(1);
    });

    it('should reset timer when navigating', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ questionCount: 3, timePerQuestion: 180 });
      });

      // Advance timer
      act(() => {
        jest.advanceTimersByTime(60000);
      });

      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.timeRemaining).toBe(180);
    });

    it('should save answer when navigating away', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ questionCount: 3 });
      });

      act(() => {
        result.current.updateCurrentAnswer('Answer to question 1');
      });

      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.session?.answers.length).toBe(1);
    });

    it('should restore previous answer when navigating back', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ questionCount: 3 });
      });

      act(() => {
        result.current.updateCurrentAnswer('Answer to question 1');
      });

      act(() => {
        result.current.nextQuestion();
      });

      act(() => {
        result.current.previousQuestion();
      });

      expect(result.current.currentAnswer).toBe('Answer to question 1');
    });
  });

  describe('goToQuestion', () => {
    it('should navigate to specific question', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ questionCount: 5 });
      });

      act(() => {
        result.current.goToQuestion(3);
      });

      expect(result.current.currentQuestionIndex).toBe(3);
    });

    it('should not navigate to invalid index', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ questionCount: 5 });
      });

      act(() => {
        result.current.goToQuestion(10);
      });

      expect(result.current.currentQuestionIndex).toBe(0);
    });

    it('should not navigate to negative index', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ questionCount: 5 });
      });

      act(() => {
        result.current.goToQuestion(-1);
      });

      expect(result.current.currentQuestionIndex).toBe(0);
    });
  });

  describe('submitAnswer', () => {
    it('should submit answer with rating', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession();
      });

      act(() => {
        result.current.submitAnswer('My comprehensive answer', 4);
      });

      expect(result.current.session?.answers[0].answer).toBe('My comprehensive answer');
      expect(result.current.session?.answers[0].selfRating).toBe(4);
    });

    it('should update existing answer for same question', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession();
      });

      act(() => {
        result.current.submitAnswer('First answer', 3);
      });

      act(() => {
        result.current.submitAnswer('Updated answer', 5);
      });

      expect(result.current.session?.answers.length).toBe(1);
      expect(result.current.session?.answers[0].answer).toBe('Updated answer');
      expect(result.current.session?.answers[0].selfRating).toBe(5);
    });
  });

  describe('updateCurrentAnswer', () => {
    it('should update current answer', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession();
      });

      act(() => {
        result.current.updateCurrentAnswer('My work in progress answer');
      });

      expect(result.current.currentAnswer).toBe('My work in progress answer');
    });
  });

  describe('resetTimer', () => {
    it('should reset timer to initial value', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ timePerQuestion: 180 });
      });

      // Advance timer
      act(() => {
        jest.advanceTimersByTime(60000);
      });

      act(() => {
        result.current.resetTimer();
      });

      expect(result.current.timeRemaining).toBe(180);
      expect(result.current.isTimerRunning).toBe(true);
    });
  });

  describe('Timer Countdown', () => {
    it('should countdown when running', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ timePerQuestion: 180 });
      });

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(result.current.timeRemaining).toBe(175);
    });

    it('should stop at zero', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ timePerQuestion: 5 });
      });

      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(result.current.timeRemaining).toBe(0);
      expect(result.current.isTimerRunning).toBe(false);
    });

    it('should not countdown when paused', () => {
      const { result } = renderHook(() => useMockInterview());

      act(() => {
        result.current.startSession({ timePerQuestion: 180 });
      });

      act(() => {
        result.current.pauseSession();
      });

      const timeBeforePause = result.current.timeRemaining;

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(result.current.timeRemaining).toBe(timeBeforePause);
    });
  });
});
