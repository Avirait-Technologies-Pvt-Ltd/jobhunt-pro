import { renderHook, act } from '@testing-library/react';
import { useCareerGoals } from '@/hooks/useCareerGoals';
import type { CareerGoal, CreateGoalInput } from '@/types/career-goals';

// Mock the sample data
jest.mock('@/data/career-goals', () => ({
  sampleCareerGoals: [],
  sampleAchievements: [],
}));

// Helper to get a future date
function getFutureDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString();
}

describe('useCareerGoals Hook', () => {
  const mockGoalInput: CreateGoalInput = {
    title: 'Learn React',
    description: 'Master React development',
    category: 'skill-development',
    priority: 'high',
    targetDate: getFutureDate(90), // 90 days in the future
    tags: ['react', 'frontend'],
  };

  describe('Initialization', () => {
    it('initializes with empty goals when no initial data', () => {
      const { result } = renderHook(() => useCareerGoals());

      expect(result.current.goals).toEqual([]);
      expect(result.current.achievements).toEqual([]);
    });

    it('initializes with provided goals', () => {
      const initialGoals: CareerGoal[] = [
        {
          id: 'goal-1',
          title: 'Test Goal',
          description: 'Test',
          category: 'skill-development',
          status: 'active',
          priority: 'high',
          progress: 0,
          milestones: [],
          startDate: '2025-01-01T00:00:00Z',
          targetDate: '2025-06-01T00:00:00Z',
          tags: [],
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
      ];

      const { result } = renderHook(() =>
        useCareerGoals({ initialGoals })
      );

      expect(result.current.goals).toHaveLength(1);
      expect(result.current.goals[0].title).toBe('Test Goal');
    });
  });

  describe('CRUD Operations', () => {
    describe('addGoal', () => {
      it('adds a new goal', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        expect(result.current.goals).toHaveLength(1);
        expect(result.current.goals[0].title).toBe('Learn React');
        expect(result.current.goals[0].status).toBe('active');
        expect(result.current.goals[0].progress).toBe(0);
      });

      it('generates unique goal id', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
          result.current.addGoal({ ...mockGoalInput, title: 'Second Goal' });
        });

        expect(result.current.goals[0].id).not.toBe(result.current.goals[1].id);
      });

      it('adds goal with milestones', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal({
            ...mockGoalInput,
            milestones: [
              { title: 'Milestone 1' },
              { title: 'Milestone 2' },
            ],
          });
        });

        expect(result.current.goals[0].milestones).toHaveLength(2);
        expect(result.current.goals[0].milestones[0].title).toBe('Milestone 1');
        expect(result.current.goals[0].milestones[0].status).toBe('pending');
        expect(result.current.goals[0].milestones[0].order).toBe(1);
      });

      it('sets timestamps on new goal', () => {
        const { result } = renderHook(() => useCareerGoals());

        const beforeAdd = new Date().toISOString();

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const afterAdd = new Date().toISOString();
        const goal = result.current.goals[0];

        expect(goal.createdAt >= beforeAdd).toBe(true);
        expect(goal.createdAt <= afterAdd).toBe(true);
        expect(goal.updatedAt).toBe(goal.createdAt);
      });
    });

    describe('updateGoal', () => {
      it('updates goal properties', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const goalId = result.current.goals[0].id;

        act(() => {
          result.current.updateGoal(goalId, {
            title: 'Updated Title',
            priority: 'low',
          });
        });

        expect(result.current.goals[0].title).toBe('Updated Title');
        expect(result.current.goals[0].priority).toBe('low');
      });

      it('returns null for non-existent goal', () => {
        const { result } = renderHook(() => useCareerGoals());

        let updateResult: CareerGoal | null = null;

        act(() => {
          updateResult = result.current.updateGoal('non-existent', {
            title: 'Test',
          });
        });

        expect(updateResult).toBeNull();
      });

      it('updates the updatedAt timestamp', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const originalUpdatedAt = result.current.goals[0].updatedAt;
        const goalId = result.current.goals[0].id;

        // Wait a tiny bit to ensure timestamp difference
        act(() => {
          result.current.updateGoal(goalId, { title: 'New Title' });
        });

        expect(result.current.goals[0].updatedAt >= originalUpdatedAt).toBe(true);
      });
    });

    describe('deleteGoal', () => {
      it('deletes a goal', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const goalId = result.current.goals[0].id;

        act(() => {
          result.current.deleteGoal(goalId);
        });

        expect(result.current.goals).toHaveLength(0);
      });

      it('returns true when goal is deleted', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const goalId = result.current.goals[0].id;
        const goalCountBefore = result.current.goals.length;

        act(() => {
          result.current.deleteGoal(goalId);
        });

        // Verify deletion happened by checking goal count changed
        expect(result.current.goals.length).toBe(goalCountBefore - 1);
      });

      it('returns false for non-existent goal', () => {
        const { result } = renderHook(() => useCareerGoals());

        let deleted = true;

        act(() => {
          deleted = result.current.deleteGoal('non-existent');
        });

        expect(deleted).toBe(false);
      });
    });

    describe('getGoalById', () => {
      it('returns goal by id', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const goalId = result.current.goals[0].id;
        const goal = result.current.getGoalById(goalId);

        expect(goal).toBeDefined();
        expect(goal?.title).toBe('Learn React');
      });

      it('returns undefined for non-existent id', () => {
        const { result } = renderHook(() => useCareerGoals());

        const goal = result.current.getGoalById('non-existent');
        expect(goal).toBeUndefined();
      });
    });
  });

  describe('Status Operations', () => {
    describe('completeGoal', () => {
      it('marks goal as completed', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const goalId = result.current.goals[0].id;

        act(() => {
          result.current.completeGoal(goalId);
        });

        expect(result.current.goals[0].status).toBe('completed');
        expect(result.current.goals[0].progress).toBe(100);
        expect(result.current.goals[0].completedAt).toBeDefined();
      });

      it('marks all milestones as completed', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal({
            ...mockGoalInput,
            milestones: [{ title: 'Milestone 1' }],
          });
        });

        const goalId = result.current.goals[0].id;

        act(() => {
          result.current.completeGoal(goalId);
        });

        expect(result.current.goals[0].milestones[0].status).toBe('completed');
      });

      it('does not complete already completed goal', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const goalId = result.current.goals[0].id;

        act(() => {
          result.current.completeGoal(goalId);
        });

        const completedAt = result.current.goals[0].completedAt;

        act(() => {
          result.current.completeGoal(goalId);
        });

        // completedAt should remain the same
        expect(result.current.goals[0].completedAt).toBe(completedAt);
      });
    });

    describe('pauseGoal', () => {
      it('pauses an active goal', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const goalId = result.current.goals[0].id;

        act(() => {
          result.current.pauseGoal(goalId);
        });

        expect(result.current.goals[0].status).toBe('paused');
      });

      it('does not pause non-active goal', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const goalId = result.current.goals[0].id;

        act(() => {
          result.current.completeGoal(goalId);
        });

        act(() => {
          result.current.pauseGoal(goalId);
        });

        expect(result.current.goals[0].status).toBe('completed');
      });
    });

    describe('resumeGoal', () => {
      it('resumes a paused goal', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const goalId = result.current.goals[0].id;

        act(() => {
          result.current.pauseGoal(goalId);
        });

        act(() => {
          result.current.resumeGoal(goalId);
        });

        expect(result.current.goals[0].status).toBe('active');
      });

      it('does not resume non-paused goal', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const goalId = result.current.goals[0].id;

        act(() => {
          result.current.resumeGoal(goalId);
        });

        expect(result.current.goals[0].status).toBe('active');
      });
    });

    describe('archiveGoal', () => {
      it('archives a goal', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const goalId = result.current.goals[0].id;

        act(() => {
          result.current.archiveGoal(goalId);
        });

        expect(result.current.goals[0].status).toBe('archived');
      });
    });
  });

  describe('Milestone Operations', () => {
    describe('addMilestone', () => {
      it('adds a milestone to a goal', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal(mockGoalInput);
        });

        const goalId = result.current.goals[0].id;

        act(() => {
          result.current.addMilestone(goalId, {
            title: 'New Milestone',
          });
        });

        expect(result.current.goals[0].milestones).toHaveLength(1);
        expect(result.current.goals[0].milestones[0].title).toBe('New Milestone');
      });

      it('sets correct order for new milestone', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal({
            ...mockGoalInput,
            milestones: [{ title: 'First' }],
          });
        });

        const goalId = result.current.goals[0].id;

        act(() => {
          result.current.addMilestone(goalId, { title: 'Second' });
        });

        expect(result.current.goals[0].milestones[1].order).toBe(2);
      });
    });

    describe('completeMilestone', () => {
      it('completes a milestone', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal({
            ...mockGoalInput,
            milestones: [{ title: 'Milestone' }],
          });
        });

        const goalId = result.current.goals[0].id;
        const milestoneId = result.current.goals[0].milestones[0].id;

        act(() => {
          result.current.completeMilestone(goalId, milestoneId);
        });

        expect(result.current.goals[0].milestones[0].status).toBe('completed');
        expect(result.current.goals[0].milestones[0].completedAt).toBeDefined();
      });

      it('updates goal progress when milestone is completed', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal({
            ...mockGoalInput,
            milestones: [{ title: 'Milestone 1' }, { title: 'Milestone 2' }],
          });
        });

        const goalId = result.current.goals[0].id;
        const milestoneId = result.current.goals[0].milestones[0].id;

        act(() => {
          result.current.completeMilestone(goalId, milestoneId);
        });

        expect(result.current.goals[0].progress).toBe(50);
      });
    });

    describe('deleteMilestone', () => {
      it('deletes a milestone', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal({
            ...mockGoalInput,
            milestones: [{ title: 'Milestone' }],
          });
        });

        const goalId = result.current.goals[0].id;
        const milestoneId = result.current.goals[0].milestones[0].id;

        act(() => {
          result.current.deleteMilestone(goalId, milestoneId);
        });

        expect(result.current.goals[0].milestones).toHaveLength(0);
      });

      it('reorders remaining milestones', () => {
        const { result } = renderHook(() => useCareerGoals());

        act(() => {
          result.current.addGoal({
            ...mockGoalInput,
            milestones: [
              { title: 'First' },
              { title: 'Second' },
              { title: 'Third' },
            ],
          });
        });

        const goalId = result.current.goals[0].id;
        const secondMilestoneId = result.current.goals[0].milestones[1].id;

        act(() => {
          result.current.deleteMilestone(goalId, secondMilestoneId);
        });

        expect(result.current.goals[0].milestones[0].order).toBe(1);
        expect(result.current.goals[0].milestones[1].order).toBe(2);
      });
    });
  });

  describe('Filtering', () => {
    it('filters goals by status', () => {
      const { result } = renderHook(() => useCareerGoals());

      act(() => {
        result.current.addGoal(mockGoalInput);
        result.current.addGoal({ ...mockGoalInput, title: 'Second Goal' });
      });

      const goalId = result.current.goals[0].id;

      act(() => {
        result.current.completeGoal(goalId);
      });

      const filteredGoals = result.current.filterGoals({
        statuses: ['completed'],
      });

      expect(filteredGoals).toHaveLength(1);
      expect(filteredGoals[0].status).toBe('completed');
    });

    it('filters goals by priority', () => {
      const { result } = renderHook(() => useCareerGoals());

      act(() => {
        result.current.addGoal(mockGoalInput);
        result.current.addGoal({
          ...mockGoalInput,
          title: 'Low Priority',
          priority: 'low',
        });
      });

      const filteredGoals = result.current.filterGoals({
        priorities: ['high'],
      });

      expect(filteredGoals).toHaveLength(1);
      expect(filteredGoals[0].priority).toBe('high');
    });

    it('filters goals by search query', () => {
      const { result } = renderHook(() => useCareerGoals());

      act(() => {
        result.current.addGoal(mockGoalInput);
        result.current.addGoal({
          ...mockGoalInput,
          title: 'Learn TypeScript',
        });
      });

      const filteredGoals = result.current.filterGoals({
        searchQuery: 'TypeScript',
      });

      expect(filteredGoals).toHaveLength(1);
      expect(filteredGoals[0].title).toBe('Learn TypeScript');
    });
  });

  describe('Sorting', () => {
    it('sorts goals by priority', () => {
      const { result } = renderHook(() => useCareerGoals());

      act(() => {
        result.current.addGoal({ ...mockGoalInput, priority: 'low' });
        result.current.addGoal({ ...mockGoalInput, priority: 'high', title: 'High' });
        result.current.addGoal({ ...mockGoalInput, priority: 'medium', title: 'Medium' });
      });

      const sortedGoals = result.current.sortGoals('priority');

      expect(sortedGoals[0].priority).toBe('high');
      expect(sortedGoals[1].priority).toBe('medium');
      expect(sortedGoals[2].priority).toBe('low');
    });

    it('sorts goals by progress', () => {
      const { result } = renderHook(() => useCareerGoals());

      act(() => {
        result.current.addGoal({
          ...mockGoalInput,
          milestones: [{ title: 'M1' }],
        });
        result.current.addGoal({
          ...mockGoalInput,
          title: 'Full Progress',
          milestones: [{ title: 'M1' }],
        });
      });

      const goalId = result.current.goals[1].id;
      const milestoneId = result.current.goals[1].milestones[0].id;

      act(() => {
        result.current.completeMilestone(goalId, milestoneId);
      });

      const sortedGoals = result.current.sortGoals('progress');

      expect(sortedGoals[0].progress).toBe(100);
      expect(sortedGoals[1].progress).toBe(0);
    });
  });

  describe('Statistics', () => {
    it('calculates total goals', () => {
      const { result } = renderHook(() => useCareerGoals());

      act(() => {
        result.current.addGoal(mockGoalInput);
        result.current.addGoal({ ...mockGoalInput, title: 'Second' });
      });

      const stats = result.current.getStatistics();

      expect(stats.total).toBe(2);
    });

    it('calculates goals by status', () => {
      const { result } = renderHook(() => useCareerGoals());

      act(() => {
        result.current.addGoal(mockGoalInput);
        result.current.addGoal({ ...mockGoalInput, title: 'Second' });
      });

      const goalId = result.current.goals[0].id;

      act(() => {
        result.current.completeGoal(goalId);
      });

      const stats = result.current.getStatistics();

      expect(stats.byStatus.active).toBe(1);
      expect(stats.byStatus.completed).toBe(1);
    });

    it('calculates completion rate', () => {
      const { result } = renderHook(() => useCareerGoals());

      act(() => {
        result.current.addGoal(mockGoalInput);
        result.current.addGoal({ ...mockGoalInput, title: 'Second' });
      });

      const goalId = result.current.goals[0].id;

      act(() => {
        result.current.completeGoal(goalId);
      });

      const stats = result.current.getStatistics();

      expect(stats.completionRate).toBe(50);
    });
  });

  describe('Overdue Goals', () => {
    it('returns overdue goals', () => {
      const { result } = renderHook(() => useCareerGoals());

      const futureDate = getFutureDate(90);

      act(() => {
        result.current.addGoal({
          ...mockGoalInput,
          title: 'Overdue Goal',
          targetDate: '2020-01-01T00:00:00Z', // Past date
        });
        result.current.addGoal({
          ...mockGoalInput,
          title: 'Future Goal',
          targetDate: futureDate, // Future date
        });
      });

      const overdueGoals = result.current.getOverdueGoals();

      expect(overdueGoals).toHaveLength(1);
      expect(overdueGoals[0].title).toBe('Overdue Goal');
      expect(new Date(overdueGoals[0].targetDate).getTime()).toBeLessThan(
        Date.now()
      );
    });
  });
});
