/**
 * Job Application Tracker - Status Tests
 *
 * Tests for status transitions and state machine logic.
 */

import {
  isValidStatusTransition,
  getValidNextStatuses,
  isTerminalStatus,
  isActiveApplication,
  getStatusTransitionOptions,
  getStatusDisplay,
  getPriorityDisplay,
} from '../../../lib/application-utils';

import {
  ApplicationStatus,
  ApplicationPriority,
  VALID_STATUS_TRANSITIONS,
  TERMINAL_STATUSES,
  ACTIVE_STATUSES,
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_COLORS,
  APPLICATION_PRIORITY_LABELS,
  APPLICATION_PRIORITY_COLORS,
  STATUS_ORDER,
  PRIORITY_ORDER,
} from '../../../types/job-application';

import type { JobApplication } from '../../../types/job-application';

// ============================================================================
// Test Data
// ============================================================================

const createMockApplication = (status: ApplicationStatus): JobApplication => ({
  id: 'test_001',
  company: 'Test Company',
  jobTitle: 'Test Position',
  location: 'Test Location',
  workLocationType: 'remote',
  employmentType: 'full-time',
  status,
  priority: 'medium',
  appliedDate: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
  contacts: [],
  interviews: [],
  timeline: [],
  tags: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// ============================================================================
// Status Transition Tests
// ============================================================================

describe('Status Transitions', () => {
  describe('isValidStatusTransition', () => {
    describe('from saved status', () => {
      it('should allow transition to applied', () => {
        expect(isValidStatusTransition('saved', 'applied')).toBe(true);
      });

      it('should allow transition to withdrawn', () => {
        expect(isValidStatusTransition('saved', 'withdrawn')).toBe(true);
      });

      it('should not allow transition to screening directly', () => {
        expect(isValidStatusTransition('saved', 'screening')).toBe(false);
      });

      it('should not allow transition to interviewing directly', () => {
        expect(isValidStatusTransition('saved', 'interviewing')).toBe(false);
      });

      it('should not allow transition to offer directly', () => {
        expect(isValidStatusTransition('saved', 'offer')).toBe(false);
      });

      it('should not allow transition to same status', () => {
        expect(isValidStatusTransition('saved', 'saved')).toBe(false);
      });
    });

    describe('from applied status', () => {
      it('should allow transition to screening', () => {
        expect(isValidStatusTransition('applied', 'screening')).toBe(true);
      });

      it('should allow transition to interviewing', () => {
        expect(isValidStatusTransition('applied', 'interviewing')).toBe(true);
      });

      it('should allow transition to rejected', () => {
        expect(isValidStatusTransition('applied', 'rejected')).toBe(true);
      });

      it('should allow transition to withdrawn', () => {
        expect(isValidStatusTransition('applied', 'withdrawn')).toBe(true);
      });

      it('should not allow transition to offer directly', () => {
        expect(isValidStatusTransition('applied', 'offer')).toBe(false);
      });

      it('should not allow transition to accepted directly', () => {
        expect(isValidStatusTransition('applied', 'accepted')).toBe(false);
      });

      it('should not allow transition back to saved', () => {
        expect(isValidStatusTransition('applied', 'saved')).toBe(false);
      });
    });

    describe('from screening status', () => {
      it('should allow transition to interviewing', () => {
        expect(isValidStatusTransition('screening', 'interviewing')).toBe(true);
      });

      it('should allow transition to rejected', () => {
        expect(isValidStatusTransition('screening', 'rejected')).toBe(true);
      });

      it('should allow transition to withdrawn', () => {
        expect(isValidStatusTransition('screening', 'withdrawn')).toBe(true);
      });

      it('should not allow transition to offer directly', () => {
        expect(isValidStatusTransition('screening', 'offer')).toBe(false);
      });
    });

    describe('from interviewing status', () => {
      it('should allow transition to offer', () => {
        expect(isValidStatusTransition('interviewing', 'offer')).toBe(true);
      });

      it('should allow transition to rejected', () => {
        expect(isValidStatusTransition('interviewing', 'rejected')).toBe(true);
      });

      it('should allow transition to withdrawn', () => {
        expect(isValidStatusTransition('interviewing', 'withdrawn')).toBe(true);
      });

      it('should not allow transition to accepted directly', () => {
        expect(isValidStatusTransition('interviewing', 'accepted')).toBe(false);
      });
    });

    describe('from offer status', () => {
      it('should allow transition to accepted', () => {
        expect(isValidStatusTransition('offer', 'accepted')).toBe(true);
      });

      it('should allow transition to rejected', () => {
        expect(isValidStatusTransition('offer', 'rejected')).toBe(true);
      });

      it('should allow transition to withdrawn', () => {
        expect(isValidStatusTransition('offer', 'withdrawn')).toBe(true);
      });

      it('should not allow transition back to interviewing', () => {
        expect(isValidStatusTransition('offer', 'interviewing')).toBe(false);
      });
    });

    describe('from accepted status', () => {
      it('should allow transition to withdrawn', () => {
        expect(isValidStatusTransition('accepted', 'withdrawn')).toBe(true);
      });

      it('should not allow transition to any other status', () => {
        expect(isValidStatusTransition('accepted', 'offer')).toBe(false);
        expect(isValidStatusTransition('accepted', 'rejected')).toBe(false);
        expect(isValidStatusTransition('accepted', 'interviewing')).toBe(false);
      });
    });

    describe('from rejected status (terminal)', () => {
      it('should not allow any transitions', () => {
        expect(isValidStatusTransition('rejected', 'applied')).toBe(false);
        expect(isValidStatusTransition('rejected', 'screening')).toBe(false);
        expect(isValidStatusTransition('rejected', 'interviewing')).toBe(false);
        expect(isValidStatusTransition('rejected', 'offer')).toBe(false);
        expect(isValidStatusTransition('rejected', 'accepted')).toBe(false);
        expect(isValidStatusTransition('rejected', 'withdrawn')).toBe(false);
        expect(isValidStatusTransition('rejected', 'saved')).toBe(false);
      });
    });

    describe('from withdrawn status (terminal)', () => {
      it('should not allow any transitions', () => {
        expect(isValidStatusTransition('withdrawn', 'applied')).toBe(false);
        expect(isValidStatusTransition('withdrawn', 'screening')).toBe(false);
        expect(isValidStatusTransition('withdrawn', 'interviewing')).toBe(false);
        expect(isValidStatusTransition('withdrawn', 'offer')).toBe(false);
        expect(isValidStatusTransition('withdrawn', 'accepted')).toBe(false);
        expect(isValidStatusTransition('withdrawn', 'rejected')).toBe(false);
        expect(isValidStatusTransition('withdrawn', 'saved')).toBe(false);
      });
    });
  });

  describe('getValidNextStatuses', () => {
    it('should return correct transitions for saved', () => {
      const validStatuses = getValidNextStatuses('saved');
      expect(validStatuses).toContain('applied');
      expect(validStatuses).toContain('withdrawn');
      expect(validStatuses).toHaveLength(2);
    });

    it('should return correct transitions for applied', () => {
      const validStatuses = getValidNextStatuses('applied');
      expect(validStatuses).toContain('screening');
      expect(validStatuses).toContain('interviewing');
      expect(validStatuses).toContain('rejected');
      expect(validStatuses).toContain('withdrawn');
      expect(validStatuses).toHaveLength(4);
    });

    it('should return correct transitions for screening', () => {
      const validStatuses = getValidNextStatuses('screening');
      expect(validStatuses).toContain('interviewing');
      expect(validStatuses).toContain('rejected');
      expect(validStatuses).toContain('withdrawn');
      expect(validStatuses).toHaveLength(3);
    });

    it('should return correct transitions for interviewing', () => {
      const validStatuses = getValidNextStatuses('interviewing');
      expect(validStatuses).toContain('offer');
      expect(validStatuses).toContain('rejected');
      expect(validStatuses).toContain('withdrawn');
      expect(validStatuses).toHaveLength(3);
    });

    it('should return correct transitions for offer', () => {
      const validStatuses = getValidNextStatuses('offer');
      expect(validStatuses).toContain('accepted');
      expect(validStatuses).toContain('rejected');
      expect(validStatuses).toContain('withdrawn');
      expect(validStatuses).toHaveLength(3);
    });

    it('should return correct transitions for accepted', () => {
      const validStatuses = getValidNextStatuses('accepted');
      expect(validStatuses).toContain('withdrawn');
      expect(validStatuses).toHaveLength(1);
    });

    it('should return empty array for rejected (terminal)', () => {
      const validStatuses = getValidNextStatuses('rejected');
      expect(validStatuses).toHaveLength(0);
    });

    it('should return empty array for withdrawn (terminal)', () => {
      const validStatuses = getValidNextStatuses('withdrawn');
      expect(validStatuses).toHaveLength(0);
    });
  });
});

// ============================================================================
// Terminal Status Tests
// ============================================================================

describe('Terminal Status Checks', () => {
  describe('isTerminalStatus', () => {
    it('should return true for rejected', () => {
      expect(isTerminalStatus('rejected')).toBe(true);
    });

    it('should return true for withdrawn', () => {
      expect(isTerminalStatus('withdrawn')).toBe(true);
    });

    it('should return false for all other statuses', () => {
      expect(isTerminalStatus('saved')).toBe(false);
      expect(isTerminalStatus('applied')).toBe(false);
      expect(isTerminalStatus('screening')).toBe(false);
      expect(isTerminalStatus('interviewing')).toBe(false);
      expect(isTerminalStatus('offer')).toBe(false);
      expect(isTerminalStatus('accepted')).toBe(false);
    });
  });

  describe('isActiveApplication', () => {
    it('should return true for applications in active statuses', () => {
      ACTIVE_STATUSES.forEach((status) => {
        const app = createMockApplication(status);
        expect(isActiveApplication(app)).toBe(true);
      });
    });

    it('should return false for applications in terminal statuses', () => {
      TERMINAL_STATUSES.forEach((status) => {
        const app = createMockApplication(status);
        expect(isActiveApplication(app)).toBe(false);
      });
    });
  });
});

// ============================================================================
// Status Display Tests
// ============================================================================

describe('Status Display', () => {
  describe('getStatusDisplay', () => {
    it('should return correct label and color for each status', () => {
      const statuses: ApplicationStatus[] = [
        'saved',
        'applied',
        'screening',
        'interviewing',
        'offer',
        'rejected',
        'accepted',
        'withdrawn',
      ];

      statuses.forEach((status) => {
        const display = getStatusDisplay(status);
        expect(display.label).toBe(APPLICATION_STATUS_LABELS[status]);
        expect(display.color).toBe(APPLICATION_STATUS_COLORS[status]);
      });
    });

    it('should return human-readable labels', () => {
      expect(getStatusDisplay('saved').label).toBe('Saved');
      expect(getStatusDisplay('applied').label).toBe('Applied');
      expect(getStatusDisplay('offer').label).toBe('Offer Received');
      expect(getStatusDisplay('interviewing').label).toBe('Interviewing');
    });
  });

  describe('getPriorityDisplay', () => {
    it('should return correct label and color for each priority', () => {
      const priorities: ApplicationPriority[] = ['high', 'medium', 'low'];

      priorities.forEach((priority) => {
        const display = getPriorityDisplay(priority);
        expect(display.label).toBe(APPLICATION_PRIORITY_LABELS[priority]);
        expect(display.color).toBe(APPLICATION_PRIORITY_COLORS[priority]);
      });
    });

    it('should return human-readable labels', () => {
      expect(getPriorityDisplay('high').label).toBe('High Priority');
      expect(getPriorityDisplay('medium').label).toBe('Medium Priority');
      expect(getPriorityDisplay('low').label).toBe('Low Priority');
    });
  });

  describe('getStatusTransitionOptions', () => {
    it('should return options with labels and colors', () => {
      const options = getStatusTransitionOptions('applied');

      expect(options.length).toBeGreaterThan(0);
      options.forEach((option) => {
        expect(option).toHaveProperty('status');
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('color');
        expect(APPLICATION_STATUS_LABELS[option.status]).toBe(option.label);
        expect(APPLICATION_STATUS_COLORS[option.status]).toBe(option.color);
      });
    });

    it('should return empty array for terminal statuses', () => {
      expect(getStatusTransitionOptions('rejected')).toHaveLength(0);
      expect(getStatusTransitionOptions('withdrawn')).toHaveLength(0);
    });
  });
});

// ============================================================================
// Constants Tests
// ============================================================================

describe('Status Constants', () => {
  describe('VALID_STATUS_TRANSITIONS', () => {
    it('should have entries for all statuses', () => {
      const allStatuses: ApplicationStatus[] = [
        'saved',
        'applied',
        'screening',
        'interviewing',
        'offer',
        'rejected',
        'accepted',
        'withdrawn',
      ];

      allStatuses.forEach((status) => {
        expect(VALID_STATUS_TRANSITIONS).toHaveProperty(status);
        expect(Array.isArray(VALID_STATUS_TRANSITIONS[status])).toBe(true);
      });
    });

    it('should not contain self-transitions', () => {
      Object.entries(VALID_STATUS_TRANSITIONS).forEach(([status, transitions]) => {
        expect(transitions).not.toContain(status);
      });
    });
  });

  describe('STATUS_ORDER', () => {
    it('should have unique order values for each status', () => {
      const values = Object.values(STATUS_ORDER);
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);
    });

    it('should order statuses logically (saved < applied < screening < interviewing < offer)', () => {
      expect(STATUS_ORDER['saved']).toBeLessThan(STATUS_ORDER['applied']);
      expect(STATUS_ORDER['applied']).toBeLessThan(STATUS_ORDER['screening']);
      expect(STATUS_ORDER['screening']).toBeLessThan(STATUS_ORDER['interviewing']);
      expect(STATUS_ORDER['interviewing']).toBeLessThan(STATUS_ORDER['offer']);
    });
  });

  describe('PRIORITY_ORDER', () => {
    it('should have unique order values for each priority', () => {
      const values = Object.values(PRIORITY_ORDER);
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);
    });

    it('should order high before medium before low', () => {
      expect(PRIORITY_ORDER['high']).toBeLessThan(PRIORITY_ORDER['medium']);
      expect(PRIORITY_ORDER['medium']).toBeLessThan(PRIORITY_ORDER['low']);
    });
  });

  describe('TERMINAL_STATUSES', () => {
    it('should include rejected and withdrawn', () => {
      expect(TERMINAL_STATUSES).toContain('rejected');
      expect(TERMINAL_STATUSES).toContain('withdrawn');
    });

    it('should not include active statuses', () => {
      expect(TERMINAL_STATUSES).not.toContain('saved');
      expect(TERMINAL_STATUSES).not.toContain('applied');
      expect(TERMINAL_STATUSES).not.toContain('screening');
      expect(TERMINAL_STATUSES).not.toContain('interviewing');
      expect(TERMINAL_STATUSES).not.toContain('offer');
      expect(TERMINAL_STATUSES).not.toContain('accepted');
    });
  });

  describe('ACTIVE_STATUSES', () => {
    it('should not include terminal statuses', () => {
      TERMINAL_STATUSES.forEach((status) => {
        expect(ACTIVE_STATUSES).not.toContain(status);
      });
    });

    it('should include all non-terminal statuses', () => {
      expect(ACTIVE_STATUSES).toContain('saved');
      expect(ACTIVE_STATUSES).toContain('applied');
      expect(ACTIVE_STATUSES).toContain('screening');
      expect(ACTIVE_STATUSES).toContain('interviewing');
      expect(ACTIVE_STATUSES).toContain('offer');
      expect(ACTIVE_STATUSES).toContain('accepted');
    });
  });
});

