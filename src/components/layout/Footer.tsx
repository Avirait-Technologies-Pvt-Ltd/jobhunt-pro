'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  forJobSeekers: [
    { href: '/jobs', label: 'Browse Jobs' },
    { href: '/companies', label: 'Browse Companies' },
    { href: '/dashboard', label: 'My Dashboard' },
    { href: '/dashboard/resume', label: 'Resume Builder' },
    { href: '/blog', label: 'Career Resources' },
  ],
  forEmployers: [
    { href: '#', label: 'Post a Job' },
    { href: '#', label: 'Browse Candidates' },
    { href: '#', label: 'Pricing Plans' },
    { href: '#', label: 'Employer Dashboard' },
    { href: '#', label: 'Recruitment Solutions' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/blog', label: 'Blog' },
    { href: '#', label: 'Press' },
    { href: '#', label: 'Careers' },
  ],
  support: [
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Help Center' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '#', label: 'Accessibility' },
  ],
};

const socialLinks = [
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Twitter, label: 'Twitter' },
  { href: '#', icon: Linkedin, label: 'LinkedIn' },
  { href: '#', icon: Instagram, label: 'Instagram' },
];

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white">
                Get the latest jobs delivered to your inbox
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Subscribe to our newsletter and never miss a great opportunity
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full max-w-md gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-white">JobHunt Pro</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              JobHunt Pro is your trusted partner in finding the perfect career opportunity.
              We connect talented professionals with leading companies worldwide.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@jobhuntpro.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA 94105</span>
              </div>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="font-semibold text-white">For Job Seekers</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.forJobSeekers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold text-white">For Employers</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.forEmployers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} JobHunt Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="rounded-full p-2 transition-colors hover:bg-slate-800 hover:text-primary"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
