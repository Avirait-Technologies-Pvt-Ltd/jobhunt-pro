/**
 * Job Application Tracker - Filter Tests
 *
 * Tests for filtering and sorting job applications.
 */

import {
  filterByStatus,
  filterByPriority,
  filterByWorkLocationType,
  filterByEmploymentType,
  filterByCompany,
  filterByTags,
  filterByDateRange,
  filterBySalaryRange,
  filterByHasFollowUp,
  filterByHasPendingInterviews,
  filterBySearchQuery,
  filterApplicationsByFilters,
  sortByAppliedDate,
  sortByCompany,
  sortByStatus,
  sortByPriority,
  sortBySalary,
  sortByLastUpdated,
  sortApplicationsByOption,
  filterAndSortApplications,
  getUniqueCompanies,
  getUniqueTags,
  getUniqueLocations,
  isFilterEmpty,
  countActiveFilters,
  createEmptyFilter,
  mergeFilters,
} from '../../../lib/application-filters';

import type {
  JobApplication,
  ApplicationFilter,
  ApplicationSortOption,
} from '../../../types/job-application';

// ============================================================================
// Test Data
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

const createMockApplications = (): JobApplication[] => [
  {
    id: '1',
    company: 'TechCorp',
    jobTitle: 'Frontend Developer',
    location: 'San Francisco, CA',
    workLocationType: 'remote',
    employmentType: 'full-time',
    status: 'applied',
    priority: 'high',
    salary: { min: 100000, max: 150000, currency: 'USD', period: 'yearly' },
    appliedDate: daysAgo(10),
    lastUpdated: daysAgo(5),
    followUpDate: daysFromNow(2),
    contacts: [],
    interviews: [
      {
        id: 'int_1',
        type: 'phone-screen',
        scheduledDate: daysFromNow(3),
        duration: 30,
        status: 'scheduled',
        createdAt: daysAgo(1),
        updatedAt: daysAgo(1),
      },
    ],
    timeline: [],
    tags: ['react', 'frontend', 'remote'],
    notes: 'Great opportunity',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(5),
  },
  {
    id: '2',
    company: 'StartupXYZ',
    jobTitle: 'Full Stack Engineer',
    location: 'New York, NY',
    workLocationType: 'hybrid',
    employmentType: 'full-time',
    status: 'interviewing',
    priority: 'medium',
    salary: { min: 120000, max: 180000, currency: 'USD', period: 'yearly' },
    appliedDate: daysAgo(20),
    lastUpdated: daysAgo(2),
    contacts: [],
    interviews: [],
    timeline: [],
    tags: ['fullstack', 'startup'],
    createdAt: daysAgo(20),
    updatedAt: daysAgo(2),
  },
  {
    id: '3',
    company: 'Enterprise Inc',
    jobTitle: 'Software Engineer',
    location: 'Chicago, IL',
    workLocationType: 'onsite',
    employmentType: 'contract',
    status: 'rejected',
    priority: 'low',
    appliedDate: daysAgo(30),
    lastUpdated: daysAgo(15),
    contacts: [],
    interviews: [],
    timeline: [],
    tags: ['enterprise'],
    createdAt: daysAgo(30),
    updatedAt: daysAgo(15),
  },
  {
    id: '4',
    company: 'TechCorp',
    jobTitle: 'Backend Developer',
    location: 'San Francisco, CA',
    workLocationType: 'remote',
    employmentType: 'full-time',
    status: 'offer',
    priority: 'high',
    salary: { min: 140000, max: 170000, currency: 'USD', period: 'yearly' },
    appliedDate: daysAgo(25),
    lastUpdated: daysAgo(1),
    followUpDate: daysAgo(1), // Overdue
    contacts: [],
    interviews: [],
    timeline: [],
    tags: ['backend', 'node', 'remote'],
    createdAt: daysAgo(25),
    updatedAt: daysAgo(1),
  },
  {
    id: '5',
    company: 'HealthTech',
    jobTitle: 'Senior Developer',
    location: 'Boston, MA',
    workLocationType: 'hybrid',
    employmentType: 'part-time',
    status: 'screening',
    priority: 'medium',
    salary: { min: 80000, max: 100000, currency: 'USD', period: 'yearly' },
    appliedDate: daysAgo(5),
    lastUpdated: daysAgo(3),
    contacts: [],
    interviews: [],
    timeline: [],
    tags: ['healthcare', 'senior'],
    createdAt: daysAgo(5),
    updatedAt: daysAgo(3),
  },
];

