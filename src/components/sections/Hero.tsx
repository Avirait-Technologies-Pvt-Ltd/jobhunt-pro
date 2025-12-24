'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Briefcase, ArrowRight, Users, Building2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const stats = [
  { icon: Briefcase, value: '10,000+', label: 'Active Jobs' },
  { icon: Building2, value: '5,000+', label: 'Companies' },
  { icon: Users, value: '2M+', label: 'Job Seekers' },
  { icon: CheckCircle, value: '500K+', label: 'Successful Hires' },
];

export default function Hero() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (location) params.set('location', location);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTYzRUIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      {/* Gradient Orbs */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="container relative mx-auto px-4 py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            Over 10,000 jobs available now
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Find Your{' '}
            <span className="bg-gradient-to-r from-primary via-blue-400 to-violet-500 bg-clip-text text-transparent">
              Dream Job
            </span>{' '}
            Today
          </h1>

          {/* Subheading */}
          <p className="mb-10 text-lg text-slate-300 md:text-xl">
            Discover thousands of job opportunities from top companies worldwide.
            Your next career move is just a search away.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mx-auto mb-8 flex max-w-3xl flex-col gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-lg md:flex-row"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Job title, keywords, or company"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="h-12 border-0 bg-white pl-10 text-slate-900 placeholder:text-slate-500"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 border-0 bg-white pl-10 text-slate-900 placeholder:text-slate-500"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8">
              Search Jobs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {/* Popular Searches */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-slate-400">Popular:</span>
            {['Remote', 'Software Engineer', 'Marketing', 'Design', 'Data Science'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setKeyword(term);
                  router.push(`/jobs?keyword=${term}`);
                }}
                className="rounded-full bg-white/10 px-3 py-1 transition-colors hover:bg-white/20"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/5 p-4 backdrop-blur"
              >
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
