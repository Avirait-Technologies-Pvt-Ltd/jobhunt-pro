'use client';

import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Camera,
  Building2,
  Calendar,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
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
import { Experience, Education, Skill } from '@/types';

const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    title: user?.title || '',
    bio: user?.bio || '',
    website: user?.website || '',
    linkedin: user?.socialLinks?.linkedin || '',
    github: user?.socialLinks?.github || '',
    twitter: user?.socialLinks?.twitter || '',
  });

  // Experience state
  const [experiences, setExperiences] = useState<Experience[]>(user?.experience || []);
  const [showExpDialog, setShowExpDialog] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [expForm, setExpForm] = useState<Partial<Experience>>({});

  // Education state
  const [educations, setEducations] = useState<Education[]>(user?.education || []);
  const [showEduDialog, setShowEduDialog] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [eduForm, setEduForm] = useState<Partial<Education>>({});

  // Skills state
  const [skills, setSkills] = useState<Skill[]>(user?.skills || []);
  const [showSkillDialog, setShowSkillDialog] = useState(false);
  const [skillForm, setSkillForm] = useState<Partial<Skill>>({});

  const handleSaveProfile = () => {
    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      title: formData.title,
      bio: formData.bio,
      website: formData.website,
      socialLinks: {
        linkedin: formData.linkedin,
        github: formData.github,
        twitter: formData.twitter,
      },
      experience: experiences,
      education: educations,
      skills: skills,
    });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  // Experience handlers
  const handleAddExperience = () => {
    if (!expForm.title || !expForm.company) {
      toast.error('Please fill in required fields');
      return;
    }
    const newExp: Experience = {
      id: editingExp?.id || `exp-${Date.now()}`,
      title: expForm.title || '',
      company: expForm.company || '',
      location: expForm.location || '',
      startDate: expForm.startDate || '',
      endDate: expForm.endDate,
      current: expForm.current || false,
      description: expForm.description || '',
    };

    if (editingExp) {
      setExperiences((prev) =>
        prev.map((e) => (e.id === editingExp.id ? newExp : e))
      );
    } else {
      setExperiences((prev) => [...prev, newExp]);
    }

    setShowExpDialog(false);
    setEditingExp(null);
    setExpForm({});
    toast.success(editingExp ? 'Experience updated!' : 'Experience added!');
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
    toast.success('Experience removed');
  };

  // Education handlers
  const handleAddEducation = () => {
    if (!eduForm.degree || !eduForm.school) {
      toast.error('Please fill in required fields');
      return;
    }
    const newEdu: Education = {
      id: editingEdu?.id || `edu-${Date.now()}`,
      degree: eduForm.degree || '',
      field: eduForm.field || '',
      school: eduForm.school || '',
      location: eduForm.location || '',
      startDate: eduForm.startDate || '',
      endDate: eduForm.endDate,
      current: eduForm.current || false,
      gpa: eduForm.gpa,
    };

    if (editingEdu) {
      setEducations((prev) =>
        prev.map((e) => (e.id === editingEdu.id ? newEdu : e))
      );
    } else {
      setEducations((prev) => [...prev, newEdu]);
    }

    setShowEduDialog(false);
    setEditingEdu(null);
    setEduForm({});
    toast.success(editingEdu ? 'Education updated!' : 'Education added!');
  };

  const handleDeleteEducation = (id: string) => {
    setEducations((prev) => prev.filter((e) => e.id !== id));
    toast.success('Education removed');
  };

  // Skills handlers
  const handleAddSkill = () => {
    if (!skillForm.name) {
      toast.error('Please enter a skill name');
      return;
    }
    const newSkill: Skill = {
      name: skillForm.name || '',
      level: skillForm.level || 'Intermediate',
    };

    if (skills.some((s) => s.name.toLowerCase() === newSkill.name.toLowerCase())) {
      toast.error('Skill already exists');
      return;
    }

    setSkills((prev) => [...prev, newSkill]);
    setShowSkillDialog(false);
    setSkillForm({});
    toast.success('Skill added!');
  };

  const handleDeleteSkill = (name: string) => {
    setSkills((prev) => prev.filter((s) => s.name !== name));
    toast.success('Skill removed');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information and settings
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Profile Completion */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">Profile Completion</span>
                <span className="text-sm text-muted-foreground">
                  {user?.profileCompletion || 0}%
                </span>
              </div>
              <Progress value={user?.profileCompletion || 0} className="h-2" />
            </div>
            <div className="flex flex-wrap gap-2">
              {!user?.avatar && (
                <Badge variant="outline">Add photo</Badge>
              )}
              {experiences.length === 0 && (
                <Badge variant="outline">Add experience</Badge>
              )}
              {educations.length === 0 && (
                <Badge variant="outline">Add education</Badge>
              )}
              {skills.length === 0 && (
                <Badge variant="outline">Add skills</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Avatar Card */}
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-3xl text-primary-foreground">
                      {user?.name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <h3 className="text-lg font-semibold">{user?.name || 'Your Name'}</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.title || 'Your Title'}
                </p>
                <div className="mt-4 flex gap-2">
                  {user?.socialLinks?.linkedin && (
                    <a
                      href={user.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border p-2 hover:bg-slate-100"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {user?.socialLinks?.github && (
                    <a
                      href={user.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border p-2 hover:bg-slate-100"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {user?.socialLinks?.twitter && (
                    <a
                      href={user.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border p-2 hover:bg-slate-100"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Personal Info Form */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="Software Engineer"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      disabled={!isEditing}
                      className="pl-10"
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Social Links</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="linkedin"
                          value={formData.linkedin}
                          onChange={(e) =>
                            setFormData({ ...formData, linkedin: e.target.value })
                          }
                          disabled={!isEditing}
                          className="pl-10"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="github"
                          value={formData.github}
                          onChange={(e) =>
                            setFormData({ ...formData, github: e.target.value })
                          }
                          disabled={!isEditing}
                          className="pl-10"
                          placeholder="https://github.com/username"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Personal Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Add your work history and professional experience
                </CardDescription>
              </div>
              <Dialog open={showExpDialog} onOpenChange={setShowExpDialog}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingExp(null);
                      setExpForm({});
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>
                      {editingExp ? 'Edit Experience' : 'Add Experience'}
                    </DialogTitle>
                    <DialogDescription>
                      Add details about your work experience
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Job Title *</Label>
                      <Input
                        value={expForm.title || ''}
                        onChange={(e) =>
                          setExpForm({ ...expForm, title: e.target.value })
                        }
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company *</Label>
                      <Input
                        value={expForm.company || ''}
                        onChange={(e) =>
                          setExpForm({ ...expForm, company: e.target.value })
                        }
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={expForm.location || ''}
                        onChange={(e) =>
                          setExpForm({ ...expForm, location: e.target.value })
                        }
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={expForm.startDate || ''}
                          onChange={(e) =>
                            setExpForm({ ...expForm, startDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          value={expForm.endDate || ''}
                          onChange={(e) =>
                            setExpForm({ ...expForm, endDate: e.target.value })
                          }
                          disabled={expForm.current}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="currentJob"
                        checked={expForm.current || false}
                        onChange={(e) =>
                          setExpForm({ ...expForm, current: e.target.checked })
                        }
                        className="h-4 w-4"
                      />
                      <Label htmlFor="currentJob" className="font-normal">
                        I currently work here
                      </Label>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={expForm.description || ''}
                        onChange={(e) =>
                          setExpForm({ ...expForm, description: e.target.value })
                        }
                        placeholder="Describe your responsibilities and achievements..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowExpDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddExperience}>
                      {editingExp ? 'Update' : 'Add'} Experience
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {experiences.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Briefcase className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 font-semibold">No experience added</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Add your work experience to showcase your professional background
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex gap-4 rounded-lg border p-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                        <Building2 className="h-6 w-6 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{exp.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {exp.company} • {exp.location}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingExp(exp);
                                setExpForm(exp);
                                setShowExpDialog(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteExperience(exp.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {exp.description && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Education</CardTitle>
                <CardDescription>
                  Add your educational background
                </CardDescription>
              </div>
              <Dialog open={showEduDialog} onOpenChange={setShowEduDialog}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingEdu(null);
                      setEduForm({});
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Education
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>
                      {editingEdu ? 'Edit Education' : 'Add Education'}
                    </DialogTitle>
                    <DialogDescription>
                      Add details about your education
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Degree *</Label>
                      <Input
                        value={eduForm.degree || ''}
                        onChange={(e) =>
                          setEduForm({ ...eduForm, degree: e.target.value })
                        }
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input
                        value={eduForm.field || ''}
                        onChange={(e) =>
                          setEduForm({ ...eduForm, field: e.target.value })
                        }
                        placeholder="Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>School *</Label>
                      <Input
                        value={eduForm.school || ''}
                        onChange={(e) =>
                          setEduForm({ ...eduForm, school: e.target.value })
                        }
                        placeholder="University Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={eduForm.location || ''}
                        onChange={(e) =>
                          setEduForm({ ...eduForm, location: e.target.value })
                        }
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={eduForm.startDate || ''}
                          onChange={(e) =>
                            setEduForm({ ...eduForm, startDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          value={eduForm.endDate || ''}
                          onChange={(e) =>
                            setEduForm({ ...eduForm, endDate: e.target.value })
                          }
                          disabled={eduForm.current}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>GPA (Optional)</Label>
                      <Input
                        value={eduForm.gpa || ''}
                        onChange={(e) =>
                          setEduForm({ ...eduForm, gpa: e.target.value })
                        }
                        placeholder="3.8/4.0"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowEduDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddEducation}>
                      {editingEdu ? 'Update' : 'Add'} Education
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {educations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <GraduationCap className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 font-semibold">No education added</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Add your educational background to complete your profile
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {educations.map((edu) => (
                    <div
                      key={edu.id}
                      className="flex gap-4 rounded-lg border p-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                        <GraduationCap className="h-6 w-6 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{edu.degree}</h4>
                            <p className="text-sm text-muted-foreground">
                              {edu.field && `${edu.field} • `}{edu.school}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                              {edu.gpa && ` • GPA: ${edu.gpa}`}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingEdu(edu);
                                setEduForm(edu);
                                setShowEduDialog(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteEducation(edu.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Skills</CardTitle>
                <CardDescription>
                  Showcase your professional skills
                </CardDescription>
              </div>
              <Dialog open={showSkillDialog} onOpenChange={setShowSkillDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => setSkillForm({})}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Skill</DialogTitle>
                    <DialogDescription>
                      Add a new skill to your profile
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Skill Name *</Label>
                      <Input
                        value={skillForm.name || ''}
                        onChange={(e) =>
                          setSkillForm({ ...skillForm, name: e.target.value })
                        }
                        placeholder="e.g., JavaScript, Project Management"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Proficiency Level</Label>
                      <Select
                        value={skillForm.level || 'Intermediate'}
                        onValueChange={(value) =>
                          setSkillForm({ ...skillForm, level: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {skillLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowSkillDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddSkill}>Add Skill</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {skills.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Award className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 font-semibold">No skills added</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Add your skills to help employers find you
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className="gap-2 px-3 py-1.5 text-sm"
                    >
                      {skill.name}
                      <span className="text-xs text-muted-foreground">
                        ({skill.level})
                      </span>
                      <button
                        onClick={() => handleDeleteSkill(skill.name)}
                        className="ml-1 rounded-full hover:bg-slate-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
