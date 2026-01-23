'use client';

import { useState, useCallback } from 'react';
import type {
  CareerGoal,
  Achievement,
  Milestone,
  GoalFilter,
  GoalSortOption,
  GoalStatistics,
  CreateGoalInput,
  UpdateGoalInput,
  CreateMilestoneInput,
} from '@/types/career-goals';
import {
  generateGoalId,
  generateMilestoneId,
  generateAchievementId,
  calculateGoalProgress,
  filterGoalsByFilters,
  sortGoalsByOption,
  calculateStatistics,
  getOverdueGoals,
} from '@/lib/career-goals-utils';
import { sampleCareerGoals, sampleAchievements } from '@/data/career-goals';

export interface UseCareerGoalsOptions {
  initialGoals?: CareerGoal[];
  initialAchievements?: Achievement[];
}

export interface UseCareerGoalsReturn {
  // State
  goals: CareerGoal[];
  achievements: Achievement[];

  // CRUD
  addGoal: (input: CreateGoalInput) => CareerGoal;
  updateGoal: (id: string, updates: UpdateGoalInput) => CareerGoal | null;
  deleteGoal: (id: string) => boolean;
  getGoalById: (id: string) => CareerGoal | undefined;

  // Status
  completeGoal: (id: string) => CareerGoal | null;
  pauseGoal: (id: string) => CareerGoal | null;
  resumeGoal: (id: string) => CareerGoal | null;
  archiveGoal: (id: string) => CareerGoal | null;

  // Milestones
  addMilestone: (goalId: string, milestone: CreateMilestoneInput) => Milestone | null;
  updateMilestone: (
    goalId: string,
    milestoneId: string,
    updates: Partial<Milestone>
  ) => Milestone | null;
  completeMilestone: (goalId: string, milestoneId: string) => Milestone | null;
  deleteMilestone: (goalId: string, milestoneId: string) => boolean;

  // Filtering
  filterGoals: (filters: GoalFilter) => CareerGoal[];
  sortGoals: (sortOption: GoalSortOption) => CareerGoal[];

  // Statistics
  getStatistics: () => GoalStatistics;
  getOverdueGoals: () => CareerGoal[];
}

