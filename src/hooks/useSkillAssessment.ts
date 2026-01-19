'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  SkillAssessment,
  AssessmentSession,
  AssessmentSessionStatus,
  AssessmentQuestion,
  UserAnswer,
  AssessmentResult,
  AssessmentSessionSettings,
  DEFAULT_SESSION_SETTINGS,
} from '@/types/skill-assessment';
import {
  generateSessionId,
  shuffleQuestions,
  isAnswerCorrect,
  generateAssessmentResult,
} from '@/lib/assessment-utils';
import { getAssessmentById } from '@/data/skill-assessments';

interface UseSkillAssessmentReturn {
  // Session state
  session: AssessmentSession | null;
  currentQuestion: AssessmentQuestion | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  isSessionActive: boolean;
  isSessionPaused: boolean;
  isSessionCompleted: boolean;

  // Timer state
  timeRemaining: number;
  isTimerRunning: boolean;
  questionTimeRemaining: number;

  // Progress
  answeredCount: number;
  correctCount: number;
  progress: number;

  // Actions
  startSession: (assessmentId: string, userId: string, settings?: Partial<AssessmentSessionSettings>) => boolean;
  pauseSession: () => void;
  resumeSession: () => void;
  endSession: () => AssessmentResult | null;
  abandonSession: () => void;
  selectAnswer: (answerIndex: number) => void;
  submitAnswer: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  skipQuestion: () => void;

  // Current state
  selectedAnswer: number | null;
  currentAnswer: UserAnswer | null;

  // Results
  getResult: () => AssessmentResult | null;
  result: AssessmentResult | null;

  // Settings
  settings: AssessmentSessionSettings;
}

