/**
 * Job Application Tracker - Type Definitions
 *
 * This file contains all type definitions, interfaces, and constants
 * for the Job Application Tracker feature.
 */

// ============================================================================
// Union Types
// ============================================================================

/**
 * Status of a job application throughout its lifecycle
 */
export type ApplicationStatus =
  | 'saved'
  | 'applied'
  | 'screening'
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'accepted'
  | 'withdrawn';

/**
 * Priority level for job applications
 */
export type ApplicationPriority = 'high' | 'medium' | 'low';

/**
 * Work location type for the job
 */
export type WorkLocationType = 'remote' | 'onsite' | 'hybrid';

/**
 * Employment type for the position
 */
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'temporary';

/**
 * Sort options for application listings
 */
export type ApplicationSortOption =
  | 'appliedDate-desc'
  | 'appliedDate-asc'
  | 'company-asc'
  | 'company-desc'
  | 'status-asc'
  | 'status-desc'
  | 'priority-asc'
  | 'priority-desc'
  | 'salary-asc'
  | 'salary-desc'
  | 'lastUpdated-desc'
  | 'lastUpdated-asc';

/**
 * Type of interview
 */
export type InterviewType =
  | 'phone-screen'
  | 'technical'
  | 'behavioral'
  | 'onsite'
  | 'panel'
  | 'final'
  | 'other';

/**
 * Type of timeline event
 */
export type TimelineEventType =
  | 'status-change'
  | 'note-added'
  | 'contact-added'
  | 'interview-scheduled'
  | 'interview-completed'
  | 'follow-up'
  | 'document-submitted'
  | 'other';

/**
 * Contact role in the hiring process
 */
export type ContactRole =
  | 'recruiter'
  | 'hiring-manager'
  | 'hr'
  | 'interviewer'
  | 'referral'
  | 'other';

// ============================================================================
// Core Interfaces
// ============================================================================

/**
 * Salary information for a job application
 */
export interface ApplicationSalary {
  min: number;
  max: number;
  currency: string;
  period: 'hourly' | 'monthly' | 'yearly';
}

/**
 * Contact associated with a job application
 */
export interface ApplicationContact {
  id: string;
  name: string;
  role: ContactRole;
  email?: string;
  phone?: string;
  linkedIn?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interview scheduled for a job application
 */
export interface ApplicationInterview {
  id: string;
  type: InterviewType;
  scheduledDate: string;
  duration: number; // in minutes
  location?: string;
  meetingLink?: string;
  interviewers?: string[];
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Event in the application timeline
 */
export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/**
 * Main job application interface
 */
export interface JobApplication {
  id: string;

  // Company Information
  company: string;
  companyWebsite?: string;
  companyLogo?: string;

  // Job Information
  jobTitle: string;
  jobDescription?: string;
  jobUrl?: string;
  department?: string;

  // Location & Type
  location: string;
  workLocationType: WorkLocationType;
  employmentType: EmploymentType;

  // Status & Priority
  status: ApplicationStatus;
  priority: ApplicationPriority;

  // Salary
  salary?: ApplicationSalary;

  // Dates
  appliedDate: string;
  lastUpdated: string;
  followUpDate?: string;

  // Associated Data
  contacts: ApplicationContact[];
  interviews: ApplicationInterview[];
  timeline: TimelineEvent[];

