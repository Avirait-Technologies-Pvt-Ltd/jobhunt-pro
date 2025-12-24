import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
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
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Terms of Service</h1>
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
                <h2>1. Agreement to Terms</h2>
                <p>
                  By accessing or using JobHunt Pro's website and services (collectively,
                  the "Services"), you agree to be bound by these Terms of Service
                  ("Terms"). If you do not agree to these Terms, you may not access or
                  use the Services.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you and
                  JobHunt Pro ("Company," "we," "us," or "our").
                </p>

                <h2>2. Description of Services</h2>
                <p>
                  JobHunt Pro is an online platform that connects job seekers with
                  employers. Our Services include:
                </p>
                <ul>
                  <li>Job search and listing features</li>
                  <li>Profile and resume building tools</li>
                  <li>Job application management</li>
                  <li>Career resources and advice</li>
                  <li>Communication tools between job seekers and employers</li>
                </ul>

                <h2>3. User Accounts</h2>
                <h3>Account Creation</h3>
                <p>
                  To access certain features of our Services, you must create an
                  account. When creating an account, you agree to:
                </p>
                <ul>
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information as necessary</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>

                <h3>Account Eligibility</h3>
                <p>
                  You must be at least 18 years old to use our Services. By using our
                  Services, you represent and warrant that you meet this requirement.
                </p>

                <h2>4. User Conduct</h2>
                <p>You agree not to:</p>
                <ul>
                  <li>
                    Use the Services for any unlawful purpose or in violation of these
                    Terms
                  </li>
                  <li>
                    Post false, inaccurate, misleading, or fraudulent content
                  </li>
                  <li>
                    Impersonate another person or entity
                  </li>
                  <li>
                    Harass, abuse, or harm other users
                  </li>
                  <li>
                    Send unsolicited communications (spam)
                  </li>
                  <li>
                    Attempt to gain unauthorized access to our systems
                  </li>
                  <li>
                    Use automated means to access or collect data from our Services
                  </li>
                  <li>
                    Interfere with the proper functioning of the Services
                  </li>
                  <li>
                    Violate any applicable laws or regulations
                  </li>
                </ul>

                <h2>5. User Content</h2>
                <h3>Your Content</h3>
                <p>
                  You retain ownership of any content you submit through our Services,
                  including resumes, profiles, and other materials ("User Content").
                  By submitting User Content, you grant us a worldwide, non-exclusive,
                  royalty-free license to use, display, and distribute your content in
                  connection with our Services.
                </p>

                <h3>Content Accuracy</h3>
                <p>
                  You are solely responsible for the accuracy and completeness of your
                  User Content. You represent and warrant that:
                </p>
                <ul>
                  <li>All information you provide is truthful and accurate</li>
                  <li>
                    You have the right to share all content you submit
                  </li>
                  <li>
                    Your content does not infringe on any third party's rights
                  </li>
                </ul>

                <h2>6. Job Applications</h2>
                <p>
                  When you apply for a job through our Services:
                </p>
                <ul>
                  <li>
                    We share your application materials with the relevant employer
                  </li>
                  <li>
                    We do not guarantee any response or outcome from employers
                  </li>
                  <li>
                    We are not responsible for employer hiring decisions
                  </li>
                  <li>
                    We do not verify the accuracy of job listings
                  </li>
                </ul>

                <h2>7. Intellectual Property</h2>
                <p>
                  All content, features, and functionality of the Services, including
                  but not limited to text, graphics, logos, and software, are the
                  exclusive property of JobHunt Pro and are protected by copyright,
                  trademark, and other intellectual property laws.
                </p>
                <p>
                  You may not copy, modify, distribute, sell, or lease any part of our
                  Services without our prior written consent.
                </p>

                <h2>8. Third-Party Links and Services</h2>
                <p>
                  Our Services may contain links to third-party websites or services.
                  We are not responsible for the content, policies, or practices of any
                  third-party websites or services. Your use of third-party websites is
                  at your own risk.
                </p>

                <h2>9. Disclaimers</h2>
                <p>
                  THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                  WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. WE DO NOT
                  WARRANT THAT:
                </p>
                <ul>
                  <li>The Services will be uninterrupted or error-free</li>
                  <li>The results obtained from the Services will be accurate</li>
                  <li>The Services will meet your requirements</li>
                  <li>Any defects will be corrected</li>
                </ul>
                <p>
                  WE DO NOT GUARANTEE EMPLOYMENT OR ANY SPECIFIC RESULTS FROM USING
                  OUR SERVICES.
                </p>

                <h2>10. Limitation of Liability</h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, JOBHUNT PRO SHALL NOT BE
                  LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                  PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA,
                  OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE
                  SERVICES.
                </p>
                <p>
                  OUR TOTAL LIABILITY FOR ANY CLAIMS UNDER THESE TERMS SHALL NOT EXCEED
                  THE AMOUNT YOU PAID TO US, IF ANY, IN THE PAST TWELVE MONTHS.
                </p>

                <h2>11. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless JobHunt Pro, its
                  affiliates, officers, directors, employees, and agents from any
                  claims, damages, losses, or expenses arising from:
                </p>
                <ul>
                  <li>Your use of the Services</li>
                  <li>Your User Content</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any third party's rights</li>
                </ul>

                <h2>12. Termination</h2>
                <p>
                  We may terminate or suspend your access to the Services at any time,
                  with or without cause, with or without notice. Upon termination:
                </p>
                <ul>
                  <li>Your right to use the Services will cease immediately</li>
                  <li>We may delete your account and User Content</li>
                  <li>
                    Provisions that by their nature should survive termination will
                    survive
                  </li>
                </ul>

                <h2>13. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will
                  notify you of material changes by posting the updated Terms on our
                  website and updating the "Last updated" date. Your continued use of
                  the Services after changes become effective constitutes acceptance
                  of the modified Terms.
                </p>

                <h2>14. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the
                  laws of the State of California, without regard to its conflict of
                  law provisions. Any disputes arising under these Terms shall be
                  resolved in the state or federal courts located in San Francisco,
                  California.
                </p>

                <h2>15. Dispute Resolution</h2>
                <p>
                  Any dispute arising from or relating to these Terms or the Services
                  shall first be attempted to be resolved through informal negotiation.
                  If the dispute cannot be resolved informally, you agree to submit to
                  binding arbitration in San Francisco, California, in accordance with
                  the rules of the American Arbitration Association.
                </p>

                <h2>16. Severability</h2>
                <p>
                  If any provision of these Terms is found to be invalid or
                  unenforceable, the remaining provisions shall remain in full force
                  and effect.
                </p>

                <h2>17. Entire Agreement</h2>
                <p>
                  These Terms, together with our Privacy Policy, constitute the entire
                  agreement between you and JobHunt Pro regarding the use of our
                  Services.
                </p>

                <h2>18. Contact Information</h2>
                <p>
                  If you have questions about these Terms, please contact us:
                </p>
                <ul>
                  <li>Email: legal@jobhuntpro.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Address: 123 Career Street, San Francisco, CA 94105</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
