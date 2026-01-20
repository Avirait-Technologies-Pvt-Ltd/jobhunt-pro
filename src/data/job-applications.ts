/**
 * Job Application Tracker - Sample Data and Query Helpers
 *
 * This file contains sample job application data for development and testing,
 * as well as helper functions for querying and manipulating applications.
 */

import type {
  JobApplication,
  ApplicationStatus,
  ApplicationPriority,
  WorkLocationType,
  ApplicationContact,
  ApplicationInterview,
  TimelineEvent,
  CreateApplicationInput,
} from '../types/job-application';

import { DEFAULT_APPLICATION_VALUES } from '../types/job-application';
import { generateApplicationId, generateContactId, generateInterviewId } from '../lib/application-utils';
import { generateTimelineEventId, createStatusChangeEvent } from '../lib/application-timeline';

// ============================================================================
// Helper to Create Dates
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

// ============================================================================
// Sample Job Applications
// ============================================================================

export const sampleJobApplications: JobApplication[] = [
  {
    id: 'app_001',
    company: 'TechCorp Inc.',
    companyWebsite: 'https://techcorp.example.com',
    jobTitle: 'Senior Frontend Developer',
    jobDescription: 'We are looking for an experienced frontend developer to join our team...',
    jobUrl: 'https://techcorp.example.com/careers/senior-frontend',
    department: 'Engineering',
    location: 'San Francisco, CA',
    workLocationType: 'hybrid',
    employmentType: 'full-time',
    status: 'interviewing',
    priority: 'high',
    salary: {
      min: 150000,
      max: 180000,
      currency: 'USD',
      period: 'yearly',
    },
    appliedDate: daysAgo(14),
    lastUpdated: daysAgo(2),
    followUpDate: daysFromNow(3),
    contacts: [
      {
        id: 'contact_001',
        name: 'Sarah Johnson',
        role: 'recruiter',
        email: 'sarah.j@techcorp.example.com',
        phone: '+1-555-0101',
        linkedIn: 'https://linkedin.com/in/sarahjohnson',
        notes: 'Very responsive, prefers email communication',
        createdAt: daysAgo(14),
        updatedAt: daysAgo(14),
      },
      {
        id: 'contact_002',
        name: 'Michael Chen',
        role: 'hiring-manager',
        email: 'michael.c@techcorp.example.com',
        notes: 'Engineering manager, 10+ years experience',
        createdAt: daysAgo(7),
        updatedAt: daysAgo(7),
      },
    ],
    interviews: [
      {
        id: 'interview_001',
        type: 'phone-screen',
        scheduledDate: daysAgo(10),
        duration: 30,
        location: 'Phone call',
        interviewers: ['Sarah Johnson'],
        notes: 'Initial screening went well',
        status: 'completed',
        feedback: 'Positive - moving to technical round',
        createdAt: daysAgo(12),
        updatedAt: daysAgo(10),
      },
      {
        id: 'interview_002',
        type: 'technical',
        scheduledDate: daysFromNow(2),
        duration: 60,
        meetingLink: 'https://zoom.us/j/123456789',
        interviewers: ['Michael Chen', 'Emily Wang'],
        notes: 'Focus on React and system design',
        status: 'scheduled',
        createdAt: daysAgo(5),
        updatedAt: daysAgo(5),
      },
    ],
    timeline: [
      {
        id: 'timeline_001',
        type: 'status-change',
        title: 'Application submitted',
        timestamp: daysAgo(14),
        metadata: { previousStatus: 'saved', newStatus: 'applied' },
      },
      {
        id: 'timeline_002',
        type: 'contact-added',
        title: 'Contact added: Sarah Johnson',
        description: 'Role: Recruiter',
        timestamp: daysAgo(14),
      },
      {
        id: 'timeline_003',
        type: 'status-change',
        title: 'Status changed to Screening',
        timestamp: daysAgo(12),
        metadata: { previousStatus: 'applied', newStatus: 'screening' },
      },
      {
        id: 'timeline_004',
        type: 'interview-scheduled',
        title: 'Phone screen scheduled',
        timestamp: daysAgo(12),
      },
      {
        id: 'timeline_005',
        type: 'interview-completed',
        title: 'Phone screen completed',
        timestamp: daysAgo(10),
      },
      {
        id: 'timeline_006',
        type: 'status-change',
        title: 'Status changed to Interviewing',
        timestamp: daysAgo(7),
        metadata: { previousStatus: 'screening', newStatus: 'interviewing' },
      },
    ],
    tags: ['react', 'frontend', 'senior', 'hybrid'],
    notes: 'Great culture fit, interesting product. Team uses React + TypeScript.',
    resumeVersion: 'v2.3-frontend',
    coverLetterVersion: 'techcorp-senior-fe',
    createdAt: daysAgo(15),
    updatedAt: daysAgo(2),
  },
  {
    id: 'app_002',
    company: 'StartupXYZ',
    companyWebsite: 'https://startupxyz.io',
    jobTitle: 'Full Stack Engineer',
    jobUrl: 'https://startupxyz.io/jobs/fullstack',
    department: 'Product',
    location: 'Remote',
    workLocationType: 'remote',
    employmentType: 'full-time',
    status: 'applied',
    priority: 'medium',
    salary: {
      min: 120000,
      max: 150000,
      currency: 'USD',
      period: 'yearly',
    },
    appliedDate: daysAgo(7),
    lastUpdated: daysAgo(7),
    contacts: [],
    interviews: [],
    timeline: [
      {
        id: 'timeline_010',
        type: 'status-change',
        title: 'Application submitted',
        timestamp: daysAgo(7),
        metadata: { previousStatus: 'saved', newStatus: 'applied' },
      },
    ],
    tags: ['fullstack', 'startup', 'remote'],
    notes: 'Early stage startup, equity included',
    resumeVersion: 'v2.3-fullstack',
    createdAt: daysAgo(7),
    updatedAt: daysAgo(7),
  },
  {
    id: 'app_003',
    company: 'Enterprise Solutions Ltd',
    companyWebsite: 'https://enterprise-solutions.com',
    jobTitle: 'Software Engineer II',
    department: 'Platform Team',
    location: 'New York, NY',
    workLocationType: 'onsite',
    employmentType: 'full-time',
    status: 'rejected',
    priority: 'low',
    salary: {
      min: 110000,
      max: 130000,
      currency: 'USD',
      period: 'yearly',
    },
    appliedDate: daysAgo(30),
    lastUpdated: daysAgo(10),
    contacts: [
      {
        id: 'contact_003',
        name: 'HR Department',
        role: 'hr',
        email: 'careers@enterprise-solutions.com',
        createdAt: daysAgo(30),
        updatedAt: daysAgo(30),
      },
    ],
    interviews: [
      {
        id: 'interview_003',
        type: 'phone-screen',
        scheduledDate: daysAgo(20),
        duration: 45,
        status: 'completed',
        feedback: 'Looking for more backend experience',
        createdAt: daysAgo(25),
        updatedAt: daysAgo(20),
      },
    ],
    timeline: [
      {
        id: 'timeline_020',
        type: 'status-change',
        title: 'Application submitted',
        timestamp: daysAgo(30),
        metadata: { previousStatus: 'saved', newStatus: 'applied' },
      },
      {
        id: 'timeline_021',
        type: 'status-change',
        title: 'Status changed to Screening',
        timestamp: daysAgo(25),
        metadata: { previousStatus: 'applied', newStatus: 'screening' },
      },
      {
        id: 'timeline_022',
        type: 'status-change',
        title: 'Application rejected',
        timestamp: daysAgo(10),
        metadata: { previousStatus: 'screening', newStatus: 'rejected' },
      },
    ],
    tags: ['enterprise', 'onsite', 'nyc'],
    notes: 'Feedback: Need more backend/Java experience for this role',
    createdAt: daysAgo(30),
    updatedAt: daysAgo(10),
  },
  {
    id: 'app_004',
    company: 'InnovateTech',
    companyWebsite: 'https://innovatetech.co',
    jobTitle: 'Frontend Engineer',
    jobUrl: 'https://innovatetech.co/careers/frontend',
    department: 'Web Team',
    location: 'Austin, TX',
    workLocationType: 'hybrid',
    employmentType: 'full-time',
    status: 'offer',
    priority: 'high',
    salary: {
      min: 140000,
      max: 160000,
      currency: 'USD',
      period: 'yearly',
    },
    appliedDate: daysAgo(21),
    lastUpdated: daysAgo(1),
    followUpDate: daysFromNow(5),
    contacts: [
      {
        id: 'contact_004',
        name: 'Amanda Williams',
        role: 'recruiter',
        email: 'amanda@innovatetech.co',
        phone: '+1-555-0202',
        createdAt: daysAgo(20),
        updatedAt: daysAgo(20),
      },
      {
        id: 'contact_005',
        name: 'David Park',
        role: 'hiring-manager',
        email: 'david.park@innovatetech.co',
        notes: 'VP of Engineering',
        createdAt: daysAgo(10),
        updatedAt: daysAgo(10),
      },
    ],
    interviews: [
      {
        id: 'interview_004',
        type: 'phone-screen',
        scheduledDate: daysAgo(18),
        duration: 30,
        status: 'completed',
        feedback: 'Excellent communication skills',
        createdAt: daysAgo(19),
        updatedAt: daysAgo(18),
      },
      {
        id: 'interview_005',
        type: 'technical',
        scheduledDate: daysAgo(12),
        duration: 90,
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        status: 'completed',
        feedback: 'Strong React skills, good problem solving',
        createdAt: daysAgo(16),
        updatedAt: daysAgo(12),
      },
      {
        id: 'interview_006',
        type: 'onsite',
        scheduledDate: daysAgo(5),
        duration: 240,
        location: 'InnovateTech HQ, Austin',
        interviewers: ['David Park', 'Team leads'],
        status: 'completed',
        feedback: 'Great culture fit, team loved them',
        createdAt: daysAgo(10),
        updatedAt: daysAgo(5),
      },
    ],
    timeline: [
      {
        id: 'timeline_030',
        type: 'status-change',
        title: 'Application submitted',
        timestamp: daysAgo(21),
        metadata: { previousStatus: 'saved', newStatus: 'applied' },
      },
      {
        id: 'timeline_031',
        type: 'status-change',
        title: 'Status changed to Screening',
        timestamp: daysAgo(19),
        metadata: { previousStatus: 'applied', newStatus: 'screening' },
      },
      {
        id: 'timeline_032',
        type: 'status-change',
        title: 'Status changed to Interviewing',
        timestamp: daysAgo(16),
        metadata: { previousStatus: 'screening', newStatus: 'interviewing' },
      },
      {
        id: 'timeline_033',
        type: 'status-change',
        title: 'Offer received!',
        timestamp: daysAgo(1),
        metadata: { previousStatus: 'interviewing', newStatus: 'offer' },
      },
    ],
    tags: ['react', 'frontend', 'austin', 'hybrid'],
    notes: 'Offer: $155k + equity + signing bonus. Need to respond by Friday.',
    resumeVersion: 'v2.3-frontend',
    coverLetterVersion: 'innovatetech-fe',
    createdAt: daysAgo(21),
    updatedAt: daysAgo(1),
  },
  {
    id: 'app_005',
    company: 'CloudScale Systems',
    companyWebsite: 'https://cloudscale.io',
    jobTitle: 'Senior Software Engineer',
    department: 'Infrastructure',
    location: 'Seattle, WA',
    workLocationType: 'hybrid',
    employmentType: 'full-time',
    status: 'screening',
    priority: 'medium',
    salary: {
      min: 160000,
      max: 200000,
      currency: 'USD',
      period: 'yearly',
    },
    appliedDate: daysAgo(5),
    lastUpdated: daysAgo(3),
    contacts: [
      {
        id: 'contact_006',
        name: 'Jennifer Lee',
        role: 'recruiter',
        email: 'jennifer.lee@cloudscale.io',
        createdAt: daysAgo(3),
        updatedAt: daysAgo(3),
      },
    ],
    interviews: [],
    timeline: [
      {
        id: 'timeline_040',
        type: 'status-change',
        title: 'Application submitted',
        timestamp: daysAgo(5),
        metadata: { previousStatus: 'saved', newStatus: 'applied' },
      },
      {
        id: 'timeline_041',
        type: 'status-change',
        title: 'Status changed to Screening',
        timestamp: daysAgo(3),
        metadata: { previousStatus: 'applied', newStatus: 'screening' },
      },
      {
        id: 'timeline_042',
        type: 'contact-added',
        title: 'Contact added: Jennifer Lee',
        timestamp: daysAgo(3),
      },
    ],
    tags: ['cloud', 'infrastructure', 'senior', 'seattle'],
    notes: 'Waiting for technical screen scheduling',
    resumeVersion: 'v2.3-fullstack',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(3),
  },
  {
    id: 'app_006',
    company: 'DataDriven Analytics',
    jobTitle: 'Frontend Developer',
    location: 'Chicago, IL',
    workLocationType: 'remote',
    employmentType: 'full-time',
    status: 'saved',
    priority: 'low',
    appliedDate: daysAgo(1),
    lastUpdated: daysAgo(1),
    contacts: [],
    interviews: [],
    timeline: [],
    tags: ['analytics', 'data', 'remote'],
    notes: 'Interesting company, need to research more before applying',
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: 'app_007',
    company: 'FinTech Global',
    companyWebsite: 'https://fintechglobal.com',
    jobTitle: 'React Developer',
    jobUrl: 'https://fintechglobal.com/careers/react',
    department: 'Consumer Products',
    location: 'Boston, MA',
    workLocationType: 'hybrid',
    employmentType: 'full-time',
    status: 'withdrawn',
    priority: 'medium',
    salary: {
      min: 130000,
      max: 155000,
      currency: 'USD',
      period: 'yearly',
    },
    appliedDate: daysAgo(25),
    lastUpdated: daysAgo(8),
    contacts: [
      {
        id: 'contact_007',
        name: 'Tom Richards',
        role: 'recruiter',
        email: 'tom.r@fintechglobal.com',
        createdAt: daysAgo(20),
        updatedAt: daysAgo(20),
      },
    ],
    interviews: [
      {
        id: 'interview_007',
        type: 'phone-screen',
        scheduledDate: daysAgo(15),
        duration: 30,
        status: 'completed',
        createdAt: daysAgo(18),
        updatedAt: daysAgo(15),
      },
    ],
    timeline: [
      {
        id: 'timeline_050',
        type: 'status-change',
        title: 'Application submitted',
        timestamp: daysAgo(25),
        metadata: { previousStatus: 'saved', newStatus: 'applied' },
      },
      {
        id: 'timeline_051',
        type: 'status-change',
        title: 'Status changed to Screening',
        timestamp: daysAgo(20),
        metadata: { previousStatus: 'applied', newStatus: 'screening' },
      },
      {
        id: 'timeline_052',
        type: 'status-change',
        title: 'Application withdrawn',
        description: 'Accepted offer elsewhere',
        timestamp: daysAgo(8),
        metadata: { previousStatus: 'screening', newStatus: 'withdrawn' },
      },
    ],
    tags: ['fintech', 'react', 'boston'],
    notes: 'Withdrew - accepted another offer',
    createdAt: daysAgo(25),
    updatedAt: daysAgo(8),
  },
  {
    id: 'app_008',
    company: 'GreenEnergy Tech',
    companyWebsite: 'https://greenenergy.tech',
    jobTitle: 'UI/UX Developer',
    department: 'Design Systems',
    location: 'Denver, CO',
    workLocationType: 'remote',
    employmentType: 'full-time',
    status: 'applied',
    priority: 'high',
    salary: {
      min: 125000,
      max: 145000,
      currency: 'USD',
      period: 'yearly',
    },
    appliedDate: daysAgo(3),
    lastUpdated: daysAgo(3),
    followUpDate: daysFromNow(7),
    contacts: [],
    interviews: [],
    timeline: [
      {
        id: 'timeline_060',
        type: 'status-change',
        title: 'Application submitted',
        timestamp: daysAgo(3),
        metadata: { previousStatus: 'saved', newStatus: 'applied' },
      },
    ],
    tags: ['ui/ux', 'design', 'remote', 'sustainability'],
    notes: 'Mission-driven company focused on sustainability',
    resumeVersion: 'v2.3-frontend',
    coverLetterVersion: 'greenenergy-ui',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
  },
  {
    id: 'app_009',
    company: 'HealthTech Solutions',
    companyWebsite: 'https://healthtech.solutions',
    jobTitle: 'Senior Frontend Engineer',
    jobUrl: 'https://healthtech.solutions/careers/senior-fe',
    department: 'Patient Portal',
    location: 'Portland, OR',
    workLocationType: 'hybrid',
    employmentType: 'full-time',
    status: 'interviewing',
    priority: 'high',
    salary: {
      min: 145000,
      max: 175000,
      currency: 'USD',
      period: 'yearly',
    },
    appliedDate: daysAgo(18),
    lastUpdated: daysAgo(2),
    followUpDate: daysAgo(1), // Overdue follow-up
    contacts: [
      {
        id: 'contact_008',
        name: 'Lisa Martinez',
        role: 'recruiter',
        email: 'lisa.m@healthtech.solutions',
        phone: '+1-555-0303',
        createdAt: daysAgo(15),
        updatedAt: daysAgo(15),
      },
      {
        id: 'contact_009',
        name: 'Robert Kim',
        role: 'hiring-manager',
        email: 'robert.kim@healthtech.solutions',
        notes: 'Engineering Director',
        createdAt: daysAgo(8),
        updatedAt: daysAgo(8),
      },
    ],
    interviews: [
      {
        id: 'interview_008',
        type: 'phone-screen',
        scheduledDate: daysAgo(14),
        duration: 30,
        status: 'completed',
        feedback: 'Strong background, good communication',
        createdAt: daysAgo(15),
        updatedAt: daysAgo(14),
      },
      {
        id: 'interview_009',
        type: 'technical',
        scheduledDate: daysAgo(7),
        duration: 75,
        meetingLink: 'https://zoom.us/j/987654321',
        status: 'completed',
        feedback: 'Excellent React knowledge, good system design',
        createdAt: daysAgo(10),
        updatedAt: daysAgo(7),
      },
      {
        id: 'interview_010',
        type: 'behavioral',
        scheduledDate: daysFromNow(4),
        duration: 60,
        meetingLink: 'https://zoom.us/j/111222333',
        interviewers: ['Robert Kim', 'Team members'],
        status: 'scheduled',
        createdAt: daysAgo(2),
        updatedAt: daysAgo(2),
      },
    ],
    timeline: [
      {
        id: 'timeline_070',
        type: 'status-change',
        title: 'Application submitted',
        timestamp: daysAgo(18),
        metadata: { previousStatus: 'saved', newStatus: 'applied' },
      },
      {
        id: 'timeline_071',
        type: 'status-change',
        title: 'Status changed to Screening',
        timestamp: daysAgo(15),
        metadata: { previousStatus: 'applied', newStatus: 'screening' },
      },
      {
        id: 'timeline_072',
        type: 'status-change',
        title: 'Status changed to Interviewing',
        timestamp: daysAgo(10),
        metadata: { previousStatus: 'screening', newStatus: 'interviewing' },
      },
    ],
    tags: ['healthcare', 'react', 'senior', 'portland'],
    notes: 'Great opportunity in healthcare tech. Focus on accessibility.',
    resumeVersion: 'v2.3-frontend',
    coverLetterVersion: 'healthtech-sr',
    createdAt: daysAgo(18),
    updatedAt: daysAgo(2),
  },
  {
    id: 'app_010',
    company: 'MediaStream Inc',
    companyWebsite: 'https://mediastream.tv',
    jobTitle: 'JavaScript Developer',
    department: 'Streaming Platform',
    location: 'Los Angeles, CA',
    workLocationType: 'onsite',
    employmentType: 'contract',
    status: 'applied',
    priority: 'low',
    salary: {
      min: 75,
      max: 95,
      currency: 'USD',
      period: 'hourly',
    },
    appliedDate: daysAgo(10),
    lastUpdated: daysAgo(10),
    contacts: [],
    interviews: [],
    timeline: [
      {
        id: 'timeline_080',
        type: 'status-change',
        title: 'Application submitted',
        timestamp: daysAgo(10),
        metadata: { previousStatus: 'saved', newStatus: 'applied' },
      },
    ],
    tags: ['media', 'streaming', 'contract', 'javascript'],
    notes: '6-month contract, possibility of conversion',
    resumeVersion: 'v2.3-fullstack',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(10),
  },
  {
    id: 'app_011',
    company: 'EduLearn Platform',
    companyWebsite: 'https://edulearn.com',
    jobTitle: 'Frontend Developer',
    department: 'Student Experience',
    location: 'Remote',
    workLocationType: 'remote',
    employmentType: 'full-time',
    status: 'accepted',
    priority: 'high',
    salary: {
      min: 135000,
      max: 150000,
      currency: 'USD',
      period: 'yearly',
    },
    appliedDate: daysAgo(45),
    lastUpdated: daysAgo(5),
    contacts: [
      {
        id: 'contact_010',
        name: 'Patricia Moore',
        role: 'recruiter',
        email: 'patricia@edulearn.com',
        createdAt: daysAgo(42),
        updatedAt: daysAgo(42),
      },
      {
        id: 'contact_011',
        name: 'James Wilson',
        role: 'hiring-manager',
        email: 'james.w@edulearn.com',
        notes: 'CTO',
        createdAt: daysAgo(30),
        updatedAt: daysAgo(30),
      },
    ],
    interviews: [
      {
        id: 'interview_011',
        type: 'phone-screen',
        scheduledDate: daysAgo(40),
        duration: 30,
        status: 'completed',
        createdAt: daysAgo(42),
        updatedAt: daysAgo(40),
      },
      {
        id: 'interview_012',
        type: 'technical',
        scheduledDate: daysAgo(30),
        duration: 90,
        status: 'completed',
        createdAt: daysAgo(35),
        updatedAt: daysAgo(30),
      },
      {
        id: 'interview_013',
        type: 'final',
        scheduledDate: daysAgo(15),
        duration: 60,
        status: 'completed',
        feedback: 'Offer extended!',
        createdAt: daysAgo(20),
        updatedAt: daysAgo(15),
      },
    ],
    timeline: [
      {
        id: 'timeline_090',
        type: 'status-change',
        title: 'Application submitted',
        timestamp: daysAgo(45),
        metadata: { previousStatus: 'saved', newStatus: 'applied' },
      },
      {
        id: 'timeline_091',
        type: 'status-change',
        title: 'Status changed to Screening',
        timestamp: daysAgo(42),
        metadata: { previousStatus: 'applied', newStatus: 'screening' },
      },
      {
        id: 'timeline_092',
        type: 'status-change',
        title: 'Status changed to Interviewing',
        timestamp: daysAgo(35),
        metadata: { previousStatus: 'screening', newStatus: 'interviewing' },
      },
      {
        id: 'timeline_093',
        type: 'status-change',
        title: 'Offer received!',
        timestamp: daysAgo(10),
        metadata: { previousStatus: 'interviewing', newStatus: 'offer' },
      },
      {
        id: 'timeline_094',
        type: 'status-change',
        title: 'Offer accepted!',
        timestamp: daysAgo(5),
        metadata: { previousStatus: 'offer', newStatus: 'accepted' },
      },
    ],
    tags: ['edtech', 'remote', 'frontend', 'react'],
    notes: 'Accepted! Start date: Next month. $145k + equity.',
    resumeVersion: 'v2.3-frontend',
    coverLetterVersion: 'edulearn-fe',
    createdAt: daysAgo(45),
    updatedAt: daysAgo(5),
  },
];

