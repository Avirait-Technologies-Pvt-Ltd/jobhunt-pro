'use client';

import React from 'react';
import { UserPlus, Search, Send, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Your Profile',
    description:
      'Sign up for free and build your professional profile. Add your skills, experience, and upload your resume to stand out.',
    color: 'bg-blue-500',
  },
  {
    icon: Search,
    title: 'Search Jobs',
    description:
      'Browse thousands of job listings from top companies. Use filters to find the perfect match for your skills and preferences.',
    color: 'bg-violet-500',
  },
  {
    icon: Send,
    title: 'Apply with Ease',
    description:
      'Apply to jobs with just one click. Your profile and resume are automatically attached to save you time.',
    color: 'bg-emerald-500',
  },
  {
    icon: CheckCircle,
    title: 'Get Hired',
    description:
      'Connect with employers, schedule interviews, and land your dream job. Track your applications all in one place.',
    color: 'bg-orange-500',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Getting your dream job is easier than you think. Follow these simple
            steps to start your career journey with JobHunt Pro.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-violet-500 to-emerald-500 lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative lg:flex lg:items-center lg:gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16'
                  }`}
                >
                  <div
                    className={`inline-block rounded-xl ${step.color} p-4 text-white lg:hidden`}
                  >
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold lg:mt-0">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>

                {/* Icon (Center) */}
                <div className="hidden lg:flex lg:flex-shrink-0">
                  <div
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full ${step.color} text-white shadow-lg`}
                  >
                    <step.icon className="h-8 w-8" />
                    <span className="absolute -bottom-8 text-sm font-semibold text-slate-600">
                      Step {index + 1}
                    </span>
                  </div>
                </div>

                {/* Empty Space */}
                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
