'use client';

import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Square,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { InterviewQuestion } from '@/types/interview-prep';
import {
  formatDuration,
  getCategoryLabel,
  getCategoryColor,
  getDifficultyConfig,
  calculateCompletionPercentage,
} from '@/lib/interview-utils';

interface MockInterviewPlayerProps {
  currentQuestion: InterviewQuestion | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  isTimerRunning: boolean;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onEnd: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onResetTimer: () => void;
  answeredQuestions?: number[];
}

export function MockInterviewPlayer({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  timeRemaining,
  isTimerRunning,
  isPaused,
  onPause,
  onResume,
  onEnd,
  onNext,
  onPrevious,
  onResetTimer,
  answeredQuestions = [],
}: MockInterviewPlayerProps) {
  if (!currentQuestion) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No question loaded
        </CardContent>
      </Card>
    );
  }

  const progressPercentage = calculateCompletionPercentage(
    currentQuestionIndex + 1,
    totalQuestions
  );

  const difficultyConfig = getDifficultyConfig(currentQuestion.difficulty);
  const categoryColor = getCategoryColor(currentQuestion.category);

  // Timer warning states
  const isTimerWarning = timeRemaining <= 30 && timeRemaining > 10;
  const isTimerCritical = timeRemaining <= 10;

  const getTimerColor = () => {
    if (isTimerCritical) return 'text-red-600';
    if (isTimerWarning) return 'text-yellow-600';
    return 'text-foreground';
  };

  const getTimerBgColor = () => {
    if (isTimerCritical) return 'bg-red-100';
    if (isTimerWarning) return 'bg-yellow-100';
    return 'bg-muted';
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Header with Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-muted-foreground">{progressPercentage}% complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />

          {/* Question Navigation Dots */}
          <div className="flex items-center justify-center gap-1 pt-2">
            {Array.from({ length: totalQuestions }).map((_, index) => {
              const isAnswered = answeredQuestions.includes(index);
              const isCurrent = index === currentQuestionIndex;
              return (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isCurrent
                      ? 'bg-primary w-4'
                      : isAnswered
                      ? 'bg-green-500'
                      : 'bg-muted-foreground/30'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center">
          <div
            className={`flex items-center gap-2 px-6 py-3 rounded-full ${getTimerBgColor()}`}
          >
            <Clock className={`h-5 w-5 ${getTimerColor()}`} />
            <span className={`text-2xl font-mono font-bold ${getTimerColor()}`}>
              {formatDuration(timeRemaining)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetTimer}
              className="h-8 w-8 p-0 ml-2"
              title="Reset timer"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Question Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="secondary" className={categoryColor}>
            {getCategoryLabel(currentQuestion.category)}
          </Badge>
          <Badge variant="outline" className={difficultyConfig.color}>
            {difficultyConfig.label}
          </Badge>
          {currentQuestion.company && (
            <Badge variant="outline">{currentQuestion.company}</Badge>
          )}
        </div>

        {/* Question */}
        <div className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-medium text-center leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Tips (if available) */}
        {currentQuestion.tips && currentQuestion.tips.length > 0 && (
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm font-medium text-yellow-800 mb-2">Quick Tips:</p>
            <ul className="text-sm text-yellow-700 space-y-1">
              {currentQuestion.tips.slice(0, 2).map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onPrevious}
            disabled={currentQuestionIndex === 0}
            className="w-12 h-12 p-0"
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          {isPaused ? (
            <Button
              variant="default"
              size="lg"
              onClick={onResume}
              className="w-16 h-16 rounded-full p-0"
            >
              <Play className="h-6 w-6 ml-1" />
            </Button>
          ) : (
            <Button
              variant="default"
              size="lg"
              onClick={onPause}
              className="w-16 h-16 rounded-full p-0"
            >
              <Pause className="h-6 w-6" />
            </Button>
          )}

          <Button
            variant="outline"
            size="lg"
            onClick={onNext}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className="w-12 h-12 p-0"
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* End Session Button */}
        <div className="flex justify-center pt-4 border-t">
          <Button variant="destructive" onClick={onEnd}>
            <Square className="mr-2 h-4 w-4" />
            End Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
