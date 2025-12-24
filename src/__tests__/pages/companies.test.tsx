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
  usePathname: () => '/companies',
}));

// Mock the companies data
jest.mock('@/data/companies', () => ({
  companies: [
    {
      id: 'company-1',
      name: 'TechCorp Solutions',
      logo: '/logos/techcorp.png',
      industry: 'Technology',
      size: '1000-5000',
      locations: ['San Francisco, CA'],
      founded: 2010,
      description: 'Leading technology company',
      website: 'https://techcorp.com',
      openPositions: 25,
      rating: 4.5,
      reviewCount: 150,
      featured: true,
    },
    {
      id: 'company-2',
      name: 'DesignHub Creative',
      logo: '/logos/designhub.png',
      industry: 'Design',
      size: '50-200',
      locations: ['New York, NY'],
      founded: 2015,
      description: 'Creative design agency',
      website: 'https://designhub.com',
      openPositions: 10,
      rating: 4.2,
      reviewCount: 80,
      featured: false,
    },
  ],
  getCompanyById: jest.fn((id: string) => {
    if (id === 'company-1') {
      return {
        id: 'company-1',
        name: 'TechCorp Solutions',
        industry: 'Technology',
      };
    }
    return null;
  }),
  filterCompanies: jest.fn(() => []),
  getCompanyIndustries: jest.fn(() => ['Technology', 'Design', 'Finance']),
}));

const renderWithAuth = (ui: React.ReactElement) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

describe('Companies Page', () => {
  let CompaniesPage: React.ComponentType;

  beforeAll(async () => {
    const module = await import('@/app/companies/page');
    CompaniesPage = module.default;
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    renderWithAuth(<CompaniesPage />);
    expect(document.body).toBeDefined();
  });

  it('should have main content', () => {
    const { container } = renderWithAuth(<CompaniesPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render heading elements', () => {
    renderWithAuth(<CompaniesPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should have search functionality', () => {
    renderWithAuth(<CompaniesPage />);
    const searchInputs = screen.getAllByRole('textbox');
    expect(searchInputs.length).toBeGreaterThan(0);
  });

  it('should contain companies text', () => {
    renderWithAuth(<CompaniesPage />);
    const companyElements = screen.getAllByText(/compan/i);
    expect(companyElements.length).toBeGreaterThan(0);
  });
});