export function useSkillAssessment(): UseSkillAssessmentReturn {
  // Assessment and session state
  const [assessment, setAssessment] = useState<SkillAssessment | null>(null);
  const [session, setSession] = useState<AssessmentSession | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [settings, setSettings] = useState<AssessmentSessionSettings>(DEFAULT_SESSION_SETTINGS);

  // Current question state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Derived state
  const currentQuestion = session?.questions?.[session.currentQuestionIndex] || null;
  const currentQuestionIndex = session?.currentQuestionIndex ?? 0;
  const totalQuestions = session?.questions?.length ?? 0;
  const isSessionActive = session?.status === 'in-progress';
  const isSessionPaused = session?.status === 'paused';
  const isSessionCompleted = session?.status === 'completed';

  // Progress calculations
  const answeredCount = session?.answers?.length ?? 0;
  const correctCount = session?.answers?.filter((a) => a.isCorrect).length ?? 0;
  const progress = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Get current answer for the current question
  const currentAnswer = session?.answers?.find((a) => a.questionId === currentQuestion?.id) || null;

  // Main timer effect (overall assessment time)
  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            // Auto-submit when time runs out
            if (settings.autoSubmitOnTimeout && session) {
              setSession((prevSession) => {
                if (!prevSession) return null;
                return {
                  ...prevSession,
                  status: 'completed' as AssessmentSessionStatus,
                  completedAt: new Date().toISOString(),
                };
              });
            }
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
  }, [isTimerRunning, timeRemaining, settings.autoSubmitOnTimeout, session]);

  // Question timer effect (per-question time)
  useEffect(() => {
    if (isTimerRunning && questionTimeRemaining > 0 && currentQuestion) {
      questionTimerRef.current = setInterval(() => {
        setQuestionTimeRemaining((prev) => {
          if (prev <= 1) {
            // Auto-move to next question when question time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
      }
    };
  }, [isTimerRunning, questionTimeRemaining, currentQuestion]);

  // Start a new assessment session
  const startSession = useCallback(
    (assessmentId: string, userId: string, customSettings?: Partial<AssessmentSessionSettings>): boolean => {
      const foundAssessment = getAssessmentById(assessmentId);
      if (!foundAssessment) {
        console.error('Assessment not found:', assessmentId);
        return false;
      }

      const finalSettings: AssessmentSessionSettings = {
        ...DEFAULT_SESSION_SETTINGS,
        ...customSettings,
      };

      // Prepare questions (optionally shuffle)
      let sessionQuestions = [...foundAssessment.questions];
      if (finalSettings.shuffleQuestions) {
        sessionQuestions = shuffleQuestions(sessionQuestions);
      }

      if (sessionQuestions.length === 0) {
        console.error('No questions available for this assessment');
        return false;
      }

      const newSession: AssessmentSession = {
        id: generateSessionId(),
        assessmentId,
        userId,
        status: 'in-progress',
        currentQuestionIndex: 0,
        answers: [],
        startedAt: new Date().toISOString(),
        totalTimeSpent: 0,
        timeRemaining: foundAssessment.timeLimit,
        questions: sessionQuestions,
      };

      setAssessment(foundAssessment);
      setSession(newSession);
      setSettings(finalSettings);
      setSelectedAnswer(null);
      setQuestionStartTime(Date.now());
      setTimeRemaining(foundAssessment.timeLimit);
      setQuestionTimeRemaining(sessionQuestions[0].timeLimit);
      setIsTimerRunning(true);
      setResult(null);

      return true;
    },
    []
  );

  // Pause the session
  const pauseSession = useCallback(() => {
    if (!session || session.status !== 'in-progress') return;

    setSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'paused' as AssessmentSessionStatus,
        pausedAt: new Date().toISOString(),
      };
    });
    setIsTimerRunning(false);
  }, [session]);

  // Resume the session
  const resumeSession = useCallback(() => {
    if (!session || session.status !== 'paused') return;

    setSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'in-progress' as AssessmentSessionStatus,
        pausedAt: undefined,
      };
    });
    setIsTimerRunning(true);
  }, [session]);

  // End the session and calculate results
  const endSession = useCallback((): AssessmentResult | null => {
    if (!session || !assessment) return null;

    // Save any pending answer
    let finalAnswers = [...session.answers];
    if (selectedAnswer !== null && currentQuestion) {
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
      const existingIndex = finalAnswers.findIndex((a) => a.questionId === currentQuestion.id);
      const newAnswer: UserAnswer = {
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect: isAnswerCorrect(currentQuestion, selectedAnswer),
        timeSpent,
        answeredAt: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        finalAnswers[existingIndex] = newAnswer;
      } else {
        finalAnswers.push(newAnswer);
      }
    }

    const totalTimeSpent = assessment.timeLimit - timeRemaining;

    const completedSession: AssessmentSession = {
      ...session,
      answers: finalAnswers,
      status: 'completed',
      completedAt: new Date().toISOString(),
      totalTimeSpent,
    };

    setSession(completedSession);
    setIsTimerRunning(false);

    // Generate result
    const assessmentResult = generateAssessmentResult(completedSession, assessment);
    setResult(assessmentResult);

    return assessmentResult;
  }, [session, assessment, selectedAnswer, currentQuestion, questionStartTime, timeRemaining]);

  // Abandon the session
  const abandonSession = useCallback(() => {
    if (!session) return;

    setSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'abandoned' as AssessmentSessionStatus,
        completedAt: new Date().toISOString(),
      };
    });
    setIsTimerRunning(false);
    setSelectedAnswer(null);
  }, [session]);

  // Select an answer (doesn't submit yet)
  const selectAnswer = useCallback((answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  }, []);

  // Submit the current answer
  const submitAnswer = useCallback(() => {
    if (!session || !currentQuestion || selectedAnswer === null) return;

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect: isAnswerCorrect(currentQuestion, selectedAnswer),
      timeSpent,
      answeredAt: new Date().toISOString(),
    };

    setSession((prev) => {
      if (!prev) return null;

      const existingIndex = prev.answers.findIndex((a) => a.questionId === currentQuestion.id);
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
  }, [session, currentQuestion, selectedAnswer, questionStartTime]);

  // Navigate to next question
  const nextQuestion = useCallback(() => {
    if (!session || session.currentQuestionIndex >= (session.questions?.length ?? 0) - 1) return;

    // Submit current answer if selected
    if (selectedAnswer !== null && currentQuestion) {
      submitAnswer();
    }

    const nextIndex = session.currentQuestionIndex + 1;
    const nextQ = session.questions[nextIndex];

    setSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
      };
    });

    // Load existing answer for next question or reset
    const existingAnswer = session.answers.find(
      (a) => a.questionId === nextQ?.id
    );
    setSelectedAnswer(existingAnswer?.selectedAnswer ?? null);
    setQuestionStartTime(Date.now());
    setQuestionTimeRemaining(nextQ?.timeLimit ?? 60);
  }, [session, selectedAnswer, currentQuestion, submitAnswer]);

  // Navigate to previous question
  const previousQuestion = useCallback(() => {
    if (!session || session.currentQuestionIndex <= 0) return;

    // Submit current answer if selected
    if (selectedAnswer !== null && currentQuestion) {
      submitAnswer();
    }

    const prevIndex = session.currentQuestionIndex - 1;
    const prevQ = session.questions[prevIndex];

    setSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        currentQuestionIndex: prevIndex,
      };
    });

    // Load existing answer for previous question
    const existingAnswer = session.answers.find(
      (a) => a.questionId === prevQ?.id
    );
    setSelectedAnswer(existingAnswer?.selectedAnswer ?? null);
    setQuestionStartTime(Date.now());
    setQuestionTimeRemaining(prevQ?.timeLimit ?? 60);
  }, [session, selectedAnswer, currentQuestion, submitAnswer]);

  // Go to specific question
  const goToQuestion = useCallback(
    (index: number) => {
      if (!session) return;
      const questions = session.questions;
      if (index < 0 || index >= questions.length) return;

      // Submit current answer if selected
      if (selectedAnswer !== null && currentQuestion) {
        submitAnswer();
      }

      const targetQ = questions[index];

      setSession((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          currentQuestionIndex: index,
        };
      });

      // Load existing answer for target question
      const existingAnswer = session.answers.find(
        (a) => a.questionId === targetQ?.id
      );
      setSelectedAnswer(existingAnswer?.selectedAnswer ?? null);
      setQuestionStartTime(Date.now());
      setQuestionTimeRemaining(targetQ?.timeLimit ?? 60);
    },
    [session, selectedAnswer, currentQuestion, submitAnswer]
  );

  // Skip current question (move to next without answering)
  const skipQuestion = useCallback(() => {
    if (!settings.allowSkip) return;
    if (!session || session.currentQuestionIndex >= (session.questions?.length ?? 0) - 1) return;

    const nextIndex = session.currentQuestionIndex + 1;
    const nextQ = session.questions[nextIndex];

    setSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
      };
    });

    const existingAnswer = session.answers.find(
      (a) => a.questionId === nextQ?.id
    );
    setSelectedAnswer(existingAnswer?.selectedAnswer ?? null);
    setQuestionStartTime(Date.now());
    setQuestionTimeRemaining(nextQ?.timeLimit ?? 60);
  }, [session, settings.allowSkip]);

  // Get result (useful after session ends)
  const getResult = useCallback((): AssessmentResult | null => {
    return result;
  }, [result]);

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
    questionTimeRemaining,

    // Progress
    answeredCount,
    correctCount,
    progress,

    // Actions
    startSession,
    pauseSession,
    resumeSession,
    endSession,
    abandonSession,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    skipQuestion,

    // Current state
    selectedAnswer,
    currentAnswer,

    // Results
    getResult,
    result,

    // Settings
    settings,
  };
}
