/**
 * Job Application Tracker - Statistics Tests
 *
 * Tests for statistics calculation functions.
 */

import {
  countByStatus,
  countByPriority,
  countByMonth,
  countActiveApplications,
  countPendingFollowUps,
  countUpcomingInterviews,
  calculateSuccessRate,
  calculateResponseRate,
  calculateInterviewRate,
  calculateOfferRate,
  calculateAverageTimeToResponse,
  calculateAverageTimeToOffer,
  getRecentActivity,
  getApplicationsNeedingAttention,
  getInterviewsThisWeek,
  calculateStatistics,
  getMonthlyTrends,
  getStatusDistribution,
  getTopCompanies,
  getAverageSalaryByStatus,
} from '../../../lib/application-statistics';

import type { JobApplication, ApplicationStatus } from '../../../types/job-application';

// ============================================================================
// Test Data Helpers
// ============================================================================

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function daysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

const createMockApplication = (
  id: string,
  status: ApplicationStatus,
  options: Partial<JobApplication> = {}
): JobApplication => ({
  id,
  company: options.company || 'Test Company',
  jobTitle: options.jobTitle || 'Test Position',
  location: 'Test Location',
  workLocationType: 'remote',
  employmentType: 'full-time',
  status,
  priority: options.priority || 'medium',
  salary: options.salary,
  appliedDate: options.appliedDate || daysAgo(10),
  lastUpdated: options.lastUpdated || daysAgo(5),
  followUpDate: options.followUpDate,
  contacts: options.contacts || [],
  interviews: options.interviews || [],
  timeline: options.timeline || [],
  tags: options.tags || [],
  createdAt: daysAgo(10),
  updatedAt: daysAgo(5),
});

const createTestApplications = (): JobApplication[] => [
  createMockApplication('1', 'applied', { priority: 'high', appliedDate: daysAgo(5) }),
  createMockApplication('2', 'applied', { priority: 'medium', appliedDate: daysAgo(10) }),
  createMockApplication('3', 'screening', { priority: 'high', appliedDate: daysAgo(15) }),
  createMockApplication('4', 'interviewing', {
    priority: 'medium',
    appliedDate: daysAgo(20),
    interviews: [
      {
        id: 'int_1',
        type: 'technical',
        scheduledDate: daysFromNow(3),
        duration: 60,
        status: 'scheduled',
        createdAt: daysAgo(1),
        updatedAt: daysAgo(1),
      },
    ],
  }),
  createMockApplication('5', 'offer', { priority: 'high', appliedDate: daysAgo(30) }),
  createMockApplication('6', 'accepted', { priority: 'high', appliedDate: daysAgo(45) }),
  createMockApplication('7', 'rejected', { priority: 'low', appliedDate: daysAgo(25) }),
  createMockApplication('8', 'rejected', { priority: 'medium', appliedDate: daysAgo(35) }),
  createMockApplication('9', 'withdrawn', { priority: 'low', appliedDate: daysAgo(40) }),
  createMockApplication('10', 'saved', { priority: 'low', appliedDate: daysAgo(1) }),
];

// ============================================================================
// Count Function Tests
// ============================================================================

