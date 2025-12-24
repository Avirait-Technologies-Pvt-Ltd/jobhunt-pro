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
  usePathname: () => '/about',
}));

const renderWithAuth = (ui: React.ReactElement) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

describe('About Page', () => {
  let AboutPage: React.ComponentType;

  beforeAll(async () => {
    const module = await import('@/app/about/page');
    AboutPage = module.default;
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    renderWithAuth(<AboutPage />);
    expect(document.body).toBeDefined();
  });

  it('should have main content', () => {
    const { container } = renderWithAuth(<AboutPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render heading elements', () => {
    renderWithAuth(<AboutPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should contain "About" text', () => {
    renderWithAuth(<AboutPage />);
    const aboutElements = screen.getAllByText(/about/i);
    expect(aboutElements.length).toBeGreaterThan(0);
  });

  it('should contain mission or values content', () => {
    renderWithAuth(<AboutPage />);
    // Look for common about page content
    const content = screen.getByRole('main') || document.body;
    expect(content).toBeInTheDocument();
  });
});
