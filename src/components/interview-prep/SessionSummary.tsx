'use client';

import React from 'react';
import {
  CheckCircle,
  Clock,
  Target,
  Star,
  RotateCcw,
  Home,
  BookOpen,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MockInterviewSession, InterviewAnswer } from '@/types/interview-prep';
import {
  formatDuration,
  formatDurationLong,
  calculateAverageScore,
  getCategoryLabel,
  getCategoryColor,
  getScoreLabel,
  getScoreColor,
  getMotivationalMessage,
} from '@/lib/interview-utils';

interface SessionSummaryProps {
  session: MockInterviewSession;
  onStartNew: () => void;
  onGoHome: () => void;
  onReviewAnswers?: () => void;
}

export function SessionSummary({
  session,
  onStartNew,
  onGoHome,
  onReviewAnswers,
}: SessionSummaryProps) {
  const averageScore = calculateAverageScore(session.answers);
  const answeredCount = session.answers.length;
  const totalQuestions = session.questions.length;
  const completionRate = Math.round((answeredCount / totalQuestions) * 100);

  // Calculate category breakdown
  const categoryStats = session.questions.reduce((acc, question) => {
    const answer = session.answers.find((a) => a.questionId === question.id);
    const category = question.category;
    if (!acc[category]) {
      acc[category] = { total: 0, answered: 0, ratings: [] };
    }
    acc[category].total++;
    if (answer) {
      acc[category].answered++;
      if (answer.selfRating) {
        acc[category].ratings.push(answer.selfRating);
      }
    }
    return acc;
  }, {} as Record<string, { total: number; answered: number; ratings: number[] }>);

  // Get best and worst answers
  const ratedAnswers = session.answers.filter((a) => a.selfRating);
  const bestAnswer = ratedAnswers.reduce<InterviewAnswer | null>(
    (best, current) =>
      !best || (current.selfRating || 0) > (best.selfRating || 0) ? current : best,
    null
  );
  const worstAnswer = ratedAnswers.reduce<InterviewAnswer | null>(
    (worst, current) =>
      !worst || (current.selfRating || 0) < (worst.selfRating || 0) ? current : worst,
    null
  );

  const motivationalMessage = getMotivationalMessage(averageScore, 'stable');

  return (
    <div className="space-y-6">
      {/* Main Summary Card */}
      <Card>
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Session Complete!</CardTitle>
          <p className="text-muted-foreground">{motivationalMessage}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Target className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{answeredCount}/{totalQuestions}</p>
              <p className="text-sm text-muted-foreground">Questions</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Star className="h-5 w-5 mx-auto mb-2 text-yellow-500" />
              <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>
                {averageScore > 0 ? averageScore.toFixed(1) : '-'}
              </p>
              <p className="text-sm text-muted-foreground">Avg Score</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Clock className="h-5 w-5 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">
                {formatDuration(session.totalDuration)}
              </p>
              <p className="text-sm text-muted-foreground">Duration</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <CheckCircle className="h-5 w-5 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{completionRate}%</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>

          {/* Score Summary */}
          {averageScore > 0 && (
            <div className="text-center py-4 border-y">
              <p className="text-sm text-muted-foreground mb-2">Overall Performance</p>
              <p className={`text-xl font-bold ${getScoreColor(averageScore)}`}>
                {getScoreLabel(averageScore)}
              </p>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageScore)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Category Breakdown */}
          <div>
            <h4 className="font-medium mb-3">Performance by Category</h4>
            <div className="space-y-3">
              {Object.entries(categoryStats).map(([category, stats]) => {
                const avgRating =
                  stats.ratings.length > 0
                    ? stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length
                    : 0;
                return (
                  <div key={category} className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={getCategoryColor(category as any)}
                    >
                      {getCategoryLabel(category as any)}
                    </Badge>
                    <div className="flex-1">
                      <Progress
                        value={(stats.answered / stats.total) * 100}
                        className="h-2"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-16 text-right">
                      {stats.answered}/{stats.total}
                    </span>
                    {avgRating > 0 && (
                      <span className={`text-sm font-medium w-10 ${getScoreColor(avgRating)}`}>
                        {avgRating.toFixed(1)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Best/Worst Answers */}
          {(bestAnswer || worstAnswer) && (
            <div className="grid md:grid-cols-2 gap-4">
              {bestAnswer && bestAnswer.selfRating && bestAnswer.selfRating >= 4 && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 fill-green-600 text-green-600" />
                    Best Answer
                  </p>
                  <p className="text-sm text-green-700">
                    {session.questions.find((q) => q.id === bestAnswer.questionId)?.question.slice(0, 80)}...
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Score: {bestAnswer.selfRating}/5
                  </p>
                </div>
              )}
              {worstAnswer && worstAnswer.selfRating && worstAnswer.selfRating <= 3 && (
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800 mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-yellow-600" />
                    Focus Area
                  </p>
                  <p className="text-sm text-yellow-700">
                    {session.questions.find((q) => q.id === worstAnswer.questionId)?.question.slice(0, 80)}...
                  </p>
                  <p className="text-xs text-yellow-600 mt-1">
                    Score: {worstAnswer.selfRating}/5 - Consider practicing more
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Session Details */}
          <div className="text-sm text-muted-foreground space-y-1 pt-4 border-t">
            <p>Started: {session.startedAt ? new Date(session.startedAt).toLocaleString() : 'N/A'}</p>
            <p>Completed: {session.completedAt ? new Date(session.completedAt).toLocaleString() : 'N/A'}</p>
            <p>Total practice time: {formatDurationLong(session.totalDuration)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onStartNew} className="flex-1">
          <RotateCcw className="mr-2 h-4 w-4" />
          Start New Session
        </Button>
        {onReviewAnswers && (
          <Button variant="outline" onClick={onReviewAnswers} className="flex-1">
            <BookOpen className="mr-2 h-4 w-4" />
            Review Answers
          </Button>
        )}
        <Button variant="outline" onClick={onGoHome} className="flex-1">
          <Home className="mr-2 h-4 w-4" />
          Back to Hub
        </Button>
      </div>
    </div>
  );
}
