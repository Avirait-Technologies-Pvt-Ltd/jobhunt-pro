/**
 * Job Application Tracker - Statistics Utilities
 *
 * This file contains functions for calculating statistics
 * and aggregations for job applications.
 */

import type {
  JobApplication,
  ApplicationStatus,
  ApplicationPriority,
  ApplicationStatistics,
} from '../types/job-application';

import { ACTIVE_STATUSES } from '../types/job-application';
import { getMonthYearKey, daysBetween, isWithinLastDays, isOverdue } from './application-timeline';

// ============================================================================
// Count Functions
// ============================================================================

/**
 * Count applications by status
 */
export function countByStatus(
  applications: JobApplication[]
): Record<ApplicationStatus, number> {
  const counts: Record<ApplicationStatus, number> = {
    saved: 0,
    applied: 0,
    screening: 0,
    interviewing: 0,
    offer: 0,
    rejected: 0,
    accepted: 0,
    withdrawn: 0,
  };

  for (const app of applications) {
    counts[app.status]++;
  }

  return counts;
}

/**
 * Count applications by priority
 */
export function countByPriority(
  applications: JobApplication[]
): Record<ApplicationPriority, number> {
  const counts: Record<ApplicationPriority, number> = {
    high: 0,
    medium: 0,
    low: 0,
  };

  for (const app of applications) {
    counts[app.priority]++;
  }

  return counts;
}

/**
 * Count applications by month (based on applied date)
 */
export function countByMonth(applications: JobApplication[]): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const app of applications) {
    const monthKey = getMonthYearKey(app.appliedDate);
    counts[monthKey] = (counts[monthKey] || 0) + 1;
  }

  return counts;
}

/**
 * Count active applications (not in terminal states)
 */
export function countActiveApplications(applications: JobApplication[]): number {
  return applications.filter((app) =>
    ACTIVE_STATUSES.includes(app.status)
  ).length;
}

/**
 * Count applications with pending follow-ups
 */
export function countPendingFollowUps(applications: JobApplication[]): number {
  const now = new Date();
  return applications.filter((app) => {
    if (!app.followUpDate) return false;
    return new Date(app.followUpDate) <= now;
  }).length;
}

/**
 * Count upcoming interviews (scheduled and in the future)
 */
export function countUpcomingInterviews(applications: JobApplication[]): number {
  const now = new Date();
  let count = 0;

  for (const app of applications) {
    for (const interview of app.interviews) {
      if (
        interview.status === 'scheduled' &&
        new Date(interview.scheduledDate) >= now
      ) {
        count++;
      }
    }
  }

  return count;
}

// ============================================================================
// Rate Calculations
// ============================================================================

/**
 * Calculate the success rate (accepted / (accepted + rejected))
 * Returns a number between 0 and 1, or null if no completed applications
 */
export function calculateSuccessRate(applications: JobApplication[]): number | null {
  const accepted = applications.filter((app) => app.status === 'accepted').length;
  const rejected = applications.filter((app) => app.status === 'rejected').length;
  const total = accepted + rejected;

  if (total === 0) return null;
  return accepted / total;
}

/**
 * Calculate the response rate (applications that got a response / total applied)
 * Response = moved past 'applied' status (screening, interviewing, offer, rejected, accepted)
 */
export function calculateResponseRate(applications: JobApplication[]): number | null {
  const applied = applications.filter((app) => app.status !== 'saved');
  if (applied.length === 0) return null;

  const responded = applied.filter(
    (app) => !['saved', 'applied', 'withdrawn'].includes(app.status)
  ).length;

  return responded / applied.length;
}

/**
 * Calculate interview conversion rate (got interview / total applied)
 */
export function calculateInterviewRate(applications: JobApplication[]): number | null {
  const applied = applications.filter((app) => app.status !== 'saved');
  if (applied.length === 0) return null;

  const interviewed = applied.filter(
    (app) => app.interviews.length > 0 || ['interviewing', 'offer', 'accepted'].includes(app.status)
  ).length;

  return interviewed / applied.length;
}

