import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/context/AuthContext';

// Test component to display auth state
function AuthStateDisplay() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
      {user && (
        <>
          <div data-testid="user-name">{user.firstName} {user.lastName}</div>
          <div data-testid="user-email">{user.email}</div>
        </>
      )}
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    (localStorage.setItem as jest.Mock).mockImplementation(() => {});
    (localStorage.removeItem as jest.Mock).mockImplementation(() => {});
  });

  it('should provide auth context to children', () => {
    render(
      <AuthProvider>
        <AuthStateDisplay />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toBeInTheDocument();
  });

  it('should start with unauthenticated state when no stored user', () => {
    render(
      <AuthProvider>
        <AuthStateDisplay />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
  });

  it('should restore user from localStorage', () => {
    const storedUser = {
      id: 'stored-user',
      firstName: 'Stored',
      lastName: 'User',
      email: 'stored@example.com',
    };

    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(storedUser));

    render(
      <AuthProvider>
        <AuthStateDisplay />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Stored User');
    expect(screen.getByTestId('user-email')).toHaveTextContent('stored@example.com');
  });

  it('should render children correctly', () => {
    render(
      <AuthProvider>
        <div data-testid="child">Child Component</div>
      </AuthProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Child Component');
  });
});

describe('useAuth hook', () => {
  it('should throw error when used outside AuthProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<AuthStateDisplay />);
    }).toThrow();

    consoleSpy.mockRestore();
  });
});
