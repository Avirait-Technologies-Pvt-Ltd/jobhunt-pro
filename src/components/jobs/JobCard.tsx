'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  Building2,
  Briefcase,
  Users,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/types';
import { formatSalary, timeAgo } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface JobCardProps {
  job: Job;
  variant?: 'default' | 'compact';
}

export default function JobCard({ job, variant = 'default' }: JobCardProps) {
  const { isAuthenticated, saveJob, unsaveJob, isJobSaved, isJobApplied } = useAuth();

  const handleSaveJob = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      window.location.href = '/signin';
      return;
    }
    if (isJobSaved(job.id)) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  if (variant === 'compact') {
    return (
      <Link href={`/jobs/${job.id}`}>
        <Card className="group transition-all hover:border-primary hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100">
                <Building2 className="h-5 w-5 text-slate-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold group-hover:text-primary">
                  {job.title}
                </h3>
                <p className="truncate text-sm text-muted-foreground">
                  {job.company.name} • {job.location}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {job.type}
                  </Badge>
                  {job.remote && (
                    <Badge variant="outline" className="text-xs border-green-200 bg-green-50 text-green-700">
                      Remote
                    </Badge>
                  )}
                </div>
              </div>
              <button
                onClick={handleSaveJob}
                className={`rounded-full p-1.5 transition-colors ${
                  isJobSaved(job.id)
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-slate-100'
                }`}
              >
                <Bookmark
                  className={`h-4 w-4 ${isJobSaved(job.id) ? 'fill-current' : ''}`}
                />
              </button>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="group h-full transition-all hover:border-primary hover:shadow-lg">
        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                <Building2 className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-primary">
                  {job.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {job.company.name}
                </p>
              </div>
            </div>
            <button
              onClick={handleSaveJob}
              className={`rounded-full p-2 transition-colors ${
                isJobSaved(job.id)
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-slate-100'
              }`}
            >
              <Bookmark
                className={`h-5 w-5 ${isJobSaved(job.id) ? 'fill-current' : ''}`}
              />
            </button>
          </div>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{job.type}</Badge>
            <Badge variant="outline">{job.experienceLevel}</Badge>
            {job.remote && (
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                Remote
              </Badge>
            )}
            {job.urgent && (
              <Badge variant="destructive">Urgent</Badge>
            )}
            {isJobApplied(job.id) && (
              <Badge variant="default" className="bg-green-600">
                Applied
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="mb-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>
                {formatSalary(job.salary.min, job.salary.max, job.salary.currency, job.salary.period)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>{job.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{job.applicants} applicants</span>
            </div>
          </div>

          {/* Description Preview */}
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {job.description}
          </p>

          {/* Skills */}
          <div className="mb-4 flex flex-wrap gap-1">
            {job.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                +{job.skills.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{timeAgo(job.postedDate)}</span>
            </div>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
