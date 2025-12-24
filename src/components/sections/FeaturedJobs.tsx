'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, DollarSign, Bookmark, ArrowRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedJobs } from '@/data/jobs';
import { formatSalary, timeAgo } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function FeaturedJobs() {
  const featuredJobs = getFeaturedJobs(6);
  const { isAuthenticated, saveJob, unsaveJob, isJobSaved } = useAuth();

  const handleSaveJob = (e: React.MouseEvent, jobId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      window.location.href = '/signin';
      return;
    }
    if (isJobSaved(jobId)) {
      unsaveJob(jobId);
    } else {
      saveJob(jobId);
    }
  };

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">Featured Jobs</h2>
            <p className="text-muted-foreground">
              Discover hand-picked opportunities from top employers
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/jobs">
              View All Jobs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
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
                      onClick={(e) => handleSaveJob(e, job.id)}
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
                    {job.remote && (
                      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                        Remote
                      </Badge>
                    )}
                    {job.urgent && (
                      <Badge variant="destructive">Urgent</Badge>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-muted-foreground">
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
                      <Clock className="h-4 w-4" />
                      <span>{timeAgo(job.postedDate)}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                        +{job.skills.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