  // Additional Info
  tags: string[];
  notes?: string;
  resumeVersion?: string;
  coverLetterVersion?: string;
  referralSource?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

/**
 * Filter criteria for searching applications
 */
export interface ApplicationFilter {
  statuses?: ApplicationStatus[];
  priorities?: ApplicationPriority[];
  workLocationTypes?: WorkLocationType[];
  employmentTypes?: EmploymentType[];
  companies?: string[];
  tags?: string[];
  searchQuery?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  salaryRange?: {
    min: number;
    max: number;
  };
  hasFollowUp?: boolean;
  hasPendingInterviews?: boolean;
}

/**
 * Summary of an application for display in lists
 */
export interface ApplicationSummary {
  id: string;
  company: string;
  jobTitle: string;
  status: ApplicationStatus;
  priority: ApplicationPriority;
  appliedDate: string;
  lastUpdated: string;
  location: string;
  workLocationType: WorkLocationType;
  nextInterviewDate?: string;
  followUpDate?: string;
  salary?: ApplicationSalary;
}

/**
 * Statistics for job applications
 */
export interface ApplicationStatistics {
  total: number;
  byStatus: Record<ApplicationStatus, number>;
  byPriority: Record<ApplicationPriority, number>;
  byMonth: Record<string, number>;
  successRate: number;
  averageTimeToResponse: number | null;
  activeApplications: number;
  pendingFollowUps: number;
  upcomingInterviews: number;
  recentActivity: {
    lastWeek: number;
    lastMonth: number;
  };
}

/**
 * Input for creating a new application
 */
export interface CreateApplicationInput {
  company: string;
  jobTitle: string;
  location: string;
  workLocationType: WorkLocationType;
  employmentType?: EmploymentType;
  status?: ApplicationStatus;
  priority?: ApplicationPriority;
  salary?: ApplicationSalary;
  jobUrl?: string;
  jobDescription?: string;
  companyWebsite?: string;
  department?: string;
  tags?: string[];
  notes?: string;
  resumeVersion?: string;
  coverLetterVersion?: string;
  referralSource?: string;
  appliedDate?: string;
}

/**
 * Input for updating an existing application
 */
export interface UpdateApplicationInput {
  company?: string;
  jobTitle?: string;
  location?: string;
  workLocationType?: WorkLocationType;
  employmentType?: EmploymentType;
  status?: ApplicationStatus;
  priority?: ApplicationPriority;
  salary?: ApplicationSalary;
  jobUrl?: string;
  jobDescription?: string;
  companyWebsite?: string;
  companyLogo?: string;
  department?: string;
  tags?: string[];
  notes?: string;
  resumeVersion?: string;
  coverLetterVersion?: string;
  referralSource?: string;
  followUpDate?: string;
}

/**
 * Input for creating a new contact
 */
export interface CreateContactInput {
  name: string;
  role: ContactRole;
  email?: string;
  phone?: string;
  linkedIn?: string;
  notes?: string;
}

/**
 * Input for creating a new interview
 */
export interface CreateInterviewInput {
  type: InterviewType;
  scheduledDate: string;
  duration: number;
  location?: string;
  meetingLink?: string;
  interviewers?: string[];
  notes?: string;
}

// ============================================================================
// Configuration Constants
// ============================================================================

/**
 * Human-readable labels for application statuses
 */
export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  saved: 'Saved',
  applied: 'Applied',
  screening: 'Screening',
  interviewing: 'Interviewing',
  offer: 'Offer Received',
  rejected: 'Rejected',
  accepted: 'Accepted',
  withdrawn: 'Withdrawn',
};

/**
 * Color codes for application statuses (for UI display)
 */
export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  saved: '#6B7280',      // Gray
  applied: '#3B82F6',    // Blue
  screening: '#8B5CF6',  // Purple
  interviewing: '#F59E0B', // Amber
  offer: '#10B981',      // Emerald
  rejected: '#EF4444',   // Red
  accepted: '#059669',   // Green
  withdrawn: '#9CA3AF',  // Gray
};

/**
 * Human-readable labels for priority levels
 */
export const APPLICATION_PRIORITY_LABELS: Record<ApplicationPriority, string> = {
  high: 'High Priority',
  medium: 'Medium Priority',
  low: 'Low Priority',
};

/**
 * Color codes for priority levels
 */
export const APPLICATION_PRIORITY_COLORS: Record<ApplicationPriority, string> = {
  high: '#EF4444',   // Red
  medium: '#F59E0B', // Amber
  low: '#6B7280',    // Gray
};

/**
 * Human-readable labels for work location types
 */
export const WORK_LOCATION_LABELS: Record<WorkLocationType, string> = {
  remote: 'Remote',
  onsite: 'On-site',
  hybrid: 'Hybrid',
};

/**
 * Human-readable labels for employment types
 */
export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
  temporary: 'Temporary',
};