/**
 * Calculate offer rate (got offer / total applied)
 */
export function calculateOfferRate(applications: JobApplication[]): number | null {
  const applied = applications.filter((app) => app.status !== 'saved');
  if (applied.length === 0) return null;

  const offers = applied.filter(
    (app) => ['offer', 'accepted'].includes(app.status)
  ).length;

  return offers / applied.length;
}

// ============================================================================
// Time Calculations
// ============================================================================

/**
 * Calculate average time to first response (in days)
 * Based on applications that moved past 'applied' status
 */
export function calculateAverageTimeToResponse(
  applications: JobApplication[]
): number | null {
  const respondedApps = applications.filter((app) => {
    // Only consider applications that have moved past 'applied'
    if (['saved', 'applied', 'withdrawn'].includes(app.status)) return false;

    // Must have at least one status change event
    const statusChanges = app.timeline.filter((e) => e.type === 'status-change');
    return statusChanges.length > 0;
  });

  if (respondedApps.length === 0) return null;

  let totalDays = 0;
  let validCount = 0;

  for (const app of respondedApps) {
    // Find the first status change from 'applied' to something else
    const firstResponse = app.timeline
      .filter((e) => e.type === 'status-change')
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .find((e) => {
        const metadata = e.metadata as { previousStatus?: string } | undefined;
        return metadata?.previousStatus === 'applied';
      });

    if (firstResponse) {
      const days = daysBetween(app.appliedDate, firstResponse.timestamp);
      totalDays += days;
      validCount++;
    }
  }

  if (validCount === 0) return null;
  return totalDays / validCount;
}

/**
 * Calculate average time from application to offer (in days)
 */
export function calculateAverageTimeToOffer(
  applications: JobApplication[]
): number | null {
  const offerApps = applications.filter(
    (app) => app.status === 'offer' || app.status === 'accepted'
  );

  if (offerApps.length === 0) return null;

  let totalDays = 0;
  let validCount = 0;

  for (const app of offerApps) {
    // Find when they received the offer
    const offerEvent = app.timeline.find((e) => {
      const metadata = e.metadata as { newStatus?: string } | undefined;
      return e.type === 'status-change' && metadata?.newStatus === 'offer';
    });

    if (offerEvent) {
      const days = daysBetween(app.appliedDate, offerEvent.timestamp);
      totalDays += days;
      validCount++;
    }
  }

  if (validCount === 0) return null;
  return totalDays / validCount;
}

// ============================================================================
// Activity Tracking
// ============================================================================

/**
 * Get recent activity counts
 */
export function getRecentActivity(applications: JobApplication[]): {
  lastWeek: number;
  lastMonth: number;
} {
  let lastWeek = 0;
  let lastMonth = 0;

  for (const app of applications) {
    if (isWithinLastDays(app.appliedDate, 7)) {
      lastWeek++;
    }
    if (isWithinLastDays(app.appliedDate, 30)) {
      lastMonth++;
    }
  }

  return { lastWeek, lastMonth };
}

/**
 * Get applications that need attention (overdue follow-ups, stale applications)
 */
export function getApplicationsNeedingAttention(
  applications: JobApplication[]
): JobApplication[] {
  return applications.filter((app) => {
    // Check for overdue follow-ups
    if (app.followUpDate && isOverdue(app.followUpDate)) {
      return true;
    }

    // Check for stale applications (no activity in 14+ days and still active)
    if (ACTIVE_STATUSES.includes(app.status)) {
      const daysSinceUpdate = daysBetween(app.lastUpdated, new Date().toISOString());
      if (daysSinceUpdate >= 14) {
        return true;
      }
    }

    return false;
  });
}

/**
 * Get applications with interviews this week
 */
