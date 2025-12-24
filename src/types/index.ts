// User Types
export interface AppliedJob {
  jobId: string;
  status: 'pending' | 'reviewed' | 'interview' | 'offered' | 'rejected';
  appliedAt: string;
}

export interface SavedJob {
  jobId: string;
  savedAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  name?: string;
  phone?: string;
  location?: string;
  title?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  resume?: string;
  profileCompletion?: number;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  languages: Language[];
  socialLinks: SocialLinks;
  preferences: UserPreferences;
  appliedJobs: AppliedJob[];
  savedJobs: SavedJob[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  name: string;
  level?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  gpa?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Conversational' | 'Professional' | 'Native';
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
}

export interface UserPreferences {
  jobAlerts: boolean;
  emailNotifications: boolean;
  profileVisibility: 'public' | 'private' | 'recruiters';
  preferredJobTypes: JobType[];
  preferredLocations: string[];
  expectedSalary?: SalaryRange;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salary: SalaryRange;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills: string[];
  category: JobCategory;
  remote: boolean;
  urgent: boolean;
  featured: boolean;
  applicants: number;
  postedDate: string;
  deadline?: string;
  status: 'active' | 'closed' | 'draft';
}

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';

export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive' | 'Internship';

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: 'hourly' | 'monthly' | 'yearly';
}

export type JobCategory =
  | 'Technology'
  | 'Design'
  | 'Marketing'
  | 'Sales'
  | 'Finance'
  | 'Healthcare'
  | 'Education'
  | 'Engineering'
  | 'Human Resources'
  | 'Customer Service'
  | 'Legal'
  | 'Operations'
  | 'Data Science'
  | 'Product Management'
  | 'Content Writing'
  | 'Other';

// Company Types
export interface Company {
  id: string;
  name: string;
  logo: string;
  banner?: string;
  industry: string;
  size: CompanySize;
  founded: number;
  website: string;
  description: string;
  mission?: string;
  culture?: string;
  benefits: string[];
  locations: CompanyLocation[];
  socialLinks: CompanySocialLinks;
  photos: string[];
  rating: number;
  reviewCount: number;
  openPositions: number;
  verified: boolean;
}

export type CompanySize = '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';

export interface CompanyLocation {
  city: string;
  country: string;
  address?: string;
  isHeadquarters: boolean;
}

export interface CompanySocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface CompanyReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  pros: string;
  cons: string;
  date: string;
  helpful: number;
}

// Application Types
export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  appliedDate: string;
  coverLetter?: string;
  resume?: string;
  notes?: string;
  timeline: ApplicationTimeline[];
}

export type ApplicationStatus =
  | 'Applied'
  | 'Under Review'
  | 'Interview Scheduled'
  | 'Interviewed'
  | 'Offer Extended'
  | 'Accepted'
  | 'Rejected'
  | 'Withdrawn';

export interface ApplicationTimeline {
  status: ApplicationStatus;
  date: string;
  note?: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  category: BlogCategory;
  tags: string[];
  image: string;
  readTime: number;
  publishedDate: string;
  featured: boolean;
}

export interface BlogAuthor {
  name: string;
  avatar: string;
  bio: string;
}

export type BlogCategory =
  | 'Career Advice'
  | 'Interview Tips'
  | 'Resume Writing'
  | 'Job Search'
  | 'Industry Insights'
  | 'Work-Life Balance'
  | 'Professional Development';

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
  };
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Category Types for Landing Page
export interface Category {
  id: string;
  name: JobCategory;
  icon: string;
  jobCount: number;
  description: string;
}

// Filter Types
export interface JobFilters {
  keyword: string;
  location: string;
  type: JobType[];
  experienceLevel: ExperienceLevel[];
  category: JobCategory[];
  salaryMin: number;
  salaryMax: number;
  remote: boolean;
  datePosted: 'all' | '24h' | '7d' | '30d';
}

export interface CompanyFilters {
  keyword: string;
  industry: string[];
  size: CompanySize[];
  location: string;
}

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'application' | 'job' | 'message' | 'system';
  title: string;
  message: string;
  read: boolean;
  date: string;
  link?: string;
}

