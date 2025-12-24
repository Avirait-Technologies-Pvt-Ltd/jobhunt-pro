'use client';

import React from 'react';
import Link from 'next/link';
import {
  Monitor,
  Palette,
  Megaphone,
  TrendingUp,
  DollarSign,
  Heart,
  GraduationCap,
  Wrench,
  Users,
  Headphones,
  Scale,
  Settings,
  BarChart,
  Package,
  FileText,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import { categories } from '@/data/categories';

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Palette,
  Megaphone,
  TrendingUp,
  DollarSign,
  Heart,
  GraduationCap,
  Wrench,
  Users,
  Headphones,
  Scale,
  Settings,
  BarChart,
  Package,
  FileText,
  Briefcase,
};

export default function Categories() {
  const topCategories = categories.slice(0, 8);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Explore by Category
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Browse through our most popular job categories and find the perfect
            role that matches your skills and interests.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topCategories.map((category) => {
            const Icon = iconMap[category.icon] || Briefcase;

            return (
              <Link
                key={category.id}
                href={`/jobs?category=${category.name}`}
                className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                {/* Icon Background */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-1 font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.jobCount.toLocaleString()} jobs available
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Browse Jobs
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="mt-10 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
