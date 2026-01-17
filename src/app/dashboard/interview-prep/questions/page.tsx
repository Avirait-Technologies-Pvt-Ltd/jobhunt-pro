'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowLeft, Grid, List } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuestionCard, QuestionFilters } from '@/components/interview-prep';
import {
  interviewQuestions,
  filterQuestions,
  sortQuestions,
  getUniqueCompanies,
} from '@/data/interview-questions';
import {
  QuestionFilters as QuestionFiltersType,
  QuestionSortOption,
  InterviewQuestion,
} from '@/types/interview-prep';
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 12;

export default function QuestionsPage() {
  const [filters, setFilters] = useState<QuestionFiltersType>({});
  const [sortBy, setSortBy] = useState<QuestionSortOption>('most-asked');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [savedQuestions, setSavedQuestions] = useState<Set<string>>(new Set());

  const companies = useMemo(() => getUniqueCompanies(), []);

  const filteredQuestions = useMemo(() => {
    let result = filterQuestions(filters);
    result = sortQuestions(result, sortBy);
    return result;
  }, [filters, sortBy]);

  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredQuestions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredQuestions, currentPage]);

  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);

  const handleFiltersChange = (newFilters: QuestionFiltersType) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: QuestionSortOption) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({});
    setSortBy('most-asked');
    setCurrentPage(1);
  };

  const handleSaveQuestion = (question: InterviewQuestion) => {
    setSavedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(question.id)) {
        newSet.delete(question.id);
        toast.success('Question removed from saved');
      } else {
        newSet.add(question.id);
        toast.success('Question saved to your list');
      }
      return newSet;
    });
  };

  const handlePracticeQuestion = (question: InterviewQuestion) => {
    // Navigate to mock interview with this specific question
    toast.info(`Starting practice with: ${question.question.slice(0, 50)}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
              <Link href="/dashboard/interview-prep">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7" />
            Question Bank
          </h1>
          <p className="text-muted-foreground">
            Browse and practice from our collection of {interviewQuestions.length}+ interview questions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <QuestionFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            companies={companies}
            onReset={handleReset}
            totalResults={filteredQuestions.length}
          />
        </CardContent>
      </Card>

      {/* Questions List */}
      {paginatedQuestions.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">No questions found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to find more questions
            </p>
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'
              : 'space-y-4'
          }
        >
          {paginatedQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              variant={viewMode === 'list' ? 'compact' : 'default'}
              onPractice={handlePracticeQuestion}
              onSave={handleSaveQuestion}
              isSaved={savedQuestions.has(question.id)}
              showSampleAnswer={viewMode === 'grid'}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
