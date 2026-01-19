'use client';

import React from 'react';
import { Clock, Award, ChevronRight, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  SkillAssessment,
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_COLORS,
  ASSESSMENT_DIFFICULTY_CONFIG,
} from '@/types/skill-assessment';

interface AssessmentCardProps {
  assessment: SkillAssessment;
  onStart?: (assessment: SkillAssessment) => void;
  onViewDetails?: (assessment: SkillAssessment) => void;
  userProgress?: {
    attempts: number;
    bestScore: number;
    hasPassed: boolean;
  };
  variant?: 'default' | 'compact';
}

export function AssessmentCard({
  assessment,
  onStart,
  onViewDetails,
  userProgress,
  variant = 'default',
}: AssessmentCardProps) {
  const difficultyConfig = ASSESSMENT_DIFFICULTY_CONFIG[assessment.difficulty];
  const categoryColor = SKILL_CATEGORY_COLORS[assessment.category];
  const categoryLabel = SKILL_CATEGORY_LABELS[assessment.category];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-2">{assessment.title}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className={categoryColor}>
                  {categoryLabel}
                </Badge>
                <Badge variant="outline" className={difficultyConfig.color}>
                  {difficultyConfig.label}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {assessment.questions.length} questions
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {onStart && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onStart(assessment)}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
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
        {/* Header with badge icon */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
            style={{ backgroundColor: assessment.badge.color + '20' }}
          >
            {assessment.badge.icon}
          </div>
          {userProgress?.hasPassed && (
            <Badge variant="default" className="bg-green-100 text-green-800">
              <Award className="mr-1 h-3 w-3" />
              Passed
            </Badge>
          )}
        </div>

        {/* Title and description */}
        <h3 className="text-lg font-semibold mb-2">{assessment.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {assessment.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="secondary" className={categoryColor}>
            {categoryLabel}
          </Badge>
          <Badge variant="outline" className={difficultyConfig.color}>
            {difficultyConfig.label}
          </Badge>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {assessment.questions.length} questions
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatTime(assessment.timeLimit)}
          </span>
          <span className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            {assessment.passingScore}% to pass
          </span>
        </div>

        {/* User progress if exists */}
        {userProgress && userProgress.attempts > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Best Score</span>
              <span className="font-medium">{userProgress.bestScore}%</span>
            </div>
            <Progress value={userProgress.bestScore} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {userProgress.attempts} attempt{userProgress.attempts !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {onStart && (
            <Button onClick={() => onStart(assessment)} className="flex-1">
              {userProgress?.attempts ? 'Retake' : 'Start'} Assessment
            </Button>
          )}
          {onViewDetails && (
            <Button variant="outline" onClick={() => onViewDetails(assessment)}>
              Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
