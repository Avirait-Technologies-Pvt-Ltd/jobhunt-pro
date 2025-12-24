import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-slate-50">
        {/* Header */}
        <section className="border-b bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link href="/" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Privacy Policy</h1>
              </div>
              <p className="text-muted-foreground">
                Last updated: December 2024
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="mx-auto max-w-3xl">
              <CardContent className="prose prose-slate max-w-none p-8">
                <h2>1. Introduction</h2>
                <p>
                  Welcome to JobHunt Pro ("we," "our," or "us"). We are committed to
                  protecting your personal information and your right to privacy. This
                  Privacy Policy explains how we collect, use, disclose, and safeguard
                  your information when you use our website and services.
                </p>
                <p>
                  Please read this privacy policy carefully. If you do not agree with
                  the terms of this privacy policy, please do not access the site.
                </p>

                <h2>2. Information We Collect</h2>
                <h3>Personal Information</h3>
                <p>
                  We may collect personal information that you voluntarily provide to
                  us when you:
                </p>
                <ul>
                  <li>Register for an account</li>
                  <li>Fill out a profile or application</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us through our website</li>
                  <li>Apply for jobs through our platform</li>
                </ul>
                <p>This information may include:</p>
                <ul>
                  <li>Name, email address, and phone number</li>
                  <li>Resume/CV information including work history and education</li>
                  <li>Skills, certifications, and professional qualifications</li>
                  <li>Profile pictures and other uploaded media</li>
                  <li>Job preferences and career interests</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>
                  When you visit our website, we may automatically collect certain
                  information about your device, including:
                </p>
                <ul>
                  <li>IP address and browser type</li>
                  <li>Operating system and device information</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Click patterns and navigation paths</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide, operate, and maintain our services</li>
                  <li>Connect job seekers with potential employers</li>
                  <li>Process job applications on your behalf</li>
                  <li>Personalize your experience and job recommendations</li>
                  <li>Send you relevant job alerts and notifications</li>
                  <li>Improve our website and services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send marketing and promotional communications (with consent)</li>
                  <li>Detect and prevent fraud and abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2>4. Information Sharing</h2>
                <p>We may share your information in the following situations:</p>
                <h3>With Employers</h3>
                <p>
                  When you apply for a job, we share your application information with
                  the relevant employer. This includes your resume, cover letter, and
                  any additional information you provide.
                </p>
                <h3>With Service Providers</h3>
                <p>
                  We may share your information with third-party service providers who
                  perform services on our behalf, such as hosting, analytics, email
                  delivery, and customer support.
                </p>
                <h3>For Legal Purposes</h3>
                <p>
                  We may disclose your information if required by law or in response to
                  valid legal requests from public authorities.
                </p>

                <h2>5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no method of
                  transmission over the internet is 100% secure.
                </p>

                <h2>6. Your Privacy Rights</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul>
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Data portability (receive your data in a structured format)</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information
                  provided below.
                </p>

                <h2>7. Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on
                  our website and store certain information. You can instruct your
                  browser to refuse all cookies or to indicate when a cookie is being
                  sent.
                </p>
                <p>We use the following types of cookies:</p>
                <ul>
                  <li>
                    <strong>Essential Cookies:</strong> Required for the website to
                    function properly
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how visitors
                    interact with our website
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> Remember your settings and
                    preferences
                  </li>
                </ul>

                <h2>8. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites and services.
                  We are not responsible for the privacy practices of these third
                  parties. We encourage you to read the privacy policies of any linked
                  websites.
                </p>

                <h2>9. Children's Privacy</h2>
                <p>
                  Our services are not intended for individuals under the age of 18. We
                  do not knowingly collect personal information from children. If you
                  become aware that a child has provided us with personal information,
                  please contact us.
                </p>

                <h2>10. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to
                  fulfill the purposes outlined in this privacy policy, unless a longer
                  retention period is required by law. When you delete your account, we
                  will delete your personal information within 30 days, except as
                  required for legal or legitimate business purposes.
                </p>

                <h2>11. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries
                  other than your own. We ensure appropriate safeguards are in place to
                  protect your information in accordance with this privacy policy.
                </p>

                <h2>12. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify
                  you of any changes by posting the new privacy policy on this page and
                  updating the "Last updated" date. You are advised to review this
                  privacy policy periodically.
                </p>

                <h2>13. Contact Us</h2>
                <p>
                  If you have questions or concerns about this privacy policy or our
                  data practices, please contact us:
                </p>
                <ul>
                  <li>Email: privacy@jobhuntpro.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Address: 123 Career Street, San Francisco, CA 94105</li>
                </ul>
                <p>
                  You may also contact our Data Protection Officer at:
                  dpo@jobhuntpro.com
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
