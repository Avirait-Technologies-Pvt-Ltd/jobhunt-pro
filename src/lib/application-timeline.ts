/**
 * Job Application Tracker - Timeline Utilities
 *
 * This file contains utilities for managing timeline events
 * and date-related operations for job applications.
 */

import type {
  TimelineEvent,
  TimelineEventType,
  JobApplication,
  ApplicationStatus,
} from '../types/job-application';

// ============================================================================
// ID Generation
// ============================================================================

/**
 * Generate a unique ID for timeline events
 */
export function generateTimelineEventId(): string {
  return `timeline_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// ============================================================================
// Timeline Event Creation
// ============================================================================

/**
 * Create a new timeline event
 */
export function createTimelineEvent(
  type: TimelineEventType,
  title: string,
  description?: string,
  metadata?: Record<string, unknown>
): TimelineEvent {
  return {
    id: generateTimelineEventId(),
    type,
    title,
    description,
    timestamp: new Date().toISOString(),
    metadata,
  };
}

/**
 * Create a status change timeline event
 */
export function createStatusChangeEvent(
  previousStatus: ApplicationStatus,
  newStatus: ApplicationStatus
): TimelineEvent {
  return createTimelineEvent(
    'status-change',
    `Status changed from ${previousStatus} to ${newStatus}`,
    undefined,
    { previousStatus, newStatus }
  );
}

/**
 * Create an interview scheduled timeline event
 */
export function createInterviewScheduledEvent(
  interviewType: string,
  scheduledDate: string
): TimelineEvent {
  return createTimelineEvent(
    'interview-scheduled',
    `Interview scheduled: ${interviewType}`,
    `Scheduled for ${formatDisplayDate(scheduledDate)}`,
    { interviewType, scheduledDate }
  );
}

/**
 * Create a contact added timeline event
 */
export function createContactAddedEvent(
  contactName: string,
  contactRole: string
): TimelineEvent {
  return createTimelineEvent(
    'contact-added',
    `Contact added: ${contactName}`,
    `Role: ${contactRole}`,
    { contactName, contactRole }
  );
}

/**
 * Create a follow-up timeline event
 */
export function createFollowUpEvent(followUpDate: string): TimelineEvent {
  return createTimelineEvent(
    'follow-up',
    'Follow-up reminder set',
    `Scheduled for ${formatDisplayDate(followUpDate)}`,
    { followUpDate }
  );
}

/**
 * Create a note added timeline event
 */
export function createNoteAddedEvent(notePreview?: string): TimelineEvent {
  return createTimelineEvent(
    'note-added',
    'Note added',
    notePreview ? notePreview.substring(0, 100) : undefined
  );
}

// ============================================================================
// Timeline Operations
// ============================================================================

/**
 * Get timeline events sorted by timestamp (most recent first)
 */
export function getSortedTimeline(
  timeline: TimelineEvent[],
  order: 'asc' | 'desc' = 'desc'
): TimelineEvent[] {
  return [...timeline].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Get timeline events filtered by type
 */
export function getTimelineEventsByType(
  timeline: TimelineEvent[],
  type: TimelineEventType
): TimelineEvent[] {
  return timeline.filter((event) => event.type === type);
}

/**
 * Get timeline events within a date range
 */
export function getTimelineEventsInRange(
  timeline: TimelineEvent[],
  startDate: string,
  endDate: string
): TimelineEvent[] {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  return timeline.filter((event) => {
    const eventTime = new Date(event.timestamp).getTime();
    return eventTime >= start && eventTime <= end;
  });
}

/**
 * Get the most recent timeline event
 */
export function getMostRecentEvent(timeline: TimelineEvent[]): TimelineEvent | null {
  if (timeline.length === 0) return null;
  return getSortedTimeline(timeline, 'desc')[0];
}

/**
 * Get the most recent status change event
 */
export function getMostRecentStatusChange(timeline: TimelineEvent[]): TimelineEvent | null {
  const statusChanges = getTimelineEventsByType(timeline, 'status-change');
  return getMostRecentEvent(statusChanges);
}

// ============================================================================
// Date Calculations
// ============================================================================

/**
 * Calculate the number of days between two dates
 */
export function daysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Calculate the number of days since a given date
 */
export function daysSince(date: string): number {
  return daysBetween(date, new Date().toISOString());
}

/**
 * Calculate days since the last status change
 */
export function daysSinceLastStatusChange(application: JobApplication): number {
  const lastStatusChange = getMostRecentStatusChange(application.timeline);

  if (lastStatusChange) {
    return daysSince(lastStatusChange.timestamp);
  }

  // If no status change in timeline, use the applied date
  return daysSince(application.appliedDate);
}

/**
 * Calculate time spent in current status (in days)
 */
export function getTimeInStatus(application: JobApplication): number {
  return daysSinceLastStatusChange(application);
}

/**
 * Calculate average time between status changes
 */
export function getAverageTimeBetweenStatusChanges(application: JobApplication): number | null {
  const statusChanges = getTimelineEventsByType(application.timeline, 'status-change');

  if (statusChanges.length < 2) return null;

  const sorted = getSortedTimeline(statusChanges, 'asc');
  let totalDays = 0;

  for (let i = 1; i < sorted.length; i++) {
    totalDays += daysBetween(sorted[i - 1].timestamp, sorted[i].timestamp);
  }

  return totalDays / (sorted.length - 1);
}

// ============================================================================
// Date Formatting
// ============================================================================

/**
 * Format a date for display (e.g., "Jan 15, 2025")
 */
export function formatDisplayDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a date with time for display (e.g., "Jan 15, 2025 at 2:30 PM")
 */
export function formatDisplayDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * Format a relative date (e.g., "2 days ago", "in 3 days")
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Tomorrow';
  } else if (diffDays === -1) {
    return 'Yesterday';
  } else if (diffDays > 1 && diffDays <= 7) {
    return `In ${diffDays} days`;
  } else if (diffDays > 7 && diffDays <= 30) {
    const weeks = Math.round(diffDays / 7);
    return `In ${weeks} week${weeks > 1 ? 's' : ''}`;
  } else if (diffDays < -1 && diffDays >= -7) {
    return `${Math.abs(diffDays)} days ago`;
  } else if (diffDays < -7 && diffDays >= -30) {
    const weeks = Math.round(Math.abs(diffDays) / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffDays < -30) {
    const months = Math.round(Math.abs(diffDays) / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const months = Math.round(diffDays / 30);
    return `In ${months} month${months > 1 ? 's' : ''}`;
  }
}

/**
 * Format a date as ISO date string (YYYY-MM-DD)
 */
export function formatISODate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

/**
 * Get the month-year key for grouping (e.g., "2025-01")
 */
export function getMonthYearKey(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

// ============================================================================
// Date Checks
// ============================================================================

/**
 * Check if a date is overdue (past the current date)
 */
export function isOverdue(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  // Set both to start of day for comparison
  date.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return date < now;
}

/**
 * Check if a follow-up is due today
 */
export function isFollowUpDueToday(followUpDate: string): boolean {
  const date = new Date(followUpDate);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * Check if a date is within the next N days
 */
export function isWithinDays(dateString: string, days: number): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return date >= now && date <= future;
}

/**
 * Check if a date is in the past
 */
export function isInPast(dateString: string): boolean {
  return new Date(dateString) < new Date();
}

/**
 * Check if a date is in the future
 */
export function isInFuture(dateString: string): boolean {
  return new Date(dateString) > new Date();
}

/**
 * Check if a date is within the last N days
 */
export function isWithinLastDays(dateString: string, days: number): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const past = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return date >= past && date <= now;
}

// ============================================================================
// Date Utilities
// ============================================================================

/**
 * Get the start of a day
 */
export function getStartOfDay(dateString: string): Date {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Get the end of a day
 */
export function getEndOfDay(dateString: string): Date {
  const date = new Date(dateString);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * Get the start of the current week (Sunday)
 */
export function getStartOfWeek(dateString?: string): Date {
  const date = dateString ? new Date(dateString) : new Date();
  const day = date.getDay();
  const diff = date.getDate() - day;
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Get the start of the current month
 */
export function getStartOfMonth(dateString?: string): Date {
  const date = dateString ? new Date(dateString) : new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Add days to a date
 */
export function addDays(dateString: string, days: number): string {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

/**
 * Subtract days from a date
 */
export function subtractDays(dateString: string, days: number): string {
  return addDays(dateString, -days);
}
