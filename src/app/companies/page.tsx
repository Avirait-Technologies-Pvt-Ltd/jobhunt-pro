'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, Users, Briefcase, Star, Building2, Filter } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { companies } from '@/data/companies';
import { useDebounce } from '@/hooks/useDebounce';

const industries = [
  'All Industries',
  'Technology',
  'Design',
  'Finance',
  'Healthcare',
  'Education',
  'Engineering',
  'Marketing',
  'Legal',
  'Media',
  'Retail',
  'Hospitality',
];

const companySizes = [
  { value: 'all', label: 'All Sizes' },
  { value: '1-50', label: '1-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1000 employees' },
  { value: '1000+', label: '1000+ employees' },
];

const ITEMS_PER_PAGE = 12;

export default function CompaniesPage() {
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('All Industries');
  const [size, setSize] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  const filteredCompanies = useMemo(() => {
    let result = [...companies];

    // Search filter
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(
        (company) =>
          company.name.toLowerCase().includes(lowerSearch) ||
          company.industry.toLowerCase().includes(lowerSearch) ||
          company.description.toLowerCase().includes(lowerSearch)
      );
    }

    // Industry filter
    if (industry !== 'All Industries') {
      result = result.filter((company) => company.industry === industry);
    }

    // Size filter
    if (size !== 'all') {
      if (size === '1-50') {
        result = result.filter((c) => c.size === '1-10' || c.size === '11-50');
      } else if (size === '51-200') {
        result = result.filter((c) => c.size === '51-200');
      } else if (size === '201-500') {
        result = result.filter((c) => c.size === '201-500');
      } else if (size === '501-1000') {
        result = result.filter((c) => c.size === '501-1000');
      } else if (size === '1000+') {
        result = result.filter((c) => c.size === '1000+');
      }
    }

    // Sorting
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'jobs':
        result.sort((a, b) => b.openPositions - a.openPositions);
        break;
      default:
        // Featured first
        result.sort((a, b) => {
          if (a.verified && !b.verified) return -1;
          if (!a.verified && b.verified) return 1;
          return b.openPositions - a.openPositions;
        });
    }

    return result;
  }, [debouncedSearch, industry, size, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-slate-50">
        {/* Hero Section */}
        <section className="border-b bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                Explore Top Companies
              </h1>
              <p className="mb-8 text-muted-foreground">
                Discover great places to work and find your next career opportunity.
              </p>

              {/* Search */}
              <div className="relative mx-auto max-w-xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search companies by name, industry, or keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-12 pl-12"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Company Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="jobs">Open Jobs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <p className="text-sm text-muted-foreground">
                Showing {paginatedCompanies.length} of {filteredCompanies.length} companies
              </p>
            </div>

            {/* Companies Grid */}
            {filteredCompanies.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border bg-white py-16 text-center">
                <Building2 className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">No companies found</h3>
                <p className="mb-4 text-muted-foreground">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch('');
                    setIndustry('All Industries');
                    setSize('all');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginatedCompanies.map((company) => (
                    <Link key={company.id} href={`/companies/${company.id}`}>
                      <Card className="group h-full transition-all hover:border-primary hover:shadow-lg">
                        <CardContent className="p-6">
                          {/* Logo */}
                          <div className="mb-4 flex items-center justify-between">
                            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100">
                              <Building2 className="h-7 w-7 text-slate-600" />
                            </div>
                            {company.verified && (
                              <Badge variant="secondary" className="gap-1">
                                <Star className="h-3 w-3 fill-current" />
                                Verified
                              </Badge>
                            )}
                          </div>

                          {/* Name & Industry */}
                          <h3 className="mb-1 font-semibold group-hover:text-primary">
                            {company.name}
                          </h3>
                          <p className="mb-3 text-sm text-muted-foreground">
                            {company.industry}
                          </p>

                          {/* Description */}
                          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                            {company.description}
                          </p>

                          {/* Stats */}
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{company.locations[0].city}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{company.size} employees</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              <span>{company.openPositions} open positions</span>
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="mt-4 flex items-center gap-1 border-t pt-4">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{company.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({company.reviewCount} reviews)
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
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
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
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
                            variant={currentPage === pageNum ? 'default' : 'outline'}
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
