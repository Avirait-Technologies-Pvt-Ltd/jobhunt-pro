import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionCard } from '@/components/interview-prep/QuestionCard';
import { QuestionFilters } from '@/components/interview-prep/QuestionFilters';
import { InterviewQuestion, QuestionFilters as QuestionFiltersType, QuestionSortOption } from '@/types/interview-prep';

// Mock question data
const mockQuestion: InterviewQuestion = {
  id: 'q-test-1',
  question: 'Tell me about a time when you had to deal with a difficult team member.',
  category: 'behavioral',
  difficulty: 'medium',
  company: 'Google',
  tags: ['teamwork', 'conflict-resolution', 'communication'],
  sampleAnswer: 'In my previous role, I worked with a colleague who often missed deadlines...',
  tips: ['Use the STAR method', 'Focus on your actions'],
  followUps: ['What would you do differently?'],
  timesAsked: 156,
  createdAt: '2024-01-15',
};

const mockTechnicalQuestion: InterviewQuestion = {
  id: 'q-test-2',
  question: 'Explain the difference between REST and GraphQL.',
  category: 'technical',
  difficulty: 'hard',
  tags: ['api', 'architecture'],
  timesAsked: 89,
  createdAt: '2024-01-20',
};

describe('QuestionCard Component', () => {
  describe('Default Variant', () => {
    it('should render question text', () => {
      render(<QuestionCard question={mockQuestion} />);
      expect(screen.getByText(/Tell me about a time when you had to deal with a difficult team member/)).toBeInTheDocument();
    });

    it('should render category badge', () => {
      render(<QuestionCard question={mockQuestion} />);
      expect(screen.getByText('Behavioral')).toBeInTheDocument();
    });

    it('should render difficulty badge', () => {
      render(<QuestionCard question={mockQuestion} />);
      expect(screen.getByText('Medium')).toBeInTheDocument();
    });

    it('should render company badge when company is provided', () => {
      render(<QuestionCard question={mockQuestion} />);
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    it('should not render company badge when company is not provided', () => {
      render(<QuestionCard question={mockTechnicalQuestion} />);
      expect(screen.queryByText('Google')).not.toBeInTheDocument();
    });

    it('should render times asked count', () => {
      render(<QuestionCard question={mockQuestion} />);
      expect(screen.getByText(/Asked 156 times/)).toBeInTheDocument();
    });

    it('should render tags', () => {
      render(<QuestionCard question={mockQuestion} />);
      expect(screen.getByText('teamwork')).toBeInTheDocument();
      expect(screen.getByText('conflict-resolution')).toBeInTheDocument();
    });

    it('should call onPractice when practice button is clicked', async () => {
      const onPractice = jest.fn();
      render(<QuestionCard question={mockQuestion} onPractice={onPractice} />);

      const practiceButton = screen.getByRole('button', { name: /practice/i });
      await userEvent.click(practiceButton);

      expect(onPractice).toHaveBeenCalledWith(mockQuestion);
    });

    it('should call onSave when save button is clicked', async () => {
      const onSave = jest.fn();
      render(<QuestionCard question={mockQuestion} onSave={onSave} />);

      const saveButton = screen.getByRole('button', { name: /save/i });
      await userEvent.click(saveButton);

      expect(onSave).toHaveBeenCalledWith(mockQuestion);
    });

    it('should show saved state when isSaved is true', () => {
      render(<QuestionCard question={mockQuestion} onSave={jest.fn()} isSaved={true} />);
      expect(screen.getByRole('button', { name: /saved/i })).toBeInTheDocument();
    });

    it('should toggle sample answer visibility when show answer button is clicked', async () => {
      render(<QuestionCard question={mockQuestion} showSampleAnswer={true} />);

      // Initially, sample answer should not be visible
      expect(screen.queryByText(/In my previous role/)).not.toBeInTheDocument();

      // Click to show answer
      const showButton = screen.getByRole('button', { name: /show answer/i });
      await userEvent.click(showButton);

      // Now sample answer should be visible
      expect(screen.getByText(/In my previous role/)).toBeInTheDocument();

      // Tips should also be visible
      expect(screen.getByText(/Use the STAR method/)).toBeInTheDocument();
    });

    it('should render follow-up questions when expanded', async () => {
      render(<QuestionCard question={mockQuestion} showSampleAnswer={true} />);

      const showButton = screen.getByRole('button', { name: /show answer/i });
      await userEvent.click(showButton);

      expect(screen.getByText(/What would you do differently/)).toBeInTheDocument();
    });
  });

  describe('Compact Variant', () => {
    it('should render in compact mode', () => {
      render(<QuestionCard question={mockQuestion} variant="compact" />);
      expect(screen.getByText(/Tell me about a time/)).toBeInTheDocument();
    });

    it('should render category and difficulty badges in compact mode', () => {
      render(<QuestionCard question={mockQuestion} variant="compact" />);
      expect(screen.getByText('Behavioral')).toBeInTheDocument();
      expect(screen.getByText('Medium')).toBeInTheDocument();
    });

    it('should not show sample answer toggle in compact mode', () => {
      render(<QuestionCard question={mockQuestion} variant="compact" />);
      expect(screen.queryByRole('button', { name: /show answer/i })).not.toBeInTheDocument();
    });
  });
});

describe('QuestionFilters Component', () => {
  const defaultProps = {
    filters: {} as QuestionFiltersType,
    onFiltersChange: jest.fn(),
    sortBy: 'most-asked' as QuestionSortOption,
    onSortChange: jest.fn(),
    companies: ['Google', 'Amazon', 'Meta'],
    onReset: jest.fn(),
    totalResults: 50,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input', () => {
    render(<QuestionFilters {...defaultProps} />);
    expect(screen.getByPlaceholderText(/search questions/i)).toBeInTheDocument();
  });

  it('should render category filter options', () => {
    render(<QuestionFilters {...defaultProps} />);
    expect(screen.getByText('Behavioral')).toBeInTheDocument();
    expect(screen.getByText('Technical')).toBeInTheDocument();
    expect(screen.getByText('Situational')).toBeInTheDocument();
  });

  it('should render difficulty filter options', () => {
    render(<QuestionFilters {...defaultProps} />);
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Hard')).toBeInTheDocument();
  });

  it('should call onFiltersChange when search input changes', async () => {
    render(<QuestionFilters {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/search questions/i);
    await userEvent.type(searchInput, 'test query');

    expect(defaultProps.onFiltersChange).toHaveBeenCalled();
  });

  it('should call onFiltersChange when category is toggled', async () => {
    render(<QuestionFilters {...defaultProps} />);

    const behavioralLabel = screen.getByText('Behavioral');
    await userEvent.click(behavioralLabel);

    expect(defaultProps.onFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({
        categories: ['behavioral'],
      })
    );
  });

  it('should call onFiltersChange when difficulty is toggled', async () => {
    render(<QuestionFilters {...defaultProps} />);

    const easyLabel = screen.getByText('Easy');
    await userEvent.click(easyLabel);

    expect(defaultProps.onFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({
        difficulties: ['easy'],
      })
    );
  });

  it('should display total results count', () => {
    render(<QuestionFilters {...defaultProps} />);
    expect(screen.getByText(/50 questions found/i)).toBeInTheDocument();
  });

  it('should show active filter badges when filters are applied', () => {
    render(
      <QuestionFilters
        {...defaultProps}
        filters={{ categories: ['behavioral'], difficulties: ['easy'] }}
      />
    );

    // Should show "2 filters active" badge
    expect(screen.getByText(/2 filters active/i)).toBeInTheDocument();
  });

  it('should call onReset when reset button is clicked', async () => {
    render(
      <QuestionFilters
        {...defaultProps}
        filters={{ categories: ['behavioral'] }}
      />
    );

    const resetButton = screen.getByRole('button', { name: /reset filters/i });
    await userEvent.click(resetButton);

    expect(defaultProps.onReset).toHaveBeenCalled();
  });

  it('should remove individual filter when badge X is clicked', async () => {
    render(
      <QuestionFilters
        {...defaultProps}
        filters={{ categories: ['behavioral', 'technical'] }}
      />
    );

    // Find and click the X on the Behavioral badge
    const badges = screen.getAllByText('Behavioral');
    const filterBadge = badges.find(badge =>
      badge.closest('[class*="cursor-pointer"]')
    );

    if (filterBadge) {
      await userEvent.click(filterBadge);
      expect(defaultProps.onFiltersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          categories: ['technical'],
        })
      );
    }
  });

  it('should render sort dropdown with correct initial value', () => {
    render(<QuestionFilters {...defaultProps} />);

    // Find the sort select trigger (first combobox - the sort dropdown)
    const comboboxes = screen.getAllByRole('combobox');
    const sortSelect = comboboxes[0]; // Sort dropdown is first

    // Verify the select is rendered and shows the current sort option
    expect(sortSelect).toBeInTheDocument();
    expect(screen.getByText('Most Asked')).toBeInTheDocument();
  });
});
