'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryPerformance, WeeklyProgress } from '@/types/interview-prep';
import {
  getCategoryLabel,
  getScoreColor,
  getScoreBgColor,
  getTrendDisplay,
} from '@/lib/interview-utils';

interface PerformanceChartProps {
  categoryData: CategoryPerformance[];
  weeklyData?: WeeklyProgress[];
  title?: string;
  showTrends?: boolean;
}

export function PerformanceChart({
  categoryData,
  weeklyData,
  title = 'Performance by Category',
  showTrends = true,
}: PerformanceChartProps) {
  const maxScore = 5;

  const getTrendIcon = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Performance Bars */}
        <div className="space-y-4">
          {categoryData.map((category) => {
            const percentage = (category.averageScore / maxScore) * 100;
            const trendDisplay = getTrendDisplay(category.trend);

            return (
              <div key={category.category} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {getCategoryLabel(category.category)}
                  </span>
                  <div className="flex items-center gap-2">
                    {showTrends && (
                      <span className={`flex items-center gap-1 text-xs ${trendDisplay.color}`}>
                        {getTrendIcon(category.trend)}
                        {trendDisplay.label}
                      </span>
                    )}
                    <span className={`font-bold ${getScoreColor(category.averageScore)}`}>
                      {category.averageScore.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${getScoreBgColor(
                      category.averageScore
                    ).replace('bg-', 'bg-')}`}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor:
                        category.averageScore >= 4
                          ? '#22c55e'
                          : category.averageScore >= 3
                          ? '#eab308'
                          : '#ef4444',
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{category.questionsPracticed} questions practiced</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Weekly Progress Chart */}
        {weeklyData && weeklyData.length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-4">Weekly Progress</h4>
            <div className="flex items-end justify-between h-32 gap-2">
              {weeklyData.slice(0, 6).reverse().map((week, index) => {
                const heightPercentage = (week.averageScore / maxScore) * 100;
                return (
                  <div
                    key={week.week}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-xs font-medium">
                      {week.averageScore.toFixed(1)}
                    </span>
                    <div className="w-full bg-muted rounded-t flex-1 relative">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-primary rounded-t transition-all"
                        style={{ height: `${heightPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      W{index + 1}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Older</span>
              <span>Recent</span>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Excellent (4-5)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Good (3-4)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Needs Work (&lt;3)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
