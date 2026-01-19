'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Award,
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  Search,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AssessmentCard } from '@/components/skill-assessment';
import { getAllAssessments, filterAssessments } from '@/data/skill-assessments';
import {
  SkillAssessment,
  SkillCategory,
  AssessmentDifficulty,
  SKILL_CATEGORY_LABELS,
  ASSESSMENT_DIFFICULTY_CONFIG,
} from '@/types/skill-assessment';

export default function SkillAssessmentsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const allAssessments = getAllAssessments();

  // Mock user progress data (in a real app, this would come from a database)
  const userProgress: Record<string, { attempts: number; bestScore: number; hasPassed: boolean }> = {
    'assessment-js-beginner': { attempts: 2, bestScore: 85, hasPassed: true },
    'assessment-react-intermediate': { attempts: 1, bestScore: 65, hasPassed: false },
  };

  const filteredAssessments = useMemo(() => {
    let result = filterAssessments({
      search: searchQuery,
      categories: categoryFilter !== 'all' ? [categoryFilter as SkillCategory] : undefined,
      difficulties: difficultyFilter !== 'all' ? [difficultyFilter as AssessmentDifficulty] : undefined,
    });
    return result;
  }, [searchQuery, categoryFilter, difficultyFilter]);

  const handleStartAssessment = (assessment: SkillAssessment) => {
    router.push(`/dashboard/skill-assessments/${assessment.id}`);
  };

  const handleViewDetails = (assessment: SkillAssessment) => {
    router.push(`/dashboard/skill-assessments/${assessment.id}?view=details`);
  };

  // Calculate stats
  const totalAssessments = allAssessments.length;
  const completedAssessments = Object.keys(userProgress).length;
  const passedAssessments = Object.values(userProgress).filter((p) => p.hasPassed).length;
  const badgesEarned = passedAssessments; // Each passed assessment earns a badge

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Award className="h-7 w-7" />
            Skill Assessments
          </h1>
          <p className="text-muted-foreground">
            Test your skills and earn badges to showcase your expertise
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-3xl font-bold">{totalAssessments}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold">{completedAssessments}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Passed</p>
                <p className="text-3xl font-bold">{passedAssessments}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                <CheckCircle2 className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
                <p className="text-3xl font-bold">{badgesEarned}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search assessments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(SKILL_CATEGORY_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {Object.entries(ASSESSMENT_DIFFICULTY_CONFIG).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Grid */}
      {filteredAssessments.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">No assessments found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find assessments.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              onStart={handleStartAssessment}
              onViewDetails={handleViewDetails}
              userProgress={userProgress[assessment.id]}
            />
          ))}
        </div>
      )}

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Assessment Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="mb-1 font-medium">Manage Your Time</h4>
              <p className="text-sm text-muted-foreground">
                Watch the timer and pace yourself. Don&apos;t spend too long on any single question.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="mb-1 font-medium">Read Carefully</h4>
              <p className="text-sm text-muted-foreground">
                Read each question and all answer options thoroughly before selecting your answer.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <h4 className="mb-1 font-medium">Review & Submit</h4>
              <p className="text-sm text-muted-foreground">
                If time permits, review your answers before submitting the assessment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
