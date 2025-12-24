import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the AuthContext
jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: {
      id: 'user-1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      title: 'Software Engineer',
      avatar: null,
      skills: ['React', 'TypeScript'],
      experience: [{ company: 'TechCorp', title: 'Developer' }],
      education: [{ school: 'MIT', degree: 'BS' }],
    },
    isAuthenticated: true,
  }),
}));

// Mock the data files
jest.mock('@/data/jobs', () => ({
  jobs: [],
  getJobById: jest.fn(() => null),
}));

describe('Dashboard Page', () => {
  let DashboardPage: React.ComponentType;

  beforeAll(async () => {
    const module = await import('@/app/dashboard/page');
    DashboardPage = module.default;
  });

  beforeEach(() => {
    // Mock localStorage
    (localStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === 'jobhunt_applications') return JSON.stringify([]);
      if (key === 'jobhunt_saved_jobs') return JSON.stringify([]);
      return null;
    });
  });

  it('should render without crashing', () => {
    render(<DashboardPage />);
    expect(document.body).toBeDefined();
  });

  it('should have main content', () => {
    const { container } = render(<DashboardPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render heading elements', () => {
    render(<DashboardPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should display welcome message', () => {
    render(<DashboardPage />);
    // Look for the welcome text
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });
});
