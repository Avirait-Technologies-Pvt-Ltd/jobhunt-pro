/**
 * Job Application Tracker - Timeline Tests
 *
 * Tests for timeline events and date utilities.
 */

import {
  generateTimelineEventId,
  createTimelineEvent,
  createStatusChangeEvent,
  createInterviewScheduledEvent,
  createContactAddedEvent,
  createFollowUpEvent,
  createNoteAddedEvent,
  getSortedTimeline,
  getTimelineEventsByType,
  getTimelineEventsInRange,
  getMostRecentEvent,
  getMostRecentStatusChange,
  daysBetween,
  daysSince,
  daysSinceLastStatusChange,
  getTimeInStatus,
  getAverageTimeBetweenStatusChanges,
  formatDisplayDate,
  formatDisplayDateTime,
  formatRelativeDate,
  formatISODate,
  getMonthYearKey,
  isOverdue,
  isFollowUpDueToday,
  isWithinDays,
  isInPast,
  isInFuture,
  isWithinLastDays,
  getStartOfDay,
  getEndOfDay,
  getStartOfWeek,
  getStartOfMonth,
  addDays,
  subtractDays,
} from '../../../lib/application-timeline';

import type { TimelineEvent, JobApplication } from '../../../types/job-application';

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

const createMockApplication = (timeline: TimelineEvent[]): JobApplication => ({
  id: 'test_001',
  company: 'Test Company',
  jobTitle: 'Test Position',
  location: 'Test Location',
  workLocationType: 'remote',
  employmentType: 'full-time',
  status: 'applied',
  priority: 'medium',
  appliedDate: daysAgo(10),
  lastUpdated: new Date().toISOString(),
  contacts: [],
  interviews: [],
  timeline,
  tags: [],
  createdAt: daysAgo(10),
  updatedAt: new Date().toISOString(),
});

// ============================================================================
// ID Generation Tests
// ============================================================================

describe('Timeline ID Generation', () => {
  describe('generateTimelineEventId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateTimelineEventId();
      const id2 = generateTimelineEventId();
      expect(id1).not.toBe(id2);
    });

    it('should start with "timeline_"', () => {
      const id = generateTimelineEventId();
      expect(id.startsWith('timeline_')).toBe(true);
    });

    it('should contain timestamp component', () => {
      const before = Date.now();
      const id = generateTimelineEventId();
      const after = Date.now();

      const parts = id.split('_');
      const timestamp = parseInt(parts[1], 10);

      expect(timestamp).toBeGreaterThanOrEqual(before);
      expect(timestamp).toBeLessThanOrEqual(after);
    });
  });
});

// ============================================================================
// Timeline Event Creation Tests
// ============================================================================