/**
 * Human-readable labels for interview types
 */
export const INTERVIEW_TYPE_LABELS: Record<InterviewType, string> = {
  'phone-screen': 'Phone Screen',
  technical: 'Technical Interview',
  behavioral: 'Behavioral Interview',
  onsite: 'On-site Interview',
  panel: 'Panel Interview',
  final: 'Final Interview',
  other: 'Other',
};

/**
 * Human-readable labels for contact roles
 */
export const CONTACT_ROLE_LABELS: Record<ContactRole, string> = {
  recruiter: 'Recruiter',
  'hiring-manager': 'Hiring Manager',
  hr: 'HR Representative',
  interviewer: 'Interviewer',
  referral: 'Referral Contact',
  other: 'Other',
};

/**
 * Valid status transitions - defines the state machine for application status
 */
export const VALID_STATUS_TRANSITIONS: Record<ApplicationStatus, ApplicationStatus[]> = {
  saved: ['applied', 'withdrawn'],
  applied: ['screening', 'interviewing', 'rejected', 'withdrawn'],
  screening: ['interviewing', 'rejected', 'withdrawn'],
  interviewing: ['offer', 'rejected', 'withdrawn'],
  offer: ['accepted', 'rejected', 'withdrawn'],
  rejected: [], // Terminal state
  accepted: ['withdrawn'], // Can still withdraw after accepting
  withdrawn: [], // Terminal state
};

/**
 * Order of statuses for sorting (from earliest to latest in typical flow)
 */
export const STATUS_ORDER: Record<ApplicationStatus, number> = {
  saved: 0,
  applied: 1,
  screening: 2,
  interviewing: 3,
  offer: 4,
  accepted: 5,
  rejected: 6,
  withdrawn: 7,
};

/**
 * Order of priorities for sorting (highest to lowest)
 */
export const PRIORITY_ORDER: Record<ApplicationPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

/**
 * Terminal statuses that cannot transition to other statuses
 */
export const TERMINAL_STATUSES: ApplicationStatus[] = ['rejected', 'withdrawn'];

/**
 * Active statuses (not terminal, still in progress)
 */
export const ACTIVE_STATUSES: ApplicationStatus[] = [
  'saved',
  'applied',
  'screening',
  'interviewing',
  'offer',
  'accepted',
];

/**
 * Default values for new applications
 */
export const DEFAULT_APPLICATION_VALUES = {
  status: 'saved' as ApplicationStatus,
  priority: 'medium' as ApplicationPriority,
  employmentType: 'full-time' as EmploymentType,
  tags: [] as string[],
  contacts: [] as ApplicationContact[],
  interviews: [] as ApplicationInterview[],
  timeline: [] as TimelineEvent[],
};

/**
 * Sort option labels for UI display
 */
export const SORT_OPTION_LABELS: Record<ApplicationSortOption, string> = {
  'appliedDate-desc': 'Applied Date (Newest First)',
  'appliedDate-asc': 'Applied Date (Oldest First)',
  'company-asc': 'Company (A-Z)',
  'company-desc': 'Company (Z-A)',
  'status-asc': 'Status (Early to Late)',
  'status-desc': 'Status (Late to Early)',
  'priority-asc': 'Priority (High to Low)',
  'priority-desc': 'Priority (Low to High)',
  'salary-asc': 'Salary (Low to High)',
  'salary-desc': 'Salary (High to Low)',
  'lastUpdated-desc': 'Last Updated (Recent First)',
  'lastUpdated-asc': 'Last Updated (Oldest First)',
};
