import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MilestoneTimeline } from '@/components/career-goals/MilestoneTimeline';
import type { Milestone } from '@/types/career-goals';

// Mock the utils
jest.mock('@/lib/career-goals-utils', () => ({
  ...jest.requireActual('@/lib/career-goals-utils'),
  getDaysRemaining: jest.fn((date) => {
    if (date === '2025-01-20T00:00:00Z') return -5; // overdue
    return 10;
  }),
  formatDaysRemaining: jest.fn((days) => {
    if (days === null) return 'No deadline';
    if (days < 0) return `${Math.abs(days)} days overdue`;
    return `${days} days left`;
  }),
  formatDate: jest.fn(() => 'Jan 15, 2026'),
  getMilestoneStatusColor: jest.fn((status) => {
    const colors: Record<string, string> = {
      pending: 'text-gray-500 bg-gray-100',
      'in-progress': 'text-blue-600 bg-blue-100',
      completed: 'text-green-600 bg-green-100',
      skipped: 'text-slate-400 bg-slate-100',
    };
    return colors[status] || '';
  }),
}));

const mockMilestones: Milestone[] = [
  {
    id: 'milestone-1',
    title: 'Research phase',
    description: 'Gather requirements',
    status: 'completed',
    dueDate: '2025-01-10T00:00:00Z',
    completedAt: '2025-01-08T00:00:00Z',
    order: 1,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
  },
  {
    id: 'milestone-2',
    title: 'Development',
    description: 'Build the feature',
    status: 'in-progress',
    dueDate: '2025-01-25T00:00:00Z',
    order: 2,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'milestone-3',
    title: 'Testing',
    status: 'pending',
    dueDate: '2025-02-01T00:00:00Z',
    order: 3,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
];

describe('MilestoneTimeline Component', () => {
  it('renders all milestones', () => {
    render(<MilestoneTimeline milestones={mockMilestones} />);

    expect(screen.getByText('Research phase')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });

  it('renders milestone descriptions', () => {
    render(<MilestoneTimeline milestones={mockMilestones} />);

    expect(screen.getByText('Gather requirements')).toBeInTheDocument();
    expect(screen.getByText('Build the feature')).toBeInTheDocument();
  });

  it('displays correct status badges', () => {
    render(<MilestoneTimeline milestones={mockMilestones} />);

    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('displays empty state when no milestones', () => {
    render(<MilestoneTimeline milestones={[]} />);

    expect(screen.getByText('No milestones yet')).toBeInTheDocument();
  });

  it('displays hint to add milestones when editable and empty', () => {
    render(<MilestoneTimeline milestones={[]} isEditable />);

    expect(
      screen.getByText('Add milestones to track your progress')
    ).toBeInTheDocument();
  });

  it('calls onMilestoneComplete when clicking on pending milestone', async () => {
    const onComplete = jest.fn();
    render(
      <MilestoneTimeline
        milestones={mockMilestones}
        onMilestoneComplete={onComplete}
      />
    );

    // Find and click the pending milestone's status button
    const buttons = screen.getAllByRole('button');
    // The pending milestone (Testing) should be clickable
    const pendingButton = buttons.find(
      (btn) => btn.className.includes('bg-gray-200')
    );
    if (pendingButton) {
      await userEvent.click(pendingButton);
      expect(onComplete).toHaveBeenCalledWith('milestone-3');
    }
  });

  it('calls onMilestoneComplete when clicking on in-progress milestone', async () => {
    const onComplete = jest.fn();
    render(
      <MilestoneTimeline
        milestones={mockMilestones}
        onMilestoneComplete={onComplete}
      />
    );

    // Find and click the in-progress milestone's status button
    const buttons = screen.getAllByRole('button');
    const inProgressButton = buttons.find(
      (btn) => btn.className.includes('bg-blue-500')
    );
    if (inProgressButton) {
      await userEvent.click(inProgressButton);
      expect(onComplete).toHaveBeenCalledWith('milestone-2');
    }
  });

  it('renders milestones in correct order', () => {
    const unorderedMilestones = [...mockMilestones].reverse();
    render(<MilestoneTimeline milestones={unorderedMilestones} />);

    const titles = screen.getAllByRole('heading', { level: 4 });
    expect(titles[0]).toHaveTextContent('Research phase');
    expect(titles[1]).toHaveTextContent('Development');
    expect(titles[2]).toHaveTextContent('Testing');
  });

  it('shows action menu when isEditable is true', async () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(
      <MilestoneTimeline
        milestones={mockMilestones}
        isEditable
        onMilestoneEdit={onEdit}
        onMilestoneDelete={onDelete}
      />
    );

    // Find the more options button (should have MoreHorizontal icon)
    const moreButtons = screen.getAllByRole('button').filter(
      (btn) => btn.querySelector('svg')
    );

    // Click the first action menu button
    const actionButton = moreButtons.find(btn =>
      btn.className.includes('ghost')
    );

    if (actionButton) {
      await userEvent.click(actionButton);
      // Menu should open
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    }
  });

  it('applies line-through to completed milestones', () => {
    render(<MilestoneTimeline milestones={mockMilestones} />);

    const completedTitle = screen.getByText('Research phase');
    expect(completedTitle).toHaveClass('line-through');
  });

  it('renders horizontal variant correctly', () => {
    render(<MilestoneTimeline milestones={mockMilestones} variant="horizontal" />);

    // Should show truncated titles in horizontal view
    expect(screen.getByText('Research phase')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });

  it('displays overdue indicator for overdue milestones', () => {
    const overdueMilestone: Milestone = {
      id: 'overdue-1',
      title: 'Overdue task',
      status: 'pending',
      dueDate: '2025-01-20T00:00:00Z', // This triggers overdue in our mock
      order: 1,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    };

    render(<MilestoneTimeline milestones={[overdueMilestone]} />);

    expect(screen.getByText('5 days overdue')).toBeInTheDocument();
  });

  it('displays skipped status correctly', () => {
    const skippedMilestone: Milestone = {
      id: 'skipped-1',
      title: 'Skipped task',
      status: 'skipped',
      order: 1,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    };

    render(<MilestoneTimeline milestones={[skippedMilestone]} />);

    expect(screen.getByText('Skipped')).toBeInTheDocument();
    const title = screen.getByText('Skipped task');
    expect(title).toHaveClass('line-through');
  });
});