describe('Timeline Event Creation', () => {
  describe('createTimelineEvent', () => {
    it('should create event with required fields', () => {
      const event = createTimelineEvent('status-change', 'Test Title');

      expect(event.id).toBeDefined();
      expect(event.type).toBe('status-change');
      expect(event.title).toBe('Test Title');
      expect(event.timestamp).toBeDefined();
    });

    it('should include optional description', () => {
      const event = createTimelineEvent('note-added', 'Title', 'Description');

      expect(event.description).toBe('Description');
    });

    it('should include optional metadata', () => {
      const metadata = { key: 'value' };
      const event = createTimelineEvent('status-change', 'Title', undefined, metadata);

      expect(event.metadata).toEqual(metadata);
    });

    it('should set timestamp to current time', () => {
      const before = new Date();
      const event = createTimelineEvent('other', 'Test');
      const after = new Date();

      const eventTime = new Date(event.timestamp);
      expect(eventTime.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(eventTime.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe('createStatusChangeEvent', () => {
    it('should create status change event with correct metadata', () => {
      const event = createStatusChangeEvent('applied', 'screening');

      expect(event.type).toBe('status-change');
      expect(event.title).toContain('applied');
      expect(event.title).toContain('screening');
      expect(event.metadata).toEqual({
        previousStatus: 'applied',
        newStatus: 'screening',
      });
    });
  });

  describe('createInterviewScheduledEvent', () => {
    it('should create interview event with correct details', () => {
      const date = daysFromNow(5);
      const event = createInterviewScheduledEvent('technical', date);

      expect(event.type).toBe('interview-scheduled');
      expect(event.title).toContain('technical');
      expect(event.metadata).toEqual({
        interviewType: 'technical',
        scheduledDate: date,
      });
    });
  });

  describe('createContactAddedEvent', () => {
    it('should create contact event with name and role', () => {
      const event = createContactAddedEvent('John Doe', 'recruiter');

      expect(event.type).toBe('contact-added');
      expect(event.title).toContain('John Doe');
      expect(event.description).toContain('recruiter');
      expect(event.metadata).toEqual({
        contactName: 'John Doe',
        contactRole: 'recruiter',
      });
    });
  });

  describe('createFollowUpEvent', () => {
    it('should create follow-up event', () => {
      const date = daysFromNow(7);
      const event = createFollowUpEvent(date);

      expect(event.type).toBe('follow-up');
      expect(event.title).toContain('reminder');
      expect(event.metadata).toEqual({ followUpDate: date });
    });
  });

  describe('createNoteAddedEvent', () => {
    it('should create note event with preview', () => {
      const event = createNoteAddedEvent('This is a note preview');

      expect(event.type).toBe('note-added');
      expect(event.title).toBe('Note added');
      expect(event.description).toBe('This is a note preview');
    });

    it('should truncate long notes to 100 characters', () => {
      const longNote = 'A'.repeat(150);
      const event = createNoteAddedEvent(longNote);

      expect(event.description).toHaveLength(100);
    });

    it('should handle undefined note preview', () => {
      const event = createNoteAddedEvent();

      expect(event.description).toBeUndefined();
    });
  });
});

// ============================================================================
// Timeline Operations Tests
// ============================================================================

describe('Timeline Operations', () => {
  const sampleTimeline: TimelineEvent[] = [
    {
      id: '1',
      type: 'status-change',
      title: 'First',
      timestamp: daysAgo(10),
    },
    {
      id: '2',
      type: 'note-added',
      title: 'Second',
      timestamp: daysAgo(5),
    },
    {
      id: '3',
      type: 'status-change',
      title: 'Third',
      timestamp: daysAgo(2),
    },
  ];

  describe('getSortedTimeline', () => {
    it('should sort by timestamp descending by default', () => {
      const sorted = getSortedTimeline(sampleTimeline);

      expect(sorted[0].id).toBe('3');
      expect(sorted[1].id).toBe('2');
      expect(sorted[2].id).toBe('1');
    });

    it('should sort by timestamp ascending when specified', () => {
      const sorted = getSortedTimeline(sampleTimeline, 'asc');

      expect(sorted[0].id).toBe('1');
      expect(sorted[1].id).toBe('2');
      expect(sorted[2].id).toBe('3');
    });

    it('should not mutate original array', () => {
      const original = [...sampleTimeline];
      getSortedTimeline(sampleTimeline);

      expect(sampleTimeline).toEqual(original);
    });
  });

  describe('getTimelineEventsByType', () => {
    it('should filter events by type', () => {
      const statusChanges = getTimelineEventsByType(sampleTimeline, 'status-change');

      expect(statusChanges).toHaveLength(2);
      expect(statusChanges.every((e) => e.type === 'status-change')).toBe(true);
    });

    it('should return empty array if no matching events', () => {
      const interviews = getTimelineEventsByType(sampleTimeline, 'interview-scheduled');

      expect(interviews).toHaveLength(0);
    });
  });

  describe('getTimelineEventsInRange', () => {
    it('should return events within date range', () => {
      const events = getTimelineEventsInRange(
        sampleTimeline,
        daysAgo(7),
        daysAgo(1)
      );

      expect(events).toHaveLength(2);
      expect(events.map((e) => e.id).sort()).toEqual(['2', '3']);
    });

    it('should return empty array if no events in range', () => {
      const events = getTimelineEventsInRange(
        sampleTimeline,
        daysAgo(100),
        daysAgo(50)
      );

      expect(events).toHaveLength(0);
    });
  });

  describe('getMostRecentEvent', () => {
    it('should return most recent event', () => {
      const recent = getMostRecentEvent(sampleTimeline);

      expect(recent?.id).toBe('3');
    });

    it('should return null for empty timeline', () => {
      const recent = getMostRecentEvent([]);

      expect(recent).toBeNull();
    });
  });

  describe('getMostRecentStatusChange', () => {
    it('should return most recent status change event', () => {
      const recent = getMostRecentStatusChange(sampleTimeline);

      expect(recent?.id).toBe('3');
      expect(recent?.type).toBe('status-change');
    });

    it('should return null if no status changes', () => {
      const timelineWithoutStatusChange: TimelineEvent[] = [
        { id: '1', type: 'note-added', title: 'Note', timestamp: daysAgo(1) },
      ];
      const recent = getMostRecentStatusChange(timelineWithoutStatusChange);

      expect(recent).toBeNull();
    });
  });
});

// ============================================================================
// Date Calculation Tests
// ============================================================================

describe('Date Calculations', () => {
  describe('daysBetween', () => {
    it('should calculate days between two dates', () => {
      const start = daysAgo(10);
      const end = new Date().toISOString();

      const days = daysBetween(start, end);
      expect(days).toBe(10);
    });

    it('should return 0 for same day', () => {
      const date = new Date().toISOString();
      expect(daysBetween(date, date)).toBe(0);
    });

    it('should work regardless of order', () => {
      const older = daysAgo(5);
      const newer = new Date().toISOString();

      expect(daysBetween(older, newer)).toBe(daysBetween(newer, older));
    });
  });

  describe('daysSince', () => {
    it('should calculate days since a date', () => {
      const pastDate = daysAgo(7);
      const days = daysSince(pastDate);

      expect(days).toBe(7);
    });

    it('should return 0 for today', () => {
      const today = new Date().toISOString();
      expect(daysSince(today)).toBe(0);
    });
  });

  describe('daysSinceLastStatusChange', () => {
    it('should calculate days since last status change', () => {
      const timeline: TimelineEvent[] = [
        {
          id: '1',
          type: 'status-change',
          title: 'Status change',
          timestamp: daysAgo(5),
        },
      ];
      const app = createMockApplication(timeline);

      const days = daysSinceLastStatusChange(app);
      expect(days).toBe(5);
    });

    it('should use applied date if no status change in timeline', () => {
      const app = createMockApplication([]);

      const days = daysSinceLastStatusChange(app);
      expect(days).toBe(10); // Application was created 10 days ago
    });
  });

  describe('getTimeInStatus', () => {
    it('should return time in current status', () => {
      const timeline: TimelineEvent[] = [
        {
          id: '1',
          type: 'status-change',
          title: 'Status change',
          timestamp: daysAgo(3),
        },
      ];
      const app = createMockApplication(timeline);

      const time = getTimeInStatus(app);
      expect(time).toBe(3);
    });
  });

  describe('getAverageTimeBetweenStatusChanges', () => {
    it('should calculate average time between status changes', () => {
      const timeline: TimelineEvent[] = [
        { id: '1', type: 'status-change', title: 'Change 1', timestamp: daysAgo(10) },
        { id: '2', type: 'status-change', title: 'Change 2', timestamp: daysAgo(6) },
        { id: '3', type: 'status-change', title: 'Change 3', timestamp: daysAgo(2) },
      ];
      const app = createMockApplication(timeline);

      const avg = getAverageTimeBetweenStatusChanges(app);
      expect(avg).toBe(4); // (4 + 4) / 2 = 4 days average
    });

    it('should return null if less than 2 status changes', () => {
      const timeline: TimelineEvent[] = [
        { id: '1', type: 'status-change', title: 'Change', timestamp: daysAgo(5) },
      ];
      const app = createMockApplication(timeline);

      expect(getAverageTimeBetweenStatusChanges(app)).toBeNull();
    });

    it('should return null if no status changes', () => {
      const app = createMockApplication([]);
      expect(getAverageTimeBetweenStatusChanges(app)).toBeNull();
    });
  });
});

// ============================================================================
// Date Formatting Tests
// ============================================================================

describe('Date Formatting', () => {
  describe('formatDisplayDate', () => {
    it('should format date in readable format', () => {
      const date = '2025-01-15T12:00:00.000Z';
      const formatted = formatDisplayDate(date);

      expect(formatted).toContain('Jan');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2025');
    });
  });

  describe('formatDisplayDateTime', () => {
    it('should format date and time', () => {
      const date = '2025-01-15T14:30:00.000Z';
      const formatted = formatDisplayDateTime(date);

      expect(formatted).toContain('Jan');
      expect(formatted).toContain('15');
    });
  });

  describe('formatRelativeDate', () => {
    it('should return "Today" for today', () => {
      const today = new Date().toISOString();
      expect(formatRelativeDate(today)).toBe('Today');
    });

    it('should return "Yesterday" for yesterday', () => {
      const yesterday = daysAgo(1);
      expect(formatRelativeDate(yesterday)).toBe('Yesterday');
    });

    it('should return "Tomorrow" for tomorrow', () => {
      const tomorrow = daysFromNow(1);
      expect(formatRelativeDate(tomorrow)).toBe('Tomorrow');
    });

    it('should return "X days ago" for recent past dates', () => {
      const fiveDaysAgo = daysAgo(5);
      expect(formatRelativeDate(fiveDaysAgo)).toBe('5 days ago');
    });

    it('should return "In X days" for near future dates', () => {
      const inFiveDays = daysFromNow(5);
      expect(formatRelativeDate(inFiveDays)).toBe('In 5 days');
    });
  });

  describe('formatISODate', () => {
    it('should format as YYYY-MM-DD', () => {
      const date = '2025-01-15T14:30:00.000Z';
      expect(formatISODate(date)).toBe('2025-01-15');
    });
  });

  describe('getMonthYearKey', () => {
    it('should return YYYY-MM format', () => {
      const date = '2025-01-15T12:00:00.000Z';
      expect(getMonthYearKey(date)).toBe('2025-01');
    });

    it('should pad single digit months', () => {
      const date = '2025-05-15T12:00:00.000Z';
      expect(getMonthYearKey(date)).toBe('2025-05');
    });
  });
});

// ============================================================================
// Date Check Tests
// ============================================================================

describe('Date Checks', () => {
  describe('isOverdue', () => {
    it('should return true for past dates', () => {
      const pastDate = daysAgo(1);
      expect(isOverdue(pastDate)).toBe(true);
    });

    it('should return false for future dates', () => {
      const futureDate = daysFromNow(1);
      expect(isOverdue(futureDate)).toBe(false);
    });
  });

  describe('isFollowUpDueToday', () => {
    it('should return true for today', () => {
      const today = new Date().toISOString();
      expect(isFollowUpDueToday(today)).toBe(true);
    });

    it('should return false for yesterday', () => {
      const yesterday = daysAgo(1);
      expect(isFollowUpDueToday(yesterday)).toBe(false);
    });

    it('should return false for tomorrow', () => {
      const tomorrow = daysFromNow(1);
      expect(isFollowUpDueToday(tomorrow)).toBe(false);
    });
  });

  describe('isWithinDays', () => {
    it('should return true for dates within range', () => {
      const inThreeDays = daysFromNow(3);
      expect(isWithinDays(inThreeDays, 5)).toBe(true);
    });

    it('should return false for dates outside range', () => {
      const inTenDays = daysFromNow(10);
      expect(isWithinDays(inTenDays, 5)).toBe(false);
    });

    it('should return false for past dates', () => {
      const yesterday = daysAgo(1);
      expect(isWithinDays(yesterday, 5)).toBe(false);
    });
  });

  describe('isInPast', () => {
    it('should return true for past dates', () => {
      expect(isInPast(daysAgo(1))).toBe(true);
    });

    it('should return false for future dates', () => {
      expect(isInPast(daysFromNow(1))).toBe(false);
    });
  });

  describe('isInFuture', () => {
    it('should return true for future dates', () => {
      expect(isInFuture(daysFromNow(1))).toBe(true);
    });

    it('should return false for past dates', () => {
      expect(isInFuture(daysAgo(1))).toBe(false);
    });
  });

  describe('isWithinLastDays', () => {
    it('should return true for recent past dates', () => {
      const threeDaysAgo = daysAgo(3);
      expect(isWithinLastDays(threeDaysAgo, 5)).toBe(true);
    });

    it('should return false for older dates', () => {
      const tenDaysAgo = daysAgo(10);
      expect(isWithinLastDays(tenDaysAgo, 5)).toBe(false);
    });

    it('should return false for future dates', () => {
      const tomorrow = daysFromNow(1);
      expect(isWithinLastDays(tomorrow, 5)).toBe(false);
    });
  });
});

// ============================================================================
// Date Utility Tests
// ============================================================================

describe('Date Utilities', () => {
  describe('getStartOfDay', () => {
    it('should set time to midnight', () => {
      const date = '2025-01-15T14:30:45.123Z';
      const startOfDay = getStartOfDay(date);

      expect(startOfDay.getHours()).toBe(0);
      expect(startOfDay.getMinutes()).toBe(0);
      expect(startOfDay.getSeconds()).toBe(0);
      expect(startOfDay.getMilliseconds()).toBe(0);
    });
  });

  describe('getEndOfDay', () => {
    it('should set time to end of day', () => {
      const date = '2025-01-15T14:30:45.123Z';
      const endOfDay = getEndOfDay(date);

      expect(endOfDay.getHours()).toBe(23);
      expect(endOfDay.getMinutes()).toBe(59);
      expect(endOfDay.getSeconds()).toBe(59);
      expect(endOfDay.getMilliseconds()).toBe(999);
    });
  });

  describe('getStartOfWeek', () => {
    it('should return Sunday of the current week', () => {
      const startOfWeek = getStartOfWeek();

      expect(startOfWeek.getDay()).toBe(0); // Sunday
      expect(startOfWeek.getHours()).toBe(0);
    });
  });

  describe('getStartOfMonth', () => {
    it('should return first day of month', () => {
      const startOfMonth = getStartOfMonth();

      expect(startOfMonth.getDate()).toBe(1);
      expect(startOfMonth.getHours()).toBe(0);
    });
  });

  describe('addDays', () => {
    it('should add days to a date', () => {
      const date = '2025-01-15T12:00:00.000Z';
      const result = addDays(date, 5);
      const resultDate = new Date(result);

      expect(resultDate.getDate()).toBe(20);
    });

    it('should handle negative values', () => {
      const date = '2025-01-15T12:00:00.000Z';
      const result = addDays(date, -5);
      const resultDate = new Date(result);

      expect(resultDate.getDate()).toBe(10);
    });
  });

  describe('subtractDays', () => {
    it('should subtract days from a date', () => {
      const date = '2025-01-15T12:00:00.000Z';
      const result = subtractDays(date, 5);
      const resultDate = new Date(result);

      expect(resultDate.getDate()).toBe(10);
    });
  });
});
