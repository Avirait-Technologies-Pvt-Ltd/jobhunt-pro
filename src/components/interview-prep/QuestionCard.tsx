'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Bookmark, Play, Building2, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InterviewQuestion } from '@/types/interview-prep';
import { getCategoryLabel, getCategoryColor, getDifficultyConfig } from '@/lib/interview-utils';

interface QuestionCardProps {
  question: InterviewQuestion;
  onPractice?: (question: InterviewQuestion) => void;
  onSave?: (question: InterviewQuestion) => void;
  isSaved?: boolean;
  showSampleAnswer?: boolean;
  variant?: 'default' | 'compact';
}

export function QuestionCard({
  question,
  onPractice,
  onSave,
  isSaved = false,
  showSampleAnswer = true,
  variant = 'default',
}: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficultyConfig = getDifficultyConfig(question.difficulty);
  const categoryColor = getCategoryColor(question.category);

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-2">{question.question}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className={categoryColor}>
                  {getCategoryLabel(question.category)}
                </Badge>
                <Badge variant="outline" className={difficultyConfig.color}>
                  {difficultyConfig.label}
                </Badge>
                {question.company && (
                  <Badge variant="outline" className="text-xs">
                    <Building2 className="mr-1 h-3 w-3" />
                    {question.company}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {onPractice && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onPractice(question)}
                  className="h-8 w-8 p-0"
                >
                  <Play className="h-4 w-4" />
                </Button>
              )}
              {onSave && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onSave(question)}
                  className={`h-8 w-8 p-0 ${isSaved ? 'text-yellow-500' : ''}`}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Header with badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="secondary" className={categoryColor}>
            {getCategoryLabel(question.category)}
          </Badge>
          <Badge variant="outline" className={difficultyConfig.color}>
            {difficultyConfig.label}
          </Badge>
          {question.company && (
            <Badge variant="outline">
              <Building2 className="mr-1 h-3 w-3" />
              {question.company}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground ml-auto">
            Asked {question.timesAsked} times
          </span>
        </div>

        {/* Question */}
        <h3 className="text-lg font-medium mb-3">{question.question}</h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {question.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-slate-50">
              {tag}
            </Badge>
          ))}
          {question.tags.length > 4 && (
            <Badge variant="outline" className="text-xs bg-slate-50">
              +{question.tags.length - 4}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mb-4">
          {onPractice && (
            <Button size="sm" onClick={() => onPractice(question)}>
              <Play className="mr-2 h-4 w-4" />
              Practice
            </Button>
          )}
          {onSave && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSave(question)}
              className={isSaved ? 'text-yellow-500 border-yellow-500' : ''}
            >
              <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          )}
          {showSampleAnswer && question.sampleAnswer && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-auto"
            >
              {isExpanded ? (
                <>
                  Hide Answer
                  <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Show Answer
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* Expandable Sample Answer */}
        {isExpanded && question.sampleAnswer && (
          <div className="border-t pt-4 space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">
                Sample Answer
              </h4>
              <p className="text-sm leading-relaxed bg-slate-50 p-4 rounded-lg">
                {question.sampleAnswer}
              </p>
            </div>

            {question.tips && question.tips.length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center">
                  <Lightbulb className="mr-1 h-4 w-4 text-yellow-500" />
                  Tips
                </h4>
                <ul className="text-sm space-y-1">
                  {question.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-muted-foreground mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {question.followUps && question.followUps.length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">
                  Possible Follow-up Questions
                </h4>
                <ul className="text-sm space-y-1">
                  {question.followUps.map((followUp, index) => (
                    <li key={index} className="flex items-start text-muted-foreground">
                      <span className="mr-2">→</span>
                      {followUp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
