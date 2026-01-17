'use client';

import React, { useState } from 'react';
import { Play, Clock, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  QuestionCategory,
  DifficultyLevel,
  MockInterviewSettings,
  CATEGORY_LABELS,
  DIFFICULTY_CONFIG,
  DEFAULT_MOCK_INTERVIEW_SETTINGS,
} from '@/types/interview-prep';
import { getEstimatedTime, validateSessionSettings } from '@/lib/interview-utils';

interface SessionSetupProps {
  onStart: (settings: MockInterviewSettings) => void;
  availableQuestionCount?: number;
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

export function SessionSetup({ onStart, availableQuestionCount }: SessionSetupProps) {
  const [settings, setSettings] = useState<MockInterviewSettings>(DEFAULT_MOCK_INTERVIEW_SETTINGS);
  const [errors, setErrors] = useState<string[]>([]);

  const handleCategoryToggle = (category: QuestionCategory) => {
    setSettings((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
    setErrors([]);
  };

  const handleDifficultyToggle = (difficulty: DifficultyLevel) => {
    setSettings((prev) => ({
      ...prev,
      difficulties: prev.difficulties.includes(difficulty)
        ? prev.difficulties.filter((d) => d !== difficulty)
        : [...prev.difficulties, difficulty],
    }));
    setErrors([]);
  };

  const handleQuestionCountChange = (value: number[]) => {
    setSettings((prev) => ({ ...prev, questionCount: value[0] }));
    setErrors([]);
  };

  const handleTimeChange = (value: number[]) => {
    setSettings((prev) => ({ ...prev, timePerQuestion: value[0] }));
    setErrors([]);
  };

  const handleStart = () => {
    const validation = validateSessionSettings(settings);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    onStart(settings);
  };

  const estimatedTime = getEstimatedTime(settings.questionCount, settings.timePerQuestion);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Start Mock Interview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Question Categories
            <span className="text-muted-foreground font-normal ml-2">
              (Select at least one)
            </span>
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ALL_CATEGORIES.map((category) => {
              const isSelected = settings.categories.includes(category);
              return (
                <div
                  key={category}
                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted border-border'
                  }`}
                  onClick={() => handleCategoryToggle(category)}
                >
                  <Checkbox
                    id={`setup-category-${category}`}
                    checked={isSelected}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label
                    htmlFor={`setup-category-${category}`}
                    className="cursor-pointer flex-1"
                  >
                    {CATEGORY_LABELS[category]}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Difficulty Levels
            <span className="text-muted-foreground font-normal ml-2">
              (Select at least one)
            </span>
          </Label>
          <div className="flex flex-wrap gap-3">
            {ALL_DIFFICULTIES.map((difficulty) => {
              const isSelected = settings.difficulties.includes(difficulty);
              const config = DIFFICULTY_CONFIG[difficulty];
              return (
                <div
                  key={difficulty}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                    isSelected
                      ? config.color + ' border-current'
                      : 'hover:bg-muted border-border'
                  }`}
                  onClick={() => handleDifficultyToggle(difficulty)}
                >
                  <Checkbox
                    id={`setup-difficulty-${difficulty}`}
                    checked={isSelected}
                    onCheckedChange={() => handleDifficultyToggle(difficulty)}
                  />
                  <Label
                    htmlFor={`setup-difficulty-${difficulty}`}
                    className="cursor-pointer"
                  >
                    {config.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question Count */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium">Number of Questions</Label>
            <span className="text-sm font-medium bg-muted px-2 py-1 rounded">
              {settings.questionCount} questions
            </span>
          </div>
          <Slider
            value={[settings.questionCount]}
            onValueChange={handleQuestionCountChange}
            min={1}
            max={15}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1</span>
            <span>15</span>
          </div>
        </div>

        {/* Time per Question */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time per Question
            </Label>
            <span className="text-sm font-medium bg-muted px-2 py-1 rounded">
              {Math.floor(settings.timePerQuestion / 60)}:{(settings.timePerQuestion % 60)
                .toString()
                .padStart(2, '0')}{' '}
              min
            </span>
          </div>
          <Slider
            value={[settings.timePerQuestion]}
            onValueChange={handleTimeChange}
            min={60}
            max={600}
            step={30}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1 min</span>
            <span>10 min</span>
          </div>
        </div>

        {/* Include Follow-ups */}
        <div className="flex items-center space-x-2 p-3 rounded-lg border">
          <Checkbox
            id="include-followups"
            checked={settings.includeFollowUps}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, includeFollowUps: checked as boolean }))
            }
          />
          <Label htmlFor="include-followups" className="cursor-pointer flex-1">
            <span className="font-medium">Include Follow-up Questions</span>
            <span className="text-muted-foreground text-sm block">
              Show potential follow-up questions after each answer
            </span>
          </Label>
        </div>

        {/* Summary */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Session Summary</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Questions:</span>{' '}
              <span className="font-medium">{settings.questionCount}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Estimated Time:</span>{' '}
              <span className="font-medium">{estimatedTime}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Categories:</span>{' '}
              <span className="font-medium">{settings.categories.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Difficulties:</span>{' '}
              <span className="font-medium">{settings.difficulties.length}</span>
            </div>
          </div>
          {availableQuestionCount !== undefined && (
            <div className="text-xs text-muted-foreground pt-2 border-t">
              {availableQuestionCount} questions available matching your criteria
            </div>
          )}
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-destructive/10 text-destructive rounded-lg p-3">
            <ul className="text-sm space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Start Button */}
        <Button onClick={handleStart} className="w-full" size="lg">
          <Play className="mr-2 h-5 w-5" />
          Start Interview
        </Button>
      </CardContent>
    </Card>
  );
}
