import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '@/context/AuthContext';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/signin',
}));

const renderWithAuth = (ui: React.ReactElement) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

describe('Sign In Page', () => {
  let SignInPage: React.ComponentType;

  beforeAll(async () => {
    const module = await import('@/app/signin/page');
    SignInPage = module.default;
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    renderWithAuth(<SignInPage />);
    expect(document.body).toBeDefined();
  });

  it('should have main content', () => {
    const { container } = renderWithAuth(<SignInPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render sign in heading', () => {
    renderWithAuth(<SignInPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should have email input field', () => {
    renderWithAuth(<SignInPage />);
    const emailInputs = screen.getAllByRole('textbox');
    expect(emailInputs.length).toBeGreaterThan(0);
  });

  it('should have password input field', () => {
    renderWithAuth(<SignInPage />);
    const passwordInput = document.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
  });

  it('should have sign in button', () => {
    renderWithAuth(<SignInPage />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should have link to sign up page', () => {
    renderWithAuth(<SignInPage />);
    const signUpLinks = screen.getAllByRole('link', { name: /sign up/i });
    expect(signUpLinks.length).toBeGreaterThan(0);
  });

  it('should have forgot password link', () => {
    renderWithAuth(<SignInPage />);
    const forgotLinks = screen.getAllByRole('link', { name: /forgot/i });
    expect(forgotLinks.length).toBeGreaterThan(0);
  });

  it('should allow typing in email field', () => {
    renderWithAuth(<SignInPage />);
    const emailInput = screen.getAllByRole('textbox')[0];
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should allow typing in password field', () => {
    renderWithAuth(<SignInPage />);
    const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });
});
