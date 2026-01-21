'use client';

import React from 'react';
import { TrendingUp, TrendingDown, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SalaryTrend } from '@/types/market-insights';
import { formatSalary, formatPercentage } from '@/lib/market-insights-utils';

interface SalaryTrendChartProps {
  trend: SalaryTrend;
  showHeader?: boolean;
  height?: number;
}

export function SalaryTrendChart({
  trend,
  showHeader = true,
  height = 200,
}: SalaryTrendChartProps) {
  const dataPoints = trend.dataPoints;
  const isPositive = trend.changePercentage >= 0;

  // Calculate chart dimensions
  const maxSalary = Math.max(...dataPoints.map((dp) => dp.p75));
  const minSalary = Math.min(...dataPoints.map((dp) => dp.p25));
  const range = maxSalary - minSalary;
  const padding = range * 0.1;
  const chartMax = maxSalary + padding;
  const chartMin = minSalary - padding;
  const chartRange = chartMax - chartMin;

  // Generate path for median line
  const generatePath = (values: number[]): string => {
    if (values.length === 0) return '';

    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = ((chartMax - value) / chartRange) * 100;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  // Generate area path for salary range
  const generateAreaPath = (): string => {
    if (dataPoints.length === 0) return '';

    const topPoints = dataPoints.map((dp, index) => {
      const x = (index / (dataPoints.length - 1)) * 100;
      const y = ((chartMax - dp.p75) / chartRange) * 100;
      return `${x},${y}`;
    });

    const bottomPoints = dataPoints
      .map((dp, index) => {
        const x = (index / (dataPoints.length - 1)) * 100;
        const y = ((chartMax - dp.p25) / chartRange) * 100;
        return `${x},${y}`;
      })
      .reverse();

    return `M ${topPoints.join(' L ')} L ${bottomPoints.join(' L ')} Z`;
  };

  const medianPath = generatePath(dataPoints.map((dp) => dp.median));
  const areaPath = generateAreaPath();

  // Format date for display
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  return (
    <Card>
      {showHeader && (
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{trend.role}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                {trend.location}
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className={
                isPositive
                  ? 'bg-green-100 text-green-700 border-green-200'
                  : 'bg-red-100 text-red-700 border-red-200'
              }
            >
              {isPositive ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {formatPercentage(trend.changePercentage)}
            </Badge>
          </div>
        </CardHeader>
      )}
      <CardContent className={showHeader ? 'pt-2' : 'pt-6'}>
        {/* Current Salary */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Current Median Salary</p>
          <p className="text-3xl font-bold">{formatSalary(trend.currentMedian)}</p>
        </div>

        {/* Chart */}
        <div className="relative" style={{ height: `${height}px` }}>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Salary range area */}
            <path d={areaPath} fill="rgba(59, 130, 246, 0.1)" />

            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
            ))}

            {/* Median line */}
            <path
              d={medianPath}
              fill="none"
              stroke={isPositive ? '#10b981' : '#ef4444'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Data points */}
            {dataPoints.map((dp, index) => {
              const x = (index / (dataPoints.length - 1)) * 100;
              const y = ((chartMax - dp.median) / chartRange) * 100;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill={isPositive ? '#10b981' : '#ef4444'}
                  className="hover:r-2 transition-all"
                />
              );
            })}
          </svg>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground -translate-x-full pr-2">
            <span>{formatSalary(chartMax)}</span>
            <span>{formatSalary((chartMax + chartMin) / 2)}</span>
            <span>{formatSalary(chartMin)}</span>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{formatDate(dataPoints[0]?.date || '')}</span>
          <span>{formatDate(dataPoints[dataPoints.length - 1]?.date || '')}</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-green-500 rounded" />
            <span>Median</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-100 rounded" />
            <span>25th-75th Percentile</span>
          </div>
        </div>

        {/* Salary Range */}
        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-muted-foreground">25th Percentile</p>
              <p className="font-medium">
                {formatSalary(dataPoints[dataPoints.length - 1]?.p25 || 0)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">75th Percentile</p>
              <p className="font-medium">
                {formatSalary(dataPoints[dataPoints.length - 1]?.p75 || 0)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SalaryTrendChart;
