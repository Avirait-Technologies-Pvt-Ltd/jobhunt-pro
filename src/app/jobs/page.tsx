'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, MapPin, Grid3X3, List, ArrowUpDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import JobFilters from '@/components/jobs/JobFilters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { jobs } from '@/data/jobs';
import { useDebounce } from '@/hooks/useDebounce';

interface Filters {
  types: string[];
  experienceLevels: string[];
  categories: string[];
  remote: boolean;
  salaryRange: [number, number];
}

const ITEMS_PER_PAGE = 12;

function JobsContent() {
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    types: [],
    experienceLevels: [],
    categories: searchParams.get('category') ? [searchParams.get('category')!] : [],
    remote: false,
    salaryRange: [0, 250000],
  });

  const debouncedKeyword = useDebounce(keyword, 300);
  const debouncedLocation = useDebounce(location, 300);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Keyword filter
    if (debouncedKeyword) {
      const lowerKeyword = debouncedKeyword.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(lowerKeyword) ||
          job.company.name.toLowerCase().includes(lowerKeyword) ||
          job.skills.some((skill) => skill.toLowerCase().includes(lowerKeyword)) ||
          job.description.toLowerCase().includes(lowerKeyword)
      );
    }

    // Location filter
    if (debouncedLocation) {
      const lowerLocation = debouncedLocation.toLowerCase();
      result = result.filter((job) =>
        job.location.toLowerCase().includes(lowerLocation)
      );
    }

    // Type filter
    if (filters.types.length > 0) {
      result = result.filter((job) => filters.types.includes(job.type));
    }

    // Experience filter
    if (filters.experienceLevels.length > 0) {
      result = result.filter((job) =>
        filters.experienceLevels.includes(job.experienceLevel)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((job) => filters.categories.includes(job.category));
    }

    // Remote filter
    if (filters.remote) {
      result = result.filter((job) => job.remote);
    }

    // Salary filter
    result = result.filter(
      (job) =>
        job.salary.max >= filters.salaryRange[0] &&
        job.salary.min <= filters.salaryRange[1]
    );

    // Sorting
    switch (sortBy) {
      case 'date':
        result.sort(
          (a, b) =>
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        );
        break;
      case 'salary-high':
        result.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case 'salary-low':
        result.sort((a, b) => a.salary.min - b.salary.min);
        break;
      case 'applicants':
        result.sort((a, b) => b.applicants - a.applicants);
        break;
      default:
        // Relevance: featured first, then by date
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
          );
        });
    }

    return result;
  }, [debouncedKeyword, debouncedLocation, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedKeyword, debouncedLocation, filters, sortBy]);

  return (
    <>
      {/* Search Header */}
      <section className="border-b bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Job title, keywords, or company"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="md:px-8">Search Jobs</Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Filters Sidebar */}
            <aside className="lg:w-72">
              <JobFilters
                filters={filters}
                onFiltersChange={setFilters}
                totalJobs={jobs.length}
                filteredCount={filteredJobs.length}
              />
            </aside>

            {/* Jobs List */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-xl font-semibold">
                    {filteredJobs.length} Jobs Found
                  </h1>
                  {(debouncedKeyword || debouncedLocation) && (
                    <p className="text-sm text-muted-foreground">
                      {debouncedKeyword && `"${debouncedKeyword}"`}
                      {debouncedKeyword && debouncedLocation && ' in '}
                      {debouncedLocation && `${debouncedLocation}`}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="date">Most Recent</SelectItem>
                      <SelectItem value="salary-high">Highest Salary</SelectItem>
                      <SelectItem value="salary-low">Lowest Salary</SelectItem>
                      <SelectItem value="applicants">Most Applicants</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden items-center gap-1 rounded-lg border bg-white p-1 sm:flex">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Jobs Grid/List */}
              {isLoading ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'md:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                }`}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-lg border bg-white p-6">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <div className="mt-4 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border bg-white py-16 text-center">
                  <Search className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">No jobs found</h3>
                  <p className="mb-4 text-muted-foreground">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setKeyword('');
                      setLocation('');
                      setFilters({
                        types: [],
                        experienceLevels: [],
                        categories: [],
                        remote: false,
                        salaryRange: [0, 250000],
                      });
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <>
                  <div
                    className={`grid gap-6 ${
                      viewMode === 'grid'
                        ? 'md:grid-cols-2 xl:grid-cols-3'
                        : 'grid-cols-1'
                    }`}
                  >
                    {paginatedJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        variant={viewMode === 'list' ? 'compact' : 'default'}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }).map(
                          (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <Button
                                key={pageNum}
                                variant={
                                  currentPage === pageNum ? 'default' : 'outline'
                                }
                                size="icon"
                                className="h-10 w-10"
                                onClick={() => setCurrentPage(pageNum)}
                              >
                                {pageNum}
                              </Button>
                            );
                          }
                        )}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function JobsLoading() {
  return (
    <>
      <section className="border-b bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="lg:w-72">
              <Skeleton className="h-96" />
            </aside>
            <div className="flex-1">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function JobsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-slate-50">
        <Suspense fallback={<JobsLoading />}>
          <JobsContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
