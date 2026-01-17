'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  SessionSetup,
  MockInterviewPlayer,
  AnswerInput,
  SessionSummary,
} from '@/components/interview-prep';
import { useMockInterview } from '@/hooks/useMockInterview';
import { useInterviewAnalytics } from '@/hooks/useInterviewAnalytics';
import { MockInterviewSettings } from '@/types/interview-prep';
import { filterQuestions } from '@/data/interview-questions';
import { toast } from 'sonner';

export default function MockInterviewPage() {
  const router = useRouter();
  const {
    session,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isSessionActive,
    isSessionPaused,
    isSessionCompleted,
    timeRemaining,
    isTimerRunning,
    currentAnswer,
    startSession,
    pauseSession,
    resumeSession,
    endSession,
    nextQuestion,
    previousQuestion,
    updateCurrentAnswer,
    submitAnswer,
    resetTimer,
  } = useMockInterview();

  const { recordSession, saveAnswer } = useInterviewAnalytics();

  // Calculate available questions for the current settings preview
  const [previewSettings, setPreviewSettings] = React.useState<MockInterviewSettings | null>(null);
  const availableQuestionCount = React.useMemo(() => {
    if (!previewSettings) return undefined;
    const filtered = filterQuestions({
      categories: previewSettings.categories,
      difficulties: previewSettings.difficulties,
    });
    return filtered.length;
  }, [previewSettings]);

  // Get answered question indices
  const answeredQuestions = React.useMemo(() => {
    if (!session) return [];
    return session.answers
      .map((a) => session.questions.findIndex((q) => q.id === a.questionId))
      .filter((i) => i >= 0);
  }, [session]);

  const handleStartSession = (settings: MockInterviewSettings) => {
    setPreviewSettings(settings);
    startSession(settings);
    toast.success('Mock interview started! Good luck!');
  };

  const handleEndSession = () => {
    endSession();
    if (session) {
      recordSession(session);
      toast.success('Session completed and saved!');
    }
  };

  const handleSubmitAnswer = (answer: string, rating: 1 | 2 | 3 | 4 | 5) => {
    submitAnswer(answer, rating);
    toast.success('Answer submitted!');

    // Auto-advance to next question if not on last question
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        nextQuestion();
      }, 500);
    }
  };

  const handleSaveAnswer = (answer: string) => {
    if (currentQuestion) {
      saveAnswer(
        currentQuestion.id,
        currentQuestion.question,
        answer,
        currentQuestion.category
      );
      toast.success('Answer saved to your Answer Bank!');
    }
  };

  const handleStartNew = () => {
    // Reset by reloading the page or clearing state
    window.location.reload();
  };

  const handleGoHome = () => {
    router.push('/dashboard/interview-prep');
  };

  // Warn before leaving if session is active
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSessionActive) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSessionActive]);

  // Session completed view
  if (isSessionCompleted && session) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
            <Link href="/dashboard/interview-prep">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Hub
            </Link>
          </Button>
        </div>
        <SessionSummary
          session={session}
          onStartNew={handleStartNew}
          onGoHome={handleGoHome}
        />
      </div>
    );
  }

  // Active session view
  if (session && (isSessionActive || isSessionPaused)) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
            <Link href="/dashboard/interview-prep">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Hub
            </Link>
          </Button>
          <span className="text-muted-foreground">|</span>
          <span className="text-sm font-medium">Mock Interview in Progress</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Question Player */}
          <MockInterviewPlayer
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            timeRemaining={timeRemaining}
            isTimerRunning={isTimerRunning}
            isPaused={isSessionPaused}
            onPause={pauseSession}
            onResume={resumeSession}
            onEnd={handleEndSession}
            onNext={nextQuestion}
            onPrevious={previousQuestion}
            onResetTimer={resetTimer}
            answeredQuestions={answeredQuestions}
          />

          {/* Answer Input */}
          <AnswerInput
            value={currentAnswer}
            onChange={updateCurrentAnswer}
            onSubmit={handleSubmitAnswer}
            onSave={handleSaveAnswer}
            showSTARHelper={true}
            showWordCount={true}
            questionCategory={currentQuestion?.category}
            placeholder="Type your answer here. Use the STAR method for behavioral questions..."
            disabled={isSessionPaused}
          />
        </div>
      </div>
    );
  }

  // Setup view (no active session)
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
          <Link href="/dashboard/interview-prep">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Hub
          </Link>
        </Button>
      </div>

      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Play className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Mock Interview</h1>
        <p className="text-muted-foreground">
          Configure your practice session and start interviewing
        </p>
      </div>

      <SessionSetup
        onStart={handleStartSession}
        availableQuestionCount={availableQuestionCount}
      />
    </div>
  );
}
