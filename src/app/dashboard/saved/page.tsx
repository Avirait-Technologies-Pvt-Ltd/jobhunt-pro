'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  BookmarkX,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Search,
  Briefcase,
  ArrowRight,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/context/AuthContext';
import { getJobById } from '@/data/jobs';
import { formatDistanceToNow, formatSalary } from '@/lib/utils';
import { toast } from 'sonner';

export default function SavedJobsPage() {
  const { user, unsaveJob, applyToJob } = useAuth();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const savedJobIds = user?.savedJobs || [];

  const savedJobs = useMemo(() => {
    let result = savedJobIds
      .map((savedJob) => {
        const job = getJobById(savedJob.jobId);
        const company = job?.company ?? null;
        return { ...savedJob, job, company };
      })
      .filter((item) => item.job !== undefined);

    // Search filter
    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.job?.title.toLowerCase().includes(lowerSearch) ||
          item.company?.name.toLowerCase().includes(lowerSearch) ||
          item.job?.location.toLowerCase().includes(lowerSearch)
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      result = result.filter((item) => item.job?.type === typeFilter);
    }

    // Sorting
    switch (sortBy) {
      case 'oldest':
        result.sort(
          (a, b) =>
            new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime()
        );
        break;
      case 'salary':
        result.sort((a, b) => (b.job?.salary.max || 0) - (a.job?.salary.max || 0));
        break;
      case 'company':
        result.sort((a, b) =>
          (a.company?.name || '').localeCompare(b.company?.name || '')
        );
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
        );
    }

    return result;
  }, [savedJobIds, search, typeFilter, sortBy]);

  const handleUnsave = (jobId: string) => {
    unsaveJob(jobId);
    toast.success('Job removed from saved jobs');
  };

  const handleApply = (jobId: string) => {
    const result = applyToJob(jobId);
    if (result.success) {
      toast.success('Application submitted successfully!');
    } else {
      toast.error(result.error || 'Failed to apply');
    }
  };

  const isApplied = (jobId: string) => {
    return user?.appliedJobs?.some((app) => app.jobId === jobId) || false;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Saved Jobs</h1>
          <p className="text-muted-foreground">
            Jobs you've saved for later ({savedJobIds.length} total)
          </p>
        </div>
        <Button asChild>
          <Link href="/jobs">
            Browse More Jobs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search saved jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Recently Saved</SelectItem>
                <SelectItem value="oldest">Oldest Saved</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
                <SelectItem value="company">Company Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Saved Jobs Grid */}
      {savedJobs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Bookmark className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No saved jobs</h3>
            <p className="mb-4 text-center text-muted-foreground">
              {savedJobIds.length === 0
                ? "You haven't saved any jobs yet. Browse jobs and save the ones you're interested in."
                : 'No jobs match your current filters.'}
            </p>
            <Button asChild>
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((savedJob) => (
            <Card key={savedJob.jobId} className="group relative overflow-hidden">
              <CardContent className="p-6">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                      <Building2 className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <Link
                        href={`/companies/${savedJob.company?.id}`}
                        className="text-sm font-medium hover:text-primary"
                      >
                        {savedJob.company?.name}
                      </Link>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {savedJob.job?.location}
                      </div>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <BookmarkX className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove saved job?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove "{savedJob.job?.title}" from
                          your saved jobs? You can always save it again later.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleUnsave(savedJob.jobId)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {/* Job Title */}
                <Link
                  href={`/jobs/${savedJob.jobId}`}
                  className="mb-2 block text-lg font-semibold hover:text-primary"
                >
                  {savedJob.job?.title}
                </Link>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{savedJob.job?.type}</Badge>
                  <Badge variant="outline">{savedJob.job?.experienceLevel}</Badge>
                </div>

                {/* Details */}
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {savedJob.job?.salary
                      ? formatSalary(savedJob.job.salary.min, savedJob.job.salary.max)
                      : 'Salary not specified'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Saved {formatDistanceToNow(new Date(savedJob.savedAt))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {isApplied(savedJob.jobId) ? (
                    <Button className="flex-1" disabled>
                      Already Applied
                    </Button>
                  ) : (
                    <Button
                      className="flex-1"
                      onClick={() => handleApply(savedJob.jobId)}
                    >
                      Apply Now
                    </Button>
                  )}
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/jobs/${savedJob.jobId}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tips Section */}
      {savedJobs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Job Search Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="mb-1 font-medium">Apply Early</h4>
                <p className="text-sm text-muted-foreground">
                  Jobs often receive the most applications in the first few days. Apply
                  early to increase your chances.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Briefcase className="h-5 w-5 text-green-600" />
                </div>
                <h4 className="mb-1 font-medium">Tailor Your Resume</h4>
                <p className="text-sm text-muted-foreground">
                  Customize your resume for each job application to highlight relevant
                  experience and skills.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <Search className="h-5 w-5 text-purple-600" />
                </div>
                <h4 className="mb-1 font-medium">Research Companies</h4>
                <p className="text-sm text-muted-foreground">
                  Learn about the company culture and values before applying to ensure
                  it's a good fit.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
