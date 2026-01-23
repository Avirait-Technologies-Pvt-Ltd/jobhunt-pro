'use client';

import React, { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Flag,
  MoreHorizontal,
  Pause,
  Pencil,
  Play,
  Target,
  Trash2,
  CheckCircle2,
  Archive,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { CareerGoal } from '@/types/career-goals';
import {
  GOAL_STATUS_LABELS,
  GOAL_STATUS_COLORS,
  GOAL_PRIORITY_LABELS,
  GOAL_PRIORITY_COLORS,
  GOAL_CATEGORY_LABELS,
  GOAL_CATEGORY_COLORS,
} from '@/types/career-goals';
import {
  formatDate,
  getDaysRemaining,
  formatDaysRemaining,
  isOverdue,
  getMilestoneCompletionCount,
} from '@/lib/career-goals-utils';
import { MilestoneTimeline } from './MilestoneTimeline';

interface GoalCardProps {
  goal: CareerGoal;
  onEdit?: (goal: CareerGoal) => void;
  onDelete?: (goal: CareerGoal) => void;
  onStatusChange?: (goalId: string, action: 'complete' | 'pause' | 'resume' | 'archive') => void;
  onViewDetails?: (goal: CareerGoal) => void;
  onMilestoneComplete?: (goalId: string, milestoneId: string) => void;
  variant?: 'default' | 'compact';
}

export function GoalCard({
  goal,
  onEdit,
  onDelete,
  onStatusChange,
  onViewDetails,
  onMilestoneComplete,
  variant = 'default',
}: GoalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const daysRemaining = getDaysRemaining(goal.targetDate);
  const goalIsOverdue = isOverdue(goal.targetDate, goal.status);
  const milestoneCount = getMilestoneCompletionCount(goal.milestones);

  const handleStatusAction = (action: 'complete' | 'pause' | 'resume' | 'archive') => {
    onStatusChange?.(goal.id, action);
  };

  if (variant === 'compact') {
    return (
      <CompactGoalCard
        goal={goal}
        onEdit={onEdit}
        onViewDetails={onViewDetails}
        isOverdue={goalIsOverdue}
        daysRemaining={daysRemaining}
      />
    );
  }

  return (
    <Card
      className={cn(
        'group transition-all hover:shadow-md',
        goalIsOverdue && 'border-red-200 bg-red-50/50',
        goal.status === 'completed' && 'border-green-200 bg-green-50/50'
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Category & Status */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className={cn('text-xs', GOAL_CATEGORY_COLORS[goal.category])}
              >
                {GOAL_CATEGORY_LABELS[goal.category]}
              </Badge>
              <Badge
                variant="outline"
                className={cn('text-xs', GOAL_STATUS_COLORS[goal.status])}
              >
                {GOAL_STATUS_LABELS[goal.status]}
              </Badge>
              {goalIsOverdue && (
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Overdue
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3
              className={cn(
                'text-lg font-semibold line-clamp-2',
                goal.status === 'completed' && 'text-muted-foreground line-through'
              )}
            >
              {goal.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {goal.description}
            </p>
          </div>

          {/* Priority indicator */}
          <div className="flex flex-col items-end gap-2">
            <Badge
              variant="outline"
              className={cn('text-xs', GOAL_PRIORITY_COLORS[goal.priority])}
            >
              <Flag className="mr-1 h-3 w-3" />
              {GOAL_PRIORITY_LABELS[goal.priority]}
            </Badge>

            {/* Actions menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {goal.status === 'active' && (
                  <>
                    <DropdownMenuItem onClick={() => handleStatusAction('complete')}>
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                      Mark Complete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusAction('pause')}>
                      <Pause className="mr-2 h-4 w-4 text-yellow-600" />
                      Pause Goal
                    </DropdownMenuItem>
                  </>
                )}
                {goal.status === 'paused' && (
                  <DropdownMenuItem onClick={() => handleStatusAction('resume')}>
                    <Play className="mr-2 h-4 w-4 text-blue-600" />
                    Resume Goal
                  </DropdownMenuItem>
                )}
                {goal.status !== 'archived' && (
                  <DropdownMenuItem onClick={() => handleStatusAction('archive')}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(goal)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    onClick={() => onDelete(goal)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{goal.progress}%</span>
          </div>
          <Progress
            value={goal.progress}
            className="h-2"
          />
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span>
              {milestoneCount.completed}/{milestoneCount.total} milestones
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(goal.targetDate)}</span>
          </div>

          {goal.status !== 'completed' && goal.status !== 'archived' && (
            <div
              className={cn(
                'flex items-center gap-1',
                goalIsOverdue && 'text-red-600 font-medium'
              )}
            >
              <Clock className="h-4 w-4" />
              <span>{formatDaysRemaining(daysRemaining)}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {goal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {goal.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Expand/Collapse milestones */}
        {goal.milestones.length > 0 && (
          <div className="border-t pt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full justify-between"
            >
              <span>View Milestones</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {isExpanded && (
              <div className="mt-4">
                <MilestoneTimeline
                  milestones={goal.milestones}
                  onMilestoneComplete={
                    onMilestoneComplete
                      ? (milestoneId) => onMilestoneComplete(goal.id, milestoneId)
                      : undefined
                  }
                  isEditable={goal.status === 'active'}
                />
              </div>
            )}
          </div>
        )}

        {/* View details button */}
        {onViewDetails && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(goal)}
            className="w-full"
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

interface CompactGoalCardProps {
  goal: CareerGoal;
  onEdit?: (goal: CareerGoal) => void;
  onViewDetails?: (goal: CareerGoal) => void;
  isOverdue: boolean;
  daysRemaining: number | null;
}

function CompactGoalCard({
  goal,
  onEdit,
  onViewDetails,
  isOverdue,
  daysRemaining,
}: CompactGoalCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-sm',
        isOverdue && 'border-red-200',
        goal.status === 'completed' && 'border-green-200'
      )}
      onClick={() => onViewDetails?.(goal)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* Progress circle */}
          <div className="relative h-10 w-10 flex-shrink-0">
            <svg className="h-10 w-10 -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-gray-200"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${goal.progress} 100`}
                className={cn(
                  goal.progress >= 75
                    ? 'text-green-500'
                    : goal.progress >= 50
                    ? 'text-blue-500'
                    : goal.progress >= 25
                    ? 'text-yellow-500'
                    : 'text-gray-400'
                )}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
              {goal.progress}%
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-1">{goal.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className={cn('text-xs', GOAL_PRIORITY_COLORS[goal.priority])}
              >
                {GOAL_PRIORITY_LABELS[goal.priority]}
              </Badge>
              {goal.status !== 'completed' && (
                <span
                  className={cn(
                    'text-xs',
                    isOverdue ? 'text-red-600' : 'text-muted-foreground'
                  )}
                >
                  {formatDaysRemaining(daysRemaining)}
                </span>
              )}
            </div>
          </div>

          {/* Edit button */}
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(goal);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
