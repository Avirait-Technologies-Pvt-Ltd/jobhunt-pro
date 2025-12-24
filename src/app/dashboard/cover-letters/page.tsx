'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Copy,
  Trash2,
  Download,
  Calendar,
  Building2,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import { CoverLetter } from '@/types';

const savedCoverLetters: CoverLetter[] = [
  {
    id: 'cl-1',
    title: 'Senior Frontend Developer - TechCorp',
    jobId: 'job-1',
    jobTitle: 'Senior Frontend Developer',
    companyName: 'TechCorp Inc.',
    content: 'Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Frontend Developer position at TechCorp Inc. With over 5 years of experience in React and modern JavaScript frameworks...',
    template: 'professional',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'cl-2',
    title: 'Full Stack Developer Application',
    jobId: 'job-2',
    jobTitle: 'Full Stack Developer',
    companyName: 'InnovateTech',
    content: 'Dear Hiring Team,\n\nI am excited to apply for the Full Stack Developer role at InnovateTech. My background in both frontend and backend development...',
    template: 'modern',
    createdAt: '2024-01-14T09:00:00Z',
    updatedAt: '2024-01-14T15:00:00Z',
  },
  {
    id: 'cl-3',
    title: 'DevOps Engineer - CloudScale',
    jobId: 'job-3',
    jobTitle: 'DevOps Engineer',
    companyName: 'CloudScale',
    content: 'Dear CloudScale Team,\n\nI am reaching out regarding the DevOps Engineer position. With extensive experience in AWS, Kubernetes, and CI/CD pipelines...',
    template: 'professional',
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-13T11:00:00Z',
  },
  {
    id: 'cl-4',
    title: 'General Application Template',
    content: 'Dear Hiring Manager,\n\nI am writing to express my interest in [Position] at [Company]. With my background in software development and passion for building great products...',
    template: 'simple',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
];

export default function CoverLettersPage() {
  const [letters, setLetters] = useState(savedCoverLetters);
  const [search, setSearch] = useState('');
  const [previewLetter, setPreviewLetter] = useState<CoverLetter | null>(null);

  const filteredLetters = letters.filter(
    (letter) =>
      letter.title.toLowerCase().includes(search.toLowerCase()) ||
      letter.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setLetters((prev) => prev.filter((l) => l.id !== id));
    toast.success('Cover letter deleted');
  };

  const handleDuplicate = (letter: CoverLetter) => {
    const newLetter: CoverLetter = {
      ...letter,
      id: `cl-${Date.now()}`,
      title: `${letter.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLetters((prev) => [newLetter, ...prev]);
    toast.success('Cover letter duplicated');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cover Letters</h1>
          <p className="text-muted-foreground">
            Create and manage your cover letters
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/cover-letters/builder">
            <Plus className="mr-2 h-4 w-4" />
            New Cover Letter
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{letters.length}</p>
                <p className="text-sm text-muted-foreground">Total Letters</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <Building2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {letters.filter((l) => l.companyName).length}
                </p>
                <p className="text-sm text-muted-foreground">Job-Specific</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {letters.filter((l) => {
                    const updated = new Date(l.updatedAt);
                    const week = new Date();
                    week.setDate(week.getDate() - 7);
                    return updated > week;
                  }).length}
                </p>
                <p className="text-sm text-muted-foreground">Updated This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cover letters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Letters List */}
      {filteredLetters.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No cover letters found</h3>
            <p className="mb-4 text-center text-muted-foreground">
              {letters.length === 0
                ? "You haven't created any cover letters yet."
                : 'No letters match your search.'}
            </p>
            <Button asChild>
              <Link href="/dashboard/cover-letters/builder">
                <Plus className="mr-2 h-4 w-4" />
                Create Cover Letter
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredLetters.map((letter) => (
            <Card key={letter.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{letter.title}</h3>
                    {letter.companyName && (
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        {letter.companyName}
                      </div>
                    )}
                  </div>
                  <Badge variant="secondary">{letter.template}</Badge>
                </div>

                <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                  {letter.content}
                </p>

                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Updated {formatDate(letter.updatedAt)}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewLetter(letter)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Preview
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/cover-letters/builder?id=${letter.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(letter)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(letter.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!previewLetter} onOpenChange={() => setPreviewLetter(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{previewLetter?.title}</DialogTitle>
            <DialogDescription>
              {previewLetter?.companyName
                ? `For ${previewLetter.jobTitle} at ${previewLetter.companyName}`
                : 'General template'}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto rounded-lg border bg-white p-6">
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {previewLetter?.content}
            </pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewLetter(null)}>
              Close
            </Button>
            <Button asChild>
              <Link href={`/dashboard/cover-letters/builder?id=${previewLetter?.id}`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cover Letter Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h4 className="mb-1 font-medium">Customize Each Letter</h4>
              <p className="text-sm text-muted-foreground">
                Tailor your cover letter for each job application to show genuine interest.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-1 font-medium">Keep It Concise</h4>
              <p className="text-sm text-muted-foreground">
                Aim for 3-4 paragraphs. Hiring managers appreciate brevity.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-1 font-medium">Show Results</h4>
              <p className="text-sm text-muted-foreground">
                Include specific achievements and metrics to stand out.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