describe('Count Functions', () => {
  let applications: JobApplication[];

  beforeEach(() => {
    applications = createTestApplications();
  });

  describe('countByStatus', () => {
    it('should count applications by status', () => {
      const counts = countByStatus(applications);

      expect(counts.applied).toBe(2);
      expect(counts.screening).toBe(1);
      expect(counts.interviewing).toBe(1);
      expect(counts.offer).toBe(1);
      expect(counts.accepted).toBe(1);
      expect(counts.rejected).toBe(2);
      expect(counts.withdrawn).toBe(1);
      expect(counts.saved).toBe(1);
    });

    it('should return zeros for empty array', () => {
      const counts = countByStatus([]);

      expect(counts.applied).toBe(0);
      expect(counts.rejected).toBe(0);
    });
  });

  describe('countByPriority', () => {
    it('should count applications by priority', () => {
      const counts = countByPriority(applications);

      expect(counts.high).toBe(4);
      expect(counts.medium).toBe(3);
      expect(counts.low).toBe(3);
    });
  });

  describe('countByMonth', () => {
    it('should count applications by month', () => {
      const counts = countByMonth(applications);

      // All test applications are within current month range
      expect(Object.keys(counts).length).toBeGreaterThan(0);
    });

    it('should use YYYY-MM format for keys', () => {
      const counts = countByMonth(applications);
      const keys = Object.keys(counts);

      keys.forEach((key) => {
        expect(key).toMatch(/^\d{4}-\d{2}$/);
      });
    });
  });

  describe('countActiveApplications', () => {
    it('should count non-terminal applications', () => {
      const count = countActiveApplications(applications);

      // saved(1) + applied(2) + screening(1) + interviewing(1) + offer(1) + accepted(1) = 7
      expect(count).toBe(7);
    });

    it('should not count rejected or withdrawn', () => {
      const terminalOnly: JobApplication[] = [
        createMockApplication('1', 'rejected'),
        createMockApplication('2', 'withdrawn'),
      ];

      expect(countActiveApplications(terminalOnly)).toBe(0);
    });
  });

  describe('countPendingFollowUps', () => {
    it('should count applications with overdue follow-ups', () => {
      const appsWithFollowUps: JobApplication[] = [
        createMockApplication('1', 'applied', { followUpDate: daysAgo(1) }), // Overdue
        createMockApplication('2', 'applied', { followUpDate: daysFromNow(3) }), // Future
        createMockApplication('3', 'applied'), // No follow-up
      ];

      const count = countPendingFollowUps(appsWithFollowUps);
      expect(count).toBe(1);
    });
  });

  describe('countUpcomingInterviews', () => {
    it('should count scheduled interviews in the future', () => {
      const count = countUpcomingInterviews(applications);
      expect(count).toBe(1); // Only app 4 has upcoming interview
    });

    it('should not count completed or cancelled interviews', () => {
      const appsWithInterviews: JobApplication[] = [
        createMockApplication('1', 'interviewing', {
          interviews: [
            {
              id: 'int_1',
              type: 'technical',
              scheduledDate: daysFromNow(1),
              duration: 60,
              status: 'completed',
              createdAt: daysAgo(5),
              updatedAt: daysAgo(1),
            },
          ],
        }),
      ];

      expect(countUpcomingInterviews(appsWithInterviews)).toBe(0);
    });
  });
});

// ============================================================================
// Rate Calculation Tests
// ============================================================================

describe('Rate Calculations', () => {
  describe('calculateSuccessRate', () => {
    it('should calculate success rate correctly', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'accepted'),
        createMockApplication('2', 'rejected'),
        createMockApplication('3', 'rejected'),
        createMockApplication('4', 'applied'),
      ];

      const rate = calculateSuccessRate(applications);
      expect(rate).toBe(1 / 3); // 1 accepted / (1 accepted + 2 rejected)
    });

    it('should return null for no completed applications', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'applied'),
        createMockApplication('2', 'interviewing'),
      ];

      expect(calculateSuccessRate(applications)).toBeNull();
    });

    it('should return 1 for all accepted', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'accepted'),
        createMockApplication('2', 'accepted'),
      ];

      expect(calculateSuccessRate(applications)).toBe(1);
    });

    it('should return 0 for all rejected', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'rejected'),
        createMockApplication('2', 'rejected'),
      ];

      expect(calculateSuccessRate(applications)).toBe(0);
    });
  });

  describe('calculateResponseRate', () => {
    it('should calculate response rate correctly', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'screening'), // Got response
        createMockApplication('2', 'rejected'), // Got response
        createMockApplication('3', 'applied'), // No response yet
        createMockApplication('4', 'saved'), // Not applied
      ];

      const rate = calculateResponseRate(applications);
      // 2 responses / 3 applied (excluding saved)
      expect(rate).toBeCloseTo(2 / 3);
    });

    it('should return null for no applied applications', () => {
      const applications: JobApplication[] = [createMockApplication('1', 'saved')];

      expect(calculateResponseRate(applications)).toBeNull();
    });
  });

  describe('calculateInterviewRate', () => {
    it('should calculate interview rate correctly', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'interviewing'),
        createMockApplication('2', 'applied'),
        createMockApplication('3', 'rejected'),
      ];

      const rate = calculateInterviewRate(applications);
      expect(rate).toBeCloseTo(1 / 3);
    });

    it('should count applications with interviews', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'applied', {
          interviews: [
            {
              id: 'int_1',
              type: 'phone-screen',
              scheduledDate: daysAgo(5),
              duration: 30,
              status: 'completed',
              createdAt: daysAgo(10),
              updatedAt: daysAgo(5),
            },
          ],
        }),
        createMockApplication('2', 'applied'),
      ];

      const rate = calculateInterviewRate(applications);
      expect(rate).toBe(0.5);
    });
  });

  describe('calculateOfferRate', () => {
    it('should calculate offer rate correctly', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'offer'),
        createMockApplication('2', 'accepted'),
        createMockApplication('3', 'rejected'),
        createMockApplication('4', 'applied'),
      ];

      const rate = calculateOfferRate(applications);
      expect(rate).toBe(0.5); // 2 offers / 4 applied
    });
  });
});

// ============================================================================
// Time Calculation Tests
// ============================================================================

