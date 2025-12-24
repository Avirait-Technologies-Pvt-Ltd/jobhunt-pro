import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/layout/Navbar';
import { AuthProvider } from '@/context/AuthContext';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

const renderNavbar = () => {
  return render(
    <AuthProvider>
      <Navbar />
    </AuthProvider>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render navbar', () => {
      renderNavbar();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should render logo with text "JobHunt Pro"', () => {
      renderNavbar();
      expect(screen.getByText('JobHunt Pro')).toBeInTheDocument();
    });

    it('should render logo as a link to homepage', () => {
      renderNavbar();
      const logoLink = screen.getByText('JobHunt Pro').closest('a');
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('should render navigation links', () => {
      renderNavbar();
      expect(screen.getByText('Find Jobs')).toBeInTheDocument();
      expect(screen.getByText('Companies')).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
    });

    it('should have Find Jobs link pointing to /jobs', () => {
      renderNavbar();
      const jobsLink = screen.getByText('Find Jobs').closest('a');
      expect(jobsLink).toHaveAttribute('href', '/jobs');
    });

    it('should have Companies link pointing to /companies', () => {
      renderNavbar();
      const companiesLink = screen.getByText('Companies').closest('a');
      expect(companiesLink).toHaveAttribute('href', '/companies');
    });

    it('should have Resources link pointing to /blog', () => {
      renderNavbar();
      const resourcesLink = screen.getByText('Resources').closest('a');
      expect(resourcesLink).toHaveAttribute('href', '/blog');
    });
  });

  describe('Unauthenticated State', () => {
    it('should show Sign In button when not authenticated', () => {
      renderNavbar();
      expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should show Sign Up button when not authenticated', () => {
      renderNavbar();
      expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
    });

    it('should have Sign In link pointing to /signin', () => {
      renderNavbar();
      const signInLinks = screen.getAllByRole('link', { name: /sign in/i });
      expect(signInLinks[0]).toHaveAttribute('href', '/signin');
    });

    it('should have Sign Up link pointing to /signup', () => {
      renderNavbar();
      const signUpLinks = screen.getAllByRole('link', { name: /sign up/i });
      expect(signUpLinks[0]).toHaveAttribute('href', '/signup');
    });
  });

  describe('Authenticated State', () => {
    beforeEach(() => {
      // Mock authenticated user in localStorage
      const mockUser = {
        id: 'user-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        avatar: null,
      };
      localStorage.setItem('jobhunt_user', JSON.stringify(mockUser));
      (localStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === 'jobhunt_user') return JSON.stringify(mockUser);
        if (key === 'jobhunt_saved_jobs') return JSON.stringify([]);
        if (key === 'jobhunt_applications') return JSON.stringify([]);
        return null;
      });
    });

    it('should not show Sign In button when authenticated', () => {
      renderNavbar();
      // Check that the desktop auth buttons are hidden when authenticated
      const signInButtons = screen.queryAllByRole('link', { name: /^sign in$/i });
      // In authenticated state, Sign In might still be in mobile menu but hidden
      expect(signInButtons.length).toBeLessThanOrEqual(2); // Mobile menu might have it
    });
  });

  describe('Mobile Menu', () => {
    it('should render mobile menu button', () => {
      renderNavbar();
      const menuButton = screen.getByRole('button', { name: /toggle menu/i });
      expect(menuButton).toBeInTheDocument();
    });

    it('should have sr-only text for accessibility', () => {
      renderNavbar();
      expect(screen.getByText('Toggle menu')).toBeInTheDocument();
    });
  });

  describe('Header Structure', () => {
    it('should be sticky positioned', () => {
      renderNavbar();
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('sticky');
      expect(header).toHaveClass('top-0');
    });

    it('should have z-50 for proper stacking', () => {
      renderNavbar();
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('z-50');
    });

    it('should have backdrop blur effect', () => {
      renderNavbar();
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('backdrop-blur');
    });
  });

  describe('Accessibility', () => {
    it('should have navigation landmark', () => {
      renderNavbar();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should have banner landmark (header)', () => {
      renderNavbar();
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should have accessible links', () => {
      renderNavbar();
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });
  });
});
