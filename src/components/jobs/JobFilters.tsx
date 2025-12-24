'use client';

import React from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface Filters {
  types: string[];
  experienceLevels: string[];
  categories: string[];
  remote: boolean;
  salaryRange: [number, number];
}

interface JobFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  totalJobs: number;
  filteredCount: number;
}

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive', 'Internship'];
const categories = [
  'Technology',
  'Design',
  'Marketing',
  'Sales',
  'Finance',
  'Healthcare',
  'Engineering',
  'Human Resources',
  'Customer Service',
  'Data Science',
  'Product Management',
  'Content Writing',
  'Legal',
  'Operations',
];

export default function JobFilters({
  filters,
  onFiltersChange,
  totalJobs,
  filteredCount,
}: JobFiltersProps) {
  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...filters.types, type]
      : filters.types.filter((t) => t !== type);
    onFiltersChange({ ...filters, types: newTypes });
  };

  const handleExperienceChange = (level: string, checked: boolean) => {
    const newLevels = checked
      ? [...filters.experienceLevels, level]
      : filters.experienceLevels.filter((l) => l !== level);
    onFiltersChange({ ...filters, experienceLevels: newLevels });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleRemoteChange = (checked: boolean) => {
    onFiltersChange({ ...filters, remote: checked });
  };

  const handleSalaryChange = (value: number[]) => {
    onFiltersChange({ ...filters, salaryRange: [value[0], value[1]] as [number, number] });
  };

  const resetFilters = () => {
    onFiltersChange({
      types: [],
      experienceLevels: [],
      categories: [],
      remote: false,
      salaryRange: [0, 250000],
    });
  };

  const activeFiltersCount =
    filters.types.length +
    filters.experienceLevels.length +
    filters.categories.length +
    (filters.remote ? 1 : 0) +
    (filters.salaryRange[0] > 0 || filters.salaryRange[1] < 250000 ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Active Filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-auto p-0 text-xs text-muted-foreground"
            >
              <RotateCcw className="mr-1 h-3 w-3" />
              Reset All
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.types.map((type) => (
              <Badge
                key={type}
                variant="secondary"
                className="cursor-pointer gap-1"
                onClick={() => handleTypeChange(type, false)}
              >
                {type}
                <X className="h-3 w-3" />
              </Badge>
            ))}
            {filters.experienceLevels.map((level) => (
              <Badge
                key={level}
                variant="secondary"
                className="cursor-pointer gap-1"
                onClick={() => handleExperienceChange(level, false)}
              >
                {level}
                <X className="h-3 w-3" />
              </Badge>
            ))}
            {filters.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="cursor-pointer gap-1"
                onClick={() => handleCategoryChange(category, false)}
              >
                {category}
                <X className="h-3 w-3" />
              </Badge>
            ))}
            {filters.remote && (
              <Badge
                variant="secondary"
                className="cursor-pointer gap-1"
                onClick={() => handleRemoteChange(false)}
              >
                Remote
                <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>
      )}

      <Separator />

      <Accordion type="multiple" defaultValue={['type', 'experience', 'salary']} className="w-full">
        {/* Job Type */}
        <AccordionItem value="type">
          <AccordionTrigger className="text-sm font-medium">
            Job Type
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.types.includes(type)}
                    onCheckedChange={(checked) =>
                      handleTypeChange(type, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`type-${type}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Experience Level */}
        <AccordionItem value="experience">
          <AccordionTrigger className="text-sm font-medium">
            Experience Level
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {experienceLevels.map((level) => (
                <div key={level} className="flex items-center gap-2">
                  <Checkbox
                    id={`exp-${level}`}
                    checked={filters.experienceLevels.includes(level)}
                    onCheckedChange={(checked) =>
                      handleExperienceChange(level, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`exp-${level}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Salary Range */}
        <AccordionItem value="salary">
          <AccordionTrigger className="text-sm font-medium">
            Salary Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                value={filters.salaryRange}
                onValueChange={handleSalaryChange}
                min={0}
                max={250000}
                step={10000}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${(filters.salaryRange[0] / 1000).toFixed(0)}K</span>
                <span>${(filters.salaryRange[1] / 1000).toFixed(0)}K+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Remote */}
        <AccordionItem value="remote">
          <AccordionTrigger className="text-sm font-medium">
            Work Arrangement
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center gap-2">
              <Checkbox
                id="remote"
                checked={filters.remote}
                onCheckedChange={(checked) =>
                  handleRemoteChange(checked as boolean)
                }
              />
              <Label htmlFor="remote" className="text-sm font-normal cursor-pointer">
                Remote Only
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Categories */}
        <AccordionItem value="category">
          <AccordionTrigger className="text-sm font-medium">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <Checkbox
                    id={`cat-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`cat-${category}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Jobs</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block rounded-lg border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          <span className="text-sm text-muted-foreground">
            {filteredCount} of {totalJobs} jobs
          </span>
        </div>
        <FilterContent />
      </div>
    </>
  );
}
