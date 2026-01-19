'use client';

import React from 'react';
import { Clock, Pause, Play, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AssessmentTimerProps {
  timeRemaining: number; // in seconds
  isRunning: boolean;
  onPause?: () => void;
  onResume?: () => void;
  showControls?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal';
}

export function AssessmentTimer({
  timeRemaining,
  isRunning,
  onPause,
  onResume,
  showControls = false,
  size = 'md',
  variant = 'default',
}: AssessmentTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeStatus = () => {
    if (timeRemaining <= 60) return 'critical'; // Less than 1 minute
    if (timeRemaining <= 300) return 'warning'; // Less than 5 minutes
    return 'normal';
  };

  const status = getTimeStatus();

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const statusColors = {
    normal: 'bg-slate-100 text-slate-700',
    warning: 'bg-yellow-100 text-yellow-700',
    critical: 'bg-red-100 text-red-700 animate-pulse',
  };

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center gap-1', sizeClasses[size])}>
        <Clock className={cn(iconSizes[size], status === 'critical' && 'text-red-500')} />
        <span
          className={cn(
            'font-mono font-medium',
            status === 'warning' && 'text-yellow-600',
            status === 'critical' && 'text-red-600'
          )}
        >
          {formatTime(timeRemaining)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-lg',
        sizeClasses[size],
        statusColors[status]
      )}
    >
      {status === 'critical' ? (
        <AlertTriangle className={iconSizes[size]} />
      ) : (
        <Clock className={iconSizes[size]} />
      )}
      <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span>
      {!isRunning && timeRemaining > 0 && (
        <span className="text-xs uppercase tracking-wide opacity-70">Paused</span>
      )}
      {showControls && (
        <>
          {isRunning && onPause && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onPause}
              className="h-6 w-6 p-0 ml-1"
            >
              <Pause className="h-3 w-3" />
            </Button>
          )}
          {!isRunning && onResume && timeRemaining > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onResume}
              className="h-6 w-6 p-0 ml-1"
            >
              <Play className="h-3 w-3" />
            </Button>
          )}
        </>
      )}
    </div>
  );
}
