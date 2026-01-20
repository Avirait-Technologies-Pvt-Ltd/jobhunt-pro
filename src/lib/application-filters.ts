/**
 * Job Application Tracker - Filter and Sort Utilities
 *
 * This file contains functions for filtering and sorting job applications.
 */

import type {
  JobApplication,
  ApplicationStatus,
  ApplicationPriority,
  WorkLocationType,
  EmploymentType,
  ApplicationFilter,
  ApplicationSortOption,
} from '../types/job-application';

import { STATUS_ORDER, PRIORITY_ORDER } from '../types/job-application';

// ============================================================================
// Individual Filter Functions
// ============================================================================

/**
 * Filter applications by status
 */
export function filterByStatus(
  applications: JobApplication[],
  statuses: ApplicationStatus[]
): JobApplication[] {
  if (statuses.length === 0) return applications;
  return applications.filter((app) => statuses.includes(app.status));
}

/**
 * Filter applications by priority
 */
export function filterByPriority(
  applications: JobApplication[],
  priorities: ApplicationPriority[]
): JobApplication[] {
  if (priorities.length === 0) return applications;
  return applications.filter((app) => priorities.includes(app.priority));
}

/**
 * Filter applications by work location type
 */
export function filterByWorkLocationType(
  applications: JobApplication[],
  types: WorkLocationType[]
): JobApplication[] {
  if (types.length === 0) return applications;
  return applications.filter((app) => types.includes(app.workLocationType));
}

/**
 * Filter applications by employment type
 */
export function filterByEmploymentType(
  applications: JobApplication[],
  types: EmploymentType[]
): JobApplication[] {
  if (types.length === 0) return applications;
  return applications.filter((app) => types.includes(app.employmentType));
}

/**
 * Filter applications by company name (partial match, case-insensitive)
 */
export function filterByCompany(
  applications: JobApplication[],
  companies: string[]
): JobApplication[] {
  if (companies.length === 0) return applications;
  const lowerCompanies = companies.map((c) => c.toLowerCase());
  return applications.filter((app) =>
    lowerCompanies.some((c) => app.company.toLowerCase().includes(c))
  );
}

/**
 * Filter applications by tags (matches any of the provided tags)
 */
export function filterByTags(
  applications: JobApplication[],
  tags: string[]
): JobApplication[] {
  if (tags.length === 0) return applications;
  const lowerTags = tags.map((t) => t.toLowerCase());
  return applications.filter((app) =>
    app.tags.some((tag) => lowerTags.includes(tag.toLowerCase()))
  );
}

/**
 * Filter applications by date range (based on applied date)
 */
export function filterByDateRange(
  applications: JobApplication[],
  startDate: string,
  endDate: string
): JobApplication[] {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  return applications.filter((app) => {
    const appliedTime = new Date(app.appliedDate).getTime();
    return appliedTime >= start && appliedTime <= end;
  });
}

/**
 * Filter applications by salary range
 */
export function filterBySalaryRange(
  applications: JobApplication[],
  minSalary: number,
  maxSalary: number
): JobApplication[] {
  return applications.filter((app) => {
    if (!app.salary) return false;
    // Check if salary ranges overlap
    return app.salary.max >= minSalary && app.salary.min <= maxSalary;
  });
}

/**
 * Filter applications that have a follow-up date set
 */
export function filterByHasFollowUp(
  applications: JobApplication[],
  hasFollowUp: boolean
): JobApplication[] {
  return applications.filter((app) => {
    const hasFollowUpDate = app.followUpDate !== undefined && app.followUpDate !== null;
    return hasFollowUp ? hasFollowUpDate : !hasFollowUpDate;
  });
}

/**
 * Filter applications that have pending interviews
 */
export function filterByHasPendingInterviews(
  applications: JobApplication[],
  hasPending: boolean
): JobApplication[] {
  return applications.filter((app) => {
    const pendingInterviews = app.interviews.filter(
      (interview) =>
        interview.status === 'scheduled' &&
        new Date(interview.scheduledDate) >= new Date()
    );
    const hasPendingInterviews = pendingInterviews.length > 0;
    return hasPending ? hasPendingInterviews : !hasPendingInterviews;
  });
}

/**
 * Search applications by query string (searches company, job title, notes, tags)
 * Supports multiple search terms (all terms must match)
 */
export function filterBySearchQuery(
  applications: JobApplication[],
  query: string
): JobApplication[] {
  if (!query || query.trim() === '') return applications;

  const searchTerms = query.toLowerCase().trim().split(/\s+/);

  return applications.filter((app) => {
    // Build searchable text from all relevant fields
    const searchableText = [
      app.company,
      app.jobTitle,
      app.location,
      app.notes || '',
      app.department || '',
      app.jobDescription || '',
      ...app.tags,
    ]
      .join(' ')
      .toLowerCase();

    // All search terms must match
    return searchTerms.every((term) => searchableText.includes(term));
  });
}

