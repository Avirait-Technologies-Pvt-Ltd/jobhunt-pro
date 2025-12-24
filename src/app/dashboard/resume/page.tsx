'use client';

import React, { useState, useRef } from 'react';
import {
  FileText,
  Download,
  Eye,
  Pencil,
  Plus,
  Trash2,
  Save,
  Palette,
  Layout,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Briefcase,
  GraduationCap,
  Award,
  Printer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    highlights: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: string[];
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
}

const templates = [
  { id: 'modern', name: 'Modern', description: 'Clean and professional' },
  { id: 'classic', name: 'Classic', description: 'Traditional style' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' },
];

const colors = [
  { id: 'blue', name: 'Blue', value: '#2563eb' },
  { id: 'green', name: 'Green', value: '#16a34a' },
  { id: 'purple', name: 'Purple', value: '#7c3aed' },
  { id: 'red', name: 'Red', value: '#dc2626' },
  { id: 'slate', name: 'Slate', value: '#475569' },
];

export default function ResumePage() {
  const { user } = useAuth();
  const printRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('edit');
  const [template, setTemplate] = useState('modern');
  const [color, setColor] = useState('#2563eb');

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: user?.name || '',
      title: user?.title || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      website: user?.website || '',
      linkedin: user?.socialLinks?.linkedin || '',
      summary: user?.bio || '',
    },
    experience: user?.experience?.map((exp) => ({
      id: exp.id,
      title: exp.title,
      company: exp.company,
      location: exp.location || '',
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      current: exp.current,
      highlights: exp.description ? exp.description.split('\n') : [],
    })) || [],
    education: user?.education?.map((edu) => ({
      id: edu.id,
      degree: edu.degree,
      school: edu.school,
      location: edu.location || '',
      startDate: edu.startDate,
      endDate: edu.endDate || '',
      gpa: edu.gpa,
    })) || [],
    skills: user?.skills?.map((s) => s.name) || [],
    certifications: [],
  });

  const [newSkill, setNewSkill] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleAddSkill = () => {
    if (newSkill && !resumeData.skills.includes(newSkill)) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    toast.success('Resume saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <p className="text-muted-foreground">
            Create and customize your professional resume
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print / Download
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Panel - Editor */}
        <div className="lg:col-span-1 space-y-6">
          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layout className="h-5 w-5" />
                Template
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name} - {t.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div>
                <Label className="mb-2 block">Accent Color</Label>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setColor(c.value)}
                      className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                        color === c.value
                          ? 'border-slate-900 scale-110'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sections Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Pencil className="h-5 w-5" />
                Edit Sections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal" className="text-xs">
                    Personal
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs">
                    Work
                  </TabsTrigger>
                  <TabsTrigger value="education" className="text-xs">
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs">
                    Skills
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-4 space-y-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Full Name</Label>
                    <Input
                      value={resumeData.personalInfo.name}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            name: e.target.value,
                          },
                        }))
                      }
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Professional Title</Label>
                    <Input
                      value={resumeData.personalInfo.title}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            title: e.target.value,
                          },
                        }))
                      }
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Email</Label>
                    <Input
                      value={resumeData.personalInfo.email}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            email: e.target.value,
                          },
                        }))
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Phone</Label>
                    <Input
                      value={resumeData.personalInfo.phone}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            phone: e.target.value,
                          },
                        }))
                      }
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Location</Label>
                    <Input
                      value={resumeData.personalInfo.location}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            location: e.target.value,
                          },
                        }))
                      }
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Professional Summary</Label>
                    <Textarea
                      value={resumeData.personalInfo.summary}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            summary: e.target.value,
                          },
                        }))
                      }
                      placeholder="Brief summary of your experience..."
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="mt-4">
                  <div className="space-y-3">
                    {resumeData.experience.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No experience added. Add from your profile.
                      </p>
                    ) : (
                      resumeData.experience.map((exp, index) => (
                        <div key={exp.id} className="rounded-lg border p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-sm">{exp.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {exp.company}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  experience: prev.experience.filter(
                                    (e) => e.id !== exp.id
                                  ),
                                }))
                              }
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="education" className="mt-4">
                  <div className="space-y-3">
                    {resumeData.education.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No education added. Add from your profile.
                      </p>
                    ) : (
                      resumeData.education.map((edu) => (
                        <div key={edu.id} className="rounded-lg border p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-sm">{edu.degree}</h4>
                              <p className="text-xs text-muted-foreground">
                                {edu.school}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  education: prev.education.filter(
                                    (e) => e.id !== edu.id
                                  ),
                                }))
                              }
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="mt-4">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                      />
                      <Button size="icon" onClick={handleAddSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="gap-1">
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="border-b bg-slate-50 print:hidden">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="h-5 w-5" />
                  Preview
                </CardTitle>
                <Badge variant="outline">{template} template</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Resume Preview */}
              <div
                ref={printRef}
                className="bg-white p-8 min-h-[800px] print:p-0"
                id="resume-preview"
              >
                {template === 'modern' && (
                  <ModernTemplate data={resumeData} color={color} />
                )}
                {template === 'classic' && (
                  <ClassicTemplate data={resumeData} color={color} />
                )}
                {template === 'minimal' && (
                  <MinimalTemplate data={resumeData} color={color} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

// Modern Template Component
function ModernTemplate({ data, color }: { data: ResumeData; color: string }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-6" style={{ borderColor: color }}>
        <h1 className="text-3xl font-bold mb-1" style={{ color }}>
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <p className="text-lg text-slate-600 mb-3">
          {data.personalInfo.title || 'Professional Title'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
          {data.personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {data.personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-lg font-semibold mb-2" style={{ color }}>
            Professional Summary
          </h2>
          <p className="text-slate-600">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3" style={{ color }}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-slate-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-slate-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-sm text-slate-600">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3" style={{ color }}>
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-slate-600">{edu.school}</p>
                </div>
                <span className="text-sm text-slate-500">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3" style={{ color }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: `${color}20`, color }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Classic Template Component
function ClassicTemplate({ data, color }: { data: ResumeData; color: string }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b-2 pb-4" style={{ borderColor: color }}>
        <h1 className="text-2xl font-bold">
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <p className="text-slate-600">
          {data.personalInfo.title || 'Professional Title'}
        </p>
        <div className="mt-2 text-sm text-slate-600 space-y-1">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color }}>
            Summary
          </h2>
          <p className="text-sm text-slate-600">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color }}>
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-semibold">{exp.title}</h3>
                  <span className="text-sm text-slate-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-slate-600 italic">{exp.company}</p>
                {exp.highlights.length > 0 && (
                  <ul className="mt-1 list-disc list-inside text-sm text-slate-600">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color }}>
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <span className="text-sm text-slate-500">{edu.endDate}</span>
                </div>
                <p className="text-sm text-slate-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color }}>
            Skills
          </h2>
          <p className="text-sm text-slate-600">{data.skills.join(' • ')}</p>
        </div>
      )}
    </div>
  );
}

// Minimal Template Component
function MinimalTemplate({ data, color }: { data: ResumeData; color: string }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-light mb-2">
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <p className="text-xl text-slate-500">
          {data.personalInfo.title || 'Professional Title'}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <p className="text-slate-600 leading-relaxed">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color }}>
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="font-medium">{exp.title}</h3>
                <p className="text-slate-500 text-sm">
                  {exp.company} / {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                {exp.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>— {h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color }}>
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-medium">{edu.degree}</h3>
                <p className="text-slate-500 text-sm">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill) => (
              <span key={skill} className="text-sm text-slate-600">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
