/**
 * Job Application Tracker - Main Hook
 *
 * This hook provides state management and operations for job applications.
 * It integrates all the utility functions and provides a unified API.
 */

import { useState, useCallback, useMemo } from 'react';

import type {
  JobApplication,
  ApplicationStatus,
  ApplicationFilter,
  ApplicationSortOption,
  ApplicationStatistics,
  ApplicationSummary,
  CreateApplicationInput,
  UpdateApplicationInput,
  CreateContactInput,
  CreateInterviewInput,
  ApplicationContact,
  ApplicationInterview,
} from '../types/job-application';

import {
  generateApplicationId,
  generateContactId,
  generateInterviewId,
  isValidStatusTransition,
  getValidNextStatuses,
  isTerminalStatus,
  searchApplicationsByQuery,
  generateApplicationSummaries,
  validateApplication,
  validateContact,
  validateInterview,
} from '../lib/application-utils';

import {
  filterApplicationsByFilters,
  sortApplicationsByOption,
  filterAndSortApplications,
} from '../lib/application-filters';

import { calculateStatistics } from '../lib/application-statistics';

import {
  createTimelineEvent,
  createStatusChangeEvent,
  createContactAddedEvent,
  createInterviewScheduledEvent,
  createFollowUpEvent,
  createNoteAddedEvent,
} from '../lib/application-timeline';

import { DEFAULT_APPLICATION_VALUES } from '../types/job-application';

// ============================================================================
// Types
// ============================================================================

export interface UseJobApplicationsOptions {
  initialApplications?: JobApplication[];
  autoSave?: boolean;
  onSave?: (applications: JobApplication[]) => void;
  onError?: (error: Error) => void;
}

export interface UseJobApplicationsReturn {
  // State
  applications: JobApplication[];
  isLoading: boolean;
  error: Error | null;

  // CRUD Operations
  addApplication: (input: CreateApplicationInput) => JobApplication;
  updateApplication: (id: string, updates: UpdateApplicationInput) => JobApplication | null;
  deleteApplication: (id: string) => boolean;
  getApplicationById: (id: string) => JobApplication | undefined;

  // Status Management
  updateStatus: (id: string, newStatus: ApplicationStatus) => JobApplication | null;
  canTransitionTo: (id: string, newStatus: ApplicationStatus) => boolean;
  getValidTransitions: (id: string) => ApplicationStatus[];

  // Contacts
  addContact: (applicationId: string, contact: CreateContactInput) => ApplicationContact | null;
  updateContact: (
    applicationId: string,
    contactId: string,
    updates: Partial<CreateContactInput>
  ) => ApplicationContact | null;
  deleteContact: (applicationId: string, contactId: string) => boolean;

  // Interviews
  addInterview: (applicationId: string, interview: CreateInterviewInput) => ApplicationInterview | null;
  updateInterview: (
    applicationId: string,
    interviewId: string,
    updates: Partial<CreateInterviewInput & { status?: ApplicationInterview['status']; feedback?: string }>
  ) => ApplicationInterview | null;
  deleteInterview: (applicationId: string, interviewId: string) => boolean;

  // Filtering & Sorting
  filterApplications: (filters: ApplicationFilter) => JobApplication[];
  sortApplications: (sortOption: ApplicationSortOption) => JobApplication[];
  searchApplications: (query: string) => JobApplication[];
  filterAndSort: (filters: ApplicationFilter, sortOption: ApplicationSortOption) => JobApplication[];

  // Statistics
  getStatistics: () => ApplicationStatistics;
  getApplicationSummaries: () => ApplicationSummary[];

  // Bulk Operations
  bulkUpdateStatus: (ids: string[], newStatus: ApplicationStatus) => number;
  bulkDelete: (ids: string[]) => number;

  // Follow-ups
  setFollowUpDate: (id: string, date: string | null) => JobApplication | null;
  getPendingFollowUps: () => JobApplication[];

