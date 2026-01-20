import { renderHook, act } from '@testing-library/react';
import { useSkillAssessment } from '@/hooks/useSkillAssessment';
import { AssessmentSessionSettings } from '@/types/skill-assessment';

// Mock the timer functions
jest.useFakeTimers();

describe('Assessment Engine - useSkillAssessment Hook', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have null session initially', () => {
      const { result } = renderHook(() => useSkillAssessment());
      expect(result.current.session).toBeNull();
    });

    it('should have null currentQuestion initially', () => {
      const { result } = renderHook(() => useSkillAssessment());
      expect(result.current.currentQuestion).toBeNull();
    });

    it('should have isSessionActive as false initially', () => {
      const { result } = renderHook(() => useSkillAssessment());
      expect(result.current.isSessionActive).toBe(false);
    });

    it('should have zero progress initially', () => {
      const { result } = renderHook(() => useSkillAssessment());
      expect(result.current.progress).toBe(0);
    });

    it('should have null selectedAnswer initially', () => {
      const { result } = renderHook(() => useSkillAssessment());
      expect(result.current.selectedAnswer).toBeNull();
    });

    it('should have null result initially', () => {
      const { result } = renderHook(() => useSkillAssessment());
      expect(result.current.result).toBeNull();
    });
  });

  describe('startSession', () => {
    it('should start a new session with valid assessment ID', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        const success = result.current.startSession('assessment-js-beginner', 'user-1');
        expect(success).toBe(true);
      });

      expect(result.current.session).not.toBeNull();
      expect(result.current.isSessionActive).toBe(true);
      expect(result.current.session?.status).toBe('in-progress');
    });

    it('should fail to start session with invalid assessment ID', () => {
      const { result } = renderHook(() => useSkillAssessment());

      // Suppress expected console.error for invalid assessment
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      act(() => {
        const success = result.current.startSession('invalid-assessment', 'user-1');
        expect(success).toBe(false);
      });

      expect(result.current.session).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Assessment not found:', 'invalid-assessment');
      consoleSpy.mockRestore();
    });

    it('should set the first question as current', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      expect(result.current.currentQuestion).not.toBeNull();
      expect(result.current.currentQuestionIndex).toBe(0);
    });

    it('should initialize the timer', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      expect(result.current.timeRemaining).toBeGreaterThan(0);
      expect(result.current.isTimerRunning).toBe(true);
    });

    it('should have correct totalQuestions', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      expect(result.current.totalQuestions).toBeGreaterThan(0);
    });

    it('should start with custom settings', () => {
      const { result } = renderHook(() => useSkillAssessment());

      const customSettings: Partial<AssessmentSessionSettings> = {
        shuffleQuestions: false,
        showTimer: true,
        allowSkip: false,
      };

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1', customSettings);
      });

      expect(result.current.settings.shuffleQuestions).toBe(false);
      expect(result.current.settings.allowSkip).toBe(false);
    });

    it('should store userId in session', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'test-user-123');
      });

      expect(result.current.session?.userId).toBe('test-user-123');
    });

    it('should set startedAt timestamp', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      expect(result.current.session?.startedAt).toBeDefined();
      expect(new Date(result.current.session!.startedAt!).getTime()).toBeLessThanOrEqual(Date.now());
    });
  });

  describe('pauseSession / resumeSession', () => {
    it('should pause an active session', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      act(() => {
        result.current.pauseSession();
      });

      expect(result.current.isSessionPaused).toBe(true);
      expect(result.current.isSessionActive).toBe(false);
      expect(result.current.isTimerRunning).toBe(false);
    });

    it('should resume a paused session', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
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
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.pauseSession();
      });

      expect(result.current.session).toBeNull();
    });

    it('should preserve timer value when paused', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      const initialTime = result.current.timeRemaining;

      act(() => {
        jest.advanceTimersByTime(10000);
      });

      act(() => {
        result.current.pauseSession();
      });

      const pausedTime = result.current.timeRemaining;
      expect(pausedTime).toBeLessThan(initialTime);

      // Timer should not decrease while paused
      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(result.current.timeRemaining).toBe(pausedTime);
    });
  });

  describe('endSession', () => {
    it('should end the session and return result', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      let assessmentResult!: ReturnType<typeof result.current.endSession>;
      act(() => {
        assessmentResult = result.current.endSession();
      });

      expect(result.current.isSessionCompleted).toBe(true);
      expect(result.current.session?.status).toBe('completed');
      expect(assessmentResult).not.toBeNull();
    });

    it('should stop the timer when session ends', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      act(() => {
        result.current.endSession();
      });

      expect(result.current.isTimerRunning).toBe(false);
    });

    it('should save pending answer when ending session', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      act(() => {
        result.current.selectAnswer(0);
      });

      act(() => {
        result.current.endSession();
      });

      expect(result.current.session?.answers.length).toBeGreaterThan(0);
    });

    it('should set completedAt timestamp', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      act(() => {
        result.current.endSession();
      });

      expect(result.current.session?.completedAt).toBeDefined();
    });

    it('should calculate result with score and percentage', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      // Answer some questions correctly
      act(() => {
        const correctAnswer = result.current.currentQuestion?.correctAnswer ?? 0;
        result.current.selectAnswer(correctAnswer);
        result.current.submitAnswer();
      });

      let assessmentResult!: ReturnType<typeof result.current.endSession>;
      act(() => {
        assessmentResult = result.current.endSession();
      });

      expect(assessmentResult?.score).toBeDefined();
      expect(assessmentResult?.percentage).toBeDefined();
      expect(assessmentResult?.passed).toBeDefined();
    });
  });

  describe('abandonSession', () => {
    it('should abandon the session', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      act(() => {
        result.current.abandonSession();
      });

      expect(result.current.session?.status).toBe('abandoned');
      expect(result.current.isTimerRunning).toBe(false);
    });

    it('should clear selected answer when abandoned', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      act(() => {
        result.current.selectAnswer(1);
      });

      act(() => {
        result.current.abandonSession();
      });

      expect(result.current.selectedAnswer).toBeNull();
    });
  });

  describe('selectAnswer', () => {
    it('should select an answer', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      act(() => {
        result.current.selectAnswer(2);
      });

      expect(result.current.selectedAnswer).toBe(2);
    });

    it('should allow changing selected answer', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      act(() => {
        result.current.selectAnswer(1);
      });

      act(() => {
        result.current.selectAnswer(3);
      });

      expect(result.current.selectedAnswer).toBe(3);
    });
  });

  describe('submitAnswer', () => {
    it('should submit selected answer', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      act(() => {
        result.current.selectAnswer(0);
      });

      act(() => {
        result.current.submitAnswer();
      });

      expect(result.current.session?.answers.length).toBe(1);
    });

    it('should mark correct answer as correct', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      const correctAnswer = result.current.currentQuestion?.correctAnswer ?? 0;

      act(() => {
        result.current.selectAnswer(correctAnswer);
      });

      act(() => {
        result.current.submitAnswer();
      });

      expect(result.current.session?.answers[0].isCorrect).toBe(true);
    });

    it('should mark incorrect answer as incorrect', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      const correctAnswer = result.current.currentQuestion?.correctAnswer ?? 0;
      const wrongAnswer = (correctAnswer + 1) % 4; // Pick a different answer

      act(() => {
        result.current.selectAnswer(wrongAnswer);
      });

      act(() => {
        result.current.submitAnswer();
      });

      expect(result.current.session?.answers[0].isCorrect).toBe(false);
    });

    it('should record time spent on answer', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      act(() => {
        result.current.selectAnswer(0);
      });

      // Simulate time passing
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      act(() => {
        result.current.submitAnswer();
      });

      expect(result.current.session?.answers[0].timeSpent).toBeGreaterThanOrEqual(0);
    });

    it('should update existing answer if re-submitted', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      // First answer
      act(() => {
        result.current.selectAnswer(0);
      });
      act(() => {
        result.current.submitAnswer();
      });

      expect(result.current.session?.answers.length).toBe(1);
      expect(result.current.session?.answers[0].selectedAnswer).toBe(0);

      // Change and re-submit
      act(() => {
        result.current.selectAnswer(1);
      });
      act(() => {
        result.current.submitAnswer();
      });

      expect(result.current.session?.answers.length).toBe(1);
      expect(result.current.session?.answers[0].selectedAnswer).toBe(1);
    });
  });

  describe('Timer Countdown', () => {
    it('should countdown when session is active', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      const initialTime = result.current.timeRemaining;

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(result.current.timeRemaining).toBe(initialTime - 5);
    });

    it('should stop at zero', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      const initialTime = result.current.timeRemaining;

      act(() => {
        jest.advanceTimersByTime((initialTime + 10) * 1000);
      });

      expect(result.current.timeRemaining).toBe(0);
      expect(result.current.isTimerRunning).toBe(false);
    });

    it('should not countdown when paused', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      act(() => {
        result.current.pauseSession();
      });

      const pausedTime = result.current.timeRemaining;

      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(result.current.timeRemaining).toBe(pausedTime);
    });
  });

  describe('Progress Tracking', () => {
    it('should track answered count', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      expect(result.current.answeredCount).toBe(0);

      act(() => {
        result.current.selectAnswer(0);
      });

      act(() => {
        result.current.submitAnswer();
      });

      expect(result.current.answeredCount).toBe(1);
    });

    it('should track correct count', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      const correctAnswer = result.current.currentQuestion?.correctAnswer ?? 0;

      act(() => {
        result.current.selectAnswer(correctAnswer);
      });

      act(() => {
        result.current.submitAnswer();
      });

      expect(result.current.correctCount).toBe(1);
    });

    it('should calculate progress percentage', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-1');
      });

      const totalQuestions = result.current.totalQuestions;

      act(() => {
        result.current.selectAnswer(0);
      });

      act(() => {
        result.current.submitAnswer();
      });

      const expectedProgress = Math.round((1 / totalQuestions) * 100);
      expect(result.current.progress).toBe(expectedProgress);
    });
  });
});