// ============================================================================
// State Machine Completeness Tests
// ============================================================================

describe('State Machine Completeness', () => {
  it('should have a valid path from saved to accepted', () => {
    // saved -> applied -> screening -> interviewing -> offer -> accepted
    expect(isValidStatusTransition('saved', 'applied')).toBe(true);
    expect(isValidStatusTransition('applied', 'screening')).toBe(true);
    expect(isValidStatusTransition('screening', 'interviewing')).toBe(true);
    expect(isValidStatusTransition('interviewing', 'offer')).toBe(true);
    expect(isValidStatusTransition('offer', 'accepted')).toBe(true);
  });

  it('should have a valid fast-track path from applied to interviewing', () => {
    expect(isValidStatusTransition('applied', 'interviewing')).toBe(true);
  });

  it('should allow withdrawal from any active status', () => {
    const activeStatuses: ApplicationStatus[] = [
      'saved',
      'applied',
      'screening',
      'interviewing',
      'offer',
      'accepted',
    ];

    activeStatuses.forEach((status) => {
      expect(isValidStatusTransition(status, 'withdrawn')).toBe(true);
    });
  });

  it('should allow rejection from application stages', () => {
    const rejectableStatuses: ApplicationStatus[] = [
      'applied',
      'screening',
      'interviewing',
      'offer',
    ];

    rejectableStatuses.forEach((status) => {
      expect(isValidStatusTransition(status, 'rejected')).toBe(true);
    });
  });
});
