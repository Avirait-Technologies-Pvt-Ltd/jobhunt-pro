'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  X,
  Plus,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  Briefcase,
  CheckCircle,
  XCircle,
  Star,
  Heart,
  ExternalLink,
  Trash2,
  Scale,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { jobs } from '@/data/jobs';
import { Job } from '@/types';
import { formatSalary } from '@/lib/utils';

const COMPARE_STORAGE_KEY = 'jobhunt_compare_jobs';

export default function JobComparePage() {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (stored) {
      setCompareIds(JSON.parse(stored));
    }
  }, []);

  const compareJobs = jobs.filter((job) => compareIds.includes(job.id));

  const availableJobs = jobs.filter(
    (job) =>
      !compareIds.includes(job.id) &&
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addToCompare = (jobId: string) => {
    if (compareIds.length >= 4) {
      toast.error('Maximum 4 jobs can be compared');
      return;
    }
    const newIds = [...compareIds, jobId];
    setCompareIds(newIds);
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(newIds));
    toast.success('Job added to comparison');
    setShowAddDialog(false);
    setSearchTerm('');
  };

  const removeFromCompare = (jobId: string) => {
    const newIds = compareIds.filter((id) => id !== jobId);
    setCompareIds(newIds);
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(newIds));
    toast.success('Job removed from comparison');
  };

  const clearAll = () => {
    setCompareIds([]);
    localStorage.removeItem(COMPARE_STORAGE_KEY);
    toast.success('Comparison cleared');
  };

  const getComparisonValue = (job: Job, field: string): React.ReactNode => {
    switch (field) {
      case 'salary':
        return formatSalary(job.salary.min, job.salary.max, job.salary.currency, job.salary.period);
      case 'location':
        return job.location;
      case 'type':
        return job.type;
      case 'experience':
        return job.experienceLevel;
      case 'remote':
        return job.remote ? (
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircle className="h-4 w-4" /> Yes
          </span>
        ) : (
          <span className="flex items-center gap-1 text-red-600">
            <XCircle className="h-4 w-4" /> No
          </span>
        );
      case 'posted':
        return new Date(job.postedDate).toLocaleDateString();
      default:
        return '-';
    }
  };

  const comparisonFields = [
    { key: 'salary', label: 'Salary Range', icon: DollarSign },
    { key: 'location', label: 'Location', icon: MapPin },
    { key: 'type', label: 'Employment Type', icon: Briefcase },
    { key: 'experience', label: 'Experience Level', icon: Star },
    { key: 'remote', label: 'Remote Work', icon: Building2 },
    { key: 'posted', label: 'Date Posted', icon: Clock },
  ];

  const getBestValue = (field: string): string | null => {
    if (compareJobs.length < 2) return null;

    switch (field) {
      case 'salary':
        const salaries = compareJobs.map((job) => ({
          id: job.id,
          max: job.salary.max,
        }));
        const highest = salaries.reduce((a, b) => (a.max > b.max ? a : b));
        return highest.id;
      case 'remote':
        const remote = compareJobs.find((job) => job.remote);
        return remote?.id || null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/jobs">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold">
                <Scale className="h-6 w-6" />
                Compare Jobs
              </h1>
              <p className="text-muted-foreground">
                Compare up to 4 jobs side by side
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAddDialog(true)}
              disabled={compareIds.length >= 4}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Job
            </Button>
            {compareIds.length > 0 && (
              <Button variant="outline" onClick={clearAll}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {compareJobs.length === 0 ? (
          /* Empty State */
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Scale className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No jobs to compare</h3>
              <p className="mb-4 text-center text-muted-foreground">
                Add jobs to your comparison to see them side by side.
              </p>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Jobs to Compare
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Comparison Table */
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Job Headers */}
              <div className="mb-4 grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareJobs.length}, 1fr)` }}>
                <div className="flex items-end">
                  <span className="text-sm font-medium text-muted-foreground">
                    {compareJobs.length} job{compareJobs.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                {compareJobs.map((job) => (
                  <Card key={job.id} className="relative overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8"
                      onClick={() => removeFromCompare(job.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <CardContent className="p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-white">
                          <Image
                            src={job.company.logo}
                            alt={job.company.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="truncate font-semibold">{job.title}</h3>
                          <p className="truncate text-sm text-muted-foreground">
                            {job.company.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" asChild className="flex-1">
                          <Link href={`/jobs/${job.id}`}>
                            <ExternalLink className="mr-1 h-3 w-3" />
                            View
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Comparison Fields */}
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <tbody>
                      {comparisonFields.map((field, index) => {
                        const bestId = getBestValue(field.key);
                        return (
                          <tr
                            key={field.key}
                            className={index % 2 === 0 ? 'bg-muted/50' : ''}
                          >
                            <td className="w-[200px] p-4">
                              <div className="flex items-center gap-2 font-medium">
                                <field.icon className="h-4 w-4 text-muted-foreground" />
                                {field.label}
                              </div>
                            </td>
                            {compareJobs.map((job) => (
                              <td
                                key={job.id}
                                className={`p-4 text-center ${
                                  bestId === job.id
                                    ? 'bg-green-50 font-medium text-green-700'
                                    : ''
                                }`}
                              >
                                {getComparisonValue(job, field.key)}
                                {bestId === job.id && (
                                  <Badge
                                    variant="secondary"
                                    className="ml-2 bg-green-100 text-green-700"
                                  >
                                    Best
                                  </Badge>
                                )}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Skills Comparison */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `200px repeat(${compareJobs.length}, 1fr)` }}
                  >
                    <div />
                    {compareJobs.map((job) => (
                      <div key={job.id} className="flex flex-wrap gap-1">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Comparison */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `200px repeat(${compareJobs.length}, 1fr)` }}
                  >
                    <div />
                    {compareJobs.map((job) => (
                      <div key={job.id}>
                        {job.benefits && job.benefits.length > 0 ? (
                          <ul className="space-y-1 text-sm">
                            {job.benefits.slice(0, 5).map((benefit, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                {benefit}
                              </li>
                            ))}
                            {job.benefits.length > 5 && (
                              <li className="text-muted-foreground">
                                +{job.benefits.length - 5} more
                              </li>
                            )}
                          </ul>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Not specified
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Description Preview */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `200px repeat(${compareJobs.length}, 1fr)` }}
                  >
                    <div />
                    {compareJobs.map((job) => (
                      <div key={job.id}>
                        <p className="line-clamp-4 text-sm text-muted-foreground">
                          {job.description}
                        </p>
                        <Button
                          variant="link"
                          size="sm"
                          asChild
                          className="mt-2 h-auto p-0"
                        >
                          <Link href={`/jobs/${job.id}`}>Read full description</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Add Job Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Job to Compare</DialogTitle>
              <DialogDescription>
                Search and select a job to add to your comparison
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Search jobs by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {availableJobs.slice(0, 10).map((job) => (
                  <button
                    key={job.id}
                    className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted"
                    onClick={() => addToCompare(job.id)}
                  >
                    <div className="relative h-10 w-10 overflow-hidden rounded border bg-white">
                      <Image
                        src={job.company.logo}
                        alt={job.company.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate font-medium">{job.title}</h4>
                      <p className="truncate text-sm text-muted-foreground">
                        {job.company.name} • {job.location}
                      </p>
                    </div>
                    <Plus className="h-5 w-5 text-muted-foreground" />
                  </button>
                ))}
                {availableJobs.length === 0 && (
                  <p className="py-8 text-center text-muted-foreground">
                    No jobs found matching your search
                  </p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
