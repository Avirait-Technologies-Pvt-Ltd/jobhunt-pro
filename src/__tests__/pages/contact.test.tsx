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
  usePathname: () => '/contact',
}));

const renderWithAuth = (ui: React.ReactElement) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

describe('Contact Page', () => {
  let ContactPage: React.ComponentType;

  beforeAll(async () => {
    const module = await import('@/app/contact/page');
    ContactPage = module.default;
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    renderWithAuth(<ContactPage />);
    expect(document.body).toBeDefined();
  });

  it('should have main content', () => {
    const { container } = renderWithAuth(<ContactPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render heading elements', () => {
    renderWithAuth(<ContactPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should contain contact form or contact information', () => {
    renderWithAuth(<ContactPage />);
    // Look for form elements or contact text
    const textboxes = screen.queryAllByRole('textbox');
    const contactText = screen.queryByText(/contact/i);
    expect(textboxes.length > 0 || contactText).toBeTruthy();
  });

  it('should have form inputs', () => {
    renderWithAuth(<ContactPage />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('should have submit button', () => {
    renderWithAuth(<ContactPage />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
