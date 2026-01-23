'use client';

import React, { useState, useMemo } from 'react';
import { Plus, LayoutGrid, List, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  GoalCard,
  GoalForm,
  GoalFilters,
  GoalAnalytics,
} from '@/components/career-goals';
import { useCareerGoals } from '@/hooks/useCareerGoals';
import type { GoalFilter, GoalSortOption, CreateGoalInput, CareerGoal } from '@/types/career-goals';
import { filterGoalsByFilters, sortGoalsByOption } from '@/lib/career-goals-utils';

export default function CareerGoalsPage() {
  const {
    goals,
    achievements,
    addGoal,
    updateGoal,
    deleteGoal,
    completeGoal,
    pauseGoal,
    resumeGoal,
    archiveGoal,
    completeMilestone,
    getStatistics,
  } = useCareerGoals();

  const [filters, setFilters] = useState<GoalFilter>({});
  const [sortOption, setSortOption] = useState<GoalSortOption>('priority');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<CareerGoal | undefined>();

  // Filter and sort goals
  const filteredGoals = useMemo(() => {
    let result = filterGoalsByFilters(goals, filters);
    result = sortGoalsByOption(result, sortOption);
    return result;
  }, [goals, filters, sortOption]);

  const statistics = useMemo(() => getStatistics(), [getStatistics]);

  const handleCreateGoal = (input: CreateGoalInput) => {
    addGoal(input);
    setIsFormOpen(false);
  };

  const handleEditGoal = (goal: CareerGoal) => {
    setEditingGoal(goal);
    setIsFormOpen(true);
  };

  const handleUpdateGoal = (input: CreateGoalInput) => {
    if (editingGoal) {
      updateGoal(editingGoal.id, {
        title: input.title,
        description: input.description,
        category: input.category,
        priority: input.priority,
        targetDate: input.targetDate,
        tags: input.tags,
      });
    }
    setIsFormOpen(false);
    setEditingGoal(undefined);
  };

  const handleDeleteGoal = (goal: CareerGoal) => {
    if (window.confirm(`Are you sure you want to delete "${goal.title}"?`)) {
      deleteGoal(goal.id);
    }
  };

  const handleStatusChange = (
    goalId: string,
    action: 'complete' | 'pause' | 'resume' | 'archive'
  ) => {
    switch (action) {
      case 'complete':
        completeGoal(goalId);
        break;
      case 'pause':
        pauseGoal(goalId);
        break;
      case 'resume':
        resumeGoal(goalId);
        break;
      case 'archive':
        archiveGoal(goalId);
        break;
    }
  };

  const handleMilestoneComplete = (goalId: string, milestoneId: string) => {
    completeMilestone(goalId, milestoneId);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingGoal(undefined);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Goals</h1>
          <p className="text-muted-foreground">
            Track and achieve your career objectives
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="goals" className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* View Toggle (only show on goals tab) */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          {/* Filters */}
          <GoalFilters
            filters={filters}
            sortOption={sortOption}
            onFiltersChange={setFilters}
            onSortChange={setSortOption}
          />

          {/* Goals List/Grid */}
          {filteredGoals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {goals.length === 0
                  ? 'No goals yet. Create your first career goal!'
                  : 'No goals match your filters.'}
              </p>
              {goals.length === 0 && (
                <Button className="mt-4" onClick={() => setIsFormOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Goal
                </Button>
              )}
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
                  : 'space-y-4'
              }
            >
              {filteredGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  variant={viewMode === 'list' ? 'compact' : 'default'}
                  onEdit={handleEditGoal}
                  onDelete={handleDeleteGoal}
                  onStatusChange={handleStatusChange}
                  onMilestoneComplete={handleMilestoneComplete}
                  onViewDetails={handleEditGoal}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <GoalAnalytics
            statistics={statistics}
            achievements={achievements}
            goals={goals}
          />
        </TabsContent>
      </Tabs>

      {/* Goal Form Dialog */}
      <GoalForm
        goal={editingGoal}
        onSubmit={editingGoal ? handleUpdateGoal : handleCreateGoal}
        onCancel={handleFormClose}
        open={isFormOpen}
        onOpenChange={(open) => {
          if (!open) handleFormClose();
        }}
      />
    </div>
  );
}
