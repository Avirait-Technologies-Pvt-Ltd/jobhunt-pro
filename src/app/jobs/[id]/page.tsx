'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  Share2,
  Building2,
  Briefcase,
  Users,
  Calendar,
  CheckCircle,
  ExternalLink,
  Star,
  Globe,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getJobById, getJobsByCompany, jobs } from '@/data/jobs';
import { formatSalary, timeAgo, formatDate } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, user, applyToJob, saveJob, unsaveJob, isJobSaved, isJobApplied } = useAuth();

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const job = getJobById(params.id as string);

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Job Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const companyJobs = getJobsByCompany(job.company.id).filter((j) => j.id !== job.id);
  const similarJobs = jobs
    .filter((j) => j.category === job.category && j.id !== job.id)
    .slice(0, 3);

  const handleSaveJob = () => {
    if (!isAuthenticated) {
      router.push('/signin');
      return;
    }
    if (isJobSaved(job.id)) {
      unsaveJob(job.id);
      toast.success('Job removed from saved');
    } else {
      saveJob(job.id);
      toast.success('Job saved successfully');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      router.push('/signin');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    applyToJob(job.id);
    setIsSubmitting(false);
    setIsApplyOpen(false);
    setCoverLetter('');
    toast.success('Application submitted successfully!');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-slate-50">
        {/* Breadcrumb */}
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Button>
          </div>
        </div>

        {/* Job Header */}
        <section className="border-b bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <Building2 className="h-8 w-8 text-slate-600" />
                </div>
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold md:text-3xl">{job.title}</h1>
                    {job.urgent && <Badge variant="destructive">Urgent</Badge>}
                    {job.featured && (
                      <Badge variant="secondary" className="gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <Link
                      href={`/companies/${job.company.id}`}
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      <Building2 className="h-4 w-4" />
                      {job.company.name}
                    </Link>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {timeAgo(job.postedDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  onClick={handleSaveJob}
                  className="gap-2"
                >
                  <Bookmark
                    className={`h-4 w-4 ${isJobSaved(job.id) ? 'fill-current' : ''}`}
                  />
                  {isJobSaved(job.id) ? 'Saved' : 'Save Job'}
                </Button>
                <Button variant="outline" onClick={handleShare} className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="gap-2"
                      disabled={isJobApplied(job.id)}
                    >
                      {isJobApplied(job.id) ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Applied
                        </>
                      ) : (
                        'Apply Now'
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Apply for {job.title}</DialogTitle>
                      <DialogDescription>
                        at {job.company.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {user && (
                        <div className="rounded-lg border bg-slate-50 p-4">
                          <p className="text-sm text-muted-foreground">
                            Applying as
                          </p>
                          <p className="font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="cover-letter">
                          Cover Letter (Optional)
                        </Label>
                        <Textarea
                          id="cover-letter"
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          placeholder="Tell the employer why you're a great fit for this role..."
                          rows={5}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsApplyOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleApply} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* Job Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Job Overview */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Job Type</p>
                        <p className="font-medium">{job.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Experience
                        </p>
                        <p className="font-medium">{job.experienceLevel}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Salary</p>
                        <p className="font-medium">
                          {formatSalary(
                            job.salary.min,
                            job.salary.max,
                            job.salary.currency,
                            job.salary.period
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Work Setting
                        </p>
                        <p className="font-medium">
                          {job.remote ? 'Remote' : 'On-site'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line text-muted-foreground">
                      {job.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Responsibilities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-muted-foreground">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Required Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {job.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Company Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">About the Company</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                        <Building2 className="h-6 w-6 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{job.company.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {job.company.industry}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{job.company.size} employees</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{job.company.locations[0].city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <a
                          href={job.company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          {job.company.website.replace('https://', '')}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>
                          {job.company.rating} ({job.company.reviewCount} reviews)
                        </span>
                      </div>
                    </div>

                    <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                      {job.company.description}
                    </p>

                    <Button variant="outline" asChild className="w-full gap-2">
                      <Link href={`/companies/${job.company.id}`}>
                        View Company Profile
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Job Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Job Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Posted
                      </span>
                      <span className="text-sm font-medium">
                        {formatDate(job.postedDate)}
                      </span>
                    </div>
                    {job.deadline && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Deadline
                        </span>
                        <span className="text-sm font-medium">
                          {formatDate(job.deadline)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Applicants
                      </span>
                      <span className="text-sm font-medium">
                        {job.applicants}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Category
                      </span>
                      <Badge variant="secondary">{job.category}</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Other Jobs at Company */}
                {companyJobs.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        More Jobs at {job.company.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {companyJobs.slice(0, 3).map((companyJob) => (
                        <Link
                          key={companyJob.id}
                          href={`/jobs/${companyJob.id}`}
                          className="block rounded-lg border p-3 transition-colors hover:border-primary"
                        >
                          <h4 className="font-medium">{companyJob.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {companyJob.location} • {companyJob.type}
                          </p>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">Similar Jobs</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {similarJobs.map((similarJob) => (
                    <JobCard key={similarJob.id} job={similarJob} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
