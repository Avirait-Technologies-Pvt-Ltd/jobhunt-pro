// Career Goals Utility Functions

import type {
  CareerGoal,
  Milestone,
  GoalStatus,
  GoalPriority,
  GoalFilter,
  GoalSortOption,
  GoalStatistics,
  MilestoneStatus,
} from '@/types/career-goals';

// ID Generation
let goalIdCounter = 0;
let milestoneIdCounter = 0;

export function generateGoalId(): string {
  goalIdCounter += 1;
  return `goal-${Date.now()}-${goalIdCounter}`;
}

export function generateMilestoneId(): string {
  milestoneIdCounter += 1;
  return `milestone-${Date.now()}-${milestoneIdCounter}`;
}

export function generateAchievementId(): string {
  return `achievement-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Progress Calculations
export function calculateGoalProgress(milestones: Milestone[]): number {
  if (milestones.length === 0) return 0;

  const completedMilestones = milestones.filter(
    (m) => m.status === 'completed'
  ).length;
  const totalMilestones = milestones.filter((m) => m.status !== 'skipped').length;

  if (totalMilestones === 0) return 0;

  return Math.round((completedMilestones / totalMilestones) * 100);
}

export function getMilestoneCompletionCount(milestones: Milestone[]): {
  completed: number;
  total: number;
} {
  const completed = milestones.filter((m) => m.status === 'completed').length;
  const total = milestones.filter((m) => m.status !== 'skipped').length;
  return { completed, total };
}

// Date Utilities
export function getDaysRemaining(targetDate: string): number | null {
  if (!targetDate) return null;

  const target = new Date(targetDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

export function isOverdue(targetDate: string, status: GoalStatus): boolean {
  if (status === 'completed' || status === 'archived') return false;

  const daysRemaining = getDaysRemaining(targetDate);
  return daysRemaining !== null && daysRemaining < 0;
}

export function formatDaysRemaining(days: number | null): string {
  if (days === null) return 'No deadline';

  if (days < 0) {
    const absDays = Math.abs(days);
    return absDays === 1 ? '1 day overdue' : `${absDays} days overdue`;
  }

  if (days === 0) return 'Due today';
  if (days === 1) return '1 day left';

  return `${days} days left`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateRange(startDate: string, endDate: string): string {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

// Color Utilities
export function getProgressColor(progress: number): string {
  if (progress >= 75) return 'bg-green-500';
  if (progress >= 50) return 'bg-blue-500';
  if (progress >= 25) return 'bg-yellow-500';
  return 'bg-gray-300';
}

export function getProgressTextColor(progress: number): string {
  if (progress >= 75) return 'text-green-600';
  if (progress >= 50) return 'text-blue-600';
  if (progress >= 25) return 'text-yellow-600';
  return 'text-gray-500';
}

export function getPriorityColor(priority: GoalPriority): string {
  const colors: Record<GoalPriority, string> = {
    high: 'text-red-600',
    medium: 'text-orange-600',
    low: 'text-slate-600',
  };
  return colors[priority];
}

export function getPriorityBgColor(priority: GoalPriority): string {
  const colors: Record<GoalPriority, string> = {
    high: 'bg-red-500',
    medium: 'bg-orange-500',
    low: 'bg-slate-400',
  };
  return colors[priority];
}

export function getStatusColor(status: GoalStatus): string {
  const colors: Record<GoalStatus, string> = {
    active: 'text-blue-600',
    completed: 'text-green-600',
    paused: 'text-yellow-600',
    archived: 'text-gray-500',
  };
  return colors[status];
}

export function getMilestoneStatusColor(status: MilestoneStatus): string {
  const colors: Record<MilestoneStatus, string> = {
    pending: 'text-gray-500 bg-gray-100',
    'in-progress': 'text-blue-600 bg-blue-100',
    completed: 'text-green-600 bg-green-100',
    skipped: 'text-slate-400 bg-slate-100',
  };
  return colors[status];
}

// Filtering Functions
export function filterGoalsByFilters(
  goals: CareerGoal[],
  filters: GoalFilter
): CareerGoal[] {
  return goals.filter((goal) => {
    // Filter by status
    if (filters.statuses && filters.statuses.length > 0) {
      if (!filters.statuses.includes(goal.status)) return false;
    }

    // Filter by priority
    if (filters.priorities && filters.priorities.length > 0) {
      if (!filters.priorities.includes(goal.priority)) return false;
    }

    // Filter by category
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(goal.category)) return false;
    }

    // Filter by search query
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = goal.title.toLowerCase().includes(query);
      const matchesDescription = goal.description.toLowerCase().includes(query);
      const matchesTags = goal.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );
      if (!matchesTitle && !matchesDescription && !matchesTags) return false;
    }

    // Filter by overdue status
    if (filters.hasOverdue === true) {
      if (!isOverdue(goal.targetDate, goal.status)) return false;
    }

    return true;
  });
}

// Sorting Functions
export function sortGoalsByOption(
  goals: CareerGoal[],
  sortOption: GoalSortOption
): CareerGoal[] {
  const sortedGoals = [...goals];

  const priorityOrder: Record<GoalPriority, number> = {
    high: 0,
    medium: 1,
    low: 2,
  };

  switch (sortOption) {
    case 'priority':
      sortedGoals.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
      break;
    case 'dueDate':
      sortedGoals.sort(
        (a, b) =>
          new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
      );
      break;
    case 'progress':
      sortedGoals.sort((a, b) => b.progress - a.progress);
      break;
    case 'createdAt':
      sortedGoals.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case 'title':
      sortedGoals.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return sortedGoals;
}

// Statistics Functions
export function calculateStatistics(goals: CareerGoal[]): GoalStatistics {
  const byStatus: Record<GoalStatus, number> = {
    active: 0,
    completed: 0,
    paused: 0,
    archived: 0,
  };

  let overdueGoals = 0;

  goals.forEach((goal) => {
    byStatus[goal.status]++;
    if (isOverdue(goal.targetDate, goal.status)) {
      overdueGoals++;
    }
  });

  const totalNonArchived = goals.filter((g) => g.status !== 'archived').length;
  const completionRate =
    totalNonArchived > 0
      ? Math.round((byStatus.completed / totalNonArchived) * 100)
      : 0;

  const streakInfo = calculateStreak(goals);

  return {
    total: goals.length,
    byStatus,
    completionRate,
    currentStreak: streakInfo.current,
    overdueGoals,
  };
}

export function calculateStreak(
  goals: CareerGoal[]
): { current: number; longest: number } {
  // Get completed goals sorted by completion date
  const completedGoals = goals
    .filter((g) => g.status === 'completed' && g.completedAt)
    .sort(
      (a, b) =>
        new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
    );

  if (completedGoals.length === 0) {
    return { current: 0, longest: 0 };
  }

  // Calculate current streak (consecutive weeks with completed goals)
  let currentStreak = 0;
  let longestStreak = 0;
  let streakCount = 0;
  let lastWeek: number | null = null;

  const getWeekNumber = (date: Date): number => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - startOfYear.getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.floor(diff / oneWeek);
  };

  const today = new Date();
  const currentWeek = getWeekNumber(today);

  completedGoals.forEach((goal) => {
    const completedDate = new Date(goal.completedAt!);
    const weekNumber = getWeekNumber(completedDate);

    if (lastWeek === null) {
      // First completed goal
      streakCount = 1;
      lastWeek = weekNumber;

      // Check if it's current week or last week for current streak
      if (weekNumber === currentWeek || weekNumber === currentWeek - 1) {
        currentStreak = 1;
      }
    } else if (lastWeek - weekNumber === 1) {
      // Consecutive week
      streakCount++;
      if (currentStreak > 0) {
        currentStreak = streakCount;
      }
    } else if (lastWeek !== weekNumber) {
      // Gap in weeks, reset streak
      longestStreak = Math.max(longestStreak, streakCount);
      streakCount = 1;
    }

    lastWeek = weekNumber;
  });

  longestStreak = Math.max(longestStreak, streakCount);

  return {
    current: currentStreak,
    longest: longestStreak,
  };
}

export function getOverdueGoals(goals: CareerGoal[]): CareerGoal[] {
  return goals.filter((goal) => isOverdue(goal.targetDate, goal.status));
}

export function getActiveGoalsCount(goals: CareerGoal[]): number {
  return goals.filter((goal) => goal.status === 'active').length;
}

export function getCompletedGoalsThisMonth(goals: CareerGoal[]): number {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  return goals.filter((goal) => {
    if (goal.status !== 'completed' || !goal.completedAt) return false;
    const completedDate = new Date(goal.completedAt);
    return completedDate >= startOfMonth;
  }).length;
}

// Validation Functions
export function validateGoalTitle(title: string): { valid: boolean; error?: string } {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Title is required' };
  }
  if (title.length < 3) {
    return { valid: false, error: 'Title must be at least 3 characters' };
  }
  if (title.length > 100) {
    return { valid: false, error: 'Title must be less than 100 characters' };
  }
  return { valid: true };
}

export function validateGoalDescription(description: string): {
  valid: boolean;
  error?: string;
} {
  if (description && description.length > 500) {
    return { valid: false, error: 'Description must be less than 500 characters' };
  }
  return { valid: true };
}

export function validateMilestoneTitle(title: string): {
  valid: boolean;
  error?: string;
} {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Milestone title is required' };
  }
  if (title.length < 2) {
    return { valid: false, error: 'Milestone title must be at least 2 characters' };
  }
  if (title.length > 100) {
    return { valid: false, error: 'Milestone title must be less than 100 characters' };
  }
  return { valid: true };
}

export function validateTargetDate(targetDate: string, startDate?: string): {
  valid: boolean;
  error?: string;
} {
  if (!targetDate) {
    return { valid: false, error: 'Target date is required' };
  }

  const target = new Date(targetDate);
  if (isNaN(target.getTime())) {
    return { valid: false, error: 'Invalid target date' };
  }

  if (startDate) {
    const start = new Date(startDate);
    if (target < start) {
      return { valid: false, error: 'Target date must be after start date' };
    }
  }

  return { valid: true };
}

// Category Statistics
export function getCategoryBreakdown(
  goals: CareerGoal[]
): Array<{ category: string; count: number; percentage: number }> {
  const categoryCounts = new Map<string, number>();

  goals.forEach((goal) => {
    const count = categoryCounts.get(goal.category) || 0;
    categoryCounts.set(goal.category, count + 1);
  });

  const total = goals.length;
  const breakdown: Array<{ category: string; count: number; percentage: number }> = [];

  categoryCounts.forEach((count, category) => {
    breakdown.push({
      category,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    });
  });

  return breakdown.sort((a, b) => b.count - a.count);
}

// Helper for relative time display
export function getRelativeTimeString(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins} minute${mins > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  return formatDate(dateString);
}
