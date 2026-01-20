/**
 * Job Application Tracker - Core Utilities
 *
 * This file contains core utility functions for job applications
 * including ID generation, display helpers, and status management.
 */

import type {
  JobApplication,
  ApplicationStatus,
  ApplicationPriority,
  ApplicationSalary,
  ApplicationSummary,
  ApplicationContact,
  ApplicationInterview,
} from '../types/job-application';

import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_COLORS,
  APPLICATION_PRIORITY_LABELS,
  APPLICATION_PRIORITY_COLORS,
  VALID_STATUS_TRANSITIONS,
  TERMINAL_STATUSES,
  WORK_LOCATION_LABELS,
  EMPLOYMENT_TYPE_LABELS,
  INTERVIEW_TYPE_LABELS,
  CONTACT_ROLE_LABELS,
} from '../types/job-application';

// ============================================================================
// ID Generation
// ============================================================================

/**
 * Generate a unique ID for job applications
 */
export function generateApplicationId(): string {
  return `app_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generate a unique ID for contacts
 */
export function generateContactId(): string {
  return `contact_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generate a unique ID for interviews
 */
export function generateInterviewId(): string {
  return `interview_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generate a unique ID for timeline events
 */
export function generateTimelineEventId(): string {
  return `timeline_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// ============================================================================
// Display Helpers
// ============================================================================

/**
 * Get the display label for a status
 */
export function getStatusDisplay(status: ApplicationStatus): {
  label: string;
  color: string;
} {
  return {
    label: APPLICATION_STATUS_LABELS[status],
    color: APPLICATION_STATUS_COLORS[status],
  };
}

/**
 * Get the display label for a priority
 */
export function getPriorityDisplay(priority: ApplicationPriority): {
  label: string;
  color: string;
} {
  return {
    label: APPLICATION_PRIORITY_LABELS[priority],
    color: APPLICATION_PRIORITY_COLORS[priority],
  };
}

/**
 * Get the display label for a work location type
 */
export function getWorkLocationDisplay(type: string): string {
  return WORK_LOCATION_LABELS[type as keyof typeof WORK_LOCATION_LABELS] || type;
}

/**
 * Get the display label for an employment type
 */
export function getEmploymentTypeDisplay(type: string): string {
  return EMPLOYMENT_TYPE_LABELS[type as keyof typeof EMPLOYMENT_TYPE_LABELS] || type;
}

/**
 * Get the display label for an interview type
 */
export function getInterviewTypeDisplay(type: string): string {
  return INTERVIEW_TYPE_LABELS[type as keyof typeof INTERVIEW_TYPE_LABELS] || type;
}

/**
 * Get the display label for a contact role
 */
export function getContactRoleDisplay(role: string): string {
  return CONTACT_ROLE_LABELS[role as keyof typeof CONTACT_ROLE_LABELS] || role;
}

/**
 * Format a salary range for display
 */
export function formatSalaryRange(salary: ApplicationSalary): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: salary.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const min = formatter.format(salary.min);
  const max = formatter.format(salary.max);

  let periodLabel = '';
  switch (salary.period) {
    case 'hourly':
      periodLabel = '/hr';
      break;
    case 'monthly':
      periodLabel = '/mo';
      break;
    case 'yearly':
      periodLabel = '/yr';
      break;
  }

  if (salary.min === salary.max) {
    return `${min}${periodLabel}`;
  }

  return `${min} - ${max}${periodLabel}`;
}

/**
 * Format a salary as a single number (average) for comparison
 */
export function getSalaryMidpoint(salary: ApplicationSalary): number {
  return (salary.min + salary.max) / 2;
}

/**
 * Normalize salary to yearly for comparison
 */
export function normalizeToYearlySalary(salary: ApplicationSalary): number {
  const midpoint = getSalaryMidpoint(salary);

  switch (salary.period) {
    case 'hourly':
      return midpoint * 40 * 52; // Assuming 40 hours/week, 52 weeks/year
    case 'monthly':
      return midpoint * 12;
    case 'yearly':
      return midpoint;
    default:
      return midpoint;
  }
}

// ============================================================================
// Status Management
// ============================================================================

/**
 * Check if a status transition is valid
 */
export function isValidStatusTransition(
  currentStatus: ApplicationStatus,
  newStatus: ApplicationStatus
): boolean {
  if (currentStatus === newStatus) return false;
  const validTransitions = VALID_STATUS_TRANSITIONS[currentStatus];
  return validTransitions.includes(newStatus);
}

/**
 * Get all valid next statuses from the current status
 */
export function getValidNextStatuses(currentStatus: ApplicationStatus): ApplicationStatus[] {
  return VALID_STATUS_TRANSITIONS[currentStatus];
}

/**
 * Check if a status is a terminal status (cannot transition further)
 */
export function isTerminalStatus(status: ApplicationStatus): boolean {
  return TERMINAL_STATUSES.includes(status);
}

/**
 * Check if an application is active (not in a terminal state)
 */
export function isActiveApplication(application: JobApplication): boolean {
  return !isTerminalStatus(application.status);
}

/**
 * Get all possible status transitions with their labels
 */
export function getStatusTransitionOptions(
  currentStatus: ApplicationStatus
): { status: ApplicationStatus; label: string; color: string }[] {
  const validStatuses = getValidNextStatuses(currentStatus);
  return validStatuses.map((status) => ({
    status,
    label: APPLICATION_STATUS_LABELS[status],
    color: APPLICATION_STATUS_COLORS[status],
  }));
}

// ============================================================================
// Search
// ============================================================================

/**
 * Search applications by a query string
 * Searches across company, job title, notes, tags, and location
 */
export function searchApplicationsByQuery(
  applications: JobApplication[],
  query: string
): JobApplication[] {
  if (!query || query.trim() === '') return applications;

  const lowerQuery = query.toLowerCase().trim();
  const searchTerms = lowerQuery.split(/\s+/);

  return applications.filter((app) => {
    const searchableText = [
      app.company,
      app.jobTitle,
      app.location,
      app.notes || '',
      app.department || '',
      app.jobDescription || '',
      ...app.tags,
      ...app.contacts.map((c) => c.name),
    ]
      .join(' ')
      .toLowerCase();

    // All search terms must match
    return searchTerms.every((term) => searchableText.includes(term));
  });
}

// ============================================================================
// Summary Generation
// ============================================================================

/**
 * Generate a summary from a full application object
 */
export function generateApplicationSummary(application: JobApplication): ApplicationSummary {
  // Find the next scheduled interview
  const nextInterview = application.interviews
    .filter(
      (i) => i.status === 'scheduled' && new Date(i.scheduledDate) >= new Date()
    )
    .sort(
      (a, b) =>
        new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
    )[0];

  return {
    id: application.id,
    company: application.company,
    jobTitle: application.jobTitle,
    status: application.status,
    priority: application.priority,
    appliedDate: application.appliedDate,
    lastUpdated: application.lastUpdated,
    location: application.location,
    workLocationType: application.workLocationType,
    nextInterviewDate: nextInterview?.scheduledDate,
    followUpDate: application.followUpDate,
    salary: application.salary,
  };
}

/**
 * Generate summaries for multiple applications
 */
export function generateApplicationSummaries(
  applications: JobApplication[]
): ApplicationSummary[] {
  return applications.map(generateApplicationSummary);
}

// ============================================================================
// Application Helpers
// ============================================================================

/**
 * Get the next scheduled interview for an application
 */
export function getNextInterview(
  application: JobApplication
): ApplicationInterview | null {
  const scheduled = application.interviews
    .filter(
      (i) => i.status === 'scheduled' && new Date(i.scheduledDate) >= new Date()
    )
    .sort(
      (a, b) =>
        new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
    );

  return scheduled[0] || null;
}

/**
 * Get all completed interviews for an application
 */
export function getCompletedInterviews(
  application: JobApplication
): ApplicationInterview[] {
  return application.interviews.filter((i) => i.status === 'completed');
}

/**
 * Get the primary contact for an application (first recruiter or hiring manager)
 */
export function getPrimaryContact(
  application: JobApplication
): ApplicationContact | null {
  const recruiter = application.contacts.find((c) => c.role === 'recruiter');
  if (recruiter) return recruiter;

  const hiringManager = application.contacts.find((c) => c.role === 'hiring-manager');
  if (hiringManager) return hiringManager;

  return application.contacts[0] || null;
}

/**
 * Check if an application has any contacts
 */
export function hasContacts(application: JobApplication): boolean {
  return application.contacts.length > 0;
}

/**
 * Check if an application has any interviews
 */
export function hasInterviews(application: JobApplication): boolean {
  return application.interviews.length > 0;
}

/**
 * Check if an application has any pending interviews
 */
export function hasPendingInterviews(application: JobApplication): boolean {
  return application.interviews.some(
    (i) => i.status === 'scheduled' && new Date(i.scheduledDate) >= new Date()
  );
}

/**
 * Check if an application has a follow-up set
 */
export function hasFollowUp(application: JobApplication): boolean {
  return application.followUpDate !== undefined && application.followUpDate !== null;
}

/**
 * Check if an application's follow-up is overdue
 */
export function isFollowUpOverdue(application: JobApplication): boolean {
  if (!application.followUpDate) return false;
  const followUpDate = new Date(application.followUpDate);
  const now = new Date();
  followUpDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return followUpDate < now;
}

// ============================================================================
// Validation
// ============================================================================

/**
 * Validate that a job application has all required fields
 */
export function validateApplication(application: Partial<JobApplication>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!application.company || application.company.trim() === '') {
    errors.push('Company name is required');
  }

  if (!application.jobTitle || application.jobTitle.trim() === '') {
    errors.push('Job title is required');
  }

  if (!application.location || application.location.trim() === '') {
    errors.push('Location is required');
  }

  if (!application.workLocationType) {
    errors.push('Work location type is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate a contact
 */
export function validateContact(contact: Partial<ApplicationContact>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!contact.name || contact.name.trim() === '') {
    errors.push('Contact name is required');
  }

  if (!contact.role) {
    errors.push('Contact role is required');
  }

  if (contact.email && !isValidEmail(contact.email)) {
    errors.push('Invalid email format');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Simple email validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate an interview
 */
export function validateInterview(interview: Partial<ApplicationInterview>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!interview.type) {
    errors.push('Interview type is required');
  }

  if (!interview.scheduledDate) {
    errors.push('Scheduled date is required');
  }

  if (!interview.duration || interview.duration <= 0) {
    errors.push('Duration must be a positive number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