// ============================================================================
// Combined Filter Function
// ============================================================================

/**
 * Apply all filters from an ApplicationFilter object
 */
export function filterApplicationsByFilters(
  applications: JobApplication[],
  filters: ApplicationFilter
): JobApplication[] {
  let result = [...applications];

  // Apply search query first (usually most selective)
  if (filters.searchQuery) {
    result = filterBySearchQuery(result, filters.searchQuery);
  }

  // Apply status filter
  if (filters.statuses && filters.statuses.length > 0) {
    result = filterByStatus(result, filters.statuses);
  }

  // Apply priority filter
  if (filters.priorities && filters.priorities.length > 0) {
    result = filterByPriority(result, filters.priorities);
  }

  // Apply work location type filter
  if (filters.workLocationTypes && filters.workLocationTypes.length > 0) {
    result = filterByWorkLocationType(result, filters.workLocationTypes);
  }

  // Apply employment type filter
  if (filters.employmentTypes && filters.employmentTypes.length > 0) {
    result = filterByEmploymentType(result, filters.employmentTypes);
  }

  // Apply company filter
  if (filters.companies && filters.companies.length > 0) {
    result = filterByCompany(result, filters.companies);
  }

  // Apply tags filter
  if (filters.tags && filters.tags.length > 0) {
    result = filterByTags(result, filters.tags);
  }

  // Apply date range filter
  if (filters.dateRange) {
    result = filterByDateRange(result, filters.dateRange.start, filters.dateRange.end);
  }

  // Apply salary range filter
  if (filters.salaryRange) {
    result = filterBySalaryRange(
      result,
      filters.salaryRange.min,
      filters.salaryRange.max
    );
  }

  // Apply follow-up filter
  if (filters.hasFollowUp !== undefined) {
    result = filterByHasFollowUp(result, filters.hasFollowUp);
  }

  // Apply pending interviews filter
  if (filters.hasPendingInterviews !== undefined) {
    result = filterByHasPendingInterviews(result, filters.hasPendingInterviews);
  }

  return result;
}

// ============================================================================
// Individual Sort Functions
// ============================================================================

/**
 * Sort applications by applied date
 */
