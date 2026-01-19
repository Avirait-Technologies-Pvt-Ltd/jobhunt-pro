'use client';

import React from 'react';
import { CheckCircle2, Circle, CircleDot } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface AssessmentProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  answeredQuestions: number[];
  onQuestionClick?: (index: number) => void;
  variant?: 'bar' | 'dots' | 'steps';
  showPercentage?: boolean;
}

export function AssessmentProgress({
  currentQuestionIndex,
  totalQuestions,
  answeredQuestions,
  onQuestionClick,
  variant = 'bar',
  showPercentage = true,
}: AssessmentProgressProps) {
  const progressPercentage = Math.round((answeredQuestions.length / totalQuestions) * 100);

  if (variant === 'bar') {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          {showPercentage && (
            <span className="text-sm font-medium">{progressPercentage}% Complete</span>
          )}
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">
            {answeredQuestions.length} answered
          </span>
          <span className="text-xs text-muted-foreground">
            {totalQuestions - answeredQuestions.length} remaining
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const isAnswered = answeredQuestions.includes(index);
          const isCurrent = index === currentQuestionIndex;

          return (
            <button
              key={index}
              onClick={() => onQuestionClick?.(index)}
              disabled={!onQuestionClick}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                isAnswered && 'bg-green-500',
                !isAnswered && !isCurrent && 'bg-gray-200',
                isCurrent && !isAnswered && 'bg-primary ring-2 ring-primary/30',
                onQuestionClick && 'cursor-pointer hover:scale-110'
              )}
              title={`Question ${index + 1}${isAnswered ? ' (Answered)' : ''}`}
            />
          );
        })}
      </div>
    );
  }

  // Steps variant
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {Array.from({ length: totalQuestions }).map((_, index) => {
        const isAnswered = answeredQuestions.includes(index);
        const isCurrent = index === currentQuestionIndex;

        return (
          <React.Fragment key={index}>
            <button
              onClick={() => onQuestionClick?.(index)}
              disabled={!onQuestionClick}
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all shrink-0',
                isAnswered && 'bg-green-100 text-green-700',
                !isAnswered && !isCurrent && 'bg-gray-100 text-gray-500',
                isCurrent && 'bg-primary text-white ring-2 ring-primary/30',
                onQuestionClick && 'cursor-pointer hover:scale-105'
              )}
            >
              {isAnswered ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : isCurrent ? (
                <CircleDot className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </button>
            {index < totalQuestions - 1 && (
              <div
                className={cn(
                  'w-4 h-0.5 shrink-0',
                  answeredQuestions.includes(index) ? 'bg-green-300' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
