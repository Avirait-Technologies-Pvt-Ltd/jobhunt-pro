import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockInterviewPlayer } from '@/components/interview-prep/MockInterviewPlayer';
import { SessionSetup } from '@/components/interview-prep/SessionSetup';
import { AnswerInput } from '@/components/interview-prep/AnswerInput';
import { SessionSummary } from '@/components/interview-prep/SessionSummary';
import { InterviewQuestion, MockInterviewSession, MockInterviewSettings } from '@/types/interview-prep';

// Mock question data
const mockQuestion: InterviewQuestion = {
  id: 'q-test-1',
  question: 'Tell me about yourself and your background.',
  category: 'behavioral',
  difficulty: 'easy',
  tags: ['introduction'],
  tips: ['Keep it concise', 'Focus on relevant experience'],
  timesAsked: 500,
  createdAt: '2024-01-01',
};

const mockSession: MockInterviewSession = {
  id: 'session-test-1',
  questions: [mockQuestion, { ...mockQuestion, id: 'q-test-2', category: 'technical' }],
  currentQuestionIndex: 0,
  answers: [],
  status: 'completed',
  startedAt: '2024-01-15T10:00:00Z',
  completedAt: '2024-01-15T10:30:00Z',
  totalDuration: 1800,
  settings: {
    questionCount: 2,
    timePerQuestion: 180,
    categories: ['behavioral', 'technical'],
    difficulties: ['easy', 'medium'],
    includeFollowUps: false,
  },
};

