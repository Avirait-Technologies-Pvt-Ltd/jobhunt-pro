import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '@/context/AuthContext';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/jobs',
}));

const renderWithAuth = (ui: React.ReactElement) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

// Mock the jobs data
jest.mock('@/data/jobs', () => ({
  jobs: [
    {
      id: 'job-1',
      title: 'Senior Software Engineer',
      company: {
        id: 'company-1',
        name: 'TechCorp',
        logo: '/logos/techcorp.png',
      },
      location: 'San Francisco, CA',
      type: 'Full-time',
      experienceLevel: 'Senior',
      salary: { min: 150000, max: 200000, currency: 'USD', period: 'yearly' },
      remote: true,
      description: 'Build amazing software',
      skills: ['React', 'TypeScript', 'Node.js'],
      postedDate: '2024-01-15',
      featured: true,
      urgent: false,
      category: 'Technology',
    },
    {
      id: 'job-2',
      title: 'Product Manager',
      company: {
        id: 'company-2',
        name: 'InnovateCo',
        logo: '/logos/innovateco.png',
      },
      location: 'New York, NY',
      type: 'Full-time',
      experienceLevel: 'Mid',
      salary: { min: 120000, max: 160000, currency: 'USD', period: 'yearly' },
      remote: false,
      description: 'Lead product strategy',
      skills: ['Product Strategy', 'Agile', 'Analytics'],
      postedDate: '2024-01-14',
      featured: false,
      urgent: true,
      category: 'Product',
    },
  ],
  filterJobs: jest.fn(() => []),
  getJobCategories: jest.fn(() => ['Technology', 'Product', 'Design']),
  getJobLocations: jest.fn(() => ['San Francisco, CA', 'New York, NY', 'Remote']),
}));

describe('Jobs Page', () => {
  // Import after mocking
  let JobsPage: React.ComponentType;

  beforeAll(async () => {
    const module = await import('@/app/jobs/page');
    JobsPage = module.default;
  });

  it('should render without crashing', () => {
    renderWithAuth(<JobsPage />);
    expect(document.body).toBeDefined();
  });

  it('should display job listings container', () => {
    const { container } = renderWithAuth(<JobsPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should have search functionality', () => {
    renderWithAuth(<JobsPage />);
    const searchInputs = screen.getAllByRole('textbox');
    expect(searchInputs.length).toBeGreaterThan(0);
  });
});
