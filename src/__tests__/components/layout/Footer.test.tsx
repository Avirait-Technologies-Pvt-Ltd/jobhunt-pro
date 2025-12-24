import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

describe('Footer', () => {
  describe('Basic Rendering', () => {
    it('should render footer', () => {
      render(<Footer />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should render logo with text "JobHunt Pro"', () => {
      render(<Footer />);
      expect(screen.getByText('JobHunt Pro')).toBeInTheDocument();
    });

    it('should render logo as a link to homepage', () => {
      render(<Footer />);
      const logoLink = screen.getByText('JobHunt Pro').closest('a');
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('should render company description', () => {
      render(<Footer />);
      expect(screen.getByText(/trusted partner in finding/i)).toBeInTheDocument();
    });
  });

  describe('Newsletter Section', () => {
    it('should render newsletter heading', () => {
      render(<Footer />);
      expect(screen.getByText(/get the latest jobs delivered/i)).toBeInTheDocument();
    });

    it('should render newsletter description', () => {
      render(<Footer />);
      expect(screen.getByText(/subscribe to our newsletter/i)).toBeInTheDocument();
    });

    it('should render email input', () => {
      render(<Footer />);
      expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    });

    it('should render subscribe button', () => {
      render(<Footer />);
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    });

    it('should have email input with type="email"', () => {
      render(<Footer />);
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should handle form submission', () => {
      render(<Footer />);
      const form = screen.getByPlaceholderText(/enter your email/i).closest('form');
      expect(form).toBeInTheDocument();

      // Submit form
      fireEvent.submit(form!);
      // Should not throw error
    });
  });

  describe('Footer Links - For Job Seekers', () => {
    it('should render "For Job Seekers" heading', () => {
      render(<Footer />);
      expect(screen.getByText('For Job Seekers')).toBeInTheDocument();
    });

    it('should render Browse Jobs link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Browse Jobs' })).toBeInTheDocument();
    });

    it('should render Browse Companies link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Browse Companies' })).toBeInTheDocument();
    });

    it('should render My Dashboard link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'My Dashboard' })).toBeInTheDocument();
    });

    it('should render Resume Builder link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Resume Builder' })).toBeInTheDocument();
    });

    it('should render Career Resources link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Career Resources' })).toBeInTheDocument();
    });

    it('should have correct href for Browse Jobs', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: 'Browse Jobs' });
      expect(link).toHaveAttribute('href', '/jobs');
    });
  });

  describe('Footer Links - For Employers', () => {
    it('should render "For Employers" heading', () => {
      render(<Footer />);
      expect(screen.getByText('For Employers')).toBeInTheDocument();
    });

    it('should render Post a Job link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Post a Job' })).toBeInTheDocument();
    });

    it('should render Browse Candidates link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Browse Candidates' })).toBeInTheDocument();
    });

    it('should render Pricing Plans link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Pricing Plans' })).toBeInTheDocument();
    });
  });

  describe('Footer Links - Company', () => {
    it('should render "Company" heading', () => {
      render(<Footer />);
      expect(screen.getByText('Company')).toBeInTheDocument();
    });

    it('should render About Us link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'About Us' })).toBeInTheDocument();
    });

    it('should render Contact Us link', () => {
      render(<Footer />);
      const contactLinks = screen.getAllByRole('link', { name: 'Contact Us' });
      expect(contactLinks.length).toBeGreaterThan(0);
    });

    it('should render Blog link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument();
    });

    it('should have correct href for About Us', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: 'About Us' });
      expect(link).toHaveAttribute('href', '/about');
    });
  });

  describe('Footer Links - Support', () => {
    it('should render "Support" heading', () => {
      render(<Footer />);
      expect(screen.getByText('Support')).toBeInTheDocument();
    });

    it('should render FAQ link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'FAQ' })).toBeInTheDocument();
    });

    it('should render Privacy Policy link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
    });

    it('should render Terms of Service link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Terms of Service' })).toBeInTheDocument();
    });

    it('should have correct href for FAQ', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: 'FAQ' });
      expect(link).toHaveAttribute('href', '/faq');
    });

    it('should have correct href for Privacy Policy', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: 'Privacy Policy' });
      expect(link).toHaveAttribute('href', '/privacy');
    });

    it('should have correct href for Terms of Service', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: 'Terms of Service' });
      expect(link).toHaveAttribute('href', '/terms');
    });
  });

  describe('Contact Information', () => {
    it('should render email address', () => {
      render(<Footer />);
      expect(screen.getByText('support@jobhuntpro.com')).toBeInTheDocument();
    });

    it('should render phone number', () => {
      render(<Footer />);
      expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
    });

    it('should render address', () => {
      render(<Footer />);
      expect(screen.getByText('San Francisco, CA 94105')).toBeInTheDocument();
    });
  });

  describe('Social Links', () => {
    it('should render social media links', () => {
      const { container } = render(<Footer />);
      // Social links are in the bottom bar
      const socialContainer = container.querySelector('.flex.items-center.gap-4');
      expect(socialContainer).toBeInTheDocument();
    });

    it('should have many links in footer', () => {
      render(<Footer />);
      // Footer has many navigation links
      const allLinks = screen.getAllByRole('link');
      expect(allLinks.length).toBeGreaterThan(10);
    });

    it('should have social link icons', () => {
      const { container } = render(<Footer />);
      // Check for SVG icons in social links section
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe('Copyright', () => {
    it('should render copyright text', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear} JobHunt Pro`))).toBeInTheDocument();
    });

    it('should render "All rights reserved"', () => {
      render(<Footer />);
      expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have dark background', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-slate-900');
    });

    it('should have light text color', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('text-slate-300');
    });
  });
});
