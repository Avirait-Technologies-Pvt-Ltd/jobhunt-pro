import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GoalCard } from '@/components/career-goals/GoalCard';
import type { CareerGoal } from '@/types/career-goals';

// Mock the utils to avoid date-related test flakiness
jest.mock('@/lib/career-goals-utils', () => ({
  ...jest.requireActual('@/lib/career-goals-utils'),
  getDaysRemaining: jest.fn(() => 10),
  isOverdue: jest.fn(() => false),
  formatDaysRemaining: jest.fn(() => '10 days left'),
  formatDate: jest.fn(() => 'Jan 15, 2026'),
  getMilestoneCompletionCount: jest.fn(() => ({ completed: 2, total: 4 })),
}));

const mockGoal: CareerGoal = {
  id: 'goal-1',
  title: 'Master React Patterns',
  description: 'Learn advanced React concepts and patterns',
  category: 'skill-development',
  status: 'active',
  priority: 'high',
  progress: 50,
  milestones: [
    {
      id: 'milestone-1',
      title: 'Complete tutorial',
      status: 'completed',
      order: 1,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-05T00:00:00Z',
      completedAt: '2025-01-05T00:00:00Z',
    },
    {
      id: 'milestone-2',
      title: 'Build project',
      status: 'in-progress',
      order: 2,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-10T00:00:00Z',
    },
  ],
  startDate: '2025-01-01T00:00:00Z',
  targetDate: '2025-02-15T00:00:00Z',
  tags: ['react', 'frontend'],
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-10T00:00:00Z',
};

describe('GoalCard Component', () => {
  it('renders goal title correctly', () => {
    render(<GoalCard goal={mockGoal} />);
    expect(screen.getByText('Master React Patterns')).toBeInTheDocument();
  });

  it('renders goal description', () => {
    render(<GoalCard goal={mockGoal} />);
    expect(
      screen.getByText('Learn advanced React concepts and patterns')
    ).toBeInTheDocument();
  });

  it('displays category badge', () => {
    render(<GoalCard goal={mockGoal} />);
    expect(screen.getByText('Skill Development')).toBeInTheDocument();
  });

  it('displays status badge', () => {
    render(<GoalCard goal={mockGoal} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('displays priority badge', () => {
    render(<GoalCard goal={mockGoal} />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('displays progress percentage', () => {
    render(<GoalCard goal={mockGoal} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('displays milestone count', () => {
    render(<GoalCard goal={mockGoal} />);
    expect(screen.getByText('2/4 milestones')).toBeInTheDocument();
  });

  it('displays tags', () => {
    render(<GoalCard goal={mockGoal} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('frontend')).toBeInTheDocument();
  });

  it('displays days remaining', () => {
    render(<GoalCard goal={mockGoal} />);
    expect(screen.getByText('10 days left')).toBeInTheDocument();
  });

  it('calls onEdit when edit is clicked', async () => {
    const onEdit = jest.fn();
    render(<GoalCard goal={mockGoal} onEdit={onEdit} />);

    // Open dropdown menu
    const menuButton = screen.getByRole('button', { name: '' });
    await userEvent.click(menuButton);

    // Click edit option
    const editOption = screen.getByText('Edit');
    await userEvent.click(editOption);

    expect(onEdit).toHaveBeenCalledWith(mockGoal);
  });

  it('calls onDelete when delete is clicked', async () => {
    const onDelete = jest.fn();
    render(<GoalCard goal={mockGoal} onDelete={onDelete} />);

    // Open dropdown menu
    const menuButton = screen.getByRole('button', { name: '' });
    await userEvent.click(menuButton);

    // Click delete option
    const deleteOption = screen.getByText('Delete');
    await userEvent.click(deleteOption);

    expect(onDelete).toHaveBeenCalledWith(mockGoal);
  });

  it('calls onStatusChange with complete action', async () => {
    const onStatusChange = jest.fn();
    render(<GoalCard goal={mockGoal} onStatusChange={onStatusChange} />);

    // Open dropdown menu
    const menuButton = screen.getByRole('button', { name: '' });
    await userEvent.click(menuButton);

    // Click mark complete option
    const completeOption = screen.getByText('Mark Complete');
    await userEvent.click(completeOption);

    expect(onStatusChange).toHaveBeenCalledWith('goal-1', 'complete');
  });

  it('calls onStatusChange with pause action for active goal', async () => {
    const onStatusChange = jest.fn();
    render(<GoalCard goal={mockGoal} onStatusChange={onStatusChange} />);

    // Open dropdown menu
    const menuButton = screen.getByRole('button', { name: '' });
    await userEvent.click(menuButton);

    // Click pause option
    const pauseOption = screen.getByText('Pause Goal');
    await userEvent.click(pauseOption);

    expect(onStatusChange).toHaveBeenCalledWith('goal-1', 'pause');
  });

  it('shows resume option for paused goal', async () => {
    const pausedGoal = { ...mockGoal, status: 'paused' as const };
    const onStatusChange = jest.fn();
    render(<GoalCard goal={pausedGoal} onStatusChange={onStatusChange} />);

    // Open dropdown menu
    const menuButton = screen.getByRole('button', { name: '' });
    await userEvent.click(menuButton);

    // Should show resume option
    expect(screen.getByText('Resume Goal')).toBeInTheDocument();
  });

  it('expands milestones when View Milestones is clicked', async () => {
    render(<GoalCard goal={mockGoal} />);

    const expandButton = screen.getByText('View Milestones');
    await userEvent.click(expandButton);

    // Milestones should be visible
    expect(screen.getByText('Complete tutorial')).toBeInTheDocument();
    expect(screen.getByText('Build project')).toBeInTheDocument();
  });

  it('renders compact variant correctly', () => {
    render(<GoalCard goal={mockGoal} variant="compact" />);

    // Should show title
    expect(screen.getByText('Master React Patterns')).toBeInTheDocument();
    // Should show progress
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('displays overdue indicator for overdue goals', () => {
    const { isOverdue } = jest.requireMock('@/lib/career-goals-utils');
    isOverdue.mockReturnValue(true);

    render(<GoalCard goal={mockGoal} />);

    expect(screen.getByText('Overdue')).toBeInTheDocument();
  });

  it('applies completed styling for completed goals', () => {
    const completedGoal: CareerGoal = {
      ...mockGoal,
      status: 'completed',
      progress: 100,
      completedAt: '2025-01-20T00:00:00Z',
    };

    render(<GoalCard goal={completedGoal} />);

    const title = screen.getByText('Master React Patterns');
    expect(title).toHaveClass('line-through');
  });
});