export function sortByAppliedDate(
  applications: JobApplication[],
  order: 'asc' | 'desc' = 'desc'
): JobApplication[] {
  return [...applications].sort((a, b) => {
    const dateA = new Date(a.appliedDate).getTime();
    const dateB = new Date(b.appliedDate).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Sort applications by company name
 */
export function sortByCompany(
  applications: JobApplication[],
  order: 'asc' | 'desc' = 'asc'
): JobApplication[] {
  return [...applications].sort((a, b) => {
    const comparison = a.company.localeCompare(b.company);
    return order === 'asc' ? comparison : -comparison;
  });
}

/**
 * Sort applications by status (using STATUS_ORDER)
 */
export function sortByStatus(
  applications: JobApplication[],
  order: 'asc' | 'desc' = 'asc'
): JobApplication[] {
  return [...applications].sort((a, b) => {
    const orderA = STATUS_ORDER[a.status];
    const orderB = STATUS_ORDER[b.status];
    return order === 'asc' ? orderA - orderB : orderB - orderA;
  });
}

/**
 * Sort applications by priority (using PRIORITY_ORDER)
 */
export function sortByPriority(
  applications: JobApplication[],
  order: 'asc' | 'desc' = 'asc'
): JobApplication[] {
  return [...applications].sort((a, b) => {
    const orderA = PRIORITY_ORDER[a.priority];
    const orderB = PRIORITY_ORDER[b.priority];
    return order === 'asc' ? orderA - orderB : orderB - orderA;
  });
}

/**
 * Sort applications by salary (using max salary)
 */
export function sortBySalary(
  applications: JobApplication[],
  order: 'asc' | 'desc' = 'desc'
): JobApplication[] {
  return [...applications].sort((a, b) => {
    // Applications without salary go to the end
    if (!a.salary && !b.salary) return 0;
    if (!a.salary) return 1;
    if (!b.salary) return -1;

    const salaryA = a.salary.max;
    const salaryB = b.salary.max;
    return order === 'desc' ? salaryB - salaryA : salaryA - salaryB;
  });
}

/**
 * Sort applications by last updated date
 */
export function sortByLastUpdated(
  applications: JobApplication[],
  order: 'asc' | 'desc' = 'desc'
): JobApplication[] {
  return [...applications].sort((a, b) => {
    const dateA = new Date(a.lastUpdated).getTime();
    const dateB = new Date(b.lastUpdated).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

// ============================================================================
// Combined Sort Function
// ============================================================================

/**
 * Sort applications by the specified sort option
 */
export function sortApplicationsByOption(
  applications: JobApplication[],
  sortOption: ApplicationSortOption
): JobApplication[] {
  switch (sortOption) {
    case 'appliedDate-desc':
      return sortByAppliedDate(applications, 'desc');
    case 'appliedDate-asc':
      return sortByAppliedDate(applications, 'asc');
    case 'company-asc':
      return sortByCompany(applications, 'asc');
    case 'company-desc':
      return sortByCompany(applications, 'desc');
    case 'status-asc':
      return sortByStatus(applications, 'asc');
    case 'status-desc':
      return sortByStatus(applications, 'desc');
    case 'priority-asc':
      return sortByPriority(applications, 'asc');
    case 'priority-desc':
      return sortByPriority(applications, 'desc');
    case 'salary-asc':
      return sortBySalary(applications, 'asc');
    case 'salary-desc':
      return sortBySalary(applications, 'desc');
    case 'lastUpdated-desc':
      return sortByLastUpdated(applications, 'desc');
    case 'lastUpdated-asc':
      return sortByLastUpdated(applications, 'asc');
    default:
      return applications;
  }
}

// ============================================================================
// Filter + Sort Combined
// ============================================================================

/**
 * Filter and sort applications in one operation
 */
export function filterAndSortApplications(
  applications: JobApplication[],
  filters: ApplicationFilter,
  sortOption: ApplicationSortOption
): JobApplication[] {
  const filtered = filterApplicationsByFilters(applications, filters);
  return sortApplicationsByOption(filtered, sortOption);
}

// ============================================================================
// Filter Utilities
// ============================================================================

/**
 * Get unique companies from applications
 */
export function getUniqueCompanies(applications: JobApplication[]): string[] {
  const companies = new Set(applications.map((app) => app.company));
  return Array.from(companies).sort();
}

/**
 * Get unique tags from applications
 */
export function getUniqueTags(applications: JobApplication[]): string[] {
  const tags = new Set(applications.flatMap((app) => app.tags));
  return Array.from(tags).sort();
}

/**
 * Get unique locations from applications
 */
export function getUniqueLocations(applications: JobApplication[]): string[] {
  const locations = new Set(applications.map((app) => app.location));
  return Array.from(locations).sort();
}

/**
 * Check if a filter is empty (has no active filters)
 */
export function isFilterEmpty(filter: ApplicationFilter): boolean {
  return (
    (!filter.statuses || filter.statuses.length === 0) &&
    (!filter.priorities || filter.priorities.length === 0) &&
    (!filter.workLocationTypes || filter.workLocationTypes.length === 0) &&
    (!filter.employmentTypes || filter.employmentTypes.length === 0) &&
    (!filter.companies || filter.companies.length === 0) &&
    (!filter.tags || filter.tags.length === 0) &&
    !filter.searchQuery &&
    !filter.dateRange &&
    !filter.salaryRange &&
    filter.hasFollowUp === undefined &&
    filter.hasPendingInterviews === undefined
  );
}

/**
 * Count the number of active filters
 */
export function countActiveFilters(filter: ApplicationFilter): number {
  let count = 0;

  if (filter.statuses && filter.statuses.length > 0) count++;
  if (filter.priorities && filter.priorities.length > 0) count++;
  if (filter.workLocationTypes && filter.workLocationTypes.length > 0) count++;
  if (filter.employmentTypes && filter.employmentTypes.length > 0) count++;
  if (filter.companies && filter.companies.length > 0) count++;
  if (filter.tags && filter.tags.length > 0) count++;
  if (filter.searchQuery) count++;
  if (filter.dateRange) count++;
  if (filter.salaryRange) count++;
  if (filter.hasFollowUp !== undefined) count++;
  if (filter.hasPendingInterviews !== undefined) count++;

  return count;
}

/**
 * Create an empty filter object
 */
export function createEmptyFilter(): ApplicationFilter {
  return {};
}

/**
 * Merge two filter objects (second filter takes precedence)
 */
export function mergeFilters(
  filter1: ApplicationFilter,
  filter2: ApplicationFilter
): ApplicationFilter {
  return {
    ...filter1,
    ...filter2,
    statuses: filter2.statuses ?? filter1.statuses,
    priorities: filter2.priorities ?? filter1.priorities,
    workLocationTypes: filter2.workLocationTypes ?? filter1.workLocationTypes,
    employmentTypes: filter2.employmentTypes ?? filter1.employmentTypes,
    companies: filter2.companies ?? filter1.companies,
    tags: filter2.tags ?? filter1.tags,
  };
}