// ============================================================================
// Query Helper Functions
// ============================================================================

/**
 * Get an application by ID
 */
export function getApplicationById(
  applications: JobApplication[],
  id: string
): JobApplication | undefined {
  return applications.find((app) => app.id === id);
}

/**
 * Get applications by status
 */
export function getApplicationsByStatus(
  applications: JobApplication[],
  status: ApplicationStatus
): JobApplication[] {
  return applications.filter((app) => app.status === status);
}

/**
 * Get applications by priority
 */
export function getApplicationsByPriority(
  applications: JobApplication[],
  priority: ApplicationPriority
): JobApplication[] {
  return applications.filter((app) => app.priority === priority);
}

/**
 * Get applications by company
 */
export function getApplicationsByCompany(
  applications: JobApplication[],
  company: string
): JobApplication[] {
  const lowerCompany = company.toLowerCase();
  return applications.filter((app) =>
    app.company.toLowerCase().includes(lowerCompany)
  );
}

/**
 * Get applications by work location type
 */
export function getApplicationsByWorkLocation(
  applications: JobApplication[],
  type: WorkLocationType
): JobApplication[] {
  return applications.filter((app) => app.workLocationType === type);
}

/**
 * Get applications with upcoming interviews
 */
export function getApplicationsWithUpcomingInterviews(
  applications: JobApplication[]
): JobApplication[] {
  const now = new Date();
  return applications.filter((app) =>
    app.interviews.some(
      (interview) =>
        interview.status === 'scheduled' &&
        new Date(interview.scheduledDate) >= now
    )
  );
}

