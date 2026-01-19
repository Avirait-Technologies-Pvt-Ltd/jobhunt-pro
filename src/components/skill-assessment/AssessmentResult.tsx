'use client';

import React from 'react';
import { Award, Clock, Target, TrendingUp, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  AssessmentResult as AssessmentResultType,
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_COLORS,
} from '@/types/skill-assessment';
import { getScoreColor, getScoreLabel, formatTimeSpent } from '@/lib/assessment-utils';
import { cn } from '@/lib/utils';

interface AssessmentResultProps {
  result: AssessmentResultType;
  onRetake?: () => void;
  onViewDetails?: () => void;
  onBackToList?: () => void;
  showQuestionBreakdown?: boolean;
}

export function AssessmentResult({
  result,
  onRetake,
  onViewDetails,
  onBackToList,
  showQuestionBreakdown = true,
}: AssessmentResultProps) {
  const scoreColor = getScoreColor(result.percentage);
  const scoreLabel = getScoreLabel(result.percentage);

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            {/* Pass/Fail Status */}
            {result.passed ? (
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-600">Congratulations!</h2>
                <p className="text-muted-foreground">You passed the assessment</p>
              </div>
            ) : (
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                  <Target className="h-10 w-10 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-orange-600">Keep Practicing!</h2>
                <p className="text-muted-foreground">You need more practice to pass</p>
              </div>
            )}

            {/* Score Display */}
            <div className="mb-6">
              <div className={cn('text-6xl font-bold mb-2', scoreColor)}>
                {result.percentage}%
              </div>
              <Badge variant="outline" className={cn(scoreColor, 'text-sm')}>
                {scoreLabel}
              </Badge>
            </div>

            {/* Badge earned */}
            {result.badge && (
              <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: result.badge.color + '20' }}
                  >
                    {result.badge.icon}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="font-semibold">Badge Earned!</span>
                    </div>
                    <p className="text-sm font-medium">{result.badge.name}</p>
                    <p className="text-xs text-muted-foreground">{result.badge.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 mx-auto mb-1 text-green-500" />
                <div className="text-2xl font-bold">{result.correctAnswers}</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <XCircle className="h-5 w-5 mx-auto mb-1 text-red-500" />
                <div className="text-2xl font-bold">
                  {result.totalQuestions - result.correctAnswers}
                </div>
                <div className="text-xs text-muted-foreground">Incorrect</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <Target className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                <div className="text-2xl font-bold">
                  {result.score}/{result.totalPoints}
                </div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <Clock className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                <div className="text-2xl font-bold">{formatTimeSpent(result.timeSpent)}</div>
                <div className="text-xs text-muted-foreground">Time Spent</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3">
              {onRetake && (
                <Button onClick={onRetake} variant={result.passed ? 'outline' : 'default'}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Assessment
                </Button>
              )}
              {onViewDetails && (
                <Button onClick={onViewDetails} variant="outline">
                  View Detailed Results
                </Button>
              )}
              {onBackToList && (
                <Button onClick={onBackToList} variant="ghost">
                  Back to Assessments
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      {result.categoryBreakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance by Category
            </CardTitle>
            <CardDescription>See how you performed in each skill area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.categoryBreakdown.map((category) => (
                <div key={category.category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      <Badge variant="outline" className={SKILL_CATEGORY_COLORS[category.category]}>
                        {SKILL_CATEGORY_LABELS[category.category]}
                      </Badge>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {category.correct}/{category.total} ({category.percentage}%)
                    </span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Question Breakdown */}
      {showQuestionBreakdown && result.questionResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Question Breakdown</CardTitle>
            <CardDescription>Review your answers for each question</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.questionResults.map((qr, index) => (
                <div key={qr.questionId}>
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center shrink-0',
                        qr.isCorrect ? 'bg-green-100' : 'bg-red-100'
                      )}
                    >
                      {qr.isCorrect ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">
                        {index + 1}. {qr.question}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>
                          {qr.earnedPoints}/{qr.points} pts
                        </span>
                        <Separator orientation="vertical" className="h-3" />
                        <span>{formatTimeSpent(qr.timeSpent)}</span>
                      </div>
                      {!qr.isCorrect && (
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="text-red-600">Your answer: </span>
                          {qr.userAnswer !== null
                            ? String.fromCharCode(65 + qr.userAnswer)
                            : 'Not answered'}
                          <span className="text-green-600 ml-2">
                            Correct: {String.fromCharCode(65 + qr.correctAnswer)}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                  {index < result.questionResults.length - 1 && (
                    <Separator className="mt-3" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
