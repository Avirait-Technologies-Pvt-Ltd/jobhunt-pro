'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Briefcase,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { userAnalytics, getProfileViewsTrend, getSuccessRate } from '@/data/analytics';
import { toast } from 'sonner';

export default function AnalyticsPage() {
  const profileTrend = getProfileViewsTrend();
  const successRate = getSuccessRate();
  const { applicationStats } = userAnalytics;

  const handleExport = () => {
    toast.success('Analytics data exported to CSV');
  };

  const maxProfileViews = Math.max(...userAnalytics.profileViews.map((v) => v.value));
  const maxWeeklyApps = Math.max(...userAnalytics.applicationsByWeek.map((v) => v.value));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track your job search performance and insights
          </p>
        </div>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <p className="text-3xl font-bold">{profileTrend.current}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {profileTrend.change >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  profileTrend.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {profileTrend.change >= 0 ? '+' : ''}{profileTrend.change}%
              </span>
              <span className="text-sm text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Applications Sent</p>
                <p className="text-3xl font-bold">{applicationStats.total}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Send className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">+12%</span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-3xl font-bold">{userAnalytics.responseRate}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">+5%</span>
              <span className="text-sm text-muted-foreground">vs avg</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-3xl font-bold">{successRate}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                <CheckCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                {applicationStats.offers} offers, {applicationStats.interviews} interviews
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Views Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Profile Views
            </CardTitle>
            <CardDescription>Daily profile views over the last 15 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-end gap-1">
              {userAnalytics.profileViews.map((view, index) => (
                <div key={index} className="group relative flex-1">
                  <div
                    className="w-full rounded-t bg-blue-500 transition-all hover:bg-blue-600"
                    style={{ height: `${(view.value / maxProfileViews) * 100}%` }}
                  />
                  <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
                    {view.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Jan 1</span>
              <span>Jan 15</span>
            </div>
          </CardContent>
        </Card>

        {/* Application Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Application Funnel
            </CardTitle>
            <CardDescription>Your application pipeline breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-400" />
                    <span className="text-sm">Applied</span>
                  </div>
                  <span className="text-sm font-medium">{applicationStats.total}</span>
                </div>
                <Progress value={100} className="h-3" />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="text-sm font-medium">{applicationStats.pending}</span>
                </div>
                <Progress
                  value={(applicationStats.pending / applicationStats.total) * 100}
                  className="h-3 [&>div]:bg-yellow-500"
                />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="text-sm">Reviewed</span>
                  </div>
                  <span className="text-sm font-medium">{applicationStats.reviewed}</span>
                </div>
                <Progress
                  value={(applicationStats.reviewed / applicationStats.total) * 100}
                  className="h-3 [&>div]:bg-blue-500"
                />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500" />
                    <span className="text-sm">Interviews</span>
                  </div>
                  <span className="text-sm font-medium">{applicationStats.interviews}</span>
                </div>
                <Progress
                  value={(applicationStats.interviews / applicationStats.total) * 100}
                  className="h-3 [&>div]:bg-purple-500"
                />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-sm">Offers</span>
                  </div>
                  <span className="text-sm font-medium">{applicationStats.offers}</span>
                </div>
                <Progress
                  value={(applicationStats.offers / applicationStats.total) * 100}
                  className="h-3 [&>div]:bg-green-500"
                />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-sm">Rejected</span>
                  </div>
                  <span className="text-sm font-medium">{applicationStats.rejected}</span>
                </div>
                <Progress
                  value={(applicationStats.rejected / applicationStats.total) * 100}
                  className="h-3 [&>div]:bg-red-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Your activity pattern this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userAnalytics.weeklyActivity.map((day) => (
                <div key={day.day} className="flex items-center gap-4">
                  <span className="w-10 text-sm font-medium">{day.day}</span>
                  <div className="flex flex-1 gap-2">
                    <div className="flex-1">
                      <div className="mb-1 text-xs text-muted-foreground">
                        Applications: {day.applications}
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(day.applications / 6) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 text-xs text-muted-foreground">
                        Profile Updates: {day.profileUpdates}
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${(day.profileUpdates / 3) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Top Skills in Demand
            </CardTitle>
            <CardDescription>Most searched skills matching your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userAnalytics.topSearchedSkills.map((skill, index) => (
                <div key={skill.skill} className="flex items-center gap-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <span className="text-sm text-muted-foreground">
                        {skill.count} jobs
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{
                          width: `${(skill.count / userAnalytics.topSearchedSkills[0].count) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications by Week */}
      <Card>
        <CardHeader>
          <CardTitle>Applications Over Time</CardTitle>
          <CardDescription>Your application activity by week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-end gap-4">
            {userAnalytics.applicationsByWeek.map((week, index) => (
              <div key={index} className="group relative flex-1">
                <div className="mb-2 text-center text-sm text-muted-foreground">
                  {week.date}
                </div>
                <div
                  className="w-full rounded-t bg-gradient-to-t from-purple-500 to-blue-500 transition-all hover:from-purple-600 hover:to-blue-600"
                  style={{ height: `${(week.value / maxWeeklyApps) * 100}%`, minHeight: '20px' }}
                />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {week.value} apps
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Strong Performance</span>
              </div>
              <p className="text-sm text-green-700">
                Your response rate of {userAnalytics.responseRate}% is above the industry average of 35%.
              </p>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Quick Responses</span>
              </div>
              <p className="text-sm text-blue-700">
                Average response time is {userAnalytics.averageResponseTime} days. Keep applying early!
              </p>
            </div>
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Skill Match</span>
              </div>
              <p className="text-sm text-yellow-700">
                React and TypeScript are in high demand. Consider highlighting these more.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
