'use client';

import React from 'react';
import {
  Trophy,
  Target,
  BookOpen,
  Clock,
  Flame,
  Award,
  Zap,
  Star,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Achievement } from '@/types/career-goals';
import { formatDate } from '@/lib/career-goals-utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy,
  Target,
  BookOpen,
  Clock,
  Flame,
  Award,
  Zap,
  Star,
};

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  onClick?: (achievement: Achievement) => void;
}

export function AchievementBadge({
  achievement,
  size = 'md',
  showDetails = true,
  onClick,
}: AchievementBadgeProps) {
  const IconComponent = iconMap[achievement.icon] || Trophy;

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const badge = (
    <button
      type="button"
      onClick={() => onClick?.(achievement)}
      className={cn(
        'relative flex items-center justify-center rounded-full transition-all',
        sizeClasses[size],
        achievement.color,
        'text-white shadow-lg',
        onClick &&
          'cursor-pointer hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
        !onClick && 'cursor-default'
      )}
    >
      <IconComponent className={iconSizeClasses[size]} />
      <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-500" />
      </span>
    </button>
  );

  if (!showDetails) {
    return badge;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold">{achievement.name}</p>
            <p className="text-sm text-muted-foreground">
              {achievement.description}
            </p>
            <p className="text-xs text-muted-foreground">
              Earned: {formatDate(achievement.earnedAt)}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface AchievementBadgeGridProps {
  achievements: Achievement[];
  size?: 'sm' | 'md' | 'lg';
  maxDisplay?: number;
  onBadgeClick?: (achievement: Achievement) => void;
}

export function AchievementBadgeGrid({
  achievements,
  size = 'md',
  maxDisplay,
  onBadgeClick,
}: AchievementBadgeGridProps) {
  const displayAchievements = maxDisplay
    ? achievements.slice(0, maxDisplay)
    : achievements;
  const remainingCount =
    maxDisplay && achievements.length > maxDisplay
      ? achievements.length - maxDisplay
      : 0;

  if (achievements.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No achievements yet. Keep working on your goals!
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {displayAchievements.map((achievement) => (
        <AchievementBadge
          key={achievement.id}
          achievement={achievement}
          size={size}
          onClick={onBadgeClick}
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-gray-200 text-gray-600',
            size === 'sm' && 'h-8 w-8 text-xs',
            size === 'md' && 'h-12 w-12 text-sm',
            size === 'lg' && 'h-16 w-16 text-base'
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