// Stats Types
export interface DashboardStats {
  appliedJobs: number;
  savedJobs: number;
  profileViews: number;
  interviewsScheduled: number;
}

export interface PlatformStats {
  totalJobs: number;
  totalCompanies: number;
  totalUsers: number;
  successfulHires: number;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  participantCompany: string;
  messages: Message[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

// Interview Types
export interface Interview {
  id: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  type: 'phone' | 'video' | 'onsite' | 'technical' | 'behavioral';
  date: string;
  time: string;
  duration: number;
  location?: string;
  meetingLink?: string;
  interviewers: string[];
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  prepChecklist: PrepChecklistItem[];
}

export interface PrepChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

// Assessment Types
export interface Assessment {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'soft-skills' | 'industry' | 'language';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  questions: AssessmentQuestion[];
  passingScore: number;
  totalAttempts: number;
  badge?: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  completedAt: string;
  passed: boolean;
  badge?: string;
}

// Salary Data Types
export interface SalaryData {
  role: string;
  category: JobCategory;
  experienceLevel: ExperienceLevel;
  location: string;
  salaryRange: SalaryRange;
  median: number;
  percentile25: number;
  percentile75: number;
}

export interface CityLivingCost {
  city: string;
  country: string;
  costIndex: number;
  rentIndex: number;
  groceriesIndex: number;
  transportIndex: number;
}

// Review Types (Extended)
export interface CompanyReviewExtended {
  id: string;
  companyId: string;
  userId: string;
  userName: string;
  userRole: string;
  isCurrentEmployee: boolean;
  isVerified: boolean;
  overallRating: number;
  ratings: {
    culture: number;
    workLifeBalance: number;
    compensation: number;
    management: number;
    careerGrowth: number;
  };
  title: string;
  pros: string;
  cons: string;
  advice?: string;
  date: string;
  helpfulCount: number;
  employmentStatus: 'current' | 'former';
  employmentType: JobType;
  recommendToFriend: boolean;
}

// Career Path Types
export interface CareerPath {
  id: string;
  title: string;
  description: string;
  category: JobCategory;
  levels: CareerLevel[];
  skills: string[];
  averageTimeToAdvance: string;
}

export interface CareerLevel {
  level: number;
  title: string;
  yearsExperience: string;
  salaryRange: SalaryRange;
  responsibilities: string[];
  requiredSkills: string[];
  optionalSkills: string[];
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'course' | 'book' | 'tutorial' | 'certification';
  provider: string;
  url: string;
  duration?: string;
  price: 'free' | 'paid';
  rating: number;
  skills: string[];
}

// Analytics Types
export interface UserAnalytics {
  profileViews: AnalyticsDataPoint[];
  applicationStats: {
    total: number;
    pending: number;
    reviewed: number;
    interviews: number;
    offers: number;
    rejected: number;
  };
  applicationsByWeek: AnalyticsDataPoint[];
  responseRate: number;
  averageResponseTime: number;
  topSearchedSkills: { skill: string; count: number }[];
  weeklyActivity: { day: string; applications: number; profileUpdates: number }[];
}

export interface AnalyticsDataPoint {
  date: string;
  value: number;
}

// Cover Letter Types
export interface CoverLetter {
  id: string;
  title: string;
  jobId?: string;
  jobTitle?: string;
  companyName?: string;
  content: string;
  template: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  structure: CoverLetterSection[];
  preview: string;
}

export interface CoverLetterSection {
  id: string;
  name: string;
  placeholder: string;
  suggestions: string[];
}

// Employer Types
export interface EmployerJob {
  id: string;
  title: string;
  status: 'active' | 'paused' | 'closed' | 'draft';
  applicantsCount: number;
  viewsCount: number;
  postedDate: string;
  expiryDate?: string;
}

export interface JobApplicant {
  id: string;
  jobId: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  title: string;
  appliedAt: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'interviewed' | 'offered' | 'rejected';
  matchScore: number;
  resumeUrl?: string;
  coverLetter?: string;
}