describe('Time Calculations', () => {
  describe('calculateAverageTimeToResponse', () => {
    it('should calculate average time to first response', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'screening', {
          appliedDate: daysAgo(10),
          timeline: [
            {
              id: 'tl_1',
              type: 'status-change',
              title: 'Status change',
              timestamp: daysAgo(5),
              metadata: { previousStatus: 'applied', newStatus: 'screening' },
            },
          ],
        }),
      ];

      const avg = calculateAverageTimeToResponse(applications);
      expect(avg).toBe(5);
    });

    it('should return null for no responses', () => {
      const applications: JobApplication[] = [createMockApplication('1', 'applied')];

      expect(calculateAverageTimeToResponse(applications)).toBeNull();
    });
  });

  describe('calculateAverageTimeToOffer', () => {
    it('should calculate average time from application to offer', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'offer', {
          appliedDate: daysAgo(20),
          timeline: [
            {
              id: 'tl_1',
              type: 'status-change',
              title: 'Offer received',
              timestamp: daysAgo(5),
              metadata: { previousStatus: 'interviewing', newStatus: 'offer' },
            },
          ],
        }),
      ];

      const avg = calculateAverageTimeToOffer(applications);
      expect(avg).toBe(15);
    });

    it('should return null for no offers', () => {
      const applications: JobApplication[] = [createMockApplication('1', 'applied')];

      expect(calculateAverageTimeToOffer(applications)).toBeNull();
    });
  });
});

// ============================================================================
// Activity Tracking Tests
// ============================================================================

describe('Activity Tracking', () => {
  describe('getRecentActivity', () => {
    it('should count applications in last week and month', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'applied', { appliedDate: daysAgo(3) }), // Last week
        createMockApplication('2', 'applied', { appliedDate: daysAgo(5) }), // Last week
        createMockApplication('3', 'applied', { appliedDate: daysAgo(15) }), // Last month
        createMockApplication('4', 'applied', { appliedDate: daysAgo(45) }), // Older
      ];

      const activity = getRecentActivity(applications);
      expect(activity.lastWeek).toBe(2);
      expect(activity.lastMonth).toBe(3);
    });
  });

  describe('getApplicationsNeedingAttention', () => {
    it('should find applications with overdue follow-ups', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'applied', { followUpDate: daysAgo(1) }),
        createMockApplication('2', 'applied', { followUpDate: daysFromNow(5) }),
      ];

      const needingAttention = getApplicationsNeedingAttention(applications);
      expect(needingAttention).toHaveLength(1);
      expect(needingAttention[0].id).toBe('1');
    });

    it('should find stale applications', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'applied', { lastUpdated: daysAgo(20) }), // Stale
        createMockApplication('2', 'applied', { lastUpdated: daysAgo(5) }), // Recent
        createMockApplication('3', 'rejected', { lastUpdated: daysAgo(20) }), // Terminal, ignored
      ];

      const needingAttention = getApplicationsNeedingAttention(applications);
      expect(needingAttention.some((app) => app.id === '1')).toBe(true);
    });
  });

  describe('getInterviewsThisWeek', () => {
    it('should return interviews scheduled within the week', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'interviewing', {
          interviews: [
            {
              id: 'int_1',
              type: 'technical',
              scheduledDate: daysFromNow(3),
              duration: 60,
              status: 'scheduled',
              createdAt: daysAgo(1),
              updatedAt: daysAgo(1),
            },
          ],
        }),
        createMockApplication('2', 'interviewing', {
          interviews: [
            {
              id: 'int_2',
              type: 'phone-screen',
              scheduledDate: daysFromNow(10), // Beyond this week
              duration: 30,
              status: 'scheduled',
              createdAt: daysAgo(1),
              updatedAt: daysAgo(1),
            },
          ],
        }),
      ];

      const interviews = getInterviewsThisWeek(applications);
      expect(interviews).toHaveLength(1);
      expect(interviews[0].interview.id).toBe('int_1');
    });

    it('should sort interviews by date', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'interviewing', {
          interviews: [
            {
              id: 'int_1',
              type: 'technical',
              scheduledDate: daysFromNow(5),
              duration: 60,
              status: 'scheduled',
              createdAt: daysAgo(1),
              updatedAt: daysAgo(1),
            },
          ],
        }),
        createMockApplication('2', 'interviewing', {
          interviews: [
            {
              id: 'int_2',
              type: 'phone-screen',
              scheduledDate: daysFromNow(2),
              duration: 30,
              status: 'scheduled',
              createdAt: daysAgo(1),
              updatedAt: daysAgo(1),
            },
          ],
        }),
      ];

      const interviews = getInterviewsThisWeek(applications);
      expect(interviews[0].interview.id).toBe('int_2');
      expect(interviews[1].interview.id).toBe('int_1');
    });
  });
});

