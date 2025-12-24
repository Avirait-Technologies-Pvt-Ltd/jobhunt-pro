'use client';

import React from 'react';
import Link from 'next/link';
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  TrendingUp,
  Linkedin,
  Twitter,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { teamMembers } from '@/data/team';
import { getInitials } from '@/lib/utils';

const stats = [
  { value: '10M+', label: 'Jobs Posted' },
  { value: '5M+', label: 'Companies' },
  { value: '50M+', label: 'Job Seekers' },
  { value: '10M+', label: 'Successful Hires' },
];

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We are dedicated to connecting talented individuals with meaningful career opportunities.',
  },
  {
    icon: Heart,
    title: 'People First',
    description: 'We put job seekers and employers at the center of everything we do.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We believe in honest communication and clear information for all parties.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'We continuously improve our platform to better serve our community.',
  },
];

const milestones = [
  { year: '2018', title: 'Founded', description: 'JobHunt Pro was founded with a vision to revolutionize job search.' },
  { year: '2019', title: '1M Users', description: 'Reached our first million registered users.' },
  { year: '2020', title: 'Remote Work Hub', description: 'Launched dedicated remote work features during the pandemic.' },
  { year: '2021', title: 'Global Expansion', description: 'Expanded to 50+ countries worldwide.' },
  { year: '2022', title: 'AI Matching', description: 'Introduced AI-powered job matching technology.' },
  { year: '2023', title: '50M Users', description: 'Celebrated 50 million registered job seekers.' },
  { year: '2024', title: 'Industry Leader', description: 'Recognized as the #1 job platform globally.' },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 text-white md:py-28">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTYzRUIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              About{' '}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-violet-500 bg-clip-text text-transparent">
                JobHunt Pro
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-slate-300 md:text-xl">
              We're on a mission to connect talented professionals with their dream careers.
              Since 2018, we've helped millions of people find meaningful work at companies they love.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-primary md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-center text-3xl font-bold md:text-4xl">
                Our Story
              </h2>
              <div className="prose prose-lg mx-auto text-muted-foreground">
                <p>
                  JobHunt Pro was founded in 2018 with a simple yet powerful vision: to make job searching easier,
                  faster, and more effective for everyone. Our founders, having experienced the frustrations of
                  traditional job hunting firsthand, set out to create a platform that truly puts job seekers first.
                </p>
                <p>
                  What started as a small startup has grown into a global platform serving millions of professionals
                  and thousands of companies worldwide. We've revolutionized the way people find work by combining
                  cutting-edge technology with a deep understanding of what job seekers and employers need.
                </p>
                <p>
                  Today, JobHunt Pro is trusted by Fortune 500 companies and innovative startups alike. We've helped
                  over 10 million people find their dream jobs, and we're just getting started. Our team of passionate
                  individuals works tirelessly to improve our platform and create new opportunities for our users every day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-slate-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To empower every professional to find meaningful work and every company to find the perfect talent.
                    We strive to make the job search process transparent, efficient, and accessible to all.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-violet-500">
                <CardContent className="p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/10">
                    <Eye className="h-6 w-6 text-violet-500" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To create a world where everyone has access to opportunities that match their skills, passions,
                    and potential. We envision a future where finding the right job is just a click away.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              Our Values
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card key={value.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-slate-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              Our Journey
            </h2>
            <div className="relative mx-auto max-w-3xl">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 h-full w-0.5 bg-primary/20 md:left-1/2 md:-translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative mb-8 flex items-center gap-6 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-primary md:left-1/2">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-10 flex-1 md:ml-0 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <span className="text-sm font-semibold text-primary">
                      {milestone.year}
                    </span>
                    <h3 className="font-semibold">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden flex-1 md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Meet Our Team
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Our diverse team of experts is passionate about connecting talent with opportunity.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => {
                const nameParts = member.name.split(' ');
                const firstName = nameParts[0];
                const lastName = nameParts.slice(1).join(' ');

                return (
                  <Card key={member.id} className="text-center">
                    <CardContent className="p-6">
                      <Avatar className="mx-auto mb-4 h-24 w-24">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                          {getInitials(firstName, lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="mb-3 text-sm text-primary">{member.role}</p>
                      <p className="mb-4 text-xs text-muted-foreground">
                        {member.bio.substring(0, 100)}...
                      </p>
                      <div className="flex justify-center gap-2">
                        {member.socialLinks.linkedin && (
                          <a
                            href={member.socialLinks.linkedin}
                            className="rounded-full p-2 transition-colors hover:bg-slate-100"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {member.socialLinks.twitter && (
                          <a
                            href={member.socialLinks.twitter}
                            className="rounded-full p-2 transition-colors hover:bg-slate-100"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
              Join millions of professionals who have found their dream careers through JobHunt Pro.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