export function getInterviewsThisWeek(applications: JobApplication[]): {
  application: JobApplication;
  interview: JobApplication['interviews'][0];
}[] {
  const results: { application: JobApplication; interview: JobApplication['interviews'][0] }[] = [];
  const now = new Date();
  const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  for (const app of applications) {
    for (const interview of app.interviews) {
      if (interview.status === 'scheduled') {
        const interviewDate = new Date(interview.scheduledDate);
        if (interviewDate >= now && interviewDate <= weekEnd) {
          results.push({ application: app, interview });
        }
      }
    }
  }

  // Sort by interview date
  results.sort(
    (a, b) =>
      new Date(a.interview.scheduledDate).getTime() -
      new Date(b.interview.scheduledDate).getTime()
  );

  return results;
}

// ============================================================================
// Main Statistics Function
// ============================================================================

/**
 * Calculate comprehensive statistics for all applications
 */
export function calculateStatistics(applications: JobApplication[]): ApplicationStatistics {
  const byStatus = countByStatus(applications);
  const byPriority = countByPriority(applications);
  const byMonth = countByMonth(applications);
  const recentActivity = getRecentActivity(applications);

  return {
    total: applications.length,
    byStatus,
    byPriority,
    byMonth,
    successRate: calculateSuccessRate(applications) ?? 0,
    averageTimeToResponse: calculateAverageTimeToResponse(applications),
    activeApplications: countActiveApplications(applications),
    pendingFollowUps: countPendingFollowUps(applications),
    upcomingInterviews: countUpcomingInterviews(applications),
    recentActivity,
  };
}

// ============================================================================
// Trend Analysis
// ============================================================================

/**
 * Get application trends over the last N months
 */
export function getMonthlyTrends(
  applications: JobApplication[],
  months: number = 6
): { month: string; count: number; successCount: number }[] {
  const trends: { month: string; count: number; successCount: number }[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = getMonthYearKey(date.toISOString());

    const monthApps = applications.filter(
      (app) => getMonthYearKey(app.appliedDate) === monthKey
    );

    const successCount = monthApps.filter(
      (app) => app.status === 'accepted'
    ).length;

    trends.push({
      month: monthKey,
      count: monthApps.length,
      successCount,
    });
  }

  return trends;
}

/**
 * Get status distribution for a specific time period
 */
export function getStatusDistribution(
  applications: JobApplication[],
  startDate?: string,
  endDate?: string
): Record<ApplicationStatus, number> {
  let filtered = applications;

  if (startDate && endDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    filtered = applications.filter((app) => {
      const appliedTime = new Date(app.appliedDate).getTime();
      return appliedTime >= start && appliedTime <= end;
    });
  }

  return countByStatus(filtered);
}

/**
 * Get top companies by application count
 */
export function getTopCompanies(
  applications: JobApplication[],
  limit: number = 5
): { company: string; count: number }[] {
  const companyCounts: Record<string, number> = {};

  for (const app of applications) {
    companyCounts[app.company] = (companyCounts[app.company] || 0) + 1;
  }

  return Object.entries(companyCounts)
    .map(([company, count]) => ({ company, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Get average salary by status (for applications with salary data)
 */
export function getAverageSalaryByStatus(
  applications: JobApplication[]
): Record<ApplicationStatus, number | null> {
  const result: Record<ApplicationStatus, number | null> = {
    saved: null,
    applied: null,
    screening: null,
    interviewing: null,
    offer: null,
    rejected: null,
    accepted: null,
    withdrawn: null,
  };

  const statusGroups: Record<ApplicationStatus, number[]> = {
    saved: [],
    applied: [],
    screening: [],
    interviewing: [],
    offer: [],
    rejected: [],
    accepted: [],
    withdrawn: [],
  };

  for (const app of applications) {
    if (app.salary) {
      const avgSalary = (app.salary.min + app.salary.max) / 2;
      statusGroups[app.status].push(avgSalary);
    }
  }

  for (const status of Object.keys(statusGroups) as ApplicationStatus[]) {
    const salaries = statusGroups[status];
    if (salaries.length > 0) {
      result[status] = salaries.reduce((a, b) => a + b, 0) / salaries.length;
    }
  }

  return result;
}
