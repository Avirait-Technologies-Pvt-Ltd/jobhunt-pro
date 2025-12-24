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
  usePathname: () => '/faq',
}));

const renderWithAuth = (ui: React.ReactElement) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

describe('FAQ Page', () => {
  let FAQPage: React.ComponentType;

  beforeAll(async () => {
    const module = await import('@/app/faq/page');
    FAQPage = module.default;
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    renderWithAuth(<FAQPage />);
    expect(document.body).toBeDefined();
  });

  it('should have main content', () => {
    const { container } = renderWithAuth(<FAQPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render heading elements', () => {
    renderWithAuth(<FAQPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should contain FAQ text', () => {
    renderWithAuth(<FAQPage />);
    // Use getAllByText since there might be multiple matches
    const faqElements = screen.getAllByText(/FAQ|frequently asked|questions/i);
    expect(faqElements.length).toBeGreaterThan(0);
  });

  it('should have accordion or expandable sections', () => {
    renderWithAuth(<FAQPage />);
    // FAQs are typically in buttons or expandable elements
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should display FAQ questions', () => {
    renderWithAuth(<FAQPage />);
    // Look for question marks indicating questions
    const content = document.body.textContent;
    expect(content).toMatch(/\?/);
  });
});
