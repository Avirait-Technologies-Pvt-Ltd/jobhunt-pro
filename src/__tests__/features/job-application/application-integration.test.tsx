/**
 * Job Application Tracker - Integration Tests
 *
 * End-to-end workflow tests for the job application tracker.
 */

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useJobApplications } from '../../../hooks/useJobApplications';
import {
  sampleJobApplications,
  createApplication,
  createContact,
  createInterview,
  getApplicationById,
  getApplicationsByStatus,
  getApplicationsWithUpcomingInterviews,
  getApplicationsWithOverdueFollowUps,
} from '../../../data/job-applications';
import { calculateStatistics } from '../../../lib/application-statistics';
import { filterAndSortApplications } from '../../../lib/application-filters';
import {
  isValidStatusTransition,
  searchApplicationsByQuery,
} from '../../../lib/application-utils';
import type { JobApplication, CreateApplicationInput } from '../../../types/job-application';

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

// ============================================================================
// Complete Job Search Workflow Tests
// ============================================================================

describe('Job Application Tracker Integration', () => {
  describe('Complete Application Lifecycle', () => {
    it('should handle a complete job application from saved to accepted', () => {
      const { result } = renderHook(() => useJobApplications());

      // Step 1: Save a job opportunity
      let app: JobApplication | undefined;
      act(() => {
        app = result.current.addApplication({
          company: 'Dream Company',
          jobTitle: 'Senior Developer',
          location: 'San Francisco, CA',
          workLocationType: 'hybrid',
          status: 'saved',
          priority: 'high',
        });
      });

      expect(app?.status).toBe('saved');
      expect(result.current.applications).toHaveLength(1);

      // Step 2: Apply to the job
      act(() => {
        result.current.updateStatus(app!.id, 'applied');
      });

      expect(result.current.getApplicationById(app!.id)?.status).toBe('applied');

      // Step 3: Add recruiter contact
      let contact: ReturnType<typeof result.current.addContact>;
      act(() => {
        contact = result.current.addContact(app!.id, {
          name: 'Jane Recruiter',
          role: 'recruiter',
          email: 'jane@dreamcompany.com',
        });
      });

      expect(result.current.getApplicationById(app!.id)?.contacts).toHaveLength(1);

      // Step 4: Move to screening
      act(() => {
        result.current.updateStatus(app!.id, 'screening');
      });

      // Step 5: Schedule phone screen
      act(() => {
        result.current.addInterview(app!.id, {
          type: 'phone-screen',
          scheduledDate: daysFromNow(3),
          duration: 30,
        });
      });

      expect(result.current.getApplicationById(app!.id)?.interviews).toHaveLength(1);

      // Step 6: Move to interviewing
      act(() => {
        result.current.updateStatus(app!.id, 'interviewing');
      });

      // Step 7: Add technical interview
      act(() => {
        result.current.addInterview(app!.id, {
          type: 'technical',
          scheduledDate: daysFromNow(7),
          duration: 90,
        });
      });

      // Step 8: Receive offer
      act(() => {
        result.current.updateStatus(app!.id, 'offer');
      });

      act(() => {
        result.current.updateApplication(app!.id, {
          notes: 'Offer: $180k + equity',
          salary: {
            min: 175000,
            max: 185000,
            currency: 'USD',
            period: 'yearly',
          },
        });
      });

      expect(result.current.getApplicationById(app!.id)?.status).toBe('offer');

      // Step 9: Accept offer
      act(() => {
        result.current.updateStatus(app!.id, 'accepted');
      });

      const finalApp = result.current.getApplicationById(app!.id);
      expect(finalApp?.status).toBe('accepted');

      // Verify timeline has all transitions
      const statusChanges = finalApp?.timeline.filter((e) => e.type === 'status-change');
      expect(statusChanges?.length).toBeGreaterThanOrEqual(5);
    });

    it('should handle rejection flow', () => {
      const { result } = renderHook(() => useJobApplications());

      let app: JobApplication | undefined;
      act(() => {
        app = result.current.addApplication({
          company: 'Another Company',
          jobTitle: 'Developer',
          location: 'NYC',
          workLocationType: 'onsite',
          status: 'applied',
        });
      });

      // Move through stages
      act(() => {
        result.current.updateStatus(app!.id, 'screening');
      });

      // Get rejected
      act(() => {
        result.current.updateStatus(app!.id, 'rejected');
      });

      act(() => {
        result.current.updateApplication(app!.id, {
          notes: 'Looking for more experience',
        });
      });

      const finalApp = result.current.getApplicationById(app!.id);
      expect(finalApp?.status).toBe('rejected');

      // Cannot transition from rejected
      expect(result.current.getValidTransitions(app!.id)).toHaveLength(0);
    });

    it('should handle withdrawal flow', () => {
      const { result } = renderHook(() => useJobApplications());

      let app: JobApplication | undefined;
      act(() => {
        app = result.current.addApplication({
          company: 'Withdrawn Corp',
          jobTitle: 'Engineer',
          location: 'LA',
          workLocationType: 'remote',
          status: 'applied',
        });
      });

      // Progress to interviewing
      act(() => {
        result.current.updateStatus(app!.id, 'interviewing');
      });

      // Withdraw (maybe accepted another offer)
      act(() => {
        result.current.updateStatus(app!.id, 'withdrawn');
      });

      act(() => {
        result.current.updateApplication(app!.id, {
          notes: 'Accepted offer elsewhere',
        });
      });

      expect(result.current.getApplicationById(app!.id)?.status).toBe('withdrawn');
    });
  });

  describe('Managing Multiple Applications', () => {
    it('should track and filter multiple applications', () => {
      const { result } = renderHook(() => useJobApplications());

      // Add multiple applications - each in separate act() to ensure state updates
      act(() => {
        result.current.addApplication({
          company: 'Tech A',
          jobTitle: 'Frontend',
          location: 'SF',
          workLocationType: 'remote',
          status: 'applied',
          priority: 'high',
        });
      });

      act(() => {
        result.current.addApplication({
          company: 'Tech B',
          jobTitle: 'Backend',
          location: 'NYC',
          workLocationType: 'hybrid',
          status: 'applied',
          priority: 'medium',
        });
      });

      act(() => {
        result.current.addApplication({
          company: 'Tech C',
          jobTitle: 'Fullstack',
          location: 'LA',
          workLocationType: 'onsite',
          status: 'saved',
          priority: 'low',
        });
      });

      expect(result.current.applications).toHaveLength(3);

      // Filter by status
      const applied = result.current.filterApplications({ statuses: ['applied'] });
      expect(applied).toHaveLength(2);

      // Filter by priority
      const highPriority = result.current.filterApplications({ priorities: ['high'] });
      expect(highPriority).toHaveLength(1);

      // Filter by work location
      const remote = result.current.filterApplications({ workLocationTypes: ['remote'] });
      expect(remote).toHaveLength(1);

      // Search
      const frontendApps = result.current.searchApplications('Frontend');
      expect(frontendApps).toHaveLength(1);
    });

    it('should calculate correct statistics', () => {
      const { result } = renderHook(() => useJobApplications());

      act(() => {
        result.current.addApplication({
          company: 'Company 1',
          jobTitle: 'Job 1',
          location: 'Location',
          workLocationType: 'remote',
          status: 'applied',
          priority: 'high',
        });
      });

      act(() => {
        result.current.addApplication({
          company: 'Company 2',
          jobTitle: 'Job 2',
          location: 'Location',
          workLocationType: 'remote',
          status: 'interviewing',
          priority: 'high',
        });
      });

      act(() => {
        result.current.addApplication({
          company: 'Company 3',
          jobTitle: 'Job 3',
          location: 'Location',
          workLocationType: 'remote',
          status: 'rejected',
          priority: 'medium',
        });
      });

      act(() => {
        result.current.addApplication({
          company: 'Company 4',
          jobTitle: 'Job 4',
          location: 'Location',
          workLocationType: 'remote',
          status: 'accepted',
          priority: 'high',
        });
      });

      const stats = result.current.getStatistics();

      expect(stats.total).toBe(4);
      expect(stats.byStatus.applied).toBe(1);
      expect(stats.byStatus.interviewing).toBe(1);
      expect(stats.byStatus.rejected).toBe(1);
      expect(stats.byStatus.accepted).toBe(1);
      expect(stats.byPriority.high).toBe(3);
      expect(stats.activeApplications).toBe(3); // accepted, interviewing, applied
    });
  });

  describe('Interview Management', () => {
    it('should track multiple interviews for an application', () => {
      const { result } = renderHook(() => useJobApplications());

      let app: JobApplication | undefined;
      act(() => {
        app = result.current.addApplication({
          company: 'Interview Corp',
          jobTitle: 'SWE',
          location: 'Anywhere',
          workLocationType: 'remote',
          status: 'interviewing',
        });
      });

      // Add multiple interviews - each in separate act()
      act(() => {
        result.current.addInterview(app!.id, {
          type: 'phone-screen',
          scheduledDate: daysFromNow(1),
          duration: 30,
        });
      });

      act(() => {
        result.current.addInterview(app!.id, {
          type: 'technical',
          scheduledDate: daysFromNow(5),
          duration: 60,
        });
      });

      act(() => {
        result.current.addInterview(app!.id, {
          type: 'behavioral',
          scheduledDate: daysFromNow(7),
          duration: 45,
        });
      });

      act(() => {
        result.current.addInterview(app!.id, {
          type: 'final',
          scheduledDate: daysFromNow(10),
          duration: 60,
        });
      });

      const updatedApp = result.current.getApplicationById(app!.id);
      expect(updatedApp?.interviews).toHaveLength(4);

      // Mark first interview as completed
      const firstInterview = updatedApp?.interviews[0];
      act(() => {
        result.current.updateInterview(app!.id, firstInterview!.id, {
          status: 'completed',
          feedback: 'Went well, moving to next round',
        });
      });

      const afterCompletion = result.current.getApplicationById(app!.id);
      expect(afterCompletion?.interviews[0].status).toBe('completed');
    });
  });

  describe('Follow-up Management', () => {
    it('should track follow-ups and identify overdue ones', () => {
      const { result } = renderHook(() => useJobApplications());

      act(() => {
        result.current.addApplication({
          company: 'Follow-up Co 1',
          jobTitle: 'Job 1',
          location: 'Location',
          workLocationType: 'remote',
          status: 'applied',
        });
      });

      act(() => {
        result.current.addApplication({
          company: 'Follow-up Co 2',
          jobTitle: 'Job 2',
          location: 'Location',
          workLocationType: 'remote',
          status: 'applied',
        });
      });

      act(() => {
        result.current.addApplication({
          company: 'Follow-up Co 3',
          jobTitle: 'Job 3',
          location: 'Location',
          workLocationType: 'remote',
          status: 'applied',
        });
      });

      const apps = result.current.applications;

      // Set follow-ups
      act(() => {
        result.current.setFollowUpDate(apps[0].id, daysAgo(2)); // Overdue
      });

      act(() => {
        result.current.setFollowUpDate(apps[1].id, daysFromNow(5)); // Future
        // Third app has no follow-up
      });

      const pending = result.current.getPendingFollowUps();
      expect(pending).toHaveLength(1);
      expect(pending[0].company).toBe('Follow-up Co 1');
    });
  });

  describe('Bulk Operations', () => {
    it('should handle bulk status updates', () => {
      const { result } = renderHook(() => useJobApplications());

      act(() => {
        result.current.addApplication({
          company: 'Bulk 1',
          jobTitle: 'Job',
          location: 'Location',
          workLocationType: 'remote',
          status: 'applied',
        });
      });

      act(() => {
        result.current.addApplication({
          company: 'Bulk 2',
          jobTitle: 'Job',
          location: 'Location',
          workLocationType: 'remote',
          status: 'applied',
        });
      });

      act(() => {
        result.current.addApplication({
          company: 'Bulk 3',
          jobTitle: 'Job',
          location: 'Location',
          workLocationType: 'remote',
          status: 'applied',
        });
      });

      const apps = result.current.applications;
      const ids = apps.map((a) => a.id);

      // Bulk withdraw
      let updatedCount = 0;
      act(() => {
        updatedCount = result.current.bulkUpdateStatus(ids, 'withdrawn');
      });

      expect(updatedCount).toBe(3);
      expect(
        result.current.applications.every((a) => a.status === 'withdrawn')
      ).toBe(true);
    });

    it('should handle bulk delete', () => {
      const { result } = renderHook(() => useJobApplications());

      act(() => {
        result.current.addApplication({
          company: 'Delete 1',
          jobTitle: 'Job',
          location: 'Location',
          workLocationType: 'remote',
          status: 'rejected',
        });
      });

      act(() => {
        result.current.addApplication({
          company: 'Delete 2',
          jobTitle: 'Job',
          location: 'Location',
          workLocationType: 'remote',
          status: 'rejected',
        });
      });

      act(() => {
        result.current.addApplication({
          company: 'Keep',
          jobTitle: 'Job',
          location: 'Location',
          workLocationType: 'remote',
          status: 'applied',
        });
      });

      const rejected = result.current.applications.filter(
        (a) => a.status === 'rejected'
      );
      const idsToDelete = rejected.map((a) => a.id);

      act(() => {
        result.current.bulkDelete(idsToDelete);
      });

      expect(result.current.applications).toHaveLength(1);
      expect(result.current.applications[0].company).toBe('Keep');
    });
  });

  describe('Sample Data Integration', () => {
    it('should work with sample job applications', () => {
      const { result } = renderHook(() =>
        useJobApplications({ initialApplications: sampleJobApplications })
      );

      expect(result.current.applications.length).toBe(sampleJobApplications.length);

      const stats = result.current.getStatistics();
      expect(stats.total).toBe(sampleJobApplications.length);
    });

    it('should filter sample data correctly', () => {
      const { result } = renderHook(() =>
        useJobApplications({ initialApplications: sampleJobApplications })
      );

      const remoteJobs = result.current.filterApplications({
        workLocationTypes: ['remote'],
      });

      expect(remoteJobs.every((app) => app.workLocationType === 'remote')).toBe(true);
    });
  });

  describe('Data Query Helpers', () => {
    it('should find applications by various criteria', () => {
      // By ID
      const app = getApplicationById(sampleJobApplications, 'app_001');
      expect(app?.company).toBe('TechCorp Inc.');

      // By status
      const applied = getApplicationsByStatus(sampleJobApplications, 'applied');
      expect(applied.every((a) => a.status === 'applied')).toBe(true);

      // With upcoming interviews
      const withInterviews = getApplicationsWithUpcomingInterviews(sampleJobApplications);
      expect(Array.isArray(withInterviews)).toBe(true);

      // With overdue follow-ups
      const overdueFollowUps = getApplicationsWithOverdueFollowUps(sampleJobApplications);
      expect(Array.isArray(overdueFollowUps)).toBe(true);
    });
  });

  describe('Factory Functions', () => {
    it('should create valid application objects', () => {
      const app = createApplication({
        company: 'New Corp',
        jobTitle: 'Engineer',
        location: 'Boston',
        workLocationType: 'hybrid',
        status: 'applied',
      });

      expect(app.id).toBeDefined();
      expect(app.company).toBe('New Corp');
      expect(app.status).toBe('applied');
      expect(app.timeline.length).toBe(1);
      expect(app.contacts).toEqual([]);
      expect(app.interviews).toEqual([]);
    });

    it('should create valid contact objects', () => {
      const contact = createContact('Jane Smith', 'recruiter', {
        email: 'jane@example.com',
      });

      expect(contact.id).toBeDefined();
      expect(contact.name).toBe('Jane Smith');
      expect(contact.role).toBe('recruiter');
      expect(contact.email).toBe('jane@example.com');
    });

    it('should create valid interview objects', () => {
      const interview = createInterview('technical', daysFromNow(7), 90, {
        meetingLink: 'https://zoom.us/j/123',
      });

      expect(interview.id).toBeDefined();
      expect(interview.type).toBe('technical');
      expect(interview.duration).toBe(90);
      expect(interview.status).toBe('scheduled');
    });
  });

  describe('Utilities Integration', () => {
    it('should validate status transitions correctly', () => {
      expect(isValidStatusTransition('saved', 'applied')).toBe(true);
      expect(isValidStatusTransition('applied', 'screening')).toBe(true);
      expect(isValidStatusTransition('applied', 'accepted')).toBe(false);
      expect(isValidStatusTransition('rejected', 'applied')).toBe(false);
    });

    it('should search applications correctly', () => {
      const results = searchApplicationsByQuery(sampleJobApplications, 'TechCorp');
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((a) => a.company.includes('TechCorp'))).toBe(true);
    });

    it('should calculate statistics correctly', () => {
      const stats = calculateStatistics(sampleJobApplications);
      expect(stats.total).toBe(sampleJobApplications.length);
      expect(Object.values(stats.byStatus).reduce((a, b) => a + b)).toBe(stats.total);
    });

    it('should filter and sort correctly', () => {
      const results = filterAndSortApplications(
        sampleJobApplications,
        { priorities: ['high'] },
        'appliedDate-desc'
      );

      expect(results.every((a) => a.priority === 'high')).toBe(true);

      // Verify sorted by date descending
      for (let i = 1; i < results.length; i++) {
        const prevDate = new Date(results[i - 1].appliedDate).getTime();
        const currDate = new Date(results[i].appliedDate).getTime();
        expect(prevDate).toBeGreaterThanOrEqual(currDate);
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle errors gracefully', () => {
      const onError = jest.fn();
      const { result } = renderHook(() =>
        useJobApplications({ onError })
      );

      // Try to add invalid application
      try {
        act(() => {
          result.current.addApplication({
            company: '', // Invalid
            jobTitle: '',
            location: '',
            workLocationType: 'remote',
          });
        });
      } catch {
        // Expected
      }

      expect(onError).toHaveBeenCalled();
    });

    it('should handle invalid status transitions', () => {
      const onError = jest.fn();
      const { result } = renderHook(() =>
        useJobApplications({ onError })
      );

      let app: JobApplication | undefined;
      act(() => {
        app = result.current.addApplication({
          company: 'Test',
          jobTitle: 'Test',
          location: 'Test',
          workLocationType: 'remote',
          status: 'applied',
        });
      });

      // Try invalid transition
      act(() => {
        result.current.updateStatus(app!.id, 'accepted'); // Invalid: applied -> accepted
      });

      expect(onError).toHaveBeenCalled();
      expect(result.current.getApplicationById(app!.id)?.status).toBe('applied');
    });
  });

  describe('Auto-save Integration', () => {
    it('should trigger onSave on various operations', () => {
      const onSave = jest.fn();
      const { result } = renderHook(() =>
        useJobApplications({ autoSave: true, onSave })
      );

      // Add
      let app: JobApplication | undefined;
      act(() => {
        app = result.current.addApplication({
          company: 'Save Test',
          jobTitle: 'Job',
          location: 'Location',
          workLocationType: 'remote',
        });
      });
      expect(onSave).toHaveBeenCalledTimes(1);

      // Update
      act(() => {
        result.current.updateApplication(app!.id, { priority: 'high' });
      });
      expect(onSave).toHaveBeenCalledTimes(2);

      // Status change
      act(() => {
        result.current.updateStatus(app!.id, 'applied');
      });
      expect(onSave).toHaveBeenCalledTimes(3);

      // Delete
      act(() => {
        result.current.deleteApplication(app!.id);
      });
      expect(onSave).toHaveBeenCalledTimes(4);
    });
  });
});
