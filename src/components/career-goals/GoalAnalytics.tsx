'use client';

import React from 'react';
import {
  Target,
  TrendingUp,
  AlertTriangle,
  Flame,
  Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { CareerGoal, Achievement, GoalStatistics } from '@/types/career-goals';
import {
  GOAL_CATEGORY_LABELS,
} from '@/types/career-goals';
import { getCategoryBreakdown } from '@/lib/career-goals-utils';
import { AchievementBadgeGrid } from './AchievementBadge';

interface GoalAnalyticsProps {
  statistics: GoalStatistics;
  achievements: Achievement[];
  goals: CareerGoal[];
}

export function GoalAnalytics({
  statistics,
  achievements,
  goals,
}: GoalAnalyticsProps) {
  const categoryBreakdown = getCategoryBreakdown(goals);

  return (
    <div className="space-y-6">
      {/* Summary Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Goals"
          value={statistics.total}
          icon={Target}
          description={`${statistics.byStatus.active} active`}
        />
        <StatCard
          title="Completion Rate"
          value={`${statistics.completionRate}%`}
          icon={TrendingUp}
          description={`${statistics.byStatus.completed} completed`}
          trend={statistics.completionRate >= 50 ? 'up' : 'neutral'}
        />
        <StatCard
          title="Current Streak"
          value={`${statistics.currentStreak} weeks`}
          icon={Flame}
          description="Keep it going!"
          iconColor="text-orange-500"
        />
        <StatCard
          title="Overdue Goals"
          value={statistics.overdueGoals}
          icon={AlertTriangle}
          description={statistics.overdueGoals > 0 ? 'Needs attention' : 'All on track'}
          iconColor={statistics.overdueGoals > 0 ? 'text-red-500' : 'text-green-500'}
        />
      </div>

      {/* Status Breakdown and Category Distribution */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <StatusBar
              label="Active"
              count={statistics.byStatus.active}
              total={statistics.total}
              color="bg-blue-500"
            />
            <StatusBar
              label="Completed"
              count={statistics.byStatus.completed}
              total={statistics.total}
              color="bg-green-500"
            />
            <StatusBar
              label="Paused"
              count={statistics.byStatus.paused}
              total={statistics.total}
              color="bg-yellow-500"
            />
            <StatusBar
              label="Archived"
              count={statistics.byStatus.archived}
              total={statistics.total}
              color="bg-gray-400"
            />
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Goals by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {categoryBreakdown.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No goals yet
              </p>
            ) : (
              <div className="space-y-3">
                {categoryBreakdown.map((item) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {GOAL_CATEGORY_LABELS[item.category as keyof typeof GOAL_CATEGORY_LABELS]}
                      </span>
                      <span className="text-muted-foreground">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Achievements Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AchievementBadgeGrid
            achievements={achievements}
            size="md"
          />
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Goals Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {goals.filter((g) => g.status === 'active').length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No active goals
            </p>
          ) : (
            <div className="space-y-4">
              {goals
                .filter((g) => g.status === 'active')
                .sort((a, b) => b.progress - a.progress)
                .slice(0, 5)
                .map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate max-w-[70%]">
                        {goal.title}
                      </span>
                      <span
                        className={cn(
                          'font-medium',
                          goal.progress >= 75
                            ? 'text-green-600'
                            : goal.progress >= 50
                            ? 'text-blue-600'
                            : goal.progress >= 25
                            ? 'text-yellow-600'
                            : 'text-gray-500'
                        )}
                      >
                        {goal.progress}%
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  iconColor?: string;
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  iconColor = 'text-primary',
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div
            className={cn(
              'rounded-full p-2',
              iconColor === 'text-primary' && 'bg-primary/10',
              iconColor === 'text-orange-500' && 'bg-orange-100',
              iconColor === 'text-red-500' && 'bg-red-100',
              iconColor === 'text-green-500' && 'bg-green-100'
            )}
          >
            <Icon className={cn('h-5 w-5', iconColor)} />
          </div>
        </div>
        {trend && (
          <div className="mt-2 flex items-center">
            <TrendingUp
              className={cn(
                'h-4 w-4 mr-1',
                trend === 'up' && 'text-green-500',
                trend === 'down' && 'text-red-500 rotate-180',
                trend === 'neutral' && 'text-gray-400'
              )}
            />
            <span
              className={cn(
                'text-xs',
                trend === 'up' && 'text-green-600',
                trend === 'down' && 'text-red-600',
                trend === 'neutral' && 'text-gray-500'
              )}
            >
              {trend === 'up'
                ? 'Improving'
                : trend === 'down'
                ? 'Declining'
                : 'Stable'}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface StatusBarProps {
  label: string;
  count: number;
  total: number;
  color: string;
}

function StatusBar({ label, count, total, color }: StatusBarProps) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">
          {count} ({percentage}%)
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-100">
        <div
          className={cn('h-full rounded-full transition-all', color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
