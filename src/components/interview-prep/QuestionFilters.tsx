'use client';

import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  QuestionCategory,
  DifficultyLevel,
  QuestionFilters as QuestionFiltersType,
  QuestionSortOption,
  CATEGORY_LABELS,
  DIFFICULTY_CONFIG,
} from '@/types/interview-prep';

interface QuestionFiltersProps {
  filters: QuestionFiltersType;
  onFiltersChange: (filters: QuestionFiltersType) => void;
  sortBy: QuestionSortOption;
  onSortChange: (sort: QuestionSortOption) => void;
  companies?: string[];
  onReset: () => void;
  totalResults?: number;
}

const ALL_CATEGORIES: QuestionCategory[] = [
  'behavioral',
  'technical',
  'situational',
  'system-design',
  'coding',
  'case-study',
];

const ALL_DIFFICULTIES: DifficultyLevel[] = ['easy', 'medium', 'hard'];

const SORT_OPTIONS: { value: QuestionSortOption; label: string }[] = [
  { value: 'most-asked', label: 'Most Asked' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'difficulty-asc', label: 'Difficulty: Easy First' },
  { value: 'difficulty-desc', label: 'Difficulty: Hard First' },
];

export function QuestionFilters({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  companies = [],
  onReset,
  totalResults,
}: QuestionFiltersProps) {
  const hasActiveFilters =
    filters.search ||
    (filters.categories && filters.categories.length > 0) ||
    (filters.difficulties && filters.difficulties.length > 0) ||
    filters.company;

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value || undefined });
  };

  const handleCategoryToggle = (category: QuestionCategory) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category];
    onFiltersChange({
      ...filters,
      categories: newCategories.length > 0 ? newCategories : undefined,
    });
  };

  const handleDifficultyToggle = (difficulty: DifficultyLevel) => {
    const currentDifficulties = filters.difficulties || [];
    const newDifficulties = currentDifficulties.includes(difficulty)
      ? currentDifficulties.filter((d) => d !== difficulty)
      : [...currentDifficulties, difficulty];
    onFiltersChange({
      ...filters,
      difficulties: newDifficulties.length > 0 ? newDifficulties : undefined,
    });
  };

  const handleCompanyChange = (value: string) => {
    onFiltersChange({
      ...filters,
      company: value === 'all' ? undefined : value,
    });
  };

  const activeFilterCount =
    (filters.categories?.length || 0) +
    (filters.difficulties?.length || 0) +
    (filters.company ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search questions, tags, or companies..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
          {filters.search && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
              onClick={() => handleSearchChange('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Select value={sortBy} onValueChange={(v) => onSortChange(v as QuestionSortOption)}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filter Sections */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {/* Categories */}
        <div className="flex-1">
          <Label className="text-sm font-medium mb-2 block">Categories</Label>
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((category) => {
              const isSelected = filters.categories?.includes(category);
              return (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={isSelected}
                    onCheckedChange={() => handleCategoryToggle(category)}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className={`cursor-pointer px-3 py-1 rounded-full text-sm border transition-colors ${
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-muted border-border'
                    }`}
                  >
                    {CATEGORY_LABELS[category]}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Difficulties */}
        <div className="lg:w-48">
          <Label className="text-sm font-medium mb-2 block">Difficulty</Label>
          <div className="flex flex-wrap gap-2">
            {ALL_DIFFICULTIES.map((difficulty) => {
              const isSelected = filters.difficulties?.includes(difficulty);
              const config = DIFFICULTY_CONFIG[difficulty];
              return (
                <div key={difficulty} className="flex items-center">
                  <Checkbox
                    id={`difficulty-${difficulty}`}
                    checked={isSelected}
                    onCheckedChange={() => handleDifficultyToggle(difficulty)}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`difficulty-${difficulty}`}
                    className={`cursor-pointer px-3 py-1 rounded-full text-sm border transition-colors ${
                      isSelected
                        ? config.color + ' border-current'
                        : 'bg-background hover:bg-muted border-border'
                    }`}
                  >
                    {config.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Company Filter */}
        {companies.length > 0 && (
          <div className="lg:w-48">
            <Label className="text-sm font-medium mb-2 block">Company</Label>
            <Select
              value={filters.company || 'all'}
              onValueChange={handleCompanyChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="All companies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Active Filters and Results */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {totalResults !== undefined && (
            <span className="text-sm text-muted-foreground">
              {totalResults} question{totalResults !== 1 ? 's' : ''} found
            </span>
          )}

          {activeFilterCount > 0 && (
            <>
              <span className="text-muted-foreground">•</span>
              <Badge variant="secondary">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
              </Badge>
            </>
          )}

          {/* Active filter badges */}
          {filters.categories?.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleCategoryToggle(category)}
            >
              {CATEGORY_LABELS[category]}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}

          {filters.difficulties?.map((difficulty) => (
            <Badge
              key={difficulty}
              variant="outline"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleDifficultyToggle(difficulty)}
            >
              {DIFFICULTY_CONFIG[difficulty].label}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}

          {filters.company && (
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleCompanyChange('all')}
            >
              {filters.company}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}
