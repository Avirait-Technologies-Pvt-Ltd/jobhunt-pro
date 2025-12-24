'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Calendar,
  DollarSign,
  ExternalLink,
  MoreVertical,
  Trash2,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/context/AuthContext';
import { getJobById } from '@/data/jobs';
import { formatDistanceToNow, formatDate } from '@/lib/utils';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  reviewed: 'bg-blue-100 text-blue-800 border-blue-200',
  interview: 'bg-purple-100 text-purple-800 border-purple-200',
  offered: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
};

const statusIcons: Record<string, React.ElementType> = {
  pending: Clock,
  reviewed: Eye,
  interview: AlertCircle,
  offered: CheckCircle,
  rejected: XCircle,
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  reviewed: 'Under Review',
  interview: 'Interview',
  offered: 'Offered',
  rejected: 'Rejected',
};

export default function AppliedJobsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const appliedJobs = user?.appliedJobs || [];

  const filteredApplications = useMemo(() => {
    let result = appliedJobs.map((app) => {
      const job = getJobById(app.jobId);
      const company = job?.company ?? null;
      return { ...app, job, company };
    });

    // Search filter
    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(
        (app) =>
          app.job?.title.toLowerCase().includes(lowerSearch) ||
          app.company?.name.toLowerCase().includes(lowerSearch)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((app) => app.status === statusFilter);
    }

    // Sorting
    switch (sortBy) {
      case 'oldest':
        result.sort(
          (a, b) =>
            new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime()
        );
        break;
      case 'company':
        result.sort((a, b) =>
          (a.company?.name || '').localeCompare(b.company?.name || '')
        );
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
        );
    }

    return result;
  }, [appliedJobs, search, statusFilter, sortBy]);

  // Stats
  const stats = {
    total: appliedJobs.length,
    pending: appliedJobs.filter((j) => j.status === 'pending').length,
    reviewed: appliedJobs.filter((j) => j.status === 'reviewed').length,
    interview: appliedJobs.filter((j) => j.status === 'interview').length,
    offered: appliedJobs.filter((j) => j.status === 'offered').length,
    rejected: appliedJobs.filter((j) => j.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Applied Jobs</h1>
        <p className="text-muted-foreground">
          Track and manage your job applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card className="cursor-pointer transition-colors hover:border-primary" onClick={() => setStatusFilter('all')}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-colors hover:border-yellow-500" onClick={() => setStatusFilter('pending')}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-colors hover:border-blue-500" onClick={() => setStatusFilter('reviewed')}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.reviewed}</p>
            <p className="text-sm text-muted-foreground">Reviewed</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-colors hover:border-purple-500" onClick={() => setStatusFilter('interview')}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.interview}</p>
            <p className="text-sm text-muted-foreground">Interview</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-colors hover:border-green-500" onClick={() => setStatusFilter('offered')}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.offered}</p>
            <p className="text-sm text-muted-foreground">Offered</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-colors hover:border-red-500" onClick={() => setStatusFilter('rejected')}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row">
              <div className="relative flex-1 md:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Under Review</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offered">Offered</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="company">Company Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredApplications.length} application
              {filteredApplications.length !== 1 ? 's' : ''}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Briefcase className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No applications found</h3>
            <p className="mb-4 text-center text-muted-foreground">
              {appliedJobs.length === 0
                ? "You haven't applied to any jobs yet."
                : 'Try adjusting your filters.'}
            </p>
            {appliedJobs.length === 0 && (
              <Button asChild>
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Job</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => {
                  const StatusIcon = statusIcons[application.status];

                  return (
                    <TableRow key={application.jobId}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                            <Briefcase className="h-5 w-5 text-slate-600" />
                          </div>
                          <div>
                            <Link
                              href={`/jobs/${application.jobId}`}
                              className="font-medium hover:text-primary"
                            >
                              {application.job?.title || 'Job Title'}
                            </Link>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {application.job?.location || 'Location'}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <Link
                            href={`/companies/${application.company?.id}`}
                            className="hover:text-primary"
                          >
                            {application.company?.name || 'Company'}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDate(new Date(application.appliedAt))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusColors[application.status]}
                        >
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusLabels[application.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/jobs/${application.jobId}`}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Job
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/companies/${application.company?.id}`}>
                                <Building2 className="mr-2 h-4 w-4" />
                                View Company
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Application Timeline */}
      {filteredApplications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Application Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-slate-200">
              {filteredApplications.slice(0, 10).map((application, index) => {
                const StatusIcon = statusIcons[application.status];
                return (
                  <div key={application.jobId} className="relative">
                    <div
                      className={`absolute -left-6 flex h-4 w-4 items-center justify-center rounded-full ${
                        statusColors[application.status].split(' ')[0]
                      }`}
                    >
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/jobs/${application.jobId}`}
                            className="font-medium hover:text-primary"
                          >
                            {application.job?.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {application.company?.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={statusColors[application.status]}
                          >
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusLabels[application.status]}
                          </Badge>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Applied {formatDistanceToNow(new Date(application.appliedAt))}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
