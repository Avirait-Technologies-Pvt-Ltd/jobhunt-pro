'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Bookmark,
  Eye,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building2,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { getJobById } from '@/data/jobs';
import { formatDistanceToNow } from '@/lib/utils';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewed: 'bg-blue-100 text-blue-800',
  interview: 'bg-purple-100 text-purple-800',
  offered: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const statusIcons: Record<string, React.ElementType> = {
  pending: Clock,
  reviewed: Eye,
  interview: AlertCircle,
  offered: CheckCircle,
  rejected: XCircle,
};

const recommendedJobs = [
  { id: 'job-1', title: 'Senior Frontend Developer', company: 'TechCorp Inc.', location: 'San Francisco, CA', salary: '$120k - $150k' },
  { id: 'job-2', title: 'Full Stack Engineer', company: 'InnovateTech', location: 'New York, NY', salary: '$110k - $140k' },
  { id: 'job-3', title: 'React Developer', company: 'StartupXYZ', location: 'Remote', salary: '$100k - $130k' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const appliedJobs = user?.appliedJobs || [];
  const savedJobs = user?.savedJobs || [];

  // Get recent applications (last 5)
  const recentApplications = appliedJobs
    .slice()
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
    .slice(0, 5);

  // Calculate stats
  const stats = {
    totalApplied: appliedJobs.length,
    pending: appliedJobs.filter((j) => j.status === 'pending').length,
    reviewed: appliedJobs.filter((j) => j.status === 'reviewed').length,
    interviews: appliedJobs.filter((j) => j.status === 'interview').length,
    offered: appliedJobs.filter((j) => j.status === 'offered').length,
    savedJobs: savedJobs.length,
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your job search.
          </p>
        </div>
        <Button asChild>
          <Link href="/jobs">
            Browse Jobs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Applied
                </p>
                <p className="text-3xl font-bold">{stats.totalApplied}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500">+2 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  In Review
                </p>
                <p className="text-3xl font-bold">{stats.reviewed}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {stats.pending} pending review
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Interviews
                </p>
                <p className="text-3xl font-bold">{stats.interviews}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {stats.offered} job offers
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Saved Jobs
                </p>
                <p className="text-3xl font-bold">{stats.savedJobs}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Bookmark className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <Link
              href="/dashboard/saved"
              className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View saved jobs
              <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Applications</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/applied">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentApplications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Briefcase className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 font-semibold">No applications yet</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Start applying to jobs to track your applications here.
                  </p>
                  <Button asChild>
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentApplications.map((application) => {
                    const job = getJobById(application.jobId);
                    const company = job?.company ?? null;
                    const StatusIcon = statusIcons[application.status];

                    return (
                      <div
                        key={application.jobId}
                        className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-slate-50"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                          <Building2 className="h-6 w-6 text-slate-600" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <Link
                            href={`/jobs/${application.jobId}`}
                            className="font-medium hover:text-primary"
                          >
                            {job?.title || 'Job Title'}
                          </Link>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{company?.name || 'Company'}</span>
                            <span>•</span>
                            <span>{job?.location || 'Location'}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={statusColors[application.status]}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {application.status.charAt(0).toUpperCase() +
                              application.status.slice(1)}
                          </Badge>
                          <span className="hidden text-sm text-muted-foreground md:block">
                            {formatDistanceToNow(new Date(application.appliedAt))}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Profile strength
                  </span>
                  <span className="font-medium">
                    {user?.profileCompletion || 0}%
                  </span>
                </div>
                <Progress value={user?.profileCompletion || 0} className="h-2" />
                <div className="space-y-2">
                  <ProfileCheckItem
                    label="Add profile photo"
                    completed={!!user?.avatar}
                  />
                  <ProfileCheckItem
                    label="Add work experience"
                    completed={(user?.experience?.length || 0) > 0}
                  />
                  <ProfileCheckItem
                    label="Add education"
                    completed={(user?.education?.length || 0) > 0}
                  />
                  <ProfileCheckItem
                    label="Add skills"
                    completed={(user?.skills?.length || 0) > 0}
                  />
                  <ProfileCheckItem
                    label="Upload resume"
                    completed={!!user?.resume}
                  />
                </div>
                <Button asChild className="w-full">
                  <Link href="/dashboard/profile">Complete Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended for You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.id}`}
                    className="block rounded-lg border p-3 transition-colors hover:border-primary"
                  >
                    <h4 className="font-medium">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.salary}</span>
                    </div>
                  </Link>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/jobs">
                    View More Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Application Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            <StatusCard
              label="Pending"
              count={stats.pending}
              icon={Clock}
              color="yellow"
            />
            <StatusCard
              label="Reviewed"
              count={stats.reviewed}
              icon={Eye}
              color="blue"
            />
            <StatusCard
              label="Interview"
              count={stats.interviews}
              icon={AlertCircle}
              color="purple"
            />
            <StatusCard
              label="Offered"
              count={stats.offered}
              icon={CheckCircle}
              color="green"
            />
            <StatusCard
              label="Rejected"
              count={appliedJobs.filter((j) => j.status === 'rejected').length}
              icon={XCircle}
              color="red"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileCheckItem({
  label,
  completed,
}: {
  label: string;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {completed ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <div className="h-4 w-4 rounded-full border-2 border-slate-300" />
      )}
      <span className={completed ? 'text-muted-foreground line-through' : ''}>
        {label}
      </span>
    </div>
  );
}

function StatusCard({
  label,
  count,
  icon: Icon,
  color,
}: {
  label: string;
  count: number;
  icon: React.ElementType;
  color: 'yellow' | 'blue' | 'purple' | 'green' | 'red';
}) {
  const colorClasses = {
    yellow: 'bg-yellow-100 text-yellow-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <div className="rounded-lg border p-4 text-center">
      <div
        className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${colorClasses[color]}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
