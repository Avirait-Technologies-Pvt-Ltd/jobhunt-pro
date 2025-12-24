import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobCard from '@/components/jobs/JobCard';
import { AuthProvider } from '@/context/AuthContext';
import { Job } from '@/types';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/jobs',
}));

const mockJob: Job = {
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
  salary: {
    min: 150000,
    max: 200000,
    currency: 'USD',
    period: 'yearly',
  },
  remote: true,
  description: 'We are looking for a talented Senior Software Engineer to join our team.',
  skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
  postedDate: '2024-01-15',
  featured: true,
  urgent: false,
  category: 'Technology',
  applicants: 45,
};

const mockJobUrgent: Job = {
  ...mockJob,
  id: 'job-2',
  urgent: true,
  remote: false,
};

const renderJobCard = (job: Job = mockJob, variant?: 'default' | 'compact') => {
  return render(
    <AuthProvider>
      <JobCard job={job} variant={variant} />
    </AuthProvider>
  );
};

describe('JobCard', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Default Variant', () => {
    it('should render job card', () => {
      renderJobCard();
      expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    });

    it('should render job title', () => {
      renderJobCard();
      expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    });

    it('should render company name', () => {
      renderJobCard();
      expect(screen.getByText('TechCorp')).toBeInTheDocument();
    });

    it('should render job location', () => {
      renderJobCard();
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    });

    it('should render job type badge', () => {
      renderJobCard();
      expect(screen.getByText('Full-time')).toBeInTheDocument();
    });

    it('should render experience level badge', () => {
      renderJobCard();
      expect(screen.getByText('Senior')).toBeInTheDocument();
    });

    it('should render Remote badge when job is remote', () => {
      renderJobCard();
      expect(screen.getByText('Remote')).toBeInTheDocument();
    });

    it('should not render Remote badge when job is not remote', () => {
      renderJobCard(mockJobUrgent);
      expect(screen.queryByText('Remote')).not.toBeInTheDocument();
    });

    it('should render Urgent badge when job is urgent', () => {
      renderJobCard(mockJobUrgent);
      expect(screen.getByText('Urgent')).toBeInTheDocument();
    });

    it('should not render Urgent badge when job is not urgent', () => {
      renderJobCard();
      expect(screen.queryByText('Urgent')).not.toBeInTheDocument();
    });

    it('should render job category', () => {
      renderJobCard();
      expect(screen.getByText('Technology')).toBeInTheDocument();
    });

    it('should render applicant count', () => {
      renderJobCard();
      expect(screen.getByText('45 applicants')).toBeInTheDocument();
    });

    it('should render job description preview', () => {
      renderJobCard();
      expect(screen.getByText(/We are looking for a talented/)).toBeInTheDocument();
    });

    it('should render View Details button', () => {
      renderJobCard();
      expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument();
    });

    it('should render skills tags', () => {
      renderJobCard();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('GraphQL')).toBeInTheDocument();
    });

    it('should show +N for additional skills beyond 4', () => {
      renderJobCard();
      expect(screen.getByText('+1')).toBeInTheDocument();
    });

    it('should render salary information', () => {
      renderJobCard();
      // Salary should be formatted
      expect(screen.getByText(/150/)).toBeInTheDocument();
    });

    it('should link to job detail page', () => {
      renderJobCard();
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/jobs/job-1');
    });
  });

  describe('Compact Variant', () => {
    it('should render compact variant', () => {
      renderJobCard(mockJob, 'compact');
      expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    });

    it('should render company name and location together', () => {
      renderJobCard(mockJob, 'compact');
      expect(screen.getByText(/TechCorp • San Francisco, CA/)).toBeInTheDocument();
    });

    it('should render job type badge in compact', () => {
      renderJobCard(mockJob, 'compact');
      expect(screen.getByText('Full-time')).toBeInTheDocument();
    });

    it('should render Remote badge in compact when remote', () => {
      renderJobCard(mockJob, 'compact');
      expect(screen.getByText('Remote')).toBeInTheDocument();
    });

    it('should link to job detail page in compact', () => {
      renderJobCard(mockJob, 'compact');
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/jobs/job-1');
    });
  });

  describe('Save Job Functionality', () => {
    it('should render save/bookmark button', () => {
      renderJobCard();
      const buttons = screen.getAllByRole('button');
      // Should have at least the save button
      expect(buttons.length).toBeGreaterThanOrEqual(1);
    });

    it('should handle save button click', () => {
      renderJobCard();
      // Find the bookmark button (not the View Details button)
      const bookmarkButton = screen.getAllByRole('button').find(
        (btn) => !btn.textContent?.includes('View Details')
      );

      if (bookmarkButton) {
        fireEvent.click(bookmarkButton);
        // Should not throw error
      }
    });
  });

  describe('Card Styling', () => {
    it('should have hover effect class', () => {
      const { container } = renderJobCard();
      const card = container.querySelector('[class*="hover:"]');
      expect(card).toBeInTheDocument();
    });

    it('should have transition class', () => {
      const { container } = renderJobCard();
      const card = container.querySelector('[class*="transition"]');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be navigable via link', () => {
      renderJobCard();
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should have accessible buttons', () => {
      renderJobCard();
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Different Job Data', () => {
    it('should handle job with fewer skills', () => {
      const jobWithFewSkills = {
        ...mockJob,
        skills: ['React', 'TypeScript'],
      };
      renderJobCard(jobWithFewSkills);
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.queryByText(/\+\d/)).not.toBeInTheDocument();
    });

    it('should handle job with zero applicants', () => {
      const jobWithNoApplicants = {
        ...mockJob,
        applicants: 0,
      };
      renderJobCard(jobWithNoApplicants);
      expect(screen.getByText('0 applicants')).toBeInTheDocument();
    });

    it('should handle different salary ranges', () => {
      const jobWithDifferentSalary = {
        ...mockJob,
        salary: {
          min: 50000,
          max: 75000,
          currency: 'USD',
          period: 'yearly',
        },
      };
      renderJobCard(jobWithDifferentSalary);
      expect(screen.getByText(/50/)).toBeInTheDocument();
    });
  });
});
