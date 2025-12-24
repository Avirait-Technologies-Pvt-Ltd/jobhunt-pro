'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Users, Briefcase, ArrowRight, Building2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFeaturedCompanies } from '@/data/companies';

export default function FeaturedCompanies() {
  const companies = getFeaturedCompanies(8);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
              Top Companies Hiring
            </h2>
            <p className="text-muted-foreground">
              Explore opportunities at leading companies worldwide
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/companies">
              View All Companies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company) => (
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
                  <div className="mt-4 flex items-center gap-1">
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
      </div>
    </section>
  );
}