  // Utilities
  setApplications: (applications: JobApplication[]) => void;
  clearError: () => void;
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useJobApplications(
  options: UseJobApplicationsOptions = {}
): UseJobApplicationsReturn {
  const { initialApplications = [], autoSave = false, onSave, onError } = options;

  // State
  const [applications, setApplicationsState] = useState<JobApplication[]>(initialApplications);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Helper to update applications and trigger save
  const setApplications = useCallback(
    (newApplications: JobApplication[]) => {
      setApplicationsState(newApplications);
      if (autoSave && onSave) {
        try {
          onSave(newApplications);
        } catch (err) {
          const error = err instanceof Error ? err : new Error('Failed to save applications');
          setError(error);
          if (onError) onError(error);
        }
      }
    },
    [autoSave, onSave, onError]
  );

  // Helper to update a single application
  const updateApplicationInState = useCallback(
    (id: string, updater: (app: JobApplication) => JobApplication): JobApplication | null => {
      let updatedApp: JobApplication | null = null;

      setApplications(
        applications.map((app) => {
          if (app.id === id) {
            updatedApp = updater(app);
            return updatedApp;
          }
          return app;
        })
      );

      return updatedApp;
    },
    [applications, setApplications]
  );

  // ============================================================================
  // CRUD Operations
  // ============================================================================

  const addApplication = useCallback(
    (input: CreateApplicationInput): JobApplication => {
      const validation = validateApplication(input as Partial<JobApplication>);
      if (!validation.isValid) {
        const error = new Error(`Validation failed: ${validation.errors.join(', ')}`);
        setError(error);
        if (onError) onError(error);
        throw error;
      }

      const now = new Date().toISOString();
      const appliedDate = input.appliedDate || now;

      const newApplication: JobApplication = {
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
        contacts: [],
        interviews: [],
        timeline:
          input.status === 'applied'
            ? [
                createTimelineEvent('status-change', 'Application submitted', undefined, {
                  previousStatus: 'saved',
                  newStatus: 'applied',
                }),
              ]
            : [],
        tags: input.tags || [],
        notes: input.notes,
        resumeVersion: input.resumeVersion,
        coverLetterVersion: input.coverLetterVersion,
        referralSource: input.referralSource,
        createdAt: now,
        updatedAt: now,
      };

      setApplications([...applications, newApplication]);
      return newApplication;
    },
    [applications, setApplications, onError]
  );

  const updateApplication = useCallback(
    (id: string, updates: UpdateApplicationInput): JobApplication | null => {
      const now = new Date().toISOString();

      return updateApplicationInState(id, (app) => {
        const updatedApp = {
          ...app,
          ...updates,
          lastUpdated: now,
          updatedAt: now,
        };

        // Add note event if notes changed
        if (updates.notes && updates.notes !== app.notes) {
          updatedApp.timeline = [
            ...updatedApp.timeline,
            createNoteAddedEvent(updates.notes),
          ];
        }

        return updatedApp;
      });
    },
    [updateApplicationInState]
  );

  const deleteApplication = useCallback(
    (id: string): boolean => {
      const exists = applications.some((app) => app.id === id);
      if (exists) {
        setApplications(applications.filter((app) => app.id !== id));
      }
      return exists;
    },
    [applications, setApplications]
  );

  const getApplicationById = useCallback(
    (id: string): JobApplication | undefined => {
      return applications.find((app) => app.id === id);
    },
    [applications]
  );

  // ============================================================================
  // Status Management
  // ============================================================================

  const canTransitionTo = useCallback(
    (id: string, newStatus: ApplicationStatus): boolean => {
      const app = getApplicationById(id);
      if (!app) return false;
      return isValidStatusTransition(app.status, newStatus);
    },
    [getApplicationById]
  );

  const getValidTransitions = useCallback(
    (id: string): ApplicationStatus[] => {
      const app = getApplicationById(id);
      if (!app) return [];
      return getValidNextStatuses(app.status);
    },
    [getApplicationById]
  );

  const updateStatus = useCallback(
    (id: string, newStatus: ApplicationStatus): JobApplication | null => {
      const app = getApplicationById(id);
      if (!app) return null;

      if (!isValidStatusTransition(app.status, newStatus)) {
        const error = new Error(
          `Invalid status transition from ${app.status} to ${newStatus}`
        );
        setError(error);
        if (onError) onError(error);
        return null;
      }

      const now = new Date().toISOString();

      return updateApplicationInState(id, (application) => ({
        ...application,
        status: newStatus,
        lastUpdated: now,
        updatedAt: now,
        timeline: [
          ...application.timeline,
          createStatusChangeEvent(application.status, newStatus),
        ],
      }));
    },
    [getApplicationById, updateApplicationInState, onError]
  );

  // ============================================================================
  // Contacts
  // ============================================================================

  const addContact = useCallback(
    (applicationId: string, contactInput: CreateContactInput): ApplicationContact | null => {
      const validation = validateContact(contactInput as Partial<ApplicationContact>);
      if (!validation.isValid) {
        const error = new Error(`Validation failed: ${validation.errors.join(', ')}`);
        setError(error);
        if (onError) onError(error);
        return null;
      }

      const now = new Date().toISOString();
      const newContact: ApplicationContact = {
        id: generateContactId(),
        name: contactInput.name,
        role: contactInput.role,
        email: contactInput.email,
        phone: contactInput.phone,
        linkedIn: contactInput.linkedIn,
        notes: contactInput.notes,
        createdAt: now,
        updatedAt: now,
      };

      let addedContact: ApplicationContact | null = null;

      updateApplicationInState(applicationId, (app) => {
        addedContact = newContact;
        return {
          ...app,
          contacts: [...app.contacts, newContact],
          lastUpdated: now,
          updatedAt: now,
          timeline: [
            ...app.timeline,
            createContactAddedEvent(newContact.name, newContact.role),
          ],
        };
      });

      return addedContact;
    },
    [updateApplicationInState, onError]
  );

  const updateContact = useCallback(
    (
      applicationId: string,
      contactId: string,
      updates: Partial<CreateContactInput>
    ): ApplicationContact | null => {
      const now = new Date().toISOString();
      let updatedContact: ApplicationContact | null = null;

      updateApplicationInState(applicationId, (app) => {
        const contactIndex = app.contacts.findIndex((c) => c.id === contactId);
        if (contactIndex === -1) return app;

        const contact = app.contacts[contactIndex];
        updatedContact = {
          ...contact,
          ...updates,
          updatedAt: now,
        };

        const newContacts = [...app.contacts];
        newContacts[contactIndex] = updatedContact;

        return {
          ...app,
          contacts: newContacts,
          lastUpdated: now,
          updatedAt: now,
        };
      });

      return updatedContact;
    },
    [updateApplicationInState]
  );

  const deleteContact = useCallback(
    (applicationId: string, contactId: string): boolean => {
      const now = new Date().toISOString();
      let deleted = false;

      updateApplicationInState(applicationId, (app) => {
        const contactExists = app.contacts.some((c) => c.id === contactId);
        if (!contactExists) return app;

        deleted = true;
        return {
          ...app,
          contacts: app.contacts.filter((c) => c.id !== contactId),
          lastUpdated: now,
          updatedAt: now,
        };
      });

      return deleted;
    },
    [updateApplicationInState]
  );

  // ============================================================================
  // Interviews
  // ============================================================================

  const addInterview = useCallback(
    (applicationId: string, interviewInput: CreateInterviewInput): ApplicationInterview | null => {
      const validation = validateInterview(interviewInput as Partial<ApplicationInterview>);
      if (!validation.isValid) {
        const error = new Error(`Validation failed: ${validation.errors.join(', ')}`);
        setError(error);
        if (onError) onError(error);
        return null;
      }

      const now = new Date().toISOString();
      const newInterview: ApplicationInterview = {
        id: generateInterviewId(),
        type: interviewInput.type,
        scheduledDate: interviewInput.scheduledDate,
        duration: interviewInput.duration,
        location: interviewInput.location,
        meetingLink: interviewInput.meetingLink,
        interviewers: interviewInput.interviewers,
        notes: interviewInput.notes,
        status: 'scheduled',
        createdAt: now,
        updatedAt: now,
      };

      let addedInterview: ApplicationInterview | null = null;

      updateApplicationInState(applicationId, (app) => {
        addedInterview = newInterview;
        return {
          ...app,
          interviews: [...app.interviews, newInterview],
          lastUpdated: now,
          updatedAt: now,
          timeline: [
            ...app.timeline,
            createInterviewScheduledEvent(newInterview.type, newInterview.scheduledDate),
          ],
        };
      });

      return addedInterview;
    },
    [updateApplicationInState, onError]
  );

  const updateInterview = useCallback(
    (
      applicationId: string,
      interviewId: string,
      updates: Partial<CreateInterviewInput & { status?: ApplicationInterview['status']; feedback?: string }>
    ): ApplicationInterview | null => {
      const now = new Date().toISOString();
      let updatedInterview: ApplicationInterview | null = null;

      updateApplicationInState(applicationId, (app) => {
        const interviewIndex = app.interviews.findIndex((i) => i.id === interviewId);
        if (interviewIndex === -1) return app;

        const interview = app.interviews[interviewIndex];
        updatedInterview = {
          ...interview,
          ...updates,
          updatedAt: now,
        };

        const newInterviews = [...app.interviews];
        newInterviews[interviewIndex] = updatedInterview;

        let newTimeline = app.timeline;

        // Add timeline event if interview was completed
        if (updates.status === 'completed' && interview.status !== 'completed') {
          newTimeline = [
            ...newTimeline,
            createTimelineEvent(
              'interview-completed',
              `Interview completed: ${interview.type}`,
              updates.feedback
            ),
          ];
        }

        return {
          ...app,
          interviews: newInterviews,
          lastUpdated: now,
          updatedAt: now,
          timeline: newTimeline,
        };
      });

      return updatedInterview;
    },
    [updateApplicationInState]
  );

  const deleteInterview = useCallback(
    (applicationId: string, interviewId: string): boolean => {
      const now = new Date().toISOString();
      let deleted = false;

      updateApplicationInState(applicationId, (app) => {
        const interviewExists = app.interviews.some((i) => i.id === interviewId);
        if (!interviewExists) return app;

        deleted = true;
        return {
          ...app,
          interviews: app.interviews.filter((i) => i.id !== interviewId),
          lastUpdated: now,
          updatedAt: now,
        };
      });

      return deleted;
    },
    [updateApplicationInState]
  );

  // ============================================================================
  // Filtering & Sorting
  // ============================================================================

  const filterApplications = useCallback(
    (filters: ApplicationFilter): JobApplication[] => {
      return filterApplicationsByFilters(applications, filters);
    },
    [applications]
  );

  const sortApplications = useCallback(
    (sortOption: ApplicationSortOption): JobApplication[] => {
      return sortApplicationsByOption(applications, sortOption);
    },
    [applications]
  );

  const searchApplications = useCallback(
    (query: string): JobApplication[] => {
      return searchApplicationsByQuery(applications, query);
    },
    [applications]
  );

  const filterAndSort = useCallback(
    (filters: ApplicationFilter, sortOption: ApplicationSortOption): JobApplication[] => {
      return filterAndSortApplications(applications, filters, sortOption);
    },
    [applications]
  );

  // ============================================================================
  // Statistics
  // ============================================================================

  const getStatistics = useCallback((): ApplicationStatistics => {
    return calculateStatistics(applications);
  }, [applications]);

  const getApplicationSummaries = useCallback((): ApplicationSummary[] => {
    return generateApplicationSummaries(applications);
  }, [applications]);

  // ============================================================================
  // Bulk Operations
  // ============================================================================

  const bulkUpdateStatus = useCallback(
    (ids: string[], newStatus: ApplicationStatus): number => {
      let updatedCount = 0;
      const now = new Date().toISOString();

      const updatedApplications = applications.map((app) => {
        if (ids.includes(app.id) && isValidStatusTransition(app.status, newStatus)) {
          updatedCount++;
          return {
            ...app,
            status: newStatus,
            lastUpdated: now,
            updatedAt: now,
            timeline: [
              ...app.timeline,
              createStatusChangeEvent(app.status, newStatus),
            ],
          };
        }
        return app;
      });

      if (updatedCount > 0) {
        setApplications(updatedApplications);
      }

      return updatedCount;
    },
    [applications, setApplications]
  );

  const bulkDelete = useCallback(
    (ids: string[]): number => {
      const initialLength = applications.length;
      const filtered = applications.filter((app) => !ids.includes(app.id));
      const deletedCount = initialLength - filtered.length;

      if (deletedCount > 0) {
        setApplications(filtered);
      }

      return deletedCount;
    },
    [applications, setApplications]
  );

  // ============================================================================
  // Follow-ups
  // ============================================================================

  const setFollowUpDate = useCallback(
    (id: string, date: string | null): JobApplication | null => {
      const now = new Date().toISOString();

      return updateApplicationInState(id, (app) => {
        const newTimeline = date
          ? [...app.timeline, createFollowUpEvent(date)]
          : app.timeline;

        return {
          ...app,
          followUpDate: date || undefined,
          lastUpdated: now,
          updatedAt: now,
          timeline: newTimeline,
        };
      });
    },
    [updateApplicationInState]
  );

  const getPendingFollowUps = useCallback((): JobApplication[] => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return applications.filter((app) => {
      if (!app.followUpDate) return false;
      const followUp = new Date(app.followUpDate);
      followUp.setHours(0, 0, 0, 0);
      return followUp <= now && !isTerminalStatus(app.status);
    });
  }, [applications]);

  // ============================================================================
  // Utilities
  // ============================================================================

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // ============================================================================
  // Return
  // ============================================================================

  return {
    // State
    applications,
    isLoading,
    error,

    // CRUD
    addApplication,
    updateApplication,
    deleteApplication,
    getApplicationById,

    // Status
    updateStatus,
    canTransitionTo,
    getValidTransitions,

    // Contacts
    addContact,
    updateContact,
    deleteContact,

    // Interviews
    addInterview,
    updateInterview,
    deleteInterview,

    // Filtering & Sorting
    filterApplications,
    sortApplications,
    searchApplications,
    filterAndSort,

    // Statistics
    getStatistics,
    getApplicationSummaries,

    // Bulk Operations
    bulkUpdateStatus,
    bulkDelete,

    // Follow-ups
    setFollowUpDate,
    getPendingFollowUps,

    // Utilities
    setApplications,
    clearError,
  };
}

export default useJobApplications;
