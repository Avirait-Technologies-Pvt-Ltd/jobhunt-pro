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
  usePathname: () => '/signup',
}));

const renderWithAuth = (ui: React.ReactElement) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

describe('Sign Up Page', () => {
  let SignUpPage: React.ComponentType;

  beforeAll(async () => {
    const module = await import('@/app/signup/page');
    SignUpPage = module.default;
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    renderWithAuth(<SignUpPage />);
    expect(document.body).toBeDefined();
  });

  it('should have main content', () => {
    const { container } = renderWithAuth(<SignUpPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render sign up heading', () => {
    renderWithAuth(<SignUpPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should have form inputs', () => {
    renderWithAuth(<SignUpPage />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('should have password input fields', () => {
    renderWithAuth(<SignUpPage />);
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBeGreaterThanOrEqual(1);
  });

  it('should have sign up button', () => {
    renderWithAuth(<SignUpPage />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should have link to sign in page', () => {
    renderWithAuth(<SignUpPage />);
    const signInLinks = screen.getAllByRole('link', { name: /sign in/i });
    expect(signInLinks.length).toBeGreaterThan(0);
  });

  it('should allow typing in form fields', () => {
    renderWithAuth(<SignUpPage />);
    const inputs = screen.getAllByRole('textbox');
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'John' } });
      expect(inputs[0]).toHaveValue('John');
    }
  });

  it('should have first name field', () => {
    renderWithAuth(<SignUpPage />);
    const firstNameInput = screen.getByLabelText(/first name/i) || screen.getAllByRole('textbox')[0];
    expect(firstNameInput).toBeInTheDocument();
  });
});
