import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GoalForm } from '@/components/career-goals/GoalForm';
import type { CareerGoal, CreateGoalInput } from '@/types/career-goals';

// Mock date-fns format
jest.mock('date-fns', () => ({
  format: jest.fn((date, formatStr) => {
    if (formatStr === 'PPP') {
      return 'January 15, 2026';
    }
    return date.toISOString();
  }),
}));

const mockGoal: CareerGoal = {
  id: 'goal-1',
  title: 'Learn TypeScript',
  description: 'Master TypeScript for better code quality',
  category: 'skill-development',
  status: 'active',
  priority: 'high',
  progress: 25,
  milestones: [
    {
      id: 'milestone-1',
      title: 'Complete basics',
      description: 'Learn fundamentals',
      status: 'completed',
      order: 1,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-05T00:00:00Z',
    },
  ],
  startDate: '2025-01-01T00:00:00Z',
  targetDate: '2025-03-01T00:00:00Z',
  tags: ['typescript', 'learning'],
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-10T00:00:00Z',
};

describe('GoalForm Component', () => {
  describe('Create Mode', () => {
    it('renders empty form in create mode', () => {
      render(<GoalForm onSubmit={jest.fn()} />);

      expect(screen.getByLabelText(/title/i)).toHaveValue('');
      expect(screen.getByLabelText(/description/i)).toHaveValue('');
    });

    it('renders all form fields', () => {
      render(<GoalForm onSubmit={jest.fn()} />);

      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
      expect(screen.getByText('Category *')).toBeInTheDocument();
      expect(screen.getByText('Priority *')).toBeInTheDocument();
      expect(screen.getByText('Target Date *')).toBeInTheDocument();
      expect(screen.getByText('Tags')).toBeInTheDocument();
      expect(screen.getByText('Milestones')).toBeInTheDocument();
    });

    it('shows validation error for empty title', async () => {
      const onSubmit = jest.fn();
      render(<GoalForm onSubmit={onSubmit} />);

      const submitButton = screen.getByRole('button', { name: /create goal/i });
      await userEvent.click(submitButton);

      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('shows validation error for short title', async () => {
      const onSubmit = jest.fn();
      render(<GoalForm onSubmit={onSubmit} />);

      const titleInput = screen.getByLabelText(/title/i);
      await userEvent.type(titleInput, 'AB');

      const submitButton = screen.getByRole('button', { name: /create goal/i });
      await userEvent.click(submitButton);

      expect(
        screen.getByText(/title must be at least 3 characters/i)
      ).toBeInTheDocument();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('shows validation error for missing target date', async () => {
      const onSubmit = jest.fn();
      render(<GoalForm onSubmit={onSubmit} />);

      const titleInput = screen.getByLabelText(/title/i);
      await userEvent.type(titleInput, 'Valid Title');

      const submitButton = screen.getByRole('button', { name: /create goal/i });
      await userEvent.click(submitButton);

      expect(screen.getByText(/target date is required/i)).toBeInTheDocument();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('can add and remove tags', async () => {
      render(<GoalForm onSubmit={jest.fn()} />);

      const tagInput = screen.getByPlaceholderText(/add a tag/i);
      await userEvent.type(tagInput, 'javascript');

      const addButton = screen.getByRole('button', { name: /^add$/i });
      await userEvent.click(addButton);

      expect(screen.getByText('javascript')).toBeInTheDocument();

      // Remove tag
      const tagBadge = screen.getByText('javascript');
      await userEvent.click(tagBadge);

      expect(screen.queryByText('javascript')).not.toBeInTheDocument();
    });

    it('can add tags with Enter key', async () => {
      render(<GoalForm onSubmit={jest.fn()} />);

      const tagInput = screen.getByPlaceholderText(/add a tag/i);
      await userEvent.type(tagInput, 'react{Enter}');

      expect(screen.getByText('react')).toBeInTheDocument();
    });

    it('can add milestones', async () => {
      render(<GoalForm onSubmit={jest.fn()} />);

      const addMilestoneButton = screen.getByRole('button', {
        name: /add milestone/i,
      });
      await userEvent.click(addMilestoneButton);

      // Should show milestone input
      expect(screen.getByPlaceholderText(/milestone 1/i)).toBeInTheDocument();
    });

    it('can remove milestones', async () => {
      render(<GoalForm onSubmit={jest.fn()} />);

      // Add a milestone
      const addMilestoneButton = screen.getByRole('button', {
        name: /add milestone/i,
      });
      await userEvent.click(addMilestoneButton);

      const milestoneInput = screen.getByPlaceholderText(/milestone 1/i);
      await userEvent.type(milestoneInput, 'Test milestone');

      // Remove milestone
      const deleteButtons = screen.getAllByRole('button');
      const deleteButton = deleteButtons.find((btn) =>
        btn.querySelector('svg.lucide-trash-2')
      );

      if (deleteButton) {
        await userEvent.click(deleteButton);
      }

      expect(screen.queryByDisplayValue('Test milestone')).not.toBeInTheDocument();
    });

    it('displays character count for description', async () => {
      render(<GoalForm onSubmit={jest.fn()} />);

      const descInput = screen.getByLabelText(/description/i);
      await userEvent.type(descInput, 'Test description');

      expect(screen.getByText('16/500 characters')).toBeInTheDocument();
    });

    it('displays tag count', () => {
      render(<GoalForm onSubmit={jest.fn()} />);

      expect(screen.getByText('0/10 tags')).toBeInTheDocument();
    });
  });

  describe('Edit Mode', () => {
    it('populates form with existing goal data', () => {
      render(<GoalForm goal={mockGoal} onSubmit={jest.fn()} />);

      expect(screen.getByLabelText(/title/i)).toHaveValue('Learn TypeScript');
      expect(screen.getByLabelText(/description/i)).toHaveValue(
        'Master TypeScript for better code quality'
      );
    });

    it('shows existing tags', () => {
      render(<GoalForm goal={mockGoal} onSubmit={jest.fn()} />);

      expect(screen.getByText('typescript')).toBeInTheDocument();
      expect(screen.getByText('learning')).toBeInTheDocument();
    });

    it('shows existing milestones', () => {
      render(<GoalForm goal={mockGoal} onSubmit={jest.fn()} />);

      expect(screen.getByDisplayValue('Complete basics')).toBeInTheDocument();
    });

    it('shows Save Changes button in edit mode', () => {
      render(<GoalForm goal={mockGoal} onSubmit={jest.fn()} />);

      expect(
        screen.getByRole('button', { name: /save changes/i })
      ).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('calls onCancel when cancel is clicked', async () => {
      const onCancel = jest.fn();
      render(<GoalForm onSubmit={jest.fn()} onCancel={onCancel} />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await userEvent.click(cancelButton);

      expect(onCancel).toHaveBeenCalled();
    });

    it('shows loading state when isLoading is true', () => {
      render(<GoalForm onSubmit={jest.fn()} isLoading />);

      expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled();
    });
  });

  describe('Dialog Mode', () => {
    it('renders in dialog when open and onOpenChange are provided', () => {
      render(
        <GoalForm
          onSubmit={jest.fn()}
          open={true}
          onOpenChange={jest.fn()}
        />
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Create New Goal')).toBeInTheDocument();
    });

    it('shows edit title in dialog for edit mode', () => {
      render(
        <GoalForm
          goal={mockGoal}
          onSubmit={jest.fn()}
          open={true}
          onOpenChange={jest.fn()}
        />
      );

      expect(screen.getByText('Edit Goal')).toBeInTheDocument();
    });
  });

  describe('Category Selection', () => {
    it('renders category select with default value', () => {
      render(<GoalForm onSubmit={jest.fn()} />);

      // Verify category select is rendered with default value
      const categoryTrigger = screen.getAllByRole('combobox')[0];
      expect(categoryTrigger).toBeInTheDocument();
      expect(categoryTrigger).toHaveTextContent('Skill Development');
    });
  });

  describe('Priority Selection', () => {
    it('renders priority select with default value', () => {
      render(<GoalForm onSubmit={jest.fn()} />);

      // Verify priority select is rendered with default value
      const priorityTrigger = screen.getAllByRole('combobox')[1];
      expect(priorityTrigger).toBeInTheDocument();
      expect(priorityTrigger).toHaveTextContent('Medium');
    });

    it('shows high priority for existing goal', () => {
      render(<GoalForm goal={mockGoal} onSubmit={jest.fn()} />);

      // Verify priority select shows the goal's priority
      const priorityTrigger = screen.getAllByRole('combobox')[1];
      expect(priorityTrigger).toHaveTextContent('High');
    });
  });
});
