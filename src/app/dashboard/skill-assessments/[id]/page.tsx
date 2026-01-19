'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Play,
  Pause,
  StopCircle,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  AssessmentQuestion,
  AssessmentTimer,
  AssessmentProgress,
  AssessmentResult,
} from '@/components/skill-assessment';
import { useSkillAssessment } from '@/hooks/useSkillAssessment';
import { getAssessmentById } from '@/data/skill-assessments';
import {
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_COLORS,
  ASSESSMENT_DIFFICULTY_CONFIG,
} from '@/types/skill-assessment';

export default function AssessmentSessionPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const assessmentId = params.id as string;
  const viewMode = searchParams.get('view');

  const [isStarted, setIsStarted] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const assessment = getAssessmentById(assessmentId);

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
    answeredCount,
    selectedAnswer,
    result,
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
  } = useSkillAssessment();

  // Get answered question indices
  const answeredQuestions = session?.answers.map((a) => {
    const idx = session.questions.findIndex((q) => q.id === a.questionId);
    return idx;
  }).filter((idx) => idx !== -1) || [];

  const handleStartAssessment = () => {
    const success = startSession(assessmentId, 'current-user');
    if (success) {
      setIsStarted(true);
    }
  };

  const handleSubmitAssessment = () => {
    endSession();
  };

  const handleExitAssessment = () => {
    abandonSession();
    router.push('/dashboard/skill-assessments');
  };

  const handleRetake = () => {
    setIsStarted(false);
    startSession(assessmentId, 'current-user');
    setIsStarted(true);
  };

  const handleBackToList = () => {
    router.push('/dashboard/skill-assessments');
  };

  if (!assessment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Assessment Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The assessment you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button onClick={handleBackToList}>Back to Assessments</Button>
      </div>
    );
  }

  // Show result if assessment is completed
  if (isSessionCompleted && result) {
    return (
      <div className="max-w-4xl mx-auto">
        <AssessmentResult
          result={result}
          onRetake={handleRetake}
          onBackToList={handleBackToList}
        />
      </div>
    );
  }

  // Show details view
  if (viewMode === 'details' || !isStarted) {
    const difficultyConfig = ASSESSMENT_DIFFICULTY_CONFIG[assessment.difficulty];
    const categoryColor = SKILL_CATEGORY_COLORS[assessment.category];

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back button */}
        <Button variant="ghost" onClick={handleBackToList}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Assessments
        </Button>

        {/* Assessment Details Card */}
        <Card>
          <CardContent className="p-8">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0"
                style={{ backgroundColor: assessment.badge.color + '20' }}
              >
                {assessment.badge.icon}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{assessment.title}</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className={categoryColor}>
                    {SKILL_CATEGORY_LABELS[assessment.category]}
                  </Badge>
                  <Badge variant="outline" className={difficultyConfig.color}>
                    {difficultyConfig.label}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6">{assessment.description}</p>

            {/* Assessment Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{assessment.questions.length}</div>
                <div className="text-xs text-muted-foreground">Questions</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <Clock className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">{Math.floor(assessment.timeLimit / 60)}</div>
                <div className="text-xs text-muted-foreground">Minutes</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{assessment.passingScore}%</div>
                <div className="text-xs text-muted-foreground">To Pass</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <Award className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{assessment.totalPoints}</div>
                <div className="text-xs text-muted-foreground">Total Points</div>
              </div>
            </div>

            {/* Badge to earn */}
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: assessment.badge.color + '20' }}
                >
                  {assessment.badge.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-600" />
                    <span className="font-semibold">Badge to Earn</span>
                  </div>
                  <p className="text-sm font-medium">{assessment.badge.name}</p>
                  <p className="text-xs text-muted-foreground">{assessment.badge.description}</p>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <Button size="lg" className="w-full" onClick={handleStartAssessment}>
              <Play className="mr-2 h-5 w-5" />
              Start Assessment
            </Button>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>You have {Math.floor(assessment.timeLimit / 60)} minutes to complete all questions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>You need to score at least {assessment.passingScore}% to pass and earn the badge.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>You can navigate between questions using the navigation buttons.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Make sure you have a stable internet connection before starting.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>You can pause the assessment if needed, but the timer will continue.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Active assessment view
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header with timer and progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="font-semibold">{assessment.title}</h1>
              <AssessmentTimer
                timeRemaining={timeRemaining}
                isRunning={isTimerRunning}
                onPause={pauseSession}
                onResume={resumeSession}
                showControls
              />
            </div>
            <div className="flex items-center gap-2">
              <AlertDialog open={showExitConfirm} onOpenChange={setShowExitConfirm}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <StopCircle className="mr-2 h-4 w-4" />
                    Exit
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Exit Assessment?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to exit? Your progress will be lost and this will count as an abandoned attempt.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Continue Assessment</AlertDialogCancel>
                    <AlertDialogAction onClick={handleExitAssessment}>
                      Exit Assessment
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button onClick={handleSubmitAssessment}>
                Submit Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress bar */}
      <AssessmentProgress
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        onQuestionClick={goToQuestion}
        variant="bar"
      />

      {/* Paused overlay */}
      {isSessionPaused && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6 text-center">
            <Pause className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
            <h3 className="text-lg font-semibold mb-2">Assessment Paused</h3>
            <p className="text-muted-foreground mb-4">
              The timer is still running. Click resume to continue.
            </p>
            <Button onClick={resumeSession}>
              <Play className="mr-2 h-4 w-4" />
              Resume Assessment
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Current question */}
      {!isSessionPaused && currentQuestion && (
        <AssessmentQuestion
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={selectAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />
      )}

      {/* Navigation */}
      {!isSessionPaused && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <AssessmentProgress
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                answeredQuestions={answeredQuestions}
                onQuestionClick={goToQuestion}
                variant="dots"
              />

              {currentQuestionIndex < totalQuestions - 1 ? (
                <Button onClick={() => {
                  if (selectedAnswer !== null) {
                    submitAnswer();
                  }
                  nextQuestion();
                }}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmitAssessment}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Submit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
