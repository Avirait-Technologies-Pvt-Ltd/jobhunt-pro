import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge Component', () => {
  it('should render badge with text', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toBeInTheDocument();
  });

  it('should render with default variant', () => {
    render(<Badge data-testid="badge">Default</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-primary');
    expect(badge).toHaveClass('text-primary-foreground');
  });

  it('should render with secondary variant', () => {
    render(<Badge variant="secondary" data-testid="badge">Secondary</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-secondary');
    expect(badge).toHaveClass('text-secondary-foreground');
  });

  it('should render with destructive variant', () => {
    render(<Badge variant="destructive" data-testid="badge">Destructive</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-destructive');
  });

  it('should render with outline variant', () => {
    render(<Badge variant="outline" data-testid="badge">Outline</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('text-foreground');
  });

  it('should apply base styles', () => {
    render(<Badge data-testid="badge">Badge</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('inline-flex');
    expect(badge).toHaveClass('items-center');
  });

  it('should apply custom className', () => {
    render(<Badge className="custom-class" data-testid="badge">Custom</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('should apply text size', () => {
    render(<Badge data-testid="badge">Text</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('text-xs');
  });

  it('should render with children elements', () => {
    render(
      <Badge data-testid="badge">
        <span>Icon</span>
        <span>Text</span>
      </Badge>
    );
    const badge = screen.getByTestId('badge');
    expect(badge).toContainElement(screen.getByText('Icon'));
    expect(badge).toContainElement(screen.getByText('Text'));
  });

  it('should handle empty children', () => {
    render(<Badge data-testid="badge" />);
    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toBeEmptyDOMElement();
  });

  it('should forward additional props', () => {
    render(<Badge data-testid="badge" title="Badge tooltip">Hoverable</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('title', 'Badge tooltip');
  });

  it('should apply focus-visible styles', () => {
    render(<Badge data-testid="badge">Focus</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('focus-visible:border-ring');
  });
});
