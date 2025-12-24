'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Building2,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Our team will respond within 24 hours',
    value: 'support@jobhuntpro.com',
    href: 'mailto:support@jobhuntpro.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Mon-Fri from 9am to 6pm EST',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come say hello at our office',
    value: '100 Market St, San Francisco, CA 94105',
    href: '#',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Available 24/7 for urgent queries',
    value: 'Start a conversation',
    href: '#',
  },
];

const offices = [
  {
    city: 'San Francisco',
    country: 'USA (Headquarters)',
    address: '100 Market Street, Suite 500',
    phone: '+1 (555) 123-4567',
  },
  {
    city: 'New York',
    country: 'USA',
    address: '350 Fifth Avenue, 21st Floor',
    phone: '+1 (555) 234-5678',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    address: '1 Canada Square, Canary Wharf',
    phone: '+44 20 1234 5678',
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    address: '1 Raffles Place, Tower One',
    phone: '+65 6123 4567',
  },
];

const quickFaqs = [
  {
    question: 'How do I create an account?',
    answer: 'Click the "Sign Up" button on the homepage and follow the simple registration process. It takes less than 2 minutes!',
  },
  {
    question: 'Is JobHunt Pro free for job seekers?',
    answer: 'Yes, JobHunt Pro is completely free for job seekers. You can create a profile, search for jobs, and apply without any cost.',
  },
  {
    question: 'How do I reset my password?',
    answer: 'Click "Forgot Password" on the sign-in page, enter your email, and we will send you a reset link.',
  },
  {
    question: 'How can I improve my profile visibility?',
    answer: 'Complete all sections of your profile, add relevant skills, upload a professional photo, and keep your information up to date.',
  },
  {
    question: 'Can I apply to multiple jobs at once?',
    answer: 'Yes, you can apply to as many jobs as you like. Each application is tracked separately in your dashboard.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTYzRUIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Get in Touch</h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="border-b bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  className="group"
                >
                  <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <method.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-1 font-semibold">{method.title}</h3>
                      <p className="mb-2 text-sm text-muted-foreground">
                        {method.description}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {method.value}
                      </p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="mb-2 text-2xl font-bold">Send Us a Message</h2>
                <p className="mb-8 text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={handleSubjectChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Office Locations */}
              <div>
                <h2 className="mb-2 text-2xl font-bold">Our Offices</h2>
                <p className="mb-8 text-muted-foreground">
                  Visit us at one of our global offices.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {offices.map((office) => (
                    <Card key={office.city}>
                      <CardContent className="p-5">
                        <div className="mb-3 flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">{office.city}</h3>
                        </div>
                        <p className="mb-1 text-sm text-muted-foreground">
                          {office.country}
                        </p>
                        <p className="mb-1 text-sm">{office.address}</p>
                        <p className="text-sm text-primary">{office.phone}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Business Hours */}
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Business Hours</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Saturday</span>
                        <span>10:00 AM - 4:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-slate-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {quickFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="h-[400px] bg-slate-200">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <p className="text-lg font-medium text-slate-500">
                Interactive Map Coming Soon
              </p>
              <p className="text-sm text-slate-400">
                100 Market Street, San Francisco, CA 94105
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
