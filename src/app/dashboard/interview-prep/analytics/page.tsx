'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BarChart3,
  Target,
  Clock,
  TrendingUp,
  Star,
  Calendar,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PerformanceChart } from '@/components/interview-prep';
import { useInterviewAnalytics } from '@/hooks/useInterviewAnalytics';
import {
  formatDurationLong,
  getCategoryLabel,
  getCategoryColor,
  getScoreColor,
  getScoreLabel,
  formatRelativeDate,
} from '@/lib/interview-utils';

export default function AnalyticsPage() {
  const {
    performance,
    categoryBreakdown,
    weeklyProgress,
    recentSessions,
    totalPracticeHours,
    averageSessionLength,
    questionsPerSession,
    improvementRate,
    strengths,
    weaknesses,
  } = useInterviewAnalytics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
              <Link href="/dashboard/interview-prep">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7" />
            Performance Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your interview preparation progress and identify areas for improvement
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/interview-prep/mock-interview">
            Practice Now
          </Link>
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-3xl font-bold">{performance.totalSessions}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {performance.lastPracticeDate
                    ? `Last: ${formatRelativeDate(performance.lastPracticeDate)}`
                    : 'No sessions yet'}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Practice Time</p>
                <p className="text-3xl font-bold">{totalPracticeHours}h</p>
                <p className="text-xs text-muted-foreground mt-1">
                  ~{averageSessionLength} min per session
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(performance.averageScore)}`}>
                  {performance.averageScore.toFixed(1)}/5
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {getScoreLabel(performance.averageScore)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Improvement</p>
                <p className={`text-3xl font-bold ${improvementRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {improvementRate >= 0 ? '+' : ''}{improvementRate}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  vs. previous weeks
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance by Category Chart */}
        <PerformanceChart
          categoryData={categoryBreakdown}
          weeklyData={weeklyProgress}
          title="Performance by Category"
          showTrends={true}
        />

        {/* Strengths & Weaknesses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Strengths & Focus Areas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Strengths */}
            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                Your Strengths
              </h4>
              {performance.strengths.length > 0 ? (
                <ul className="space-y-2">
                  {performance.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Complete more practice sessions to identify your strengths
                </p>
              )}
            </div>

            {/* Areas to Improve */}
            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-orange-600">
                <AlertCircle className="h-4 w-4" />
                Areas to Improve
              </h4>
              {performance.areasToImprove.length > 0 ? (
                <ul className="space-y-2">
                  {performance.areasToImprove.map((area, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-orange-500 mt-0.5">→</span>
                      {area}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Complete more practice sessions to identify areas for improvement
                </p>
              )}
            </div>

            {/* Top/Bottom Categories */}
            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">
                    Strongest Category
                  </h5>
                  {strengths[0] ? (
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(strengths[0].category)}>
                        {getCategoryLabel(strengths[0].category)}
                      </Badge>
                      <span className="text-sm font-medium">
                        {strengths[0].averageScore.toFixed(1)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </div>
                <div>
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">
                    Needs Most Work
                  </h5>
                  {weaknesses[0] ? (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getCategoryColor(weaknesses[0].category)}>
                        {getCategoryLabel(weaknesses[0].category)}
                      </Badge>
                      <span className="text-sm font-medium">
                        {weaknesses[0].averageScore.toFixed(1)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Session History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentSessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No sessions recorded yet</p>
              <p className="text-sm">Start practicing to see your history here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium">
                        {session.questionsAnswered} questions answered
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= Math.round(session.averageScore)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className={`ml-1 text-sm font-medium ${getScoreColor(session.averageScore)}`}>
                          {session.averageScore.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {session.categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="secondary"
                          className={`text-xs ${getCategoryColor(cat)}`}
                        >
                          {getCategoryLabel(cat)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{formatRelativeDate(session.date)}</p>
                    <p>{formatDurationLong(session.duration)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Progress Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyProgress.slice(0, 4).map((week) => (
              <div key={week.week} className="flex items-center gap-4">
                <div className="w-20 text-sm font-medium">{week.week}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{week.sessionsCompleted} sessions</span>
                    <span className={getScoreColor(week.averageScore)}>
                      {week.averageScore.toFixed(1)} avg
                    </span>
                  </div>
                  <Progress
                    value={(week.averageScore / 5) * 100}
                    className="h-2"
                  />
                </div>
                <div className="text-sm text-muted-foreground w-24 text-right">
                  {week.questionsAnswered} questions
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
