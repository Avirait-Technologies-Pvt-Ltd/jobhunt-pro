'use client';

import React from 'react';
import {
  Check,
  Circle,
  Clock,
  MoreHorizontal,
  Pencil,
  SkipForward,
  Trash2,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { Milestone } from '@/types/career-goals';
import {
  formatDate,
  getDaysRemaining,
  formatDaysRemaining,
  getMilestoneStatusColor,
} from '@/lib/career-goals-utils';
import {
  MILESTONE_STATUS_LABELS,
} from '@/types/career-goals';

interface MilestoneTimelineProps {
  milestones: Milestone[];
  onMilestoneComplete?: (milestoneId: string) => void;
  onMilestoneEdit?: (milestone: Milestone) => void;
  onMilestoneDelete?: (milestoneId: string) => void;
  onMilestoneStatusChange?: (milestoneId: string, status: Milestone['status']) => void;
  isEditable?: boolean;
  variant?: 'vertical' | 'horizontal';
}

export function MilestoneTimeline({
  milestones,
  onMilestoneComplete,
  onMilestoneEdit,
  onMilestoneDelete,
  onMilestoneStatusChange,
  isEditable = false,
  variant = 'vertical',
}: MilestoneTimelineProps) {
  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order);

  if (sortedMilestones.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <p>No milestones yet</p>
        {isEditable && (
          <p className="text-sm mt-1">Add milestones to track your progress</p>
        )}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <HorizontalTimeline
        milestones={sortedMilestones}
        onMilestoneComplete={onMilestoneComplete}
        isEditable={isEditable}
      />
    );
  }

  return (
    <div className="relative space-y-0">
      {sortedMilestones.map((milestone, index) => (
        <MilestoneItem
          key={milestone.id}
          milestone={milestone}
          isLast={index === sortedMilestones.length - 1}
          onComplete={() => onMilestoneComplete?.(milestone.id)}
          onEdit={() => onMilestoneEdit?.(milestone)}
          onDelete={() => onMilestoneDelete?.(milestone.id)}
          onStatusChange={
            onMilestoneStatusChange
              ? (status) => onMilestoneStatusChange(milestone.id, status)
              : undefined
          }
          isEditable={isEditable}
        />
      ))}
    </div>
  );
}

interface MilestoneItemProps {
  milestone: Milestone;
  isLast: boolean;
  onComplete?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: (status: Milestone['status']) => void;
  isEditable?: boolean;
}

function MilestoneItem({
  milestone,
  isLast,
  onComplete,
  onEdit,
  onDelete,
  onStatusChange,
  isEditable = false,
}: MilestoneItemProps) {
  const daysRemaining = milestone.dueDate
    ? getDaysRemaining(milestone.dueDate)
    : null;
  const isOverdue =
    daysRemaining !== null &&
    daysRemaining < 0 &&
    milestone.status !== 'completed' &&
    milestone.status !== 'skipped';

  const getStatusIcon = () => {
    switch (milestone.status) {
      case 'completed':
        return <Check className="h-4 w-4" />;
      case 'in-progress':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'skipped':
        return <SkipForward className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getStatusBgColor = () => {
    switch (milestone.status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'in-progress':
        return 'bg-blue-500 text-white';
      case 'skipped':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  const canComplete =
    milestone.status === 'pending' || milestone.status === 'in-progress';

  return (
    <div className="relative flex gap-4 pb-6">
      {/* Vertical line */}
      {!isLast && (
        <div
          className={cn(
            'absolute left-[15px] top-8 h-full w-0.5',
            milestone.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
          )}
        />
      )}

      {/* Status indicator */}
      <button
        type="button"
        onClick={canComplete ? onComplete : undefined}
        disabled={!canComplete}
        className={cn(
          'relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all',
          getStatusBgColor(),
          canComplete && 'cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-primary'
        )}
      >
        {getStatusIcon()}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4
              className={cn(
                'font-medium',
                milestone.status === 'completed' && 'line-through text-muted-foreground',
                milestone.status === 'skipped' && 'line-through text-muted-foreground'
              )}
            >
              {milestone.title}
            </h4>
            {milestone.description && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {milestone.description}
              </p>
            )}
          </div>

          {isEditable && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {canComplete && (
                  <DropdownMenuItem onClick={onComplete}>
                    <Check className="mr-2 h-4 w-4" />
                    Mark Complete
                  </DropdownMenuItem>
                )}
                {onStatusChange && milestone.status !== 'in-progress' && (
                  <DropdownMenuItem onClick={() => onStatusChange('in-progress')}>
                    <Loader2 className="mr-2 h-4 w-4" />
                    Mark In Progress
                  </DropdownMenuItem>
                )}
                {onStatusChange && milestone.status !== 'skipped' && (
                  <DropdownMenuItem onClick={() => onStatusChange('skipped')}>
                    <SkipForward className="mr-2 h-4 w-4" />
                    Skip
                  </DropdownMenuItem>
                )}
                {onEdit && (
                  <DropdownMenuItem onClick={onEdit}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    onClick={onDelete}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2 py-0.5',
              getMilestoneStatusColor(milestone.status)
            )}
          >
            {MILESTONE_STATUS_LABELS[milestone.status]}
          </span>

          {milestone.dueDate && milestone.status !== 'completed' && milestone.status !== 'skipped' && (
            <span
              className={cn(
                'inline-flex items-center gap-1',
                isOverdue ? 'text-red-600' : 'text-muted-foreground'
              )}
            >
              <Clock className="h-3 w-3" />
              {formatDaysRemaining(daysRemaining)}
            </span>
          )}

          {milestone.completedAt && (
            <span className="text-muted-foreground">
              Completed {formatDate(milestone.completedAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface HorizontalTimelineProps {
  milestones: Milestone[];
  onMilestoneComplete?: (milestoneId: string) => void;
  isEditable?: boolean;
}

function HorizontalTimeline({
  milestones,
  onMilestoneComplete,
  isEditable = false,
}: HorizontalTimelineProps) {
  return (
    <div className="relative">
      {/* Horizontal line */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
      <div
        className="absolute top-4 left-0 h-0.5 bg-green-500 transition-all"
        style={{
          width: `${
            (milestones.filter((m) => m.status === 'completed').length /
              milestones.length) *
            100
          }%`,
        }}
      />

      <div className="relative flex justify-between">
        {milestones.map((milestone) => {
          const canComplete =
            milestone.status === 'pending' || milestone.status === 'in-progress';

          return (
            <div key={milestone.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={canComplete ? () => onMilestoneComplete?.(milestone.id) : undefined}
                disabled={!canComplete}
                className={cn(
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all',
                  milestone.status === 'completed'
                    ? 'bg-green-500 text-white'
                    : milestone.status === 'in-progress'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600',
                  canComplete && isEditable && 'cursor-pointer hover:ring-2 hover:ring-offset-2'
                )}
              >
                {milestone.status === 'completed' ? (
                  <Check className="h-4 w-4" />
                ) : milestone.status === 'in-progress' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </button>
              <span
                className={cn(
                  'mt-2 text-xs max-w-20 text-center line-clamp-2',
                  milestone.status === 'completed'
                    ? 'text-green-600'
                    : 'text-muted-foreground'
                )}
              >
                {milestone.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
