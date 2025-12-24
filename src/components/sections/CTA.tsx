'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-blue-600 to-violet-600 py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

      {/* Floating Elements */}
      <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-white/10 blur-xl" />
      <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center text-white">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Start your career journey today
          </div>

          {/* Heading */}
          <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            Ready to Find Your Dream Job?
          </h2>

          {/* Description */}
          <p className="mb-8 text-lg text-white/80">
            Join over 2 million professionals who have found their perfect career
            match through JobHunt Pro. Create your free profile and start applying
            to jobs today.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild className="min-w-[200px]">
              <Link href="/signup">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="min-w-[200px] border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-green-400" />
              <span>10,000+ jobs posted weekly</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-green-400" />
              <span>Free for job seekers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-green-400" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