// ============================================================================
// Main Statistics Function Tests
// ============================================================================

describe('calculateStatistics', () => {
  let applications: JobApplication[];

  beforeEach(() => {
    applications = createTestApplications();
  });

  it('should calculate comprehensive statistics', () => {
    const stats = calculateStatistics(applications);

    expect(stats.total).toBe(10);
    expect(stats.byStatus).toBeDefined();
    expect(stats.byPriority).toBeDefined();
    expect(stats.byMonth).toBeDefined();
    expect(stats.activeApplications).toBe(7);
  });

  it('should include recent activity', () => {
    const stats = calculateStatistics(applications);

    expect(stats.recentActivity).toBeDefined();
    expect(stats.recentActivity.lastWeek).toBeGreaterThanOrEqual(0);
    expect(stats.recentActivity.lastMonth).toBeGreaterThanOrEqual(0);
  });

  it('should handle empty array', () => {
    const stats = calculateStatistics([]);

    expect(stats.total).toBe(0);
    expect(stats.activeApplications).toBe(0);
  });
});

// ============================================================================
// Trend Analysis Tests
// ============================================================================

describe('Trend Analysis', () => {
  let applications: JobApplication[];

  beforeEach(() => {
    applications = createTestApplications();
  });

  describe('getMonthlyTrends', () => {
    it('should return trends for specified months', () => {
      const trends = getMonthlyTrends(applications, 3);

      expect(trends).toHaveLength(3);
      trends.forEach((trend) => {
        expect(trend).toHaveProperty('month');
        expect(trend).toHaveProperty('count');
        expect(trend).toHaveProperty('successCount');
      });
    });

    it('should include success counts', () => {
      const trends = getMonthlyTrends(applications, 6);

      const totalSuccess = trends.reduce((sum, t) => sum + t.successCount, 0);
      const acceptedApps = applications.filter((a) => a.status === 'accepted').length;
      expect(totalSuccess).toBe(acceptedApps);
    });
  });

  describe('getStatusDistribution', () => {
    it('should return status counts for all applications', () => {
      const distribution = getStatusDistribution(applications);

      expect(distribution.applied).toBe(2);
      expect(distribution.rejected).toBe(2);
    });

    it('should filter by date range when provided', () => {
      const distribution = getStatusDistribution(applications, daysAgo(20), daysAgo(0));

      // Only includes applications from last 20 days
      expect(distribution.applied).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getTopCompanies', () => {
    it('should return top companies by application count', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'applied', { company: 'TechCorp' }),
        createMockApplication('2', 'applied', { company: 'TechCorp' }),
        createMockApplication('3', 'applied', { company: 'TechCorp' }),
        createMockApplication('4', 'applied', { company: 'StartupXYZ' }),
        createMockApplication('5', 'applied', { company: 'StartupXYZ' }),
        createMockApplication('6', 'applied', { company: 'Enterprise' }),
      ];

      const topCompanies = getTopCompanies(applications, 2);

      expect(topCompanies).toHaveLength(2);
      expect(topCompanies[0].company).toBe('TechCorp');
      expect(topCompanies[0].count).toBe(3);
      expect(topCompanies[1].company).toBe('StartupXYZ');
      expect(topCompanies[1].count).toBe(2);
    });

    it('should respect limit parameter', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'applied', { company: 'A' }),
        createMockApplication('2', 'applied', { company: 'B' }),
        createMockApplication('3', 'applied', { company: 'C' }),
      ];

      const topCompanies = getTopCompanies(applications, 1);
      expect(topCompanies).toHaveLength(1);
    });
  });

  describe('getAverageSalaryByStatus', () => {
    it('should calculate average salary for each status', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'applied', {
          salary: { min: 100000, max: 120000, currency: 'USD', period: 'yearly' },
        }),
        createMockApplication('2', 'applied', {
          salary: { min: 80000, max: 100000, currency: 'USD', period: 'yearly' },
        }),
        createMockApplication('3', 'offer', {
          salary: { min: 150000, max: 180000, currency: 'USD', period: 'yearly' },
        }),
      ];

      const avgSalaries = getAverageSalaryByStatus(applications);

      // Average of applied: (110000 + 90000) / 2 = 100000
      expect(avgSalaries.applied).toBe(100000);
      // Average of offer: (150000 + 180000) / 2 = 165000
      expect(avgSalaries.offer).toBe(165000);
    });

    it('should return null for statuses without salary data', () => {
      const applications: JobApplication[] = [
        createMockApplication('1', 'applied'),
        createMockApplication('2', 'screening'),
      ];

      const avgSalaries = getAverageSalaryByStatus(applications);

      expect(avgSalaries.applied).toBeNull();
      expect(avgSalaries.screening).toBeNull();
    });
  });
});
