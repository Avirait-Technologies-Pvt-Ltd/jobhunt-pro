import {
  generateGoalId,
  generateMilestoneId,
  calculateGoalProgress,
  getDaysRemaining,
  isOverdue,
  formatDaysRemaining,
  formatDate,
  getProgressColor,
  getPriorityColor,
  filterGoalsByFilters,
  sortGoalsByOption,
  calculateStatistics,
  calculateStreak,
  getOverdueGoals,
  validateGoalTitle,
  validateGoalDescription,
  validateMilestoneTitle,
  validateTargetDate,
  getCategoryBreakdown,
  getMilestoneCompletionCount,
} from '@/lib/career-goals-utils';
import type { CareerGoal, Milestone, GoalFilter } from '@/types/career-goals';

describe('Career Goals Utils', () => {
  describe('ID Generation', () => {
    it('generates unique goal IDs', () => {
      const id1 = generateGoalId();
      const id2 = generateGoalId();

      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^goal-\d+-\d+$/);
    });

    it('generates unique milestone IDs', () => {
      const id1 = generateMilestoneId();
      const id2 = generateMilestoneId();

      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^milestone-\d+-\d+$/);
    });
  });

  describe('Progress Calculations', () => {
    it('returns 0 for empty milestones', () => {
      expect(calculateGoalProgress([])).toBe(0);
    });

    it('calculates progress based on completed milestones', () => {
      const milestones: Milestone[] = [
        createMilestone({ status: 'completed' }),
        createMilestone({ status: 'pending' }),
        createMilestone({ status: 'pending' }),
        createMilestone({ status: 'pending' }),
      ];

      expect(calculateGoalProgress(milestones)).toBe(25);
    });

    it('excludes skipped milestones from calculation', () => {
      const milestones: Milestone[] = [
        createMilestone({ status: 'completed' }),
        createMilestone({ status: 'skipped' }),
        createMilestone({ status: 'pending' }),
      ];

      expect(calculateGoalProgress(milestones)).toBe(50);
    });

    it('returns 100 when all non-skipped milestones are completed', () => {
      const milestones: Milestone[] = [
        createMilestone({ status: 'completed' }),
        createMilestone({ status: 'completed' }),
        createMilestone({ status: 'skipped' }),
      ];

      expect(calculateGoalProgress(milestones)).toBe(100);
    });

    it('returns 0 when all milestones are skipped', () => {
      const milestones: Milestone[] = [
        createMilestone({ status: 'skipped' }),
        createMilestone({ status: 'skipped' }),
      ];

      expect(calculateGoalProgress(milestones)).toBe(0);
    });
  });

  describe('Milestone Completion Count', () => {
    it('returns correct completed and total counts', () => {
      const milestones: Milestone[] = [
        createMilestone({ status: 'completed' }),
        createMilestone({ status: 'completed' }),
        createMilestone({ status: 'pending' }),
        createMilestone({ status: 'skipped' }),
      ];

      const result = getMilestoneCompletionCount(milestones);

      expect(result.completed).toBe(2);
      expect(result.total).toBe(3); // Excludes skipped
    });
  });

  describe('Date Utilities', () => {
    describe('getDaysRemaining', () => {
      it('returns positive days for future date', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 10);

        const days = getDaysRemaining(futureDate.toISOString());

        expect(days).toBe(10);
      });

      it('returns negative days for past date', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 5);

        const days = getDaysRemaining(pastDate.toISOString());

        expect(days).toBe(-5);
      });

      it('returns 0 for today', () => {
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        const days = getDaysRemaining(today.toISOString());

        expect(days).toBe(0);
      });

      it('returns null for empty date', () => {
        expect(getDaysRemaining('')).toBeNull();
      });
    });

    describe('isOverdue', () => {
      it('returns true for past date with active status', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);

        expect(isOverdue(pastDate.toISOString(), 'active')).toBe(true);
      });

      it('returns false for completed goals', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);

        expect(isOverdue(pastDate.toISOString(), 'completed')).toBe(false);
      });

      it('returns false for archived goals', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);

        expect(isOverdue(pastDate.toISOString(), 'archived')).toBe(false);
      });

      it('returns false for future date', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 10);

        expect(isOverdue(futureDate.toISOString(), 'active')).toBe(false);
      });
    });

    describe('formatDaysRemaining', () => {
      it('formats null as "No deadline"', () => {
        expect(formatDaysRemaining(null)).toBe('No deadline');
      });

      it('formats 0 as "Due today"', () => {
        expect(formatDaysRemaining(0)).toBe('Due today');
      });

      it('formats 1 as "1 day left"', () => {
        expect(formatDaysRemaining(1)).toBe('1 day left');
      });

      it('formats positive days correctly', () => {
        expect(formatDaysRemaining(5)).toBe('5 days left');
      });

      it('formats -1 as "1 day overdue"', () => {
        expect(formatDaysRemaining(-1)).toBe('1 day overdue');
      });

      it('formats negative days correctly', () => {
        expect(formatDaysRemaining(-5)).toBe('5 days overdue');
      });
    });

    describe('formatDate', () => {
      it('formats date correctly', () => {
        const result = formatDate('2025-06-15T00:00:00Z');

        expect(result).toContain('Jun');
        expect(result).toContain('15');
        expect(result).toContain('2025');
      });
    });
  });

  describe('Color Utilities', () => {
    describe('getProgressColor', () => {
      it('returns green for 75%+', () => {
        expect(getProgressColor(75)).toBe('bg-green-500');
        expect(getProgressColor(100)).toBe('bg-green-500');
      });

      it('returns blue for 50-74%', () => {
        expect(getProgressColor(50)).toBe('bg-blue-500');
        expect(getProgressColor(74)).toBe('bg-blue-500');
      });

      it('returns yellow for 25-49%', () => {
        expect(getProgressColor(25)).toBe('bg-yellow-500');
        expect(getProgressColor(49)).toBe('bg-yellow-500');
      });

      it('returns gray for 0-24%', () => {
        expect(getProgressColor(0)).toBe('bg-gray-300');
        expect(getProgressColor(24)).toBe('bg-gray-300');
      });
    });

    describe('getPriorityColor', () => {
      it('returns correct colors for each priority', () => {
        expect(getPriorityColor('high')).toBe('text-red-600');
        expect(getPriorityColor('medium')).toBe('text-orange-600');
        expect(getPriorityColor('low')).toBe('text-slate-600');
      });
    });
  });

  describe('Filtering', () => {
    const mockGoals: CareerGoal[] = [
      createGoal({
        id: '1',
        title: 'React Goal',
        status: 'active',
        priority: 'high',
        category: 'skill-development',
        tags: ['react'],
      }),
      createGoal({
        id: '2',
        title: 'Networking Goal',
        status: 'completed',
        priority: 'medium',
        category: 'networking',
        tags: ['career'],
      }),
      createGoal({
        id: '3',
        title: 'TypeScript Goal',
        status: 'active',
        priority: 'low',
        category: 'skill-development',
        tags: ['typescript'],
      }),
    ];

    it('filters by status', () => {
      const result = filterGoalsByFilters(mockGoals, {
        statuses: ['active'],
      });

      expect(result).toHaveLength(2);
      expect(result.every((g) => g.status === 'active')).toBe(true);
    });

    it('filters by multiple statuses', () => {
      const result = filterGoalsByFilters(mockGoals, {
        statuses: ['active', 'completed'],
      });

      expect(result).toHaveLength(3);
    });

    it('filters by priority', () => {
      const result = filterGoalsByFilters(mockGoals, {
        priorities: ['high'],
      });

      expect(result).toHaveLength(1);
      expect(result[0].priority).toBe('high');
    });

    it('filters by category', () => {
      const result = filterGoalsByFilters(mockGoals, {
        categories: ['skill-development'],
      });

      expect(result).toHaveLength(2);
    });

    it('filters by search query in title', () => {
      const result = filterGoalsByFilters(mockGoals, {
        searchQuery: 'React',
      });

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('React Goal');
    });

    it('filters by search query in tags', () => {
      const result = filterGoalsByFilters(mockGoals, {
        searchQuery: 'typescript',
      });

      expect(result).toHaveLength(1);
      expect(result[0].tags).toContain('typescript');
    });

    it('combines multiple filters', () => {
      const result = filterGoalsByFilters(mockGoals, {
        statuses: ['active'],
        categories: ['skill-development'],
      });

      expect(result).toHaveLength(2);
    });

    it('returns all goals when no filters', () => {
      const result = filterGoalsByFilters(mockGoals, {});

      expect(result).toHaveLength(3);
    });
  });

  describe('Sorting', () => {
    const mockGoals: CareerGoal[] = [
      createGoal({ id: '1', priority: 'low', progress: 25, title: 'C Goal' }),
      createGoal({ id: '2', priority: 'high', progress: 75, title: 'A Goal' }),
      createGoal({ id: '3', priority: 'medium', progress: 50, title: 'B Goal' }),
    ];

    it('sorts by priority', () => {
      const result = sortGoalsByOption(mockGoals, 'priority');

      expect(result[0].priority).toBe('high');
      expect(result[1].priority).toBe('medium');
      expect(result[2].priority).toBe('low');
    });

    it('sorts by progress (descending)', () => {
      const result = sortGoalsByOption(mockGoals, 'progress');

      expect(result[0].progress).toBe(75);
      expect(result[1].progress).toBe(50);
      expect(result[2].progress).toBe(25);
    });

    it('sorts by title', () => {
      const result = sortGoalsByOption(mockGoals, 'title');

      expect(result[0].title).toBe('A Goal');
      expect(result[1].title).toBe('B Goal');
      expect(result[2].title).toBe('C Goal');
    });
  });

  describe('Statistics', () => {
    it('calculates total goals', () => {
      const goals = [createGoal({ id: '1' }), createGoal({ id: '2' })];
      const stats = calculateStatistics(goals);

      expect(stats.total).toBe(2);
    });

    it('calculates goals by status', () => {
      const goals = [
        createGoal({ id: '1', status: 'active' }),
        createGoal({ id: '2', status: 'completed' }),
        createGoal({ id: '3', status: 'active' }),
      ];
      const stats = calculateStatistics(goals);

      expect(stats.byStatus.active).toBe(2);
      expect(stats.byStatus.completed).toBe(1);
    });

    it('calculates completion rate', () => {
      const goals = [
        createGoal({ id: '1', status: 'active' }),
        createGoal({ id: '2', status: 'completed' }),
      ];
      const stats = calculateStatistics(goals);

      expect(stats.completionRate).toBe(50);
    });

    it('excludes archived from completion rate', () => {
      const goals = [
        createGoal({ id: '1', status: 'completed' }),
        createGoal({ id: '2', status: 'archived' }),
      ];
      const stats = calculateStatistics(goals);

      expect(stats.completionRate).toBe(100);
    });
  });

  describe('Validation', () => {
    describe('validateGoalTitle', () => {
      it('fails for empty title', () => {
        const result = validateGoalTitle('');

        expect(result.valid).toBe(false);
        expect(result.error).toContain('required');
      });

      it('fails for short title', () => {
        const result = validateGoalTitle('AB');

        expect(result.valid).toBe(false);
        expect(result.error).toContain('3 characters');
      });

      it('fails for long title', () => {
        const result = validateGoalTitle('A'.repeat(101));

        expect(result.valid).toBe(false);
        expect(result.error).toContain('100 characters');
      });

      it('passes for valid title', () => {
        const result = validateGoalTitle('Valid Goal Title');

        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    describe('validateGoalDescription', () => {
      it('passes for empty description', () => {
        const result = validateGoalDescription('');

        expect(result.valid).toBe(true);
      });

      it('fails for long description', () => {
        const result = validateGoalDescription('A'.repeat(501));

        expect(result.valid).toBe(false);
        expect(result.error).toContain('500 characters');
      });
    });

    describe('validateMilestoneTitle', () => {
      it('fails for empty title', () => {
        const result = validateMilestoneTitle('');

        expect(result.valid).toBe(false);
      });

      it('fails for single character', () => {
        const result = validateMilestoneTitle('A');

        expect(result.valid).toBe(false);
      });

      it('passes for valid title', () => {
        const result = validateMilestoneTitle('Complete task');

        expect(result.valid).toBe(true);
      });
    });

    describe('validateTargetDate', () => {
      it('fails for empty date', () => {
        const result = validateTargetDate('');

        expect(result.valid).toBe(false);
      });

      it('fails for invalid date', () => {
        const result = validateTargetDate('not-a-date');

        expect(result.valid).toBe(false);
      });

      it('fails when target is before start date', () => {
        const result = validateTargetDate(
          '2025-01-01T00:00:00Z',
          '2025-06-01T00:00:00Z'
        );

        expect(result.valid).toBe(false);
        expect(result.error).toContain('after start date');
      });

      it('passes for valid target date', () => {
        const result = validateTargetDate('2025-06-01T00:00:00Z');

        expect(result.valid).toBe(true);
      });
    });
  });

  describe('Category Breakdown', () => {
    it('returns breakdown by category', () => {
      const goals = [
        createGoal({ id: '1', category: 'skill-development' }),
        createGoal({ id: '2', category: 'skill-development' }),
        createGoal({ id: '3', category: 'networking' }),
      ];

      const breakdown = getCategoryBreakdown(goals);

      expect(breakdown).toHaveLength(2);
      expect(breakdown[0].category).toBe('skill-development');
      expect(breakdown[0].count).toBe(2);
      expect(breakdown[0].percentage).toBe(67);
    });

    it('sorts by count descending', () => {
      const goals = [
        createGoal({ id: '1', category: 'networking' }),
        createGoal({ id: '2', category: 'skill-development' }),
        createGoal({ id: '3', category: 'skill-development' }),
      ];

      const breakdown = getCategoryBreakdown(goals);

      expect(breakdown[0].category).toBe('skill-development');
    });
  });

  describe('Overdue Goals', () => {
    it('returns only overdue active goals', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 5);

      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);

      const goals = [
        createGoal({
          id: '1',
          status: 'active',
          targetDate: pastDate.toISOString(),
        }),
        createGoal({
          id: '2',
          status: 'active',
          targetDate: futureDate.toISOString(),
        }),
        createGoal({
          id: '3',
          status: 'completed',
          targetDate: pastDate.toISOString(),
        }),
      ];

      const overdue = getOverdueGoals(goals);

      expect(overdue).toHaveLength(1);
      expect(overdue[0].id).toBe('1');
    });
  });
});

// Helper functions
function createMilestone(overrides: Partial<Milestone> = {}): Milestone {
  return {
    id: `milestone-${Date.now()}`,
    title: 'Test Milestone',
    status: 'pending',
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

function createGoal(overrides: Partial<CareerGoal> = {}): CareerGoal {
  return {
    id: `goal-${Date.now()}`,
    title: 'Test Goal',
    description: 'Test description',
    category: 'skill-development',
    status: 'active',
    priority: 'medium',
    progress: 0,
    milestones: [],
    startDate: new Date().toISOString(),
    targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}
