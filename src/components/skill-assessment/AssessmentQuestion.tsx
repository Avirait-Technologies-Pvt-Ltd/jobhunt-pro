'use client';

import React from 'react';
import { CheckCircle2, XCircle, Code } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AssessmentQuestion as AssessmentQuestionType,
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_COLORS,
  ASSESSMENT_DIFFICULTY_CONFIG,
  QUESTION_TYPE_LABELS,
} from '@/types/skill-assessment';
import { cn } from '@/lib/utils';

interface AssessmentQuestionProps {
  question: AssessmentQuestionType;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  showResult?: boolean;
  disabled?: boolean;
  questionNumber?: number;
  totalQuestions?: number;
}

export function AssessmentQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
  showResult = false,
  disabled = false,
  questionNumber,
  totalQuestions,
}: AssessmentQuestionProps) {
  const difficultyConfig = ASSESSMENT_DIFFICULTY_CONFIG[question.difficulty];
  const categoryColor = SKILL_CATEGORY_COLORS[question.category];

  const getOptionState = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index ? 'selected' : 'default';
    }
    if (index === question.correctAnswer) {
      return 'correct';
    }
    if (selectedAnswer === index && selectedAnswer !== question.correctAnswer) {
      return 'incorrect';
    }
    return 'default';
  };

  const optionStyles = {
    default: 'border-gray-200 hover:border-primary hover:bg-primary/5',
    selected: 'border-primary bg-primary/10',
    correct: 'border-green-500 bg-green-50',
    incorrect: 'border-red-500 bg-red-50',
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* Question header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {questionNumber && totalQuestions && (
              <span className="text-sm font-medium text-muted-foreground">
                Question {questionNumber} of {totalQuestions}
              </span>
            )}
            <Badge variant="secondary" className={categoryColor}>
              {SKILL_CATEGORY_LABELS[question.category]}
            </Badge>
            <Badge variant="outline" className={difficultyConfig.color}>
              {difficultyConfig.label}
            </Badge>
            <Badge variant="outline">
              {QUESTION_TYPE_LABELS[question.type]}
            </Badge>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {question.points} pts
          </span>
        </div>

        {/* Question text */}
        <h3 className="text-lg font-medium mb-4">{question.question}</h3>

        {/* Code snippet if present */}
        {question.codeSnippet && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Code className="h-4 w-4" />
              Code Snippet
            </div>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{question.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Answer options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const state = getOptionState(index);
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;

            return (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  'w-full justify-start text-left h-auto py-3 px-4 transition-all',
                  optionStyles[state],
                  disabled && 'cursor-not-allowed opacity-60'
                )}
                onClick={() => !disabled && onSelectAnswer(index)}
                disabled={disabled}
              >
                <div className="flex items-center w-full gap-3">
                  <span
                    className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium shrink-0',
                      state === 'selected' && 'border-primary bg-primary text-white',
                      state === 'correct' && 'border-green-500 bg-green-500 text-white',
                      state === 'incorrect' && 'border-red-500 bg-red-500 text-white',
                      state === 'default' && 'border-gray-300'
                    )}
                  >
                    {showResult && isCorrect ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : showResult && isSelected && !isCorrect ? (
                      <XCircle className="h-4 w-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className="flex-1">{option}</span>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Explanation (shown after answering) */}
        {showResult && question.explanation && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-1">Explanation</h4>
            <p className="text-sm text-blue-800">{question.explanation}</p>
          </div>
        )}

        {/* Tags */}
        {question.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t">
            {question.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs bg-slate-50">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