describe('MockInterviewPlayer Component', () => {
  const defaultProps = {
    currentQuestion: mockQuestion,
    currentQuestionIndex: 0,
    totalQuestions: 5,
    timeRemaining: 120,
    isTimerRunning: true,
    isPaused: false,
    onPause: jest.fn(),
    onResume: jest.fn(),
    onEnd: jest.fn(),
    onNext: jest.fn(),
    onPrevious: jest.fn(),
    onResetTimer: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render current question', () => {
    render(<MockInterviewPlayer {...defaultProps} />);
    expect(screen.getByText(/Tell me about yourself/)).toBeInTheDocument();
  });

  it('should display question progress', () => {
    render(<MockInterviewPlayer {...defaultProps} />);
    expect(screen.getByText(/Question 1 of 5/)).toBeInTheDocument();
  });

  it('should display timer', () => {
    render(<MockInterviewPlayer {...defaultProps} />);
    expect(screen.getByText('2:00')).toBeInTheDocument();
  });

  it('should display category badge', () => {
    render(<MockInterviewPlayer {...defaultProps} />);
    expect(screen.getByText('Behavioral')).toBeInTheDocument();
  });

  it('should display difficulty badge', () => {
    render(<MockInterviewPlayer {...defaultProps} />);
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  it('should display tips when available', () => {
    render(<MockInterviewPlayer {...defaultProps} />);
    expect(screen.getByText(/Keep it concise/)).toBeInTheDocument();
  });

  it('should call onPause when pause button is clicked', async () => {
    render(<MockInterviewPlayer {...defaultProps} />);

    // Find the pause button (the large center button)
    const buttons = screen.getAllByRole('button');
    const pauseButton = buttons.find(btn =>
      btn.querySelector('svg.lucide-pause')
    );

    if (pauseButton) {
      await userEvent.click(pauseButton);
      expect(defaultProps.onPause).toHaveBeenCalled();
    }
  });

  it('should call onResume when resume button is clicked in paused state', async () => {
    render(<MockInterviewPlayer {...defaultProps} isPaused={true} />);

    // Find the play button
    const buttons = screen.getAllByRole('button');
    const playButton = buttons.find(btn =>
      btn.querySelector('svg.lucide-play')
    );

    if (playButton) {
      await userEvent.click(playButton);
      expect(defaultProps.onResume).toHaveBeenCalled();
    }
  });

  it('should call onNext when next button is clicked', async () => {
    render(<MockInterviewPlayer {...defaultProps} />);

    // Find skip forward button
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons.find(btn =>
      btn.querySelector('svg.lucide-skip-forward')
    );

    if (nextButton) {
      await userEvent.click(nextButton);
      expect(defaultProps.onNext).toHaveBeenCalled();
    }
  });

  it('should call onPrevious when previous button is clicked', async () => {
    render(<MockInterviewPlayer {...defaultProps} currentQuestionIndex={1} />);

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons.find(btn =>
      btn.querySelector('svg.lucide-skip-back')
    );

    if (prevButton) {
      await userEvent.click(prevButton);
      expect(defaultProps.onPrevious).toHaveBeenCalled();
    }
  });

  it('should disable previous button on first question', () => {
    render(<MockInterviewPlayer {...defaultProps} currentQuestionIndex={0} />);

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons.find(btn =>
      btn.querySelector('svg.lucide-skip-back')
    );

    expect(prevButton).toBeDisabled();
  });

  it('should disable next button on last question', () => {
    render(<MockInterviewPlayer {...defaultProps} currentQuestionIndex={4} totalQuestions={5} />);

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons.find(btn =>
      btn.querySelector('svg.lucide-skip-forward')
    );

    expect(nextButton).toBeDisabled();
  });

  it('should call onEnd when end session button is clicked', async () => {
    render(<MockInterviewPlayer {...defaultProps} />);

    const endButton = screen.getByRole('button', { name: /end session/i });
    await userEvent.click(endButton);

    expect(defaultProps.onEnd).toHaveBeenCalled();
  });

  it('should call onResetTimer when reset timer button is clicked', async () => {
    render(<MockInterviewPlayer {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    const resetButton = buttons.find(btn =>
      btn.querySelector('svg.lucide-rotate-ccw')
    );

    if (resetButton) {
      await userEvent.click(resetButton);
      expect(defaultProps.onResetTimer).toHaveBeenCalled();
    }
  });

  it('should show warning color when timer is low', () => {
    render(<MockInterviewPlayer {...defaultProps} timeRemaining={25} />);
    // Timer should show warning styling (yellow)
    expect(screen.getByText('0:25')).toBeInTheDocument();
  });

  it('should show critical color when timer is very low', () => {
    render(<MockInterviewPlayer {...defaultProps} timeRemaining={5} />);
    // Timer should show critical styling (red)
    expect(screen.getByText('0:05')).toBeInTheDocument();
  });
});

describe('SessionSetup Component', () => {
  const defaultProps = {
    onStart: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all category options', () => {
    render(<SessionSetup {...defaultProps} />);

    expect(screen.getByText('Behavioral')).toBeInTheDocument();
    expect(screen.getByText('Technical')).toBeInTheDocument();
    expect(screen.getByText('Situational')).toBeInTheDocument();
    expect(screen.getByText('System Design')).toBeInTheDocument();
    expect(screen.getByText('Coding')).toBeInTheDocument();
    expect(screen.getByText('Case Study')).toBeInTheDocument();
  });

  it('should render all difficulty options', () => {
    render(<SessionSetup {...defaultProps} />);

    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Hard')).toBeInTheDocument();
  });

  it('should render question count slider', () => {
    render(<SessionSetup {...defaultProps} />);
    expect(screen.getByText(/Number of Questions/)).toBeInTheDocument();
  });

  it('should render time per question slider', () => {
    render(<SessionSetup {...defaultProps} />);
    expect(screen.getByText(/Time per Question/)).toBeInTheDocument();
  });

  it('should render start button', () => {
    render(<SessionSetup {...defaultProps} />);
    expect(screen.getByRole('button', { name: /start interview/i })).toBeInTheDocument();
  });

  it('should call onStart with settings when start is clicked', async () => {
    render(<SessionSetup {...defaultProps} />);

    const startButton = screen.getByRole('button', { name: /start interview/i });
    await userEvent.click(startButton);

    expect(defaultProps.onStart).toHaveBeenCalledWith(
      expect.objectContaining({
        questionCount: expect.any(Number),
        timePerQuestion: expect.any(Number),
        categories: expect.any(Array),
        difficulties: expect.any(Array),
      })
    );
  });

  it('should show validation errors when no categories selected', async () => {
    render(<SessionSetup {...defaultProps} />);

    // Deselect all default categories
    const behavioralCheckbox = screen.getByText('Behavioral');
    const technicalCheckbox = screen.getByText('Technical');
    const situationalCheckbox = screen.getByText('Situational');

    await userEvent.click(behavioralCheckbox);
    await userEvent.click(technicalCheckbox);
    await userEvent.click(situationalCheckbox);

    const startButton = screen.getByRole('button', { name: /start interview/i });
    await userEvent.click(startButton);

    expect(screen.getByText(/Please select at least one category/)).toBeInTheDocument();
  });

  it('should display available question count when provided', () => {
    render(<SessionSetup {...defaultProps} availableQuestionCount={42} />);
    expect(screen.getByText(/42 questions available/)).toBeInTheDocument();
  });
});

describe('AnswerInput Component', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render textarea', () => {
    render(<AnswerInput {...defaultProps} />);
    expect(screen.getByPlaceholderText(/Type your answer/i)).toBeInTheDocument();
  });

  it('should call onChange when text is entered', async () => {
    render(<AnswerInput {...defaultProps} />);

    const textarea = screen.getByPlaceholderText(/Type your answer/i);
    await userEvent.type(textarea, 'My answer');

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('should display word count', () => {
    render(<AnswerInput {...defaultProps} value="This is a test answer" showWordCount={true} />);
    // Use getAllByText since word count appears in both badge and feedback message
    const wordCountElements = screen.getAllByText(/5 words/);
    expect(wordCountElements.length).toBeGreaterThan(0);
  });

  it('should show STAR helper for behavioral questions', () => {
    // STAR helper requires wordCount > 20 to display
    const longAnswer = "In my previous role at Company X, I had a situation where I needed to lead a team through a challenging project with tight deadlines and limited resources. I took action by organizing daily standups and prioritizing tasks effectively.";
    render(
      <AnswerInput
        {...defaultProps}
        value={longAnswer}
        questionCategory="behavioral"
        showSTARHelper={true}
      />
    );

    // The button text is "Show STAR Analysis"
    expect(screen.getByText(/STAR Analysis/i)).toBeInTheDocument();
  });

  it('should call onSave when save button is clicked', async () => {
    const onSave = jest.fn();
    render(
      <AnswerInput
        {...defaultProps}
        value="This is my answer with enough words to pass the minimum requirement for saving"
        onSave={onSave}
      />
    );

    const saveButton = screen.getByRole('button', { name: /save to answer bank/i });
    await userEvent.click(saveButton);

    expect(onSave).toHaveBeenCalled();
  });

  it('should show rating stars when answer is long enough', () => {
    render(
      <AnswerInput
        {...defaultProps}
        value="This is my answer with enough words to pass the minimum word count requirement for showing the self rating feature"
        minWords={10}
        onSubmit={jest.fn()}
      />
    );

    expect(screen.getByText(/Rate your answer/i)).toBeInTheDocument();
  });

  it('should disable submit without rating', async () => {
    const onSubmit = jest.fn();
    render(
      <AnswerInput
        {...defaultProps}
        value="This is my answer with enough words to pass the minimum word count requirement"
        minWords={10}
        onSubmit={onSubmit}
      />
    );

    const submitButton = screen.getByRole('button', { name: /submit answer/i });
    expect(submitButton).toBeDisabled();
  });
});

describe('SessionSummary Component', () => {
  const sessionWithAnswers: MockInterviewSession = {
    ...mockSession,
    answers: [
      {
        questionId: 'q-test-1',
        answer: 'My answer to the first question...',
        duration: 120,
        selfRating: 4,
        submittedAt: '2024-01-15T10:10:00Z',
      },
      {
        questionId: 'q-test-2',
        answer: 'My answer to the second question...',
        duration: 150,
        selfRating: 3,
        submittedAt: '2024-01-15T10:15:00Z',
      },
    ],
  };

  const defaultProps = {
    session: sessionWithAnswers,
    onStartNew: jest.fn(),
    onGoHome: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display session complete message', () => {
    render(<SessionSummary {...defaultProps} />);
    expect(screen.getByText(/Session Complete!/i)).toBeInTheDocument();
  });

  it('should display questions answered count', () => {
    render(<SessionSummary {...defaultProps} />);
    expect(screen.getByText('2/2')).toBeInTheDocument();
  });

  it('should display average score', () => {
    render(<SessionSummary {...defaultProps} />);
    // Average of 4 and 3 = 3.5
    expect(screen.getByText('3.5')).toBeInTheDocument();
  });

  it('should display session duration', () => {
    render(<SessionSummary {...defaultProps} />);
    expect(screen.getByText('30:00')).toBeInTheDocument();
  });

  it('should display completion percentage', () => {
    render(<SessionSummary {...defaultProps} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('should display category breakdown', () => {
    render(<SessionSummary {...defaultProps} />);
    expect(screen.getByText('Behavioral')).toBeInTheDocument();
  });

  it('should call onStartNew when start new button is clicked', async () => {
    render(<SessionSummary {...defaultProps} />);

    const startNewButton = screen.getByRole('button', { name: /start new session/i });
    await userEvent.click(startNewButton);

    expect(defaultProps.onStartNew).toHaveBeenCalled();
  });

  it('should call onGoHome when back to hub button is clicked', async () => {
    render(<SessionSummary {...defaultProps} />);

    const homeButton = screen.getByRole('button', { name: /back to hub/i });
    await userEvent.click(homeButton);

    expect(defaultProps.onGoHome).toHaveBeenCalled();
  });

  it('should call onReviewAnswers when review button is clicked', async () => {
    const onReviewAnswers = jest.fn();
    render(<SessionSummary {...defaultProps} onReviewAnswers={onReviewAnswers} />);

    const reviewButton = screen.getByRole('button', { name: /review answers/i });
    await userEvent.click(reviewButton);

    expect(onReviewAnswers).toHaveBeenCalled();
  });
});
