'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs, faqCategories } from '@/data/faq';

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      !search ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Group FAQs by category
  const groupedFaqs = filteredFaqs.reduce(
    (acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    },
    {} as Record<string, typeof faqs>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-blue-600 to-violet-600 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                How can we help you?
              </h1>
              <p className="mb-8 text-lg text-white/80">
                Find answers to frequently asked questions about JobHunt Pro.
              </p>

              {/* Search */}
              <div className="relative mx-auto max-w-xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-14 bg-white pl-12 text-slate-900"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b bg-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {faqCategories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredFaqs.length === 0 ? (
              <Card className="mx-auto max-w-2xl">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <HelpCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">
                    No results found
                  </h3>
                  <p className="mb-4 text-center text-muted-foreground">
                    We couldn't find any FAQs matching your search. Try different
                    keywords or browse by category.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearch('');
                      setActiveCategory('All');
                    }}
                  >
                    Clear filters
                  </Button>
                </CardContent>
              </Card>
            ) : activeCategory === 'All' ? (
              // Grouped view
              <div className="mx-auto max-w-3xl space-y-8">
                {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline">{category}</Badge>
                        <span className="text-sm font-normal text-muted-foreground">
                          {categoryFaqs.length} question
                          {categoryFaqs.length !== 1 ? 's' : ''}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {categoryFaqs.map((faq) => (
                          <AccordionItem key={faq.id} value={faq.id}>
                            <AccordionTrigger className="text-left hover:no-underline">
                              <span className="pr-4">{faq.question}</span>
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // Single category view
              <Card className="mx-auto max-w-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">{activeCategory}</Badge>
                    <span className="text-sm font-normal text-muted-foreground">
                      {filteredFaqs.length} question
                      {filteredFaqs.length !== 1 ? 's' : ''}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="pr-4">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Still Need Help */}
        <section className="border-t bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-2xl font-bold">Still have questions?</h2>
              <p className="mb-8 text-muted-foreground">
                Can't find the answer you're looking for? Our support team is here
                to help.
              </p>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mb-2 font-semibold">Live Chat</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Chat with our support team in real-time.
                    </p>
                    <Button variant="outline" className="w-full">
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mb-2 font-semibold">Email Support</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      We'll respond within 24 hours.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="mailto:support@jobhuntpro.com">
                        Send Email
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                      <Phone className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="mb-2 font-semibold">Phone Support</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Mon-Fri, 9AM-6PM EST
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="tel:+1-555-123-4567">
                        Call Us
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold">
                Helpful Resources
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Link href="/blog">
                  <Card className="transition-colors hover:border-primary">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <ExternalLink className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Career Blog</h3>
                        <p className="text-sm text-muted-foreground">
                          Tips and insights for your job search
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/about">
                  <Card className="transition-colors hover:border-primary">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <ExternalLink className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">About Us</h3>
                        <p className="text-sm text-muted-foreground">
                          Learn more about JobHunt Pro
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/privacy">
                  <Card className="transition-colors hover:border-primary">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <ExternalLink className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Privacy Policy</h3>
                        <p className="text-sm text-muted-foreground">
                          How we protect your data
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/terms">
                  <Card className="transition-colors hover:border-primary">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <ExternalLink className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Terms of Service</h3>
                        <p className="text-sm text-muted-foreground">
                          Terms and conditions of use
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
