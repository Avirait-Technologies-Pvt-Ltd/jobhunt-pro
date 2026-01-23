'use client';

import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { GoalFilter, GoalSortOption, GoalStatus, GoalPriority, GoalCategory } from '@/types/career-goals';
import {
  ALL_GOAL_STATUSES,
  ALL_GOAL_PRIORITIES,
  ALL_GOAL_CATEGORIES,
  ALL_GOAL_SORT_OPTIONS,
  GOAL_STATUS_LABELS,
  GOAL_PRIORITY_LABELS,
  GOAL_CATEGORY_LABELS,
  GOAL_SORT_LABELS,
} from '@/types/career-goals';

interface GoalFiltersProps {
  filters: GoalFilter;
  sortOption: GoalSortOption;
  onFiltersChange: (filters: GoalFilter) => void;
  onSortChange: (sortOption: GoalSortOption) => void;
  onClear?: () => void;
}

export function GoalFilters({
  filters,
  sortOption,
  onFiltersChange,
  onSortChange,
  onClear,
}: GoalFiltersProps) {
  const activeFilterCount = getActiveFilterCount(filters);

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchQuery: value });
  };

  const handleStatusToggle = (status: GoalStatus) => {
    const currentStatuses = filters.statuses || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];
    onFiltersChange({ ...filters, statuses: newStatuses.length > 0 ? newStatuses : undefined });
  };

  const handlePriorityToggle = (priority: GoalPriority) => {
    const currentPriorities = filters.priorities || [];
    const newPriorities = currentPriorities.includes(priority)
      ? currentPriorities.filter((p) => p !== priority)
      : [...currentPriorities, priority];
    onFiltersChange({
      ...filters,
      priorities: newPriorities.length > 0 ? newPriorities : undefined,
    });
  };

  const handleCategoryToggle = (category: GoalCategory) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category];
    onFiltersChange({
      ...filters,
      categories: newCategories.length > 0 ? newCategories : undefined,
    });
  };

  const handleOverdueToggle = () => {
    onFiltersChange({
      ...filters,
      hasOverdue: filters.hasOverdue ? undefined : true,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({});
    onClear?.();
  };

  return (
    <div className="space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search goals..."
            value={filters.searchQuery || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
          {filters.searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
              onClick={() => handleSearchChange('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Sort Select */}
        <Select value={sortOption} onValueChange={(value) => onSortChange(value as GoalSortOption)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {ALL_GOAL_SORT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {GOAL_SORT_LABELS[option]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-medium">Filter Goals</h4>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <div className="flex flex-wrap gap-2">
                  {ALL_GOAL_STATUSES.map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={filters.statuses?.includes(status) || false}
                        onCheckedChange={() => handleStatusToggle(status)}
                      />
                      <span className="text-sm">{GOAL_STATUS_LABELS[status]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Priority</Label>
                <div className="flex flex-wrap gap-2">
                  {ALL_GOAL_PRIORITIES.map((priority) => (
                    <label
                      key={priority}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={filters.priorities?.includes(priority) || false}
                        onCheckedChange={() => handlePriorityToggle(priority)}
                      />
                      <span className="text-sm">{GOAL_PRIORITY_LABELS[priority]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Category</Label>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_GOAL_CATEGORIES.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={filters.categories?.includes(category) || false}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <span className="text-sm truncate">
                        {GOAL_CATEGORY_LABELS[category]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Overdue Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.hasOverdue || false}
                    onCheckedChange={handleOverdueToggle}
                  />
                  <span className="text-sm font-medium">Show only overdue</span>
                </label>
              </div>

              {/* Clear Button */}
              {activeFilterCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                  className="w-full"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear all filters
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>

          {filters.statuses?.map((status) => (
            <Badge
              key={status}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleStatusToggle(status)}
            >
              {GOAL_STATUS_LABELS[status]}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}

          {filters.priorities?.map((priority) => (
            <Badge
              key={priority}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handlePriorityToggle(priority)}
            >
              {GOAL_PRIORITY_LABELS[priority]}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}

          {filters.categories?.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleCategoryToggle(category)}
            >
              {GOAL_CATEGORY_LABELS[category]}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}

          {filters.hasOverdue && (
            <Badge
              variant="secondary"
              className="cursor-pointer"
              onClick={handleOverdueToggle}
            >
              Overdue only
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-6 px-2 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}

function getActiveFilterCount(filters: GoalFilter): number {
  let count = 0;
  if (filters.statuses && filters.statuses.length > 0) count += filters.statuses.length;
  if (filters.priorities && filters.priorities.length > 0) count += filters.priorities.length;
  if (filters.categories && filters.categories.length > 0) count += filters.categories.length;
  if (filters.hasOverdue) count += 1;
  return count;
}
