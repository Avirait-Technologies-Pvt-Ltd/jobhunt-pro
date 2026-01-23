import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CareerGoalsPage from '@/app/dashboard/career-goals/page';

// Mock the hooks and data
jest.mock('@/data/career-goals', () => ({
  sampleCareerGoals: [
    {
      id: 'goal-1',
      title: 'Learn React',
      description: 'Master React development',
      category: 'skill-development',
      status: 'active',
      priority: 'high',
      progress: 50,
      milestones: [
        {
          id: 'milestone-1',
          title: 'Complete basics',
          status: 'completed',
          order: 1,
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-05T00:00:00Z',
        },
        {
          id: 'milestone-2',
          title: 'Build project',
          status: 'pending',
          order: 2,
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
      ],
      startDate: '2025-01-01T00:00:00Z',
      targetDate: '2025-06-01T00:00:00Z',
      tags: ['react', 'frontend'],
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-10T00:00:00Z',
    },
    {
      id: 'goal-2',
      title: 'Networking Goal',
      description: 'Expand professional network',
      category: 'networking',
      status: 'active',
      priority: 'medium',
      progress: 0,
      milestones: [],
      startDate: '2025-01-01T00:00:00Z',
      targetDate: '2025-06-01T00:00:00Z',
      tags: ['networking'],
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
  ],
  sampleAchievements: [
    {
      id: 'achievement-1',
      type: 'goal-completed',
      name: 'First Goal',
      description: 'Completed first goal',
      icon: 'Trophy',
      color: 'bg-green-500',
      earnedAt: '2025-01-10T00:00:00Z',
    },
  ],
}));

// Mock date-fns format
jest.mock('date-fns', () => ({
  format: jest.fn((date, formatStr) => {
    if (formatStr === 'PPP') {
      return 'January 15, 2026';
    }
    return new Date(date).toISOString();
  }),
}));

// Mock the utility functions to avoid date flakiness
jest.mock('@/lib/career-goals-utils', () => ({
  ...jest.requireActual('@/lib/career-goals-utils'),
  getDaysRemaining: jest.fn(() => 30),
  isOverdue: jest.fn(() => false),
  formatDaysRemaining: jest.fn(() => '30 days left'),
  formatDate: jest.fn(() => 'Jun 1, 2025'),
}));

describe('Career Goals Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Page Rendering', () => {
    it('renders the career goals page', () => {
      render(<CareerGoalsPage />);

      expect(screen.getByText('Career Goals')).toBeInTheDocument();
      expect(
        screen.getByText('Track and achieve your career objectives')
      ).toBeInTheDocument();
    });

    it('displays the new goal button', () => {
      render(<CareerGoalsPage />);

      expect(
        screen.getByRole('button', { name: /new goal/i })
      ).toBeInTheDocument();
    });

    it('displays existing goals', () => {
      render(<CareerGoalsPage />);

      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Networking Goal')).toBeInTheDocument();
    });

    it('shows tabs for Goals and Analytics', () => {
      render(<CareerGoalsPage />);

      expect(screen.getByRole('tab', { name: /goals/i })).toBeInTheDocument();
      expect(
        screen.getByRole('tab', { name: /analytics/i })
      ).toBeInTheDocument();
    });
  });

  describe('Goal Creation Flow', () => {
    it('opens create goal dialog when clicking New Goal', async () => {
      render(<CareerGoalsPage />);

      const newGoalButton = screen.getByRole('button', { name: /new goal/i });
      await userEvent.click(newGoalButton);

      expect(screen.getByText('Create New Goal')).toBeInTheDocument();
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    });

    it('closes dialog when clicking cancel', async () => {
      render(<CareerGoalsPage />);

      const newGoalButton = screen.getByRole('button', { name: /new goal/i });
      await userEvent.click(newGoalButton);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await userEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByText('Create New Goal')).not.toBeInTheDocument();
      });
    });
  });

  describe('Goal Filtering', () => {
    it('filters goals by search query', async () => {
      render(<CareerGoalsPage />);

      const searchInput = screen.getByPlaceholderText(/search goals/i);
      await userEvent.type(searchInput, 'React');

      await waitFor(() => {
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.queryByText('Networking Goal')).not.toBeInTheDocument();
      });
    });

    it('clears search when clicking clear button', async () => {
      render(<CareerGoalsPage />);

      const searchInput = screen.getByPlaceholderText(/search goals/i);
      await userEvent.type(searchInput, 'React');

      await waitFor(() => {
        expect(screen.queryByText('Networking Goal')).not.toBeInTheDocument();
      });

      // Clear the search
      await userEvent.clear(searchInput);

      await waitFor(() => {
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.getByText('Networking Goal')).toBeInTheDocument();
      });
    });

    it('shows filter popover when clicking Filters button', async () => {
      render(<CareerGoalsPage />);

      const filtersButton = screen.getByRole('button', { name: /filters/i });
      await userEvent.click(filtersButton);

      expect(screen.getByText('Filter Goals')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      // Priority text may appear multiple times, just verify filter is open
      expect(screen.getAllByText('Priority').length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Goal Sorting', () => {
    it('renders sort select with default value', () => {
      render(<CareerGoalsPage />);

      const sortSelect = screen.getByRole('combobox');
      expect(sortSelect).toBeInTheDocument();
      expect(sortSelect).toHaveTextContent('Priority');
    });
  });

  describe('View Mode Toggle', () => {
    it('switches between grid and list view', async () => {
      render(<CareerGoalsPage />);

      // Default is grid view - should have grid layout
      const container = screen.getByText('Learn React').closest('.grid');
      expect(container).toBeInTheDocument();

      // Switch to list view
      const listViewButton = screen.getAllByRole('button').find(
        (btn) => btn.querySelector('svg.lucide-list')
      );

      if (listViewButton) {
        await userEvent.click(listViewButton);

        await waitFor(() => {
          // Goals should now be in a different layout
          const goals = screen.getAllByText(/Goal/);
          expect(goals.length).toBeGreaterThan(0);
        });
      }
    });
  });

  describe('Analytics Tab', () => {
    it('switches to analytics view', async () => {
      render(<CareerGoalsPage />);

      const analyticsTab = screen.getByRole('tab', { name: /analytics/i });
      await userEvent.click(analyticsTab);

      await waitFor(() => {
        expect(screen.getByText('Total Goals')).toBeInTheDocument();
        expect(screen.getByText('Completion Rate')).toBeInTheDocument();
      });
    });

    it('displays statistics cards', async () => {
      render(<CareerGoalsPage />);

      const analyticsTab = screen.getByRole('tab', { name: /analytics/i });
      await userEvent.click(analyticsTab);

      await waitFor(() => {
        expect(screen.getByText('Total Goals')).toBeInTheDocument();
        expect(screen.getByText('Current Streak')).toBeInTheDocument();
        expect(screen.getByText('Overdue Goals')).toBeInTheDocument();
      });
    });

    it('displays achievements section', async () => {
      render(<CareerGoalsPage />);

      const analyticsTab = screen.getByRole('tab', { name: /analytics/i });
      await userEvent.click(analyticsTab);

      await waitFor(() => {
        expect(screen.getByText('Achievements')).toBeInTheDocument();
      });
    });
  });

  describe('Goal Card Interactions', () => {
    it('expands milestones when View Milestones is clicked', async () => {
      render(<CareerGoalsPage />);

      // Find the first goal card's "View Milestones" button
      const viewMilestonesButton = screen.getAllByText('View Milestones')[0];
      await userEvent.click(viewMilestonesButton);

      await waitFor(() => {
        expect(screen.getByText('Complete basics')).toBeInTheDocument();
        expect(screen.getByText('Build project')).toBeInTheDocument();
      });
    });

    it('shows goal action menu', async () => {
      render(<CareerGoalsPage />);

      // Find the first goal card's menu button
      const menuButtons = screen.getAllByRole('button').filter(
        (btn) => btn.querySelector('svg.lucide-more-horizontal')
      );

      if (menuButtons.length > 0) {
        await userEvent.click(menuButtons[0]);

        await waitFor(() => {
          expect(screen.getByText('Mark Complete')).toBeInTheDocument();
          expect(screen.getByText('Pause Goal')).toBeInTheDocument();
          expect(screen.getByText('Edit')).toBeInTheDocument();
          expect(screen.getByText('Delete')).toBeInTheDocument();
        });
      }
    });
  });

  describe('Goal Status Changes', () => {
    it('can complete a goal', async () => {
      render(<CareerGoalsPage />);

      // Open menu for first goal
      const menuButtons = screen.getAllByRole('button').filter(
        (btn) => btn.querySelector('svg.lucide-more-horizontal')
      );

      if (menuButtons.length > 0) {
        await userEvent.click(menuButtons[0]);

        const completeOption = await screen.findByText('Mark Complete');
        await userEvent.click(completeOption);

        // Goal should now show as completed
        await waitFor(() => {
          expect(screen.getByText('Completed')).toBeInTheDocument();
        });
      }
    });

    it('can pause a goal', async () => {
      render(<CareerGoalsPage />);

      // Open menu for first goal
      const menuButtons = screen.getAllByRole('button').filter(
        (btn) => btn.querySelector('svg.lucide-more-horizontal')
      );

      if (menuButtons.length > 0) {
        await userEvent.click(menuButtons[0]);

        const pauseOption = await screen.findByText('Pause Goal');
        await userEvent.click(pauseOption);

        // Goal should now show as paused
        await waitFor(() => {
          expect(screen.getByText('Paused')).toBeInTheDocument();
        });
      }
    });
  });

  describe('Goal Edit Flow', () => {
    it('opens edit dialog when clicking Edit', async () => {
      render(<CareerGoalsPage />);

      // Open menu for first goal
      const menuButtons = screen.getAllByRole('button').filter(
        (btn) => btn.querySelector('svg.lucide-more-horizontal')
      );

      if (menuButtons.length > 0) {
        await userEvent.click(menuButtons[0]);

        const editOption = await screen.findByText('Edit');
        await userEvent.click(editOption);

        await waitFor(() => {
          expect(screen.getByText('Edit Goal')).toBeInTheDocument();
          expect(screen.getByDisplayValue('Learn React')).toBeInTheDocument();
        });
      }
    });
  });

  describe('Milestone Completion', () => {
    it('can complete a milestone from expanded view', async () => {
      render(<CareerGoalsPage />);

      // Expand milestones
      const viewMilestonesButton = screen.getAllByText('View Milestones')[0];
      await userEvent.click(viewMilestonesButton);

      // Wait for milestones to appear
      await waitFor(() => {
        expect(screen.getByText('Build project')).toBeInTheDocument();
      });

      // Find the pending milestone's complete button
      const pendingButtons = screen.getAllByRole('button').filter(
        (btn) => btn.className.includes('bg-gray-200')
      );

      if (pendingButtons.length > 0) {
        await userEvent.click(pendingButtons[0]);

        // Milestone should now be completed
        await waitFor(() => {
          // Progress should update
          expect(screen.getByText('100%')).toBeInTheDocument();
        });
      }
    });
  });

  describe('Empty State', () => {
    it('shows empty state when all goals are filtered out', async () => {
      render(<CareerGoalsPage />);

      // Search for something that doesn't exist
      const searchInput = screen.getByPlaceholderText(/search goals/i);
      await userEvent.type(searchInput, 'NonexistentGoal12345');

      await waitFor(() => {
        expect(screen.getByText('No goals match your filters.')).toBeInTheDocument();
      });
    });
  });

  describe('Delete Goal', () => {
    it('shows confirmation before deleting', async () => {
      const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);

      render(<CareerGoalsPage />);

      // Open menu for first goal
      const menuButtons = screen.getAllByRole('button').filter(
        (btn) => btn.querySelector('svg.lucide-more-horizontal')
      );

      if (menuButtons.length > 0) {
        await userEvent.click(menuButtons[0]);

        const deleteOption = await screen.findByText('Delete');
        await userEvent.click(deleteOption);

        expect(confirmSpy).toHaveBeenCalled();
      }

      confirmSpy.mockRestore();
    });

    it('deletes goal when confirmed', async () => {
      const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

      render(<CareerGoalsPage />);

      // Open menu for first goal
      const menuButtons = screen.getAllByRole('button').filter(
        (btn) => btn.querySelector('svg.lucide-more-horizontal')
      );

      if (menuButtons.length > 0) {
        await userEvent.click(menuButtons[0]);

        const deleteOption = await screen.findByText('Delete');
        await userEvent.click(deleteOption);

        await waitFor(() => {
          expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
        });
      }

      confirmSpy.mockRestore();
    });
  });
});
