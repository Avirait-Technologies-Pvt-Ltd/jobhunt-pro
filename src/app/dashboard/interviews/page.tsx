'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  Phone,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  List,
  Grid3X3,
  Plus,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { interviews, getInterviewStats, getUpcomingInterviews, getPastInterviews } from '@/data/interviews';
import { Interview } from '@/types';

const typeIcons: Record<Interview['type'], React.ElementType> = {
  phone: Phone,
  video: Video,
  onsite: MapPin,
  technical: FileText,
  behavioral: Users,
};

const typeLabels: Record<Interview['type'], string> = {
  phone: 'Phone Screen',
  video: 'Video Call',
  onsite: 'On-site',
  technical: 'Technical',
  behavioral: 'Behavioral',
};

const statusColors: Record<Interview['status'], string> = {
  scheduled: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  rescheduled: 'bg-yellow-100 text-yellow-800',
};

export default function InterviewsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [activeTab, setActiveTab] = useState('upcoming');

  const stats = getInterviewStats();
  const upcomingInterviews = getUpcomingInterviews();
  const pastInterviews = getPastInterviews();

  // Calendar logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];

    // Add empty slots for days before the first day of month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [firstDayWeekday, daysInMonth]);

  const getInterviewsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return interviews.filter((interview) => interview.date === dateStr);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const InterviewCard = ({ interview }: { interview: Interview }) => {
    const TypeIcon = typeIcons[interview.type];
    const completedChecklist = interview.prepChecklist.filter((item) => item.completed).length;
    const totalChecklist = interview.prepChecklist.length;

    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                <Building2 className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <Link
                  href={`/dashboard/interviews/${interview.id}`}
                  className="font-semibold hover:text-primary"
                >
                  {interview.jobTitle}
                </Link>
                <p className="text-sm text-muted-foreground">{interview.companyName}</p>
              </div>
            </div>
            <Badge className={statusColors[interview.status]}>
              {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
            </Badge>
          </div>

          <div className="mt-4 grid gap-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              {new Date(interview.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {formatTime(interview.time)} ({interview.duration} min)
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TypeIcon className="h-4 w-4" />
              {typeLabels[interview.type]}
              {interview.location && ` - ${interview.location}`}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              {interview.interviewers.join(', ')}
            </div>
          </div>

          {interview.status === 'scheduled' && totalChecklist > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Preparation</span>
                <span className="font-medium">
                  {completedChecklist}/{totalChecklist} complete
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${(completedChecklist / totalChecklist) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link href={`/dashboard/interviews/${interview.id}`}>
                View Details
              </Link>
            </Button>
            {interview.meetingLink && interview.status === 'scheduled' && (
              <Button size="sm" asChild>
                <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                  <Video className="mr-2 h-4 w-4" />
                  Join
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Interviews</h1>
          <p className="text-muted-foreground">
            Manage your upcoming interviews and preparation
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center rounded-lg border bg-white p-1">
            <Button
              variant={viewMode === 'calendar' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
            >
              <Grid3X3 className="mr-2 h-4 w-4" />
              Calendar
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="mr-2 h-4 w-4" />
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.scheduled}</p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.cancelled}</p>
                <p className="text-sm text-muted-foreground">Cancelled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <AlertCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {viewMode === 'calendar' ? (
        /* Calendar View */
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {monthNames[month]} {year}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {/* Week day headers */}
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-sm font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="min-h-[100px] p-1" />;
                }

                const dayInterviews = getInterviewsForDay(day);
                const isToday =
                  day === new Date().getDate() &&
                  month === new Date().getMonth() &&
                  year === new Date().getFullYear();

                return (
                  <div
                    key={day}
                    className={`min-h-[100px] rounded-lg border p-1 ${
                      isToday ? 'border-primary bg-primary/5' : ''
                    }`}
                  >
                    <div
                      className={`mb-1 text-sm font-medium ${
                        isToday ? 'text-primary' : ''
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayInterviews.slice(0, 2).map((interview) => (
                        <Link
                          key={interview.id}
                          href={`/dashboard/interviews/${interview.id}`}
                          className={`block truncate rounded px-1 py-0.5 text-xs ${
                            interview.status === 'scheduled'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                              : interview.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {formatTime(interview.time)} {interview.companyName}
                        </Link>
                      ))}
                      {dayInterviews.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayInterviews.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* List View */
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingInterviews.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastInterviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4">
            {upcomingInterviews.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <CalendarIcon className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">No upcoming interviews</h3>
                  <p className="text-center text-muted-foreground">
                    When you schedule interviews, they'll appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingInterviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-4">
            {pastInterviews.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <CalendarIcon className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">No past interviews</h3>
                  <p className="text-center text-muted-foreground">
                    Your completed interviews will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {pastInterviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Interview Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Preparation Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="mb-1 font-medium">Research the Company</h4>
              <p className="text-sm text-muted-foreground">
                Learn about the company's mission, products, and recent news before your interview.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="mb-1 font-medium">Practice Common Questions</h4>
              <p className="text-sm text-muted-foreground">
                Prepare answers for common interview questions using the STAR method.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Video className="h-5 w-5 text-purple-600" />
              </div>
              <h4 className="mb-1 font-medium">Test Your Setup</h4>
              <p className="text-sm text-muted-foreground">
                For video interviews, test your camera, microphone, and internet connection.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
