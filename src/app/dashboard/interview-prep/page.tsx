'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Play,
  BarChart3,
  FileText,
  Clock,
  Target,
  TrendingUp,
  Star,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useInterviewAnalytics } from '@/hooks/useInterviewAnalytics';
import { getQuestionStats, getPopularQuestions } from '@/data/interview-questions';
import {
  formatDurationLong,
  getCategoryLabel,
  getCategoryColor,
  getScoreColor,
  formatRelativeDate,
} from '@/lib/interview-utils';

export default function InterviewPrepPage() {
  const {
    performance,
    totalPracticeHours,
    recentSessions,
    strengths,
    weaknesses,
    getRecommendedCategories,
  } = useInterviewAnalytics();

  const questionStats = getQuestionStats();
  const popularQuestions = getPopularQuestions(3);
  const recommendedCategories = getRecommendedCategories();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="h-7 w-7" />
            Interview Preparation Hub
          </h1>
          <p className="text-muted-foreground">
            Practice interview questions and track your progress
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/interview-prep/mock-interview">
            <Play className="mr-2 h-4 w-4" />
            Start Mock Interview
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Practice Sessions</p>
                <p className="text-3xl font-bold">{performance.totalSessions}</p>
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
                <p className="text-sm text-muted-foreground">Questions Practiced</p>
                <p className="text-3xl font-bold">{performance.totalQuestionsPracticed}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <BookOpen className="h-6 w-6 text-green-600" />
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
                <p className="text-sm text-muted-foreground">Practice Time</p>
                <p className="text-3xl font-bold">{totalPracticeHours}h</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/interview-prep/mock-interview">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Play className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Mock Interview</h3>
              <p className="text-sm text-muted-foreground">
                Practice with timed questions
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/interview-prep/questions">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium">Question Bank</h3>
              <p className="text-sm text-muted-foreground">
                Browse {questionStats.total}+ questions
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/interview-prep/analytics">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium">Analytics</h3>
              <p className="text-sm text-muted-foreground">
                View your performance
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/interview-prep/answers">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-medium">Answer Bank</h3>
              <p className="text-sm text-muted-foreground">
                Saved answers & templates
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Recent Sessions
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/interview-prep/analytics">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentSessions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Play className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No practice sessions yet</p>
                <p className="text-sm">Start your first mock interview!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentSessions.slice(0, 4).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {session.questionsAnswered} questions
                        </span>
                        <span className={`text-sm ${getScoreColor(session.averageScore)}`}>
                          {session.averageScore.toFixed(1)}/5
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {session.categories.slice(0, 2).map((cat) => (
                          <Badge
                            key={cat}
                            variant="secondary"
                            className={`text-xs ${getCategoryColor(cat)}`}
                          >
                            {getCategoryLabel(cat)}
                          </Badge>
                        ))}
                        {session.categories.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{session.categories.length - 2}
                          </Badge>
                        )}
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

        {/* Strengths & Areas to Improve */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Strengths */}
            <div>
              <h4 className="text-sm font-medium mb-2 text-green-600">Strengths</h4>
              {strengths.length > 0 ? (
                <div className="space-y-2">
                  {strengths.map((s) => (
                    <div key={s.category} className="flex items-center gap-2">
                      <Badge variant="secondary" className={getCategoryColor(s.category)}>
                        {getCategoryLabel(s.category)}
                      </Badge>
                      <Progress value={(s.averageScore / 5) * 100} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{s.averageScore.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Complete more sessions to see your strengths
                </p>
              )}
            </div>

            {/* Areas to Improve */}
            <div>
              <h4 className="text-sm font-medium mb-2 text-orange-600">Focus Areas</h4>
              {weaknesses.length > 0 ? (
                <div className="space-y-2">
                  {weaknesses.map((w) => (
                    <div key={w.category} className="flex items-center gap-2">
                      <Badge variant="outline" className={getCategoryColor(w.category)}>
                        {getCategoryLabel(w.category)}
                      </Badge>
                      <Progress value={(w.averageScore / 5) * 100} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{w.averageScore.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Complete more sessions to identify areas to improve
                </p>
              )}
            </div>

            {/* Recommended Practice */}
            {recommendedCategories.length > 0 && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Recommended Practice</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendedCategories.map((cat) => (
                    <Badge key={cat} variant="outline">
                      {getCategoryLabel(cat)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Popular Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Popular Questions
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/interview-prep/questions">
                Browse All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {popularQuestions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary" className={getCategoryColor(q.category)}>
                    {getCategoryLabel(q.category)}
                  </Badge>
                  {q.company && (
                    <Badge variant="outline" className="text-xs">
                      {q.company}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground ml-auto">
                    Asked {q.timesAsked} times
                  </span>
                </div>
                <p className="font-medium">{q.question}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Interview Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="mb-1 font-medium">Use the STAR Method</h4>
              <p className="text-sm text-muted-foreground">
                Structure behavioral answers with Situation, Task, Action, and Result.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="mb-1 font-medium">Practice Regularly</h4>
              <p className="text-sm text-muted-foreground">
                Aim for at least 3 mock interviews per week before your real interview.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <h4 className="mb-1 font-medium">Track Your Progress</h4>
              <p className="text-sm text-muted-foreground">
                Review your analytics to identify patterns and areas for improvement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