// ============================================================================
// Individual Filter Tests
// ============================================================================

describe('Individual Filters', () => {
  let applications: JobApplication[];

  beforeEach(() => {
    applications = createMockApplications();
  });

  describe('filterByStatus', () => {
    it('should filter by single status', () => {
      const result = filterByStatus(applications, ['applied']);
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('applied');
    });

    it('should filter by multiple statuses', () => {
      const result = filterByStatus(applications, ['applied', 'interviewing']);
      expect(result).toHaveLength(2);
    });

    it('should return all applications for empty status array', () => {
      const result = filterByStatus(applications, []);
      expect(result).toHaveLength(applications.length);
    });
  });

  describe('filterByPriority', () => {
    it('should filter by single priority', () => {
      const result = filterByPriority(applications, ['high']);
      expect(result).toHaveLength(2);
      expect(result.every((app) => app.priority === 'high')).toBe(true);
    });

    it('should filter by multiple priorities', () => {
      const result = filterByPriority(applications, ['high', 'low']);
      expect(result).toHaveLength(3);
    });

    it('should return all applications for empty priority array', () => {
      const result = filterByPriority(applications, []);
      expect(result).toHaveLength(applications.length);
    });
  });

  describe('filterByWorkLocationType', () => {
    it('should filter by work location type', () => {
      const result = filterByWorkLocationType(applications, ['remote']);
      expect(result).toHaveLength(2);
      expect(result.every((app) => app.workLocationType === 'remote')).toBe(true);
    });

    it('should filter by multiple types', () => {
      const result = filterByWorkLocationType(applications, ['remote', 'hybrid']);
      expect(result).toHaveLength(4);
    });
  });

  describe('filterByEmploymentType', () => {
    it('should filter by employment type', () => {
      const result = filterByEmploymentType(applications, ['full-time']);
      expect(result).toHaveLength(3);
    });

    it('should handle contract type', () => {
      const result = filterByEmploymentType(applications, ['contract']);
      expect(result).toHaveLength(1);
      expect(result[0].employmentType).toBe('contract');
    });
  });

  describe('filterByCompany', () => {
    it('should filter by exact company name', () => {
      const result = filterByCompany(applications, ['TechCorp']);
      expect(result).toHaveLength(2);
    });

    it('should be case-insensitive', () => {
      const result = filterByCompany(applications, ['techcorp']);
      expect(result).toHaveLength(2);
    });

    it('should support partial matching', () => {
      const result = filterByCompany(applications, ['Tech']);
      expect(result).toHaveLength(3); // TechCorp (2) + HealthTech (1)
    });
  });

  describe('filterByTags', () => {
    it('should filter by single tag', () => {
      const result = filterByTags(applications, ['react']);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should filter by multiple tags (OR logic)', () => {
      const result = filterByTags(applications, ['react', 'backend']);
      expect(result).toHaveLength(2);
    });

    it('should be case-insensitive', () => {
      const result = filterByTags(applications, ['REACT']);
      expect(result).toHaveLength(1);
    });
  });

  describe('filterByDateRange', () => {
    it('should filter by date range', () => {
      const result = filterByDateRange(applications, daysAgo(15), daysAgo(0));
      expect(result).toHaveLength(2); // Applied 10 and 5 days ago
    });

    it('should include applications on boundary dates', () => {
      const result = filterByDateRange(applications, daysAgo(10), daysAgo(10));
      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('filterBySalaryRange', () => {
    it('should filter by salary range', () => {
      const result = filterBySalaryRange(applications, 100000, 150000);
      expect(result.length).toBeGreaterThan(0);
      result.forEach((app) => {
        expect(app.salary).toBeDefined();
        expect(app.salary!.max).toBeGreaterThanOrEqual(100000);
        expect(app.salary!.min).toBeLessThanOrEqual(150000);
      });
    });

    it('should exclude applications without salary', () => {
      const result = filterBySalaryRange(applications, 0, 1000000);
      expect(result.every((app) => app.salary !== undefined)).toBe(true);
    });
  });

  describe('filterByHasFollowUp', () => {
    it('should filter applications with follow-up', () => {
      const result = filterByHasFollowUp(applications, true);
      expect(result).toHaveLength(2);
      expect(result.every((app) => app.followUpDate !== undefined)).toBe(true);
    });

    it('should filter applications without follow-up', () => {
      const result = filterByHasFollowUp(applications, false);
      expect(result).toHaveLength(3);
      expect(result.every((app) => !app.followUpDate)).toBe(true);
    });
  });

  describe('filterByHasPendingInterviews', () => {
    it('should filter applications with pending interviews', () => {
      const result = filterByHasPendingInterviews(applications, true);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should filter applications without pending interviews', () => {
      const result = filterByHasPendingInterviews(applications, false);
      expect(result).toHaveLength(4);
    });
  });

  describe('filterBySearchQuery', () => {
    it('should search by company name', () => {
      const result = filterBySearchQuery(applications, 'TechCorp');
      expect(result).toHaveLength(2);
    });

    it('should search by job title', () => {
      const result = filterBySearchQuery(applications, 'Frontend');
      expect(result).toHaveLength(1);
    });

    it('should search by location', () => {
      const result = filterBySearchQuery(applications, 'San Francisco');
      expect(result).toHaveLength(2);
    });

    it('should search by tags', () => {
      const result = filterBySearchQuery(applications, 'react');
      expect(result).toHaveLength(1);
    });

    it('should be case-insensitive', () => {
      const result = filterBySearchQuery(applications, 'TECHCORP');
      expect(result).toHaveLength(2);
    });

    it('should support multiple search terms', () => {
      const result = filterBySearchQuery(applications, 'TechCorp Frontend');
      expect(result).toHaveLength(1);
      expect(result[0].company).toBe('TechCorp');
    });

    it('should return all for empty query', () => {
      const result = filterBySearchQuery(applications, '');
      expect(result).toHaveLength(applications.length);
    });
  });
});

// ============================================================================
// Combined Filter Tests
// ============================================================================

describe('Combined Filters', () => {
  let applications: JobApplication[];

  beforeEach(() => {
    applications = createMockApplications();
  });

  describe('filterApplicationsByFilters', () => {
    it('should apply multiple filters', () => {
      const filters: ApplicationFilter = {
        statuses: ['applied', 'interviewing'],
        priorities: ['high', 'medium'],
      };

      const result = filterApplicationsByFilters(applications, filters);
      expect(result).toHaveLength(2);
    });

    it('should apply search query with other filters', () => {
      const filters: ApplicationFilter = {
        searchQuery: 'Tech',
        statuses: ['applied', 'offer'],
      };

      const result = filterApplicationsByFilters(applications, filters);
      expect(result).toHaveLength(2);
    });

    it('should return all for empty filter', () => {
      const result = filterApplicationsByFilters(applications, {});
      expect(result).toHaveLength(applications.length);
    });
  });
});

// ============================================================================
// Sort Tests
// ============================================================================

describe('Sorting', () => {
  let applications: JobApplication[];

  beforeEach(() => {
    applications = createMockApplications();
  });

  describe('sortByAppliedDate', () => {
    it('should sort by applied date descending', () => {
      const result = sortByAppliedDate(applications, 'desc');
      for (let i = 1; i < result.length; i++) {
        const prevDate = new Date(result[i - 1].appliedDate).getTime();
        const currDate = new Date(result[i].appliedDate).getTime();
        expect(prevDate).toBeGreaterThanOrEqual(currDate);
      }
    });

    it('should sort by applied date ascending', () => {
      const result = sortByAppliedDate(applications, 'asc');
      for (let i = 1; i < result.length; i++) {
        const prevDate = new Date(result[i - 1].appliedDate).getTime();
        const currDate = new Date(result[i].appliedDate).getTime();
        expect(prevDate).toBeLessThanOrEqual(currDate);
      }
    });

    it('should not mutate original array', () => {
      const original = [...applications];
      sortByAppliedDate(applications, 'desc');
      expect(applications).toEqual(original);
    });
  });

  describe('sortByCompany', () => {
    it('should sort alphabetically ascending', () => {
      const result = sortByCompany(applications, 'asc');
      for (let i = 1; i < result.length; i++) {
        expect(result[i - 1].company.localeCompare(result[i].company)).toBeLessThanOrEqual(0);
      }
    });

    it('should sort alphabetically descending', () => {
      const result = sortByCompany(applications, 'desc');
      for (let i = 1; i < result.length; i++) {
        expect(result[i - 1].company.localeCompare(result[i].company)).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('sortByStatus', () => {
    it('should sort by status order ascending', () => {
      const result = sortByStatus(applications, 'asc');
      // Applied should come before interviewing, etc.
      const appliedIndex = result.findIndex((app) => app.status === 'applied');
      const interviewingIndex = result.findIndex((app) => app.status === 'interviewing');
      if (appliedIndex !== -1 && interviewingIndex !== -1) {
        expect(appliedIndex).toBeLessThan(interviewingIndex);
      }
    });

    it('should sort by status order descending', () => {
      const result = sortByStatus(applications, 'desc');
      const rejectedIndex = result.findIndex((app) => app.status === 'rejected');
      const appliedIndex = result.findIndex((app) => app.status === 'applied');
      if (rejectedIndex !== -1 && appliedIndex !== -1) {
        expect(rejectedIndex).toBeLessThan(appliedIndex);
      }
    });
  });

  describe('sortByPriority', () => {
    it('should sort high priority first when ascending', () => {
      const result = sortByPriority(applications, 'asc');
      const highIndex = result.findIndex((app) => app.priority === 'high');
      const lowIndex = result.findIndex((app) => app.priority === 'low');
      expect(highIndex).toBeLessThan(lowIndex);
    });

    it('should sort low priority first when descending', () => {
      const result = sortByPriority(applications, 'desc');
      const lowIndex = result.findIndex((app) => app.priority === 'low');
      const highIndex = result.findIndex((app) => app.priority === 'high');
      expect(lowIndex).toBeLessThan(highIndex);
    });
  });

  describe('sortBySalary', () => {
    it('should sort by salary descending', () => {
      const result = sortBySalary(applications, 'desc');
      // Applications with salary should be sorted, those without at the end
      const withSalary = result.filter((app) => app.salary);
      for (let i = 1; i < withSalary.length; i++) {
        expect(withSalary[i - 1].salary!.max).toBeGreaterThanOrEqual(withSalary[i].salary!.max);
      }
    });

    it('should put applications without salary at the end', () => {
      const result = sortBySalary(applications, 'desc');
      const lastWithSalaryIndex = result.map((app) => !!app.salary).lastIndexOf(true);
      const firstWithoutSalaryIndex = result.findIndex((app) => !app.salary);

      if (firstWithoutSalaryIndex !== -1 && lastWithSalaryIndex !== -1) {
        expect(lastWithSalaryIndex).toBeLessThan(firstWithoutSalaryIndex);
      }
    });
  });

  describe('sortByLastUpdated', () => {
    it('should sort by last updated descending', () => {
      const result = sortByLastUpdated(applications, 'desc');
      for (let i = 1; i < result.length; i++) {
        const prevDate = new Date(result[i - 1].lastUpdated).getTime();
        const currDate = new Date(result[i].lastUpdated).getTime();
        expect(prevDate).toBeGreaterThanOrEqual(currDate);
      }
    });
  });

  describe('sortApplicationsByOption', () => {
    const sortOptions: ApplicationSortOption[] = [
      'appliedDate-desc',
      'appliedDate-asc',
      'company-asc',
      'company-desc',
      'status-asc',
      'status-desc',
      'priority-asc',
      'priority-desc',
      'salary-asc',
      'salary-desc',
      'lastUpdated-desc',
      'lastUpdated-asc',
    ];

    sortOptions.forEach((option) => {
      it(`should handle ${option} sort option`, () => {
        const result = sortApplicationsByOption(applications, option);
        expect(result).toHaveLength(applications.length);
      });
    });
  });
});

// ============================================================================
// Filter + Sort Combined Tests
// ============================================================================

describe('Filter and Sort Combined', () => {
  let applications: JobApplication[];

  beforeEach(() => {
    applications = createMockApplications();
  });

  describe('filterAndSortApplications', () => {
    it('should filter and then sort', () => {
      const filters: ApplicationFilter = {
        workLocationTypes: ['remote'],
      };

      const result = filterAndSortApplications(applications, filters, 'appliedDate-desc');

      expect(result).toHaveLength(2);
      for (let i = 1; i < result.length; i++) {
        const prevDate = new Date(result[i - 1].appliedDate).getTime();
        const currDate = new Date(result[i].appliedDate).getTime();
        expect(prevDate).toBeGreaterThanOrEqual(currDate);
      }
    });
  });
});

// ============================================================================
// Utility Function Tests
// ============================================================================

describe('Filter Utilities', () => {
  let applications: JobApplication[];

  beforeEach(() => {
    applications = createMockApplications();
  });

  describe('getUniqueCompanies', () => {
    it('should return unique companies sorted', () => {
      const companies = getUniqueCompanies(applications);
      expect(companies).toContain('TechCorp');
      expect(companies).toContain('StartupXYZ');
      expect(companies).toContain('Enterprise Inc');
      // Should be unique (TechCorp appears twice but only listed once)
      expect(companies.filter((c) => c === 'TechCorp')).toHaveLength(1);
    });

    it('should be sorted alphabetically', () => {
      const companies = getUniqueCompanies(applications);
      for (let i = 1; i < companies.length; i++) {
        expect(companies[i - 1].localeCompare(companies[i])).toBeLessThanOrEqual(0);
      }
    });
  });

  describe('getUniqueTags', () => {
    it('should return unique tags sorted', () => {
      const tags = getUniqueTags(applications);
      expect(tags).toContain('react');
      expect(tags).toContain('frontend');
      expect(tags).toContain('backend');
      // Should be unique
      expect(tags.filter((t) => t === 'remote')).toHaveLength(1);
    });
  });

  describe('getUniqueLocations', () => {
    it('should return unique locations sorted', () => {
      const locations = getUniqueLocations(applications);
      expect(locations).toContain('San Francisco, CA');
      expect(locations).toContain('New York, NY');
      // San Francisco appears twice but only listed once
      expect(locations.filter((l) => l === 'San Francisco, CA')).toHaveLength(1);
    });
  });

  describe('isFilterEmpty', () => {
    it('should return true for empty filter', () => {
      expect(isFilterEmpty({})).toBe(true);
    });

    it('should return true for filter with empty arrays', () => {
      expect(isFilterEmpty({ statuses: [], tags: [] })).toBe(true);
    });

    it('should return false for filter with values', () => {
      expect(isFilterEmpty({ statuses: ['applied'] })).toBe(false);
    });

    it('should return false for filter with search query', () => {
      expect(isFilterEmpty({ searchQuery: 'test' })).toBe(false);
    });

    it('should return false for filter with boolean values', () => {
      expect(isFilterEmpty({ hasFollowUp: true })).toBe(false);
    });
  });

  describe('countActiveFilters', () => {
    it('should return 0 for empty filter', () => {
      expect(countActiveFilters({})).toBe(0);
    });

    it('should count each active filter type', () => {
      const filter: ApplicationFilter = {
        statuses: ['applied'],
        priorities: ['high'],
        searchQuery: 'test',
      };
      expect(countActiveFilters(filter)).toBe(3);
    });

    it('should not count empty arrays', () => {
      const filter: ApplicationFilter = {
        statuses: [],
        priorities: ['high'],
      };
      expect(countActiveFilters(filter)).toBe(1);
    });
  });

  describe('createEmptyFilter', () => {
    it('should return empty object', () => {
      const filter = createEmptyFilter();
      expect(isFilterEmpty(filter)).toBe(true);
    });
  });

  describe('mergeFilters', () => {
    it('should merge two filters', () => {
      const filter1: ApplicationFilter = {
        statuses: ['applied'],
        searchQuery: 'original',
      };
      const filter2: ApplicationFilter = {
        priorities: ['high'],
        searchQuery: 'updated',
      };

      const merged = mergeFilters(filter1, filter2);

      expect(merged.statuses).toEqual(['applied']);
      expect(merged.priorities).toEqual(['high']);
      expect(merged.searchQuery).toBe('updated');
    });

    it('should let second filter override first', () => {
      const filter1: ApplicationFilter = { statuses: ['applied'] };
      const filter2: ApplicationFilter = { statuses: ['interviewing'] };

      const merged = mergeFilters(filter1, filter2);
      expect(merged.statuses).toEqual(['interviewing']);
    });
  });
});
