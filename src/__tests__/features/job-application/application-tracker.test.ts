/**
 * Job Application Tracker - Hook Tests
 *
 * Tests for useJobApplications hook functionality.
 */

import { renderHook, act } from '@testing-library/react';
import { useJobApplications } from '../../../hooks/useJobApplications';
import type {
  JobApplication,
  CreateApplicationInput,
  ApplicationStatus,
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

const createMockApplication = (
  id: string,
  status: ApplicationStatus
): JobApplication => ({
  id,
  company: 'Test Company',
  jobTitle: 'Test Position',
  location: 'Test Location',
  workLocationType: 'remote',
  employmentType: 'full-time',
  status,
  priority: 'medium',
  appliedDate: daysAgo(10),
  lastUpdated: daysAgo(5),
  contacts: [],
  interviews: [],
  timeline: [],
  tags: [],
  createdAt: daysAgo(10),
  updatedAt: daysAgo(5),
});

const initialApplications: JobApplication[] = [
  createMockApplication('1', 'applied'),
  createMockApplication('2', 'interviewing'),
  createMockApplication('3', 'rejected'),
];

// ============================================================================
// Basic Hook Tests
// ============================================================================

describe('useJobApplications Hook', () => {
  describe('Initialization', () => {
    it('should initialize with empty applications by default', () => {
      const { result } = renderHook(() => useJobApplications());

      expect(result.current.applications).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should initialize with provided applications', () => {
      const { result } = renderHook(() =>
        useJobApplications({ initialApplications })
      );

      expect(result.current.applications).toHaveLength(3);
    });
  });

  describe('CRUD Operations', () => {
    describe('addApplication', () => {
      it('should add a new application', () => {
        const { result } = renderHook(() => useJobApplications());

        const input: CreateApplicationInput = {
          company: 'New Company',
          jobTitle: 'Developer',
          location: 'NYC',
          workLocationType: 'remote',
        };

        let newApp: JobApplication | undefined;
        act(() => {
          newApp = result.current.addApplication(input);
        });

        expect(result.current.applications).toHaveLength(1);
        expect(newApp?.company).toBe('New Company');
        expect(newApp?.status).toBe('saved'); // Default status
      });

      it('should generate unique ID', () => {
        const { result } = renderHook(() => useJobApplications());

        const input: CreateApplicationInput = {
          company: 'Company',
          jobTitle: 'Job',
          location: 'Location',
          workLocationType: 'remote',
        };

        let app1: JobApplication | undefined;
        let app2: JobApplication | undefined;

        act(() => {
          app1 = result.current.addApplication(input);
          app2 = result.current.addApplication(input);
        });

        expect(app1?.id).not.toBe(app2?.id);
      });

      it('should add timeline event when status is applied', () => {
        const { result } = renderHook(() => useJobApplications());

        const input: CreateApplicationInput = {
          company: 'Company',
          jobTitle: 'Job',
          location: 'Location',
          workLocationType: 'remote',
          status: 'applied',
        };

        let newApp: JobApplication | undefined;
        act(() => {
          newApp = result.current.addApplication(input);
        });

        expect(newApp?.timeline).toHaveLength(1);
        expect(newApp?.timeline[0].type).toBe('status-change');
      });

      it('should throw error for invalid input', () => {
        const { result } = renderHook(() => useJobApplications());

        const input: CreateApplicationInput = {
          company: '', // Invalid - empty
          jobTitle: 'Job',
          location: 'Location',
          workLocationType: 'remote',
        };

        expect(() => {
          act(() => {
            result.current.addApplication(input);
          });
        }).toThrow();
      });
    });

    describe('updateApplication', () => {
      it('should update an existing application', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        act(() => {
          result.current.updateApplication('1', { company: 'Updated Company' });
        });

        const updated = result.current.getApplicationById('1');
        expect(updated?.company).toBe('Updated Company');
      });

      it('should update lastUpdated timestamp', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const before = result.current.getApplicationById('1')?.lastUpdated;

        act(() => {
          result.current.updateApplication('1', { priority: 'high' });
        });

        const after = result.current.getApplicationById('1')?.lastUpdated;
        expect(new Date(after!).getTime()).toBeGreaterThan(new Date(before!).getTime());
      });

      it('should return null for non-existent application', () => {
        const { result } = renderHook(() => useJobApplications());

        let updated: JobApplication | null = null;
        act(() => {
          updated = result.current.updateApplication('non-existent', { company: 'Test' });
        });

        expect(updated).toBeNull();
      });
    });

    describe('deleteApplication', () => {
      it('should delete an application', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        let deleted: boolean = false;
        act(() => {
          deleted = result.current.deleteApplication('1');
        });

        expect(deleted).toBe(true);
        expect(result.current.applications).toHaveLength(2);
        expect(result.current.getApplicationById('1')).toBeUndefined();
      });

      it('should return false for non-existent application', () => {
        const { result } = renderHook(() => useJobApplications());

        let deleted: boolean = false;
        act(() => {
          deleted = result.current.deleteApplication('non-existent');
        });

        expect(deleted).toBe(false);
      });
    });

    describe('getApplicationById', () => {
      it('should return application by ID', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const app = result.current.getApplicationById('1');
        expect(app?.id).toBe('1');
      });

      it('should return undefined for non-existent ID', () => {
        const { result } = renderHook(() => useJobApplications());

        const app = result.current.getApplicationById('non-existent');
        expect(app).toBeUndefined();
      });
    });
  });

  describe('Status Management', () => {
    describe('updateStatus', () => {
      it('should update status with valid transition', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        act(() => {
          result.current.updateStatus('1', 'screening');
        });

        const updated = result.current.getApplicationById('1');
        expect(updated?.status).toBe('screening');
      });

      it('should add timeline event on status change', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const beforeLength = result.current.getApplicationById('1')?.timeline.length ?? 0;

        act(() => {
          result.current.updateStatus('1', 'screening');
        });

        const afterLength = result.current.getApplicationById('1')?.timeline.length ?? 0;
        expect(afterLength).toBe(beforeLength + 1);
      });

      it('should return null for invalid transition', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        let updated: JobApplication | null = null;
        act(() => {
          updated = result.current.updateStatus('1', 'accepted'); // Invalid: applied -> accepted
        });

        expect(updated).toBeNull();
        expect(result.current.getApplicationById('1')?.status).toBe('applied');
      });
    });

    describe('canTransitionTo', () => {
      it('should return true for valid transitions', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        expect(result.current.canTransitionTo('1', 'screening')).toBe(true);
        expect(result.current.canTransitionTo('1', 'interviewing')).toBe(true);
      });

      it('should return false for invalid transitions', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        expect(result.current.canTransitionTo('1', 'accepted')).toBe(false);
        expect(result.current.canTransitionTo('1', 'offer')).toBe(false);
      });

      it('should return false for non-existent application', () => {
        const { result } = renderHook(() => useJobApplications());

        expect(result.current.canTransitionTo('non-existent', 'applied')).toBe(false);
      });
    });

    describe('getValidTransitions', () => {
      it('should return valid next statuses', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const transitions = result.current.getValidTransitions('1');
        expect(transitions).toContain('screening');
        expect(transitions).toContain('interviewing');
        expect(transitions).toContain('rejected');
        expect(transitions).toContain('withdrawn');
      });

      it('should return empty array for terminal status', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const transitions = result.current.getValidTransitions('3'); // Rejected
        expect(transitions).toHaveLength(0);
      });
    });
  });

  describe('Contacts', () => {
    describe('addContact', () => {
      it('should add a contact to an application', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        act(() => {
          result.current.addContact('1', {
            name: 'John Doe',
            role: 'recruiter',
            email: 'john@example.com',
          });
        });

        const app = result.current.getApplicationById('1');
        expect(app?.contacts).toHaveLength(1);
        expect(app?.contacts[0].name).toBe('John Doe');
      });

      it('should add timeline event', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const beforeLength = result.current.getApplicationById('1')?.timeline.length ?? 0;

        act(() => {
          result.current.addContact('1', {
            name: 'Jane Doe',
            role: 'hiring-manager',
          });
        });

        const afterLength = result.current.getApplicationById('1')?.timeline.length ?? 0;
        expect(afterLength).toBe(beforeLength + 1);
      });
    });

    describe('updateContact', () => {
      it('should update an existing contact', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        let contactId: string | undefined;
        act(() => {
          const contact = result.current.addContact('1', {
            name: 'John Doe',
            role: 'recruiter',
          });
          contactId = contact?.id;
        });

        act(() => {
          result.current.updateContact('1', contactId!, { name: 'John Smith' });
        });

        const app = result.current.getApplicationById('1');
        expect(app?.contacts[0].name).toBe('John Smith');
      });
    });

    describe('deleteContact', () => {
      it('should delete a contact', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        let contactId: string | undefined;
        act(() => {
          const contact = result.current.addContact('1', {
            name: 'John Doe',
            role: 'recruiter',
          });
          contactId = contact?.id;
        });

        act(() => {
          result.current.deleteContact('1', contactId!);
        });

        const app = result.current.getApplicationById('1');
        expect(app?.contacts).toHaveLength(0);
      });
    });
  });

  describe('Interviews', () => {
    describe('addInterview', () => {
      it('should add an interview to an application', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        act(() => {
          result.current.addInterview('1', {
            type: 'phone-screen',
            scheduledDate: daysFromNow(5),
            duration: 30,
          });
        });

        const app = result.current.getApplicationById('1');
        expect(app?.interviews).toHaveLength(1);
        expect(app?.interviews[0].type).toBe('phone-screen');
        expect(app?.interviews[0].status).toBe('scheduled');
      });

      it('should add timeline event', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const beforeLength = result.current.getApplicationById('1')?.timeline.length ?? 0;

        act(() => {
          result.current.addInterview('1', {
            type: 'technical',
            scheduledDate: daysFromNow(7),
            duration: 60,
          });
        });

        const afterLength = result.current.getApplicationById('1')?.timeline.length ?? 0;
        expect(afterLength).toBe(beforeLength + 1);
      });
    });

    describe('updateInterview', () => {
      it('should update an existing interview', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        let interviewId: string | undefined;
        act(() => {
          const interview = result.current.addInterview('1', {
            type: 'phone-screen',
            scheduledDate: daysFromNow(5),
            duration: 30,
          });
          interviewId = interview?.id;
        });

        act(() => {
          result.current.updateInterview('1', interviewId!, {
            status: 'completed',
            feedback: 'Went well',
          });
        });

        const app = result.current.getApplicationById('1');
        expect(app?.interviews[0].status).toBe('completed');
        expect(app?.interviews[0].feedback).toBe('Went well');
      });
    });

    describe('deleteInterview', () => {
      it('should delete an interview', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        let interviewId: string | undefined;
        act(() => {
          const interview = result.current.addInterview('1', {
            type: 'phone-screen',
            scheduledDate: daysFromNow(5),
            duration: 30,
          });
          interviewId = interview?.id;
        });

        act(() => {
          result.current.deleteInterview('1', interviewId!);
        });

        const app = result.current.getApplicationById('1');
        expect(app?.interviews).toHaveLength(0);
      });
    });
  });

  describe('Filtering and Sorting', () => {
    describe('filterApplications', () => {
      it('should filter by status', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const filtered = result.current.filterApplications({
          statuses: ['applied'],
        });

        expect(filtered).toHaveLength(1);
        expect(filtered[0].status).toBe('applied');
      });
    });

    describe('sortApplications', () => {
      it('should sort by applied date', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const sorted = result.current.sortApplications('appliedDate-desc');
        expect(sorted.length).toBe(3);
      });
    });

    describe('searchApplications', () => {
      it('should search by company name', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const searched = result.current.searchApplications('Test Company');
        expect(searched.length).toBe(3);
      });
    });

    describe('filterAndSort', () => {
      it('should filter and sort together', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const results = result.current.filterAndSort(
          { statuses: ['applied', 'interviewing'] },
          'appliedDate-desc'
        );

        expect(results.length).toBe(2);
      });
    });
  });

  describe('Statistics', () => {
    describe('getStatistics', () => {
      it('should return comprehensive statistics', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const stats = result.current.getStatistics();

        expect(stats.total).toBe(3);
        expect(stats.byStatus.applied).toBe(1);
        expect(stats.byStatus.interviewing).toBe(1);
        expect(stats.byStatus.rejected).toBe(1);
      });
    });

    describe('getApplicationSummaries', () => {
      it('should return summaries for all applications', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const summaries = result.current.getApplicationSummaries();

        expect(summaries).toHaveLength(3);
        summaries.forEach((summary) => {
          expect(summary).toHaveProperty('id');
          expect(summary).toHaveProperty('company');
          expect(summary).toHaveProperty('status');
        });
      });
    });
  });

  describe('Bulk Operations', () => {
    describe('bulkUpdateStatus', () => {
      it('should update multiple applications', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        let count = 0;
        act(() => {
          count = result.current.bulkUpdateStatus(['1', '2'], 'withdrawn');
        });

        // Only app 1 (applied) and app 2 (interviewing) can transition to withdrawn
        expect(count).toBe(2);
      });

      it('should skip invalid transitions', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        let count = 0;
        act(() => {
          count = result.current.bulkUpdateStatus(['1', '3'], 'offer');
        });

        // App 1 can't go to offer directly, app 3 is rejected
        expect(count).toBe(0);
      });
    });

    describe('bulkDelete', () => {
      it('should delete multiple applications', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        let count = 0;
        act(() => {
          count = result.current.bulkDelete(['1', '2']);
        });

        expect(count).toBe(2);
        expect(result.current.applications).toHaveLength(1);
      });
    });
  });

  describe('Follow-ups', () => {
    describe('setFollowUpDate', () => {
      it('should set follow-up date', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const futureDate = daysFromNow(7);

        act(() => {
          result.current.setFollowUpDate('1', futureDate);
        });

        const app = result.current.getApplicationById('1');
        expect(app?.followUpDate).toBe(futureDate);
      });

      it('should clear follow-up date with null', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        act(() => {
          result.current.setFollowUpDate('1', daysFromNow(7));
          result.current.setFollowUpDate('1', null);
        });

        const app = result.current.getApplicationById('1');
        expect(app?.followUpDate).toBeUndefined();
      });
    });

    describe('getPendingFollowUps', () => {
      it('should return applications with overdue follow-ups', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        act(() => {
          result.current.setFollowUpDate('1', daysAgo(1)); // Overdue
        });

        act(() => {
          result.current.setFollowUpDate('2', daysFromNow(5)); // Future
        });

        const pending = result.current.getPendingFollowUps();
        expect(pending).toHaveLength(1);
        expect(pending[0].id).toBe('1');
      });

      it('should not include terminal applications', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        act(() => {
          result.current.setFollowUpDate('3', daysAgo(1)); // Rejected app
        });

        const pending = result.current.getPendingFollowUps();
        expect(pending.find((app) => app.id === '3')).toBeUndefined();
      });
    });
  });

  describe('Utilities', () => {
    describe('setApplications', () => {
      it('should replace all applications', () => {
        const { result } = renderHook(() =>
          useJobApplications({ initialApplications })
        );

        const newApps = [createMockApplication('new', 'saved')];

        act(() => {
          result.current.setApplications(newApps);
        });

        expect(result.current.applications).toHaveLength(1);
        expect(result.current.applications[0].id).toBe('new');
      });
    });

    describe('clearError', () => {
      it('should clear error state', () => {
        const { result } = renderHook(() => useJobApplications());

        // Trigger an error
        try {
          act(() => {
            result.current.addApplication({
              company: '',
              jobTitle: '',
              location: '',
              workLocationType: 'remote',
            });
          });
        } catch {
          // Expected error
        }

        act(() => {
          result.current.clearError();
        });

        expect(result.current.error).toBeNull();
      });
    });
  });

  describe('Auto-save', () => {
    it('should call onSave when autoSave is enabled', () => {
      const onSave = jest.fn();
      const { result } = renderHook(() =>
        useJobApplications({ autoSave: true, onSave })
      );

      act(() => {
        result.current.addApplication({
          company: 'Test',
          jobTitle: 'Test',
          location: 'Test',
          workLocationType: 'remote',
        });
      });

      expect(onSave).toHaveBeenCalled();
    });

    it('should not call onSave when autoSave is disabled', () => {
      const onSave = jest.fn();
      const { result } = renderHook(() =>
        useJobApplications({ autoSave: false, onSave })
      );

      act(() => {
        result.current.addApplication({
          company: 'Test',
          jobTitle: 'Test',
          location: 'Test',
          workLocationType: 'remote',
        });
      });

      expect(onSave).not.toHaveBeenCalled();
    });
  });
});
