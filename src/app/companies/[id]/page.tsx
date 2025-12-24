'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  Globe,
  Star,
  Building2,
  Briefcase,
  CheckCircle,
  ExternalLink,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { getCompanyById } from '@/data/companies';
import { getJobsByCompany } from '@/data/jobs';

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();

  const company = getCompanyById(params.id as string);

  if (!company) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Company Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The company you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link href="/companies">Browse Companies</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const companyJobs = getJobsByCompany(company.id);

  const socialLinks = [
    { icon: Linkedin, href: company.socialLinks.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: company.socialLinks.twitter, label: 'Twitter' },
    { icon: Facebook, href: company.socialLinks.facebook, label: 'Facebook' },
    { icon: Instagram, href: company.socialLinks.instagram, label: 'Instagram' },
  ].filter((link) => link.href);

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
              Back to Companies
            </Button>
          </div>
        </div>

        {/* Company Banner */}
        <section className="relative h-48 bg-gradient-to-r from-slate-700 to-slate-900 md:h-64">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        </section>

        {/* Company Header */}
        <section className="border-b bg-white pb-6">
          <div className="container mx-auto px-4">
            <div className="relative -mt-16 flex flex-col gap-6 md:-mt-20 md:flex-row md:items-end md:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-xl border-4 border-white bg-slate-100 shadow-lg md:h-32 md:w-32">
                  <Building2 className="h-12 w-12 text-slate-600 md:h-16 md:w-16" />
                </div>
                <div className="mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold md:text-3xl">
                      {company.name}
                    </h1>
                    {company.verified && (
                      <Badge variant="secondary" className="gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{company.industry}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border bg-white p-2 transition-colors hover:border-primary hover:text-primary"
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
                <Button asChild>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    Visit Website
                  </a>
                </Button>
              </div>
            </div>

            {/* Company Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg border bg-slate-50 p-4 text-center">
                <Users className="mx-auto mb-2 h-5 w-5 text-primary" />
                <div className="text-lg font-semibold">{company.size}</div>
                <div className="text-sm text-muted-foreground">Employees</div>
              </div>
              <div className="rounded-lg border bg-slate-50 p-4 text-center">
                <Calendar className="mx-auto mb-2 h-5 w-5 text-primary" />
                <div className="text-lg font-semibold">{company.founded}</div>
                <div className="text-sm text-muted-foreground">Founded</div>
              </div>
              <div className="rounded-lg border bg-slate-50 p-4 text-center">
                <Briefcase className="mx-auto mb-2 h-5 w-5 text-primary" />
                <div className="text-lg font-semibold">{company.openPositions}</div>
                <div className="text-sm text-muted-foreground">Open Jobs</div>
              </div>
              <div className="rounded-lg border bg-slate-50 p-4 text-center">
                <Star className="mx-auto mb-2 h-5 w-5 fill-yellow-400 text-yellow-400" />
                <div className="text-lg font-semibold">{company.rating}</div>
                <div className="text-sm text-muted-foreground">
                  {company.reviewCount} Reviews
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="jobs">
                  Jobs ({companyJobs.length})
                </TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-6">
                    {/* About */}
                    <Card>
                      <CardHeader>
                        <CardTitle>About {company.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-line text-muted-foreground">
                          {company.description}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Mission */}
                    {company.mission && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{company.mission}</p>
                        </CardContent>
                      </Card>
                    )}

                    {/* Culture */}
                    {company.culture && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Company Culture</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{company.culture}</p>
                        </CardContent>
                      </Card>
                    )}

                    {/* Photos */}
                    {company.photos.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Life at {company.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {company.photos.map((photo, index) => (
                              <div
                                key={index}
                                className="aspect-video rounded-lg bg-slate-200"
                              />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Quick Info */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Info</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Industry
                          </span>
                          <span className="text-sm font-medium">
                            {company.industry}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Company Size
                          </span>
                          <span className="text-sm font-medium">
                            {company.size} employees
                          </span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Founded
                          </span>
                          <span className="text-sm font-medium">
                            {company.founded}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Headquarters
                          </span>
                          <span className="text-sm font-medium">
                            {company.locations.find((l) => l.isHeadquarters)?.city ||
                              company.locations[0].city}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Website
                          </span>
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                          >
                            Visit
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Featured Jobs */}
                    {companyJobs.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Featured Jobs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {companyJobs.slice(0, 3).map((job) => (
                            <Link
                              key={job.id}
                              href={`/jobs/${job.id}`}
                              className="block rounded-lg border p-3 transition-colors hover:border-primary"
                            >
                              <h4 className="font-medium">{job.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {job.location} • {job.type}
                              </p>
                            </Link>
                          ))}
                          <Button variant="outline" asChild className="w-full">
                            <Link href="#jobs">View All Jobs</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Jobs Tab */}
              <TabsContent value="jobs">
                {companyJobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-white py-16 text-center">
                    <Briefcase className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-semibold">No open positions</h3>
                    <p className="text-muted-foreground">
                      Check back later for new opportunities at {company.name}.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {companyJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Benefits Tab */}
              <TabsContent value="benefits">
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits & Perks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {company.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-lg border p-4"
                        >
                          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Locations Tab */}
              <TabsContent value="locations">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {company.locations.map((location, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">{location.city}</h3>
                          </div>
                          {location.isHeadquarters && (
                            <Badge variant="secondary">HQ</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {location.country}
                        </p>
                        {location.address && (
                          <p className="mt-2 text-sm">{location.address}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
