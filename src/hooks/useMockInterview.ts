'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  MockInterviewSession,
  MockInterviewSettings,
  InterviewQuestion,
  InterviewAnswer,
  SessionStatus,
  DEFAULT_MOCK_INTERVIEW_SETTINGS,
} from '@/types/interview-prep';
import {
  generateSessionId,
  generateAnswerId,
  shuffleQuestions,
  filterByCategories,
  filterByDifficulty,
} from '@/lib/interview-utils';
import { interviewQuestions } from '@/data/interview-questions';

interface UseMockInterviewReturn {
  // Session state
  session: MockInterviewSession | null;
  currentQuestion: InterviewQuestion | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  isSessionActive: boolean;
  isSessionPaused: boolean;
  isSessionCompleted: boolean;

  // Timer state
  timeRemaining: number;
  isTimerRunning: boolean;

  // Actions
  startSession: (settings?: Partial<MockInterviewSettings>) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  endSession: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  submitAnswer: (answer: string, selfRating?: 1 | 2 | 3 | 4 | 5) => void;
  updateCurrentAnswer: (answer: string) => void;
  resetTimer: () => void;

  // Current answer state
  currentAnswer: string;
  currentAnswerDuration: number;
}

export function useMockInterview(): UseMockInterviewReturn {
  // Session state
  const [session, setSession] = useState<MockInterviewSession | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [answerStartTime, setAnswerStartTime] = useState<number>(0);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate current answer duration
  const currentAnswerDuration = answerStartTime > 0
    ? Math.floor((Date.now() - answerStartTime) / 1000)
    : 0;

  // Derived state
  const currentQuestion = session?.questions[session.currentQuestionIndex] || null;
  const currentQuestionIndex = session?.currentQuestionIndex ?? 0;
  const totalQuestions = session?.questions.length ?? 0;
  const isSessionActive = session?.status === 'in-progress';
  const isSessionPaused = session?.status === 'paused';
  const isSessionCompleted = session?.status === 'completed';

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning, timeRemaining]);

  // Start a new session
  const startSession = useCallback((settings?: Partial<MockInterviewSettings>) => {
    const finalSettings: MockInterviewSettings = {
      ...DEFAULT_MOCK_INTERVIEW_SETTINGS,
      ...settings,
    };

    // Filter and shuffle questions based on settings
    let availableQuestions = [...interviewQuestions];
    availableQuestions = filterByCategories(availableQuestions, finalSettings.categories);
    availableQuestions = filterByDifficulty(availableQuestions, finalSettings.difficulties);
    availableQuestions = shuffleQuestions(availableQuestions);

    // Take the required number of questions
    const selectedQuestions = availableQuestions.slice(0, finalSettings.questionCount);

    if (selectedQuestions.length === 0) {
      console.error('No questions available for the selected criteria');
      return;
    }

    const newSession: MockInterviewSession = {
      id: generateSessionId(),
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      answers: [],
      status: 'in-progress',
      startedAt: new Date().toISOString(),
      totalDuration: 0,
      settings: finalSettings,
    };

    setSession(newSession);
    setCurrentAnswer('');
    setAnswerStartTime(Date.now());
    setTimeRemaining(finalSettings.timePerQuestion);
    setIsTimerRunning(true);
  }, []);

  // Pause the session
  const pauseSession = useCallback(() => {
    if (!session || session.status !== 'in-progress') return;

    setSession((prev) => {
      if (!prev) return null;
      return { ...prev, status: 'paused' };
    });
    setIsTimerRunning(false);
  }, [session]);

  // Resume the session
  const resumeSession = useCallback(() => {
    if (!session || session.status !== 'paused') return;

    setSession((prev) => {
      if (!prev) return null;
      return { ...prev, status: 'in-progress' };
    });
    setIsTimerRunning(true);
  }, [session]);

  // End the session
  const endSession = useCallback(() => {
    if (!session) return;

    // Save current answer if there's content (preserve existing selfRating if present)
    if (currentAnswer.trim()) {
      const existingAnswerData = session.answers.find(
        (a) => a.questionId === currentQuestion?.id
      );
      const newAnswer: InterviewAnswer = {
        questionId: currentQuestion?.id || '',
        answer: currentAnswer,
        duration: currentAnswerDuration,
        selfRating: existingAnswerData?.selfRating,
        submittedAt: new Date().toISOString(),
      };

      setSession((prev) => {
        if (!prev) return null;

        // Check if answer for this question already exists
        const existingIndex = prev.answers.findIndex(
          (a) => a.questionId === currentQuestion?.id
        );

        let updatedAnswers = [...prev.answers];
        if (existingIndex >= 0) {
          updatedAnswers[existingIndex] = newAnswer;
        } else {
          updatedAnswers.push(newAnswer);
        }

        return {
          ...prev,
          status: 'completed' as SessionStatus,
          completedAt: new Date().toISOString(),
          answers: updatedAnswers,
        };
      });
    } else {
      setSession((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          status: 'completed' as SessionStatus,
          completedAt: new Date().toISOString(),
        };
      });
    }

    setIsTimerRunning(false);
    setCurrentAnswer('');
  }, [session, currentAnswer, currentQuestion, currentAnswerDuration]);

  // Navigate to next question
  const nextQuestion = useCallback(() => {
    if (!session || session.currentQuestionIndex >= session.questions.length - 1) return;

    // Save current answer before moving (preserve existing selfRating if present)
    if (currentAnswer.trim()) {
      const existingAnswerData = session.answers.find(
        (a) => a.questionId === currentQuestion?.id
      );
      const newAnswer: InterviewAnswer = {
        questionId: currentQuestion?.id || '',
        answer: currentAnswer,
        duration: currentAnswerDuration,
        selfRating: existingAnswerData?.selfRating,
        submittedAt: new Date().toISOString(),
      };

      setSession((prev) => {
        if (!prev) return null;

        const existingIndex = prev.answers.findIndex(
          (a) => a.questionId === currentQuestion?.id
        );

        let updatedAnswers = [...prev.answers];
        if (existingIndex >= 0) {
          updatedAnswers[existingIndex] = newAnswer;
        } else {
          updatedAnswers.push(newAnswer);
        }

        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          answers: updatedAnswers,
        };
      });
    } else {
      setSession((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        };
      });
    }

    // Load existing answer for next question or reset
    const nextIndex = session.currentQuestionIndex + 1;
    const nextQuestionId = session.questions[nextIndex]?.id;
    const existingAnswer = session.answers.find((a) => a.questionId === nextQuestionId);
    setCurrentAnswer(existingAnswer?.answer || '');
    setAnswerStartTime(Date.now());
    setTimeRemaining(session.settings.timePerQuestion);
  }, [session, currentAnswer, currentQuestion, currentAnswerDuration]);

  // Navigate to previous question
  const previousQuestion = useCallback(() => {
    if (!session || session.currentQuestionIndex <= 0) return;

    // Save current answer before moving (preserve existing selfRating if present)
    if (currentAnswer.trim()) {
      const existingAnswerData = session.answers.find(
        (a) => a.questionId === currentQuestion?.id
      );
      const newAnswer: InterviewAnswer = {
        questionId: currentQuestion?.id || '',
        answer: currentAnswer,
        duration: currentAnswerDuration,
        selfRating: existingAnswerData?.selfRating,
        submittedAt: new Date().toISOString(),
      };

      setSession((prev) => {
        if (!prev) return null;

        const existingIndex = prev.answers.findIndex(
          (a) => a.questionId === currentQuestion?.id
        );

        let updatedAnswers = [...prev.answers];
        if (existingIndex >= 0) {
          updatedAnswers[existingIndex] = newAnswer;
        } else {
          updatedAnswers.push(newAnswer);
        }

        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
          answers: updatedAnswers,
        };
      });
    } else {
      setSession((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
        };
      });
    }

    // Load existing answer for previous question
    const prevIndex = session.currentQuestionIndex - 1;
    const prevQuestionId = session.questions[prevIndex]?.id;
    const existingAnswer = session.answers.find((a) => a.questionId === prevQuestionId);
    setCurrentAnswer(existingAnswer?.answer || '');
    setAnswerStartTime(Date.now());
    setTimeRemaining(session.settings.timePerQuestion);
  }, [session, currentAnswer, currentQuestion, currentAnswerDuration]);

  // Go to specific question
  const goToQuestion = useCallback((index: number) => {
    if (!session || index < 0 || index >= session.questions.length) return;

    // Save current answer before moving (preserve existing selfRating if present)
    if (currentAnswer.trim()) {
      const existingAnswerData = session.answers.find(
        (a) => a.questionId === currentQuestion?.id
      );
      const newAnswer: InterviewAnswer = {
        questionId: currentQuestion?.id || '',
        answer: currentAnswer,
        duration: currentAnswerDuration,
        selfRating: existingAnswerData?.selfRating,
        submittedAt: new Date().toISOString(),
      };

      setSession((prev) => {
        if (!prev) return null;

        const existingIndex = prev.answers.findIndex(
          (a) => a.questionId === currentQuestion?.id
        );

        let updatedAnswers = [...prev.answers];
        if (existingIndex >= 0) {
          updatedAnswers[existingIndex] = newAnswer;
        } else {
          updatedAnswers.push(newAnswer);
        }

        return {
          ...prev,
          currentQuestionIndex: index,
          answers: updatedAnswers,
        };
      });
    } else {
      setSession((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          currentQuestionIndex: index,
        };
      });
    }

    // Load existing answer for target question
    const targetQuestionId = session.questions[index]?.id;
    const existingAnswer = session.answers.find((a) => a.questionId === targetQuestionId);
    setCurrentAnswer(existingAnswer?.answer || '');
    setAnswerStartTime(Date.now());
    setTimeRemaining(session.settings.timePerQuestion);
  }, [session, currentAnswer, currentQuestion, currentAnswerDuration]);

  // Submit answer with optional rating
  const submitAnswer = useCallback((answer: string, selfRating?: 1 | 2 | 3 | 4 | 5) => {
    if (!session || !currentQuestion) return;

    const newAnswer: InterviewAnswer = {
      questionId: currentQuestion.id,
      answer,
      duration: currentAnswerDuration,
      selfRating,
      submittedAt: new Date().toISOString(),
    };

    setSession((prev) => {
      if (!prev) return null;

      const existingIndex = prev.answers.findIndex(
        (a) => a.questionId === currentQuestion.id
      );

      let updatedAnswers = [...prev.answers];
      if (existingIndex >= 0) {
        updatedAnswers[existingIndex] = newAnswer;
      } else {
        updatedAnswers.push(newAnswer);
      }

      return {
        ...prev,
        answers: updatedAnswers,
      };
    });
  }, [session, currentQuestion, currentAnswerDuration]);

  // Update current answer (for controlled input)
  const updateCurrentAnswer = useCallback((answer: string) => {
    setCurrentAnswer(answer);
  }, []);

  // Reset timer
  const resetTimer = useCallback(() => {
    if (!session) return;
    setTimeRemaining(session.settings.timePerQuestion);
    setIsTimerRunning(true);
  }, [session]);

  return {
    // Session state
    session,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isSessionActive,
    isSessionPaused,
    isSessionCompleted,

    // Timer state
    timeRemaining,
    isTimerRunning,

    // Actions
    startSession,
    pauseSession,
    resumeSession,
    endSession,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitAnswer,
    updateCurrentAnswer,
    resetTimer,

    // Current answer state
    currentAnswer,
    currentAnswerDuration,
  };
}
