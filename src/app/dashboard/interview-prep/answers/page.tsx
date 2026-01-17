'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  Search,
  Star,
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInterviewAnalytics } from '@/hooks/useInterviewAnalytics';
import { SavedAnswer, QuestionCategory, CATEGORY_LABELS } from '@/types/interview-prep';
import {
  getCategoryLabel,
  getCategoryColor,
  formatRelativeDate,
  countWords,
} from '@/lib/interview-utils';
import { toast } from 'sonner';

type FilterOption = 'all' | 'favorites' | QuestionCategory;

export default function AnswersPage() {
  const { savedAnswers, toggleFavorite, updateAnswer, deleteAnswer } = useInterviewAnalytics();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterOption>('all');
  const [editingAnswer, setEditingAnswer] = useState<SavedAnswer | null>(null);
  const [editContent, setEditContent] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredAnswers = useMemo(() => {
    let result = [...savedAnswers];

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.question.toLowerCase().includes(searchLower) ||
          a.answer.toLowerCase().includes(searchLower)
      );
    }

    // Apply filter
    if (filter === 'favorites') {
      result = result.filter((a) => a.isFavorite);
    } else if (filter !== 'all') {
      result = result.filter((a) => a.category === filter);
    }

    // Sort by updated date (newest first)
    result.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    return result;
  }, [savedAnswers, search, filter]);

  const handleToggleFavorite = (answerId: string) => {
    const isFavorite = toggleFavorite(answerId);
    toast.success(isFavorite ? 'Added to favorites' : 'Removed from favorites');
  };

  const handleEditClick = (answer: SavedAnswer) => {
    setEditingAnswer(answer);
    setEditContent(answer.answer);
  };

  const handleSaveEdit = () => {
    if (editingAnswer && editContent.trim()) {
      updateAnswer(editingAnswer.id, editContent.trim());
      toast.success('Answer updated');
      setEditingAnswer(null);
      setEditContent('');
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deleteAnswer(deleteConfirm);
      toast.success('Answer deleted');
      setDeleteConfirm(null);
    }
  };

  const categories: QuestionCategory[] = [
    'behavioral',
    'technical',
    'situational',
    'system-design',
    'coding',
    'case-study',
  ];

  const favoriteCount = savedAnswers.filter((a) => a.isFavorite).length;

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
            <FileText className="h-7 w-7" />
            Answer Bank
          </h1>
          <p className="text-muted-foreground">
            Your saved answers and templates for interview questions
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/interview-prep/questions">
            <Plus className="mr-2 h-4 w-4" />
            Browse Questions
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Answers</p>
                <p className="text-2xl font-bold">{savedAnswers.length}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Favorites</p>
                <p className="text-2xl font-bold">{favoriteCount}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">
                  {new Set(savedAnswers.map((a) => a.category)).size}
                </p>
              </div>
              <Badge className="opacity-50">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search questions or answers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
                  onClick={() => setSearch('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Select
              value={filter}
              onValueChange={(v) => setFilter(v as FilterOption)}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Answers</SelectItem>
                <SelectItem value="favorites">
                  <span className="flex items-center gap-2">
                    <Star className="h-3 w-3" />
                    Favorites
                  </span>
                </SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {CATEGORY_LABELS[cat]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Answers List */}
      {filteredAnswers.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">
              {savedAnswers.length === 0
                ? 'No saved answers yet'
                : 'No answers match your search'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {savedAnswers.length === 0
                ? 'Practice questions and save your best answers here'
                : 'Try adjusting your search or filter'}
            </p>
            <Button asChild>
              <Link href="/dashboard/interview-prep/questions">
                Browse Questions
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAnswers.map((answer) => (
            <Card key={answer.id}>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={getCategoryColor(answer.category)}
                    >
                      {getCategoryLabel(answer.category)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Updated {formatRelativeDate(answer.updatedAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 ${
                        answer.isFavorite ? 'text-yellow-500' : ''
                      }`}
                      onClick={() => handleToggleFavorite(answer.id)}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          answer.isFavorite ? 'fill-current' : ''
                        }`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditClick(answer)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => setDeleteConfirm(answer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Question */}
                <h3 className="font-medium mb-3">{answer.question}</h3>

                {/* Answer */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm whitespace-pre-wrap">{answer.answer}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <span>{countWords(answer.answer)} words</span>
                  <span>Created {formatRelativeDate(answer.createdAt)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingAnswer} onOpenChange={() => setEditingAnswer(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Answer</DialogTitle>
            <DialogDescription>
              {editingAnswer?.question}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[200px]"
              placeholder="Your answer..."
            />
            <p className="text-sm text-muted-foreground mt-2">
              {countWords(editContent)} words
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingAnswer(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={!editContent.trim()}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Answer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this saved answer? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
