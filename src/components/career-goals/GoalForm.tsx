'use client';

import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type {
  CareerGoal,
  CreateGoalInput,
  GoalCategory,
  GoalPriority,
} from '@/types/career-goals';
import {
  ALL_GOAL_CATEGORIES,
  ALL_GOAL_PRIORITIES,
  GOAL_CATEGORY_LABELS,
  GOAL_PRIORITY_LABELS,
} from '@/types/career-goals';
import {
  validateGoalTitle,
  validateGoalDescription,
  validateTargetDate,
} from '@/lib/career-goals-utils';
import { format } from 'date-fns';

interface GoalFormProps {
  goal?: CareerGoal;
  onSubmit: (input: CreateGoalInput) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface MilestoneFormItem {
  id: string;
  title: string;
  description: string;
  dueDate?: Date;
}

export function GoalForm({
  goal,
  onSubmit,
  onCancel,
  isLoading = false,
  open,
  onOpenChange,
}: GoalFormProps) {
  const isEditMode = !!goal;

  const [title, setTitle] = useState(goal?.title || '');
  const [description, setDescription] = useState(goal?.description || '');
  const [category, setCategory] = useState<GoalCategory>(goal?.category || 'skill-development');
  const [priority, setPriority] = useState<GoalPriority>(goal?.priority || 'medium');
  const [targetDate, setTargetDate] = useState<Date | undefined>(
    goal?.targetDate ? new Date(goal.targetDate) : undefined
  );
  const [tags, setTags] = useState<string[]>(goal?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [milestones, setMilestones] = useState<MilestoneFormItem[]>(
    goal?.milestones.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description || '',
      dueDate: m.dueDate ? new Date(m.dueDate) : undefined,
    })) || []
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const titleValidation = validateGoalTitle(title);
    if (!titleValidation.valid) {
      newErrors.title = titleValidation.error || 'Invalid title';
    }

    const descValidation = validateGoalDescription(description);
    if (!descValidation.valid) {
      newErrors.description = descValidation.error || 'Invalid description';
    }

    if (!targetDate) {
      newErrors.targetDate = 'Target date is required';
    } else {
      const dateValidation = validateTargetDate(targetDate.toISOString());
      if (!dateValidation.valid) {
        newErrors.targetDate = dateValidation.error || 'Invalid date';
      }
    }

    // Validate milestones
    milestones.forEach((milestone, index) => {
      if (!milestone.title.trim()) {
        newErrors[`milestone-${index}`] = 'Milestone title is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const input: CreateGoalInput = {
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      targetDate: targetDate!.toISOString(),
      tags,
      milestones: milestones
        .filter((m) => m.title.trim())
        .map((m) => ({
          title: m.title.trim(),
          description: m.description.trim() || undefined,
          dueDate: m.dueDate?.toISOString(),
        })),
    };

    onSubmit(input);
  };

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        id: `temp-${Date.now()}`,
        title: '',
        description: '',
      },
    ]);
  };

  const updateMilestone = (index: number, updates: Partial<MilestoneFormItem>) => {
    setMilestones(
      milestones.map((m, i) => (i === index ? { ...m, ...updates } : m))
    );
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter goal title"
          className={cn(errors.title && 'border-red-500')}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your goal"
          rows={3}
          className={cn(errors.description && 'border-red-500')}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
        <p className="text-xs text-muted-foreground">
          {description.length}/500 characters
        </p>
      </div>

      {/* Category and Priority */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as GoalCategory)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ALL_GOAL_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {GOAL_CATEGORY_LABELS[cat]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority *</Label>
          <Select value={priority} onValueChange={(v) => setPriority(v as GoalPriority)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ALL_GOAL_PRIORITIES.map((p) => (
                <SelectItem key={p} value={p}>
                  {GOAL_PRIORITY_LABELS[p]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Target Date */}
      <div className="space-y-2">
        <Label>Target Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !targetDate && 'text-muted-foreground',
                errors.targetDate && 'border-red-500'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {targetDate ? format(targetDate, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={targetDate}
              onSelect={setTargetDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.targetDate && (
          <p className="text-sm text-red-500">{errors.targetDate}</p>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Add a tag"
            className="flex-1"
          />
          <Button type="button" variant="outline" onClick={addTag}>
            Add
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                {tag}
                <span className="ml-1">&times;</span>
              </Badge>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground">{tags.length}/10 tags</p>
      </div>

      {/* Milestones */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Milestones</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addMilestone}
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Milestone
          </Button>
        </div>

        {milestones.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center border rounded-md">
            No milestones yet. Add milestones to track your progress.
          </p>
        ) : (
          <div className="space-y-3">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className="flex items-start gap-2 p-3 border rounded-md"
              >
                <GripVertical className="h-5 w-5 text-muted-foreground mt-2 cursor-move" />
                <div className="flex-1 space-y-2">
                  <Input
                    value={milestone.title}
                    onChange={(e) =>
                      updateMilestone(index, { title: e.target.value })
                    }
                    placeholder={`Milestone ${index + 1}`}
                    className={cn(
                      errors[`milestone-${index}`] && 'border-red-500'
                    )}
                  />
                  {errors[`milestone-${index}`] && (
                    <p className="text-sm text-red-500">
                      {errors[`milestone-${index}`]}
                    </p>
                  )}
                  <Input
                    value={milestone.description}
                    onChange={(e) =>
                      updateMilestone(index, { description: e.target.value })
                    }
                    placeholder="Description (optional)"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !milestone.dueDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {milestone.dueDate
                          ? format(milestone.dueDate, 'PPP')
                          : 'Due date (optional)'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={milestone.dueDate}
                        onSelect={(date) =>
                          updateMilestone(index, { dueDate: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMilestone(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Goal'}
        </Button>
      </div>
    </form>
  );

  // If open/onOpenChange props are provided, render in a dialog
  if (open !== undefined && onOpenChange) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Goal' : 'Create New Goal'}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? 'Update your career goal details below.'
                : 'Set a new career goal to track your progress.'}
            </DialogDescription>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return formContent;
}