export function useCareerGoals(
  options?: UseCareerGoalsOptions
): UseCareerGoalsReturn {
  const [goals, setGoals] = useState<CareerGoal[]>(
    options?.initialGoals ?? sampleCareerGoals
  );
  const [achievements, setAchievements] = useState<Achievement[]>(
    options?.initialAchievements ?? sampleAchievements
  );

  // Helper to check and award achievements
  const checkAchievements = useCallback(
    (updatedGoals: CareerGoal[]) => {
      const newAchievements: Achievement[] = [];
      const now = new Date().toISOString();

      // Check for first goal completed
      const completedGoals = updatedGoals.filter((g) => g.status === 'completed');
      if (
        completedGoals.length === 1 &&
        !achievements.find((a) => a.type === 'goal-completed')
      ) {
        newAchievements.push({
          id: generateAchievementId(),
          type: 'goal-completed',
          name: 'First Goal Completed',
          description: 'Completed your first career goal',
          icon: 'Trophy',
          color: 'bg-green-500',
          earnedAt: now,
        });
      }

      // Check for milestone master (10+ milestones)
      const totalCompletedMilestones = updatedGoals.reduce(
        (count, goal) =>
          count + goal.milestones.filter((m) => m.status === 'completed').length,
        0
      );
      if (
        totalCompletedMilestones >= 10 &&
        !achievements.find((a) => a.type === 'milestone-master')
      ) {
        newAchievements.push({
          id: generateAchievementId(),
          type: 'milestone-master',
          name: 'Milestone Master',
          description: 'Completed 10 milestones across all goals',
          icon: 'Target',
          color: 'bg-blue-500',
          earnedAt: now,
        });
      }

      if (newAchievements.length > 0) {
        setAchievements((prev) => [...prev, ...newAchievements]);
      }
    },
    [achievements]
  );

  // CRUD Operations
  const addGoal = useCallback((input: CreateGoalInput): CareerGoal => {
    const now = new Date().toISOString();
    const initialMilestones: Milestone[] =
      input.milestones?.map((m, index) => ({
        id: generateMilestoneId(),
        title: m.title,
        description: m.description,
        status: 'pending' as const,
        dueDate: m.dueDate,
        order: index + 1,
        createdAt: now,
        updatedAt: now,
      })) ?? [];

    const newGoal: CareerGoal = {
      id: generateGoalId(),
      title: input.title,
      description: input.description,
      category: input.category,
      status: 'active',
      priority: input.priority,
      progress: 0,
      milestones: initialMilestones,
      startDate: input.startDate ?? now,
      targetDate: input.targetDate,
      tags: input.tags ?? [],
      createdAt: now,
      updatedAt: now,
    };

    setGoals((prev) => [...prev, newGoal]);
    return newGoal;
  }, []);

  const updateGoal = useCallback(
    (id: string, updates: UpdateGoalInput): CareerGoal | null => {
      let updatedGoal: CareerGoal | null = null;

      setGoals((prev) =>
        prev.map((goal) => {
          if (goal.id === id) {
            updatedGoal = {
              ...goal,
              ...updates,
              updatedAt: new Date().toISOString(),
            };
            return updatedGoal;
          }
          return goal;
        })
      );

      return updatedGoal;
    },
    []
  );

  const deleteGoal = useCallback((id: string): boolean => {
    let deleted = false;
    setGoals((prev) => {
      const newGoals = prev.filter((goal) => goal.id !== id);
      deleted = newGoals.length < prev.length;
      return newGoals;
    });
    return deleted;
  }, []);

  const getGoalById = useCallback(
    (id: string): CareerGoal | undefined => {
      return goals.find((goal) => goal.id === id);
    },
    [goals]
  );

  // Status Operations
  const completeGoal = useCallback(
    (id: string): CareerGoal | null => {
      let updatedGoal: CareerGoal | null = null;
      const now = new Date().toISOString();

      setGoals((prev) => {
        const newGoals = prev.map((goal) => {
          if (goal.id === id && goal.status === 'active') {
            updatedGoal = {
              ...goal,
              status: 'completed',
              progress: 100,
              completedAt: now,
              updatedAt: now,
              milestones: goal.milestones.map((m) =>
                m.status === 'pending' || m.status === 'in-progress'
                  ? { ...m, status: 'completed' as const, completedAt: now, updatedAt: now }
                  : m
              ),
            };
            return updatedGoal;
          }
          return goal;
        });

        // Check for achievements after state update
        setTimeout(() => checkAchievements(newGoals), 0);

        return newGoals;
      });

      return updatedGoal;
    },
    [checkAchievements]
  );

  const pauseGoal = useCallback((id: string): CareerGoal | null => {
    let updatedGoal: CareerGoal | null = null;

    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === id && goal.status === 'active') {
          updatedGoal = {
            ...goal,
            status: 'paused',
            updatedAt: new Date().toISOString(),
          };
          return updatedGoal;
        }
        return goal;
      })
    );

    return updatedGoal;
  }, []);

  const resumeGoal = useCallback((id: string): CareerGoal | null => {
    let updatedGoal: CareerGoal | null = null;

    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === id && goal.status === 'paused') {
          updatedGoal = {
            ...goal,
            status: 'active',
            updatedAt: new Date().toISOString(),
          };
          return updatedGoal;
        }
        return goal;
      })
    );

    return updatedGoal;
  }, []);

  const archiveGoal = useCallback((id: string): CareerGoal | null => {
    let updatedGoal: CareerGoal | null = null;

    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === id) {
          updatedGoal = {
            ...goal,
            status: 'archived',
            updatedAt: new Date().toISOString(),
          };
          return updatedGoal;
        }
        return goal;
      })
    );

    return updatedGoal;
  }, []);

  // Milestone Operations
  const addMilestone = useCallback(
    (goalId: string, milestoneInput: CreateMilestoneInput): Milestone | null => {
      let newMilestone: Milestone | null = null;
      const now = new Date().toISOString();

      setGoals((prev) =>
        prev.map((goal) => {
          if (goal.id === goalId) {
            newMilestone = {
              id: generateMilestoneId(),
              title: milestoneInput.title,
              description: milestoneInput.description,
              status: 'pending',
              dueDate: milestoneInput.dueDate,
              order: goal.milestones.length + 1,
              createdAt: now,
              updatedAt: now,
            };

            const updatedMilestones = [...goal.milestones, newMilestone];

            return {
              ...goal,
              milestones: updatedMilestones,
              progress: calculateGoalProgress(updatedMilestones),
              updatedAt: now,
            };
          }
          return goal;
        })
      );

      return newMilestone;
    },
    []
  );

  const updateMilestone = useCallback(
    (
      goalId: string,
      milestoneId: string,
      updates: Partial<Milestone>
    ): Milestone | null => {
      let updatedMilestone: Milestone | null = null;
      const now = new Date().toISOString();

      setGoals((prev) =>
        prev.map((goal) => {
          if (goal.id === goalId) {
            const updatedMilestones = goal.milestones.map((milestone) => {
              if (milestone.id === milestoneId) {
                updatedMilestone = {
                  ...milestone,
                  ...updates,
                  updatedAt: now,
                };
                return updatedMilestone;
              }
              return milestone;
            });

            return {
              ...goal,
              milestones: updatedMilestones,
              progress: calculateGoalProgress(updatedMilestones),
              updatedAt: now,
            };
          }
          return goal;
        })
      );

      return updatedMilestone;
    },
    []
  );

  const completeMilestone = useCallback(
    (goalId: string, milestoneId: string): Milestone | null => {
      let completedMilestone: Milestone | null = null;
      const now = new Date().toISOString();

      setGoals((prev) => {
        const newGoals = prev.map((goal) => {
          if (goal.id === goalId) {
            const updatedMilestones = goal.milestones.map((milestone) => {
              if (milestone.id === milestoneId) {
                completedMilestone = {
                  ...milestone,
                  status: 'completed',
                  completedAt: now,
                  updatedAt: now,
                };
                return completedMilestone;
              }
              return milestone;
            });

            return {
              ...goal,
              milestones: updatedMilestones,
              progress: calculateGoalProgress(updatedMilestones),
              updatedAt: now,
            };
          }
          return goal;
        });

        // Check for achievements
        setTimeout(() => checkAchievements(newGoals), 0);

        return newGoals;
      });

      return completedMilestone;
    },
    [checkAchievements]
  );

  const deleteMilestone = useCallback(
    (goalId: string, milestoneId: string): boolean => {
      let deleted = false;
      const now = new Date().toISOString();

      setGoals((prev) =>
        prev.map((goal) => {
          if (goal.id === goalId) {
            const updatedMilestones = goal.milestones.filter(
              (m) => m.id !== milestoneId
            );
            deleted = updatedMilestones.length < goal.milestones.length;

            // Reorder remaining milestones
            const reorderedMilestones = updatedMilestones.map((m, index) => ({
              ...m,
              order: index + 1,
            }));

            return {
              ...goal,
              milestones: reorderedMilestones,
              progress: calculateGoalProgress(reorderedMilestones),
              updatedAt: now,
            };
          }
          return goal;
        })
      );

      return deleted;
    },
    []
  );

  // Filtering
  const filterGoalsFn = useCallback(
    (filters: GoalFilter): CareerGoal[] => {
      return filterGoalsByFilters(goals, filters);
    },
    [goals]
  );

  const sortGoalsFn = useCallback(
    (sortOption: GoalSortOption): CareerGoal[] => {
      return sortGoalsByOption(goals, sortOption);
    },
    [goals]
  );

  // Statistics
  const getStatisticsFn = useCallback((): GoalStatistics => {
    return calculateStatistics(goals);
  }, [goals]);

  const getOverdueGoalsFn = useCallback((): CareerGoal[] => {
    return getOverdueGoals(goals);
  }, [goals]);

  return {
    // State
    goals,
    achievements,

    // CRUD
    addGoal,
    updateGoal,
    deleteGoal,
    getGoalById,

    // Status
    completeGoal,
    pauseGoal,
    resumeGoal,
    archiveGoal,

    // Milestones
    addMilestone,
    updateMilestone,
    completeMilestone,
    deleteMilestone,

    // Filtering
    filterGoals: filterGoalsFn,
    sortGoals: sortGoalsFn,

    // Statistics
    getStatistics: getStatisticsFn,
    getOverdueGoals: getOverdueGoalsFn,
  };
}
