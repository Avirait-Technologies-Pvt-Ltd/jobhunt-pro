'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  FileText,
  Save,
  Download,
  Eye,
  Sparkles,
  Copy,
  Check,
  Building2,
  Briefcase,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Suspense } from 'react';

const templates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional and formal style for corporate roles',
    color: 'bg-blue-500',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design for tech roles',
    color: 'bg-purple-500',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unique style for design and creative positions',
    color: 'bg-pink-500',
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'Minimalist approach focusing on content',
    color: 'bg-slate-500',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated format for senior positions',
    color: 'bg-amber-600',
  },
];

const suggestionCategories = [
  {
    category: 'Opening Lines',
    suggestions: [
      'I am writing to express my strong interest in the [Position] role at [Company].',
      'With great enthusiasm, I submit my application for the [Position] position.',
      'I was excited to discover the [Position] opening at [Company], as it aligns perfectly with my career goals.',
      'Having followed [Company]\'s innovative work in [Industry], I am thrilled to apply for [Position].',
    ],
  },
  {
    category: 'Experience Highlights',
    suggestions: [
      'In my current role at [Company], I have successfully [achievement].',
      'Over the past [X] years, I have developed expertise in [skills].',
      'My experience includes [specific accomplishment with metrics].',
      'I have consistently exceeded targets, including [specific example].',
    ],
  },
  {
    category: 'Skills & Qualifications',
    suggestions: [
      'My technical skills include proficiency in [technologies/tools].',
      'I bring a unique combination of [skill 1] and [skill 2].',
      'My background in [field] has equipped me with [relevant skills].',
      'I am certified in [certification] and experienced with [tool/methodology].',
    ],
  },
  {
    category: 'Company Interest',
    suggestions: [
      'I am particularly drawn to [Company]\'s commitment to [value/mission].',
      'Your recent [project/achievement] demonstrates the innovative spirit I want to be part of.',
      'The opportunity to contribute to [Company]\'s [goal/initiative] excites me.',
      'I admire how [Company] has [achievement], and I want to contribute to continued success.',
    ],
  },
  {
    category: 'Closing Lines',
    suggestions: [
      'I would welcome the opportunity to discuss how my skills can contribute to your team.',
      'Thank you for considering my application. I look forward to speaking with you.',
      'I am eager to bring my experience and enthusiasm to [Company]. Please feel free to contact me.',
      'I am confident that my background makes me an ideal candidate and hope to discuss this further.',
    ],
  },
];

interface LetterContent {
  title: string;
  jobTitle: string;
  companyName: string;
  recipientName: string;
  recipientTitle: string;
  yourName: string;
  yourEmail: string;
  yourPhone: string;
  yourLocation: string;
  opening: string;
  body: string;
  closing: string;
  template: string;
}

