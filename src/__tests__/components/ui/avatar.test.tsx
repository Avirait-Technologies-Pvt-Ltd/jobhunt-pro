import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

describe('Avatar Components', () => {
  describe('Avatar', () => {
    it('should render avatar container', () => {
      render(<Avatar data-testid="avatar">Content</Avatar>);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('should apply base styles', () => {
      render(<Avatar data-testid="avatar">Content</Avatar>);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('relative');
      expect(avatar).toHaveClass('flex');
      expect(avatar).toHaveClass('overflow-hidden');
      expect(avatar).toHaveClass('rounded-full');
    });

    it('should apply size-8 class', () => {
      render(<Avatar data-testid="avatar">Content</Avatar>);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('size-8');
    });

    it('should apply custom className', () => {
      render(<Avatar data-testid="avatar" className="custom-class">Content</Avatar>);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('custom-class');
    });

    it('should have data-slot attribute', () => {
      render(<Avatar data-testid="avatar">Content</Avatar>);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveAttribute('data-slot', 'avatar');
    });
  });

  describe('AvatarImage', () => {
    // Note: Radix Avatar only renders the image after it successfully loads
    // In tests, images don't actually load, so we test the composition instead
    it('should render avatar with image component', () => {
      const { container } = render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="Test" />
          <AvatarFallback>TE</AvatarFallback>
        </Avatar>
      );
      // Avatar should be rendered
      expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument();
    });

    it('should show fallback when image not loaded', () => {
      render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="Test" />
          <AvatarFallback data-testid="fallback">TE</AvatarFallback>
        </Avatar>
      );
      // Fallback should be visible since image won't load in tests
      expect(screen.getByTestId('fallback')).toBeInTheDocument();
    });

    it('should accept src and alt props', () => {
      const { container } = render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="Test User" />
        </Avatar>
      );
      // Just verify it renders without error
      expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument();
    });
  });

  describe('AvatarFallback', () => {
    it('should render fallback content', () => {
      render(
        <Avatar>
          <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
        </Avatar>
      );
      const fallback = screen.getByTestId('avatar-fallback');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent('JD');
    });

    it('should apply fallback styles', () => {
      render(
        <Avatar>
          <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
        </Avatar>
      );
      const fallback = screen.getByTestId('avatar-fallback');
      expect(fallback).toHaveClass('bg-muted');
      expect(fallback).toHaveClass('flex');
      expect(fallback).toHaveClass('items-center');
      expect(fallback).toHaveClass('justify-center');
      expect(fallback).toHaveClass('rounded-full');
    });

    it('should have data-slot attribute', () => {
      render(
        <Avatar>
          <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
        </Avatar>
      );
      const fallback = screen.getByTestId('avatar-fallback');
      expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback');
    });

    it('should apply custom className', () => {
      render(
        <Avatar>
          <AvatarFallback data-testid="avatar-fallback" className="bg-blue-500">
            JD
          </AvatarFallback>
        </Avatar>
      );
      const fallback = screen.getByTestId('avatar-fallback');
      expect(fallback).toHaveClass('bg-blue-500');
    });
  });

  describe('Full Avatar Composition', () => {
    it('should render complete avatar with image and fallback', () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarImage src="/user.jpg" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });

    it('should render avatar with only fallback', () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );

      expect(screen.getByTestId('avatar')).toBeInTheDocument();
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('should allow custom size via className', () => {
      render(
        <Avatar data-testid="avatar" className="size-16">
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
      );

      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('size-16');
    });
  });
});