/**
 * Get applications with overdue follow-ups
 */
export function getApplicationsWithOverdueFollowUps(
  applications: JobApplication[]
): JobApplication[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return applications.filter((app) => {
    if (!app.followUpDate) return false;
    const followUp = new Date(app.followUpDate);
    followUp.setHours(0, 0, 0, 0);
    return followUp < now;
  });
}

// ============================================================================
// Factory Functions
// ============================================================================

/**
 * Create a new job application with default values
 */
export function createApplication(input: CreateApplicationInput): JobApplication {
  const now = new Date().toISOString();
  const appliedDate = input.appliedDate || now;

  return {
    id: generateApplicationId(),
    company: input.company,
    companyWebsite: input.companyWebsite,
    jobTitle: input.jobTitle,
    jobDescription: input.jobDescription,
    jobUrl: input.jobUrl,
    department: input.department,
    location: input.location,
    workLocationType: input.workLocationType,
    employmentType: input.employmentType || DEFAULT_APPLICATION_VALUES.employmentType,
    status: input.status || DEFAULT_APPLICATION_VALUES.status,
    priority: input.priority || DEFAULT_APPLICATION_VALUES.priority,
    salary: input.salary,
    appliedDate,
    lastUpdated: now,
    contacts: DEFAULT_APPLICATION_VALUES.contacts,
    interviews: DEFAULT_APPLICATION_VALUES.interviews,
    timeline: input.status === 'applied'
      ? [
          {
            id: generateTimelineEventId(),
            type: 'status-change',
            title: 'Application submitted',
            timestamp: appliedDate,
            metadata: { previousStatus: 'saved', newStatus: 'applied' },
          },
        ]
      : DEFAULT_APPLICATION_VALUES.timeline,
    tags: input.tags || DEFAULT_APPLICATION_VALUES.tags,
    notes: input.notes,
    resumeVersion: input.resumeVersion,
    coverLetterVersion: input.coverLetterVersion,
    referralSource: input.referralSource,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Create a new contact
 */
export function createContact(
  name: string,
  role: ApplicationContact['role'],
  options?: Partial<Omit<ApplicationContact, 'id' | 'name' | 'role' | 'createdAt' | 'updatedAt'>>
): ApplicationContact {
  const now = new Date().toISOString();
  return {
    id: generateContactId(),
    name,
    role,
    email: options?.email,
    phone: options?.phone,
    linkedIn: options?.linkedIn,
    notes: options?.notes,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Create a new interview
 */
export function createInterview(
  type: ApplicationInterview['type'],
  scheduledDate: string,
  duration: number,
  options?: Partial<Omit<ApplicationInterview, 'id' | 'type' | 'scheduledDate' | 'duration' | 'status' | 'createdAt' | 'updatedAt'>>
): ApplicationInterview {
  const now = new Date().toISOString();
  return {
    id: generateInterviewId(),
    type,
    scheduledDate,
    duration,
    location: options?.location,
    meetingLink: options?.meetingLink,
    interviewers: options?.interviewers,
    notes: options?.notes,
    status: 'scheduled',
    createdAt: now,
    updatedAt: now,
  };
}

// ============================================================================
// Export Default Applications
// ============================================================================

export default sampleJobApplications;
