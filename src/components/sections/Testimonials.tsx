'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFeaturedTestimonials } from '@/data/testimonials';
import { getInitials } from '@/lib/utils';

export default function Testimonials() {
  const testimonials = getFeaturedTestimonials(6);

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            What Our Users Say
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Join thousands of professionals who have found their dream jobs
            through JobHunt Pro.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => {
            const nameParts = testimonial.name.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts[1] || '';

            return (
              <Card key={testimonial.id} className="relative overflow-hidden">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="absolute -right-2 -top-2 h-16 w-16 text-slate-100" />

                  {/* Stars */}
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="mb-6 text-muted-foreground">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(firstName, lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
