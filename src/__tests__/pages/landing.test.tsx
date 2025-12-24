import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '@/context/AuthContext';

// Mock all data imports
jest.mock('@/data/jobs', () => ({
  jobs: [],
  getFeaturedJobs: jest.fn(() => []),
}));

jest.mock('@/data/companies', () => ({
  companies: [],
  getFeaturedCompanies: jest.fn(() => []),
}));

jest.mock('@/data/categories', () => ({
  categories: [],
  getTopCategories: jest.fn(() => []),
}));

jest.mock('@/data/testimonials', () => ({
  testimonials: [],
  getFeaturedTestimonials: jest.fn(() => []),
}));

const renderWithAuth = (ui: React.ReactElement) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

describe('Landing Page', () => {
  let LandingPage: React.ComponentType;

  beforeAll(async () => {
    const module = await import('@/app/page');
    LandingPage = module.default;
  });

  it('should render without crashing', () => {
    renderWithAuth(<LandingPage />);
    expect(document.body).toBeDefined();
  });

  it('should have main content', () => {
    const { container } = renderWithAuth(<LandingPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render heading elements', () => {
    renderWithAuth(<LandingPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should have links', () => {
    renderWithAuth(<LandingPage />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should have buttons or call-to-action elements', () => {
    renderWithAuth(<LandingPage />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