function CoverLetterBuilderContent() {
  const searchParams = useSearchParams();
  const letterId = searchParams.get('id');

  const [content, setContent] = useState<LetterContent>({
    title: '',
    jobTitle: '',
    companyName: '',
    recipientName: 'Hiring Manager',
    recipientTitle: '',
    yourName: 'John Doe',
    yourEmail: 'john.doe@email.com',
    yourPhone: '(555) 123-4567',
    yourLocation: 'San Francisco, CA',
    opening: '',
    body: '',
    closing: '',
    template: 'professional',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('compose');

  const handleChange = (field: keyof LetterContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const insertSuggestion = (suggestion: string) => {
    const textarea = document.getElementById('body-textarea') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentBody = content.body;
      const newBody = currentBody.substring(0, start) + suggestion + currentBody.substring(end);
      handleChange('body', newBody);
      toast.success('Suggestion inserted');
    } else {
      handleChange('body', content.body + (content.body ? '\n\n' : '') + suggestion);
      toast.success('Suggestion added');
    }
  };

  const generateFullLetter = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `${content.yourName}
${content.yourEmail}
${content.yourPhone}
${content.yourLocation}

${today}

${content.recipientName}${content.recipientTitle ? `\n${content.recipientTitle}` : ''}
${content.companyName}

Dear ${content.recipientName},

${content.opening}

${content.body}

${content.closing}

Sincerely,
${content.yourName}`;
  };

  const handleSave = () => {
    if (!content.title) {
      toast.error('Please add a title for your cover letter');
      return;
    }
    toast.success('Cover letter saved successfully');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateFullLetter());
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generateFullLetter()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${content.title || 'cover-letter'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Cover letter downloaded');
  };

  const selectedTemplate = templates.find((t) => t.id === content.template);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/cover-letters">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {letterId ? 'Edit Cover Letter' : 'New Cover Letter'}
            </h1>
            <p className="text-muted-foreground">
              Create a compelling cover letter for your application
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" onClick={handleCopy}>
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Template */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Letter Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="title">Letter Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Senior Developer - TechCorp"
                    value={content.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="template">Template</Label>
                  <Select
                    value={content.template}
                    onValueChange={(v) => handleChange('template', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          <div className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${t.color}`} />
                            {t.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="jobTitle"
                      className="pl-9"
                      placeholder="e.g., Senior Software Engineer"
                      value={content.jobTitle}
                      onChange={(e) => handleChange('jobTitle', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="companyName"
                      className="pl-9"
                      placeholder="e.g., TechCorp Inc."
                      value={content.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Compose/Your Info */}
          <Card>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <CardHeader className="pb-0">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="compose">Compose Letter</TabsTrigger>
                  <TabsTrigger value="info">Your Information</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="pt-6">
                <TabsContent value="compose" className="space-y-4 mt-0">
                  <div>
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      placeholder="e.g., Hiring Manager or Jane Smith"
                      value={content.recipientName}
                      onChange={(e) => handleChange('recipientName', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="opening">Opening Paragraph</Label>
                    <textarea
                      id="opening"
                      className="mt-1 min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Start with why you're interested in this role and company..."
                      value={content.opening}
                      onChange={(e) => handleChange('opening', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="body-textarea">Main Body</Label>
                    <textarea
                      id="body-textarea"
                      className="mt-1 min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Highlight your relevant experience, skills, and accomplishments..."
                      value={content.body}
                      onChange={(e) => handleChange('body', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="closing">Closing Paragraph</Label>
                    <textarea
                      id="closing"
                      className="mt-1 min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Thank them and express interest in further discussion..."
                      value={content.closing}
                      onChange={(e) => handleChange('closing', e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="info" className="space-y-4 mt-0">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="yourName">Your Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="yourName"
                          className="pl-9"
                          value={content.yourName}
                          onChange={(e) => handleChange('yourName', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="yourEmail">Your Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="yourEmail"
                          className="pl-9"
                          value={content.yourEmail}
                          onChange={(e) => handleChange('yourEmail', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="yourPhone">Your Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="yourPhone"
                          className="pl-9"
                          value={content.yourPhone}
                          onChange={(e) => handleChange('yourPhone', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="yourLocation">Your Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="yourLocation"
                          className="pl-9"
                          value={content.yourLocation}
                          onChange={(e) => handleChange('yourLocation', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h4 className="mb-2 font-medium">Tip</h4>
                    <p className="text-sm text-muted-foreground">
                      Your contact information will appear at the top of the cover letter.
                      Make sure to use a professional email address.
                    </p>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        {/* Sidebar - Suggestions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Writing Suggestions
              </CardTitle>
              <CardDescription>
                Click to insert pre-written phrases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestionCategories.map((category) => (
                <div key={category.category}>
                  <h4 className="mb-2 text-sm font-medium">{category.category}</h4>
                  <div className="space-y-2">
                    {category.suggestions.slice(0, 2).map((suggestion, i) => (
                      <button
                        key={i}
                        className="w-full rounded-lg border p-2 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        onClick={() => insertSuggestion(suggestion)}
                      >
                        {suggestion.substring(0, 60)}...
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Template Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`mb-4 h-2 w-full rounded-full ${selectedTemplate?.color}`} />
              <h4 className="font-medium">{selectedTemplate?.name}</h4>
              <p className="text-sm text-muted-foreground">
                {selectedTemplate?.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips for Success</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-600" />
                  Keep it to one page
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-600" />
                  Customize for each job
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-600" />
                  Use specific examples
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-600" />
                  Match the company tone
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-600" />
                  Proofread carefully
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Cover Letter Preview</DialogTitle>
            <DialogDescription>
              Review your cover letter before saving or downloading
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto rounded-lg border bg-white p-8">
            <div className={`mb-6 h-1 w-16 rounded ${selectedTemplate?.color}`} />
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {generateFullLetter()}
            </pre>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function BuilderLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-64 animate-pulse rounded bg-muted" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-48 animate-pulse rounded-lg bg-muted" />
          <div className="h-96 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="h-96 animate-pulse rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export default function CoverLetterBuilderPage() {
  return (
    <Suspense fallback={<BuilderLoading />}>
      <CoverLetterBuilderContent />
    </Suspense>
  );
}
