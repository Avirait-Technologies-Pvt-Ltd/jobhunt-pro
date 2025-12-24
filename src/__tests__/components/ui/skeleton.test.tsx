import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '@/components/ui/skeleton';

describe('Skeleton', () => {
  it('should render skeleton element', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('should apply base styles', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('bg-accent');
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('rounded-md');
  });

  it('should have data-slot attribute', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('data-slot', 'skeleton');
  });

  it('should render as a div element', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton.tagName).toBe('DIV');
  });

  it('should apply custom className', () => {
    render(<Skeleton data-testid="skeleton" className="h-10 w-full" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('h-10');
    expect(skeleton).toHaveClass('w-full');
  });

  it('should apply width and height classes', () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-[200px]" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('h-4');
    expect(skeleton).toHaveClass('w-[200px]');
  });

  it('should render with rounded-full for circular skeleton', () => {
    render(<Skeleton data-testid="skeleton" className="rounded-full h-12 w-12" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('rounded-full');
    expect(skeleton).toHaveClass('h-12');
    expect(skeleton).toHaveClass('w-12');
  });

  it('should forward additional props', () => {
    render(<Skeleton data-testid="skeleton" aria-label="Loading content" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading content');
  });

  it('should render multiple skeletons', () => {
    render(
      <div>
        <Skeleton data-testid="skeleton-1" className="h-4 w-full" />
        <Skeleton data-testid="skeleton-2" className="h-4 w-3/4" />
        <Skeleton data-testid="skeleton-3" className="h-4 w-1/2" />
      </div>
    );

    expect(screen.getByTestId('skeleton-1')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-2')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-3')).toBeInTheDocument();
  });

  it('should render card skeleton pattern', () => {
    render(
      <div data-testid="card-skeleton" className="space-y-3">
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </div>
    );

    expect(screen.getByTestId('card-skeleton')).toBeInTheDocument();
  });

  it('should render avatar skeleton pattern', () => {
    render(
      <div className="flex items-center space-x-4">
        <Skeleton data-testid="avatar-skeleton" className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton data-testid="name-skeleton" className="h-4 w-[250px]" />
          <Skeleton data-testid="text-skeleton" className="h-4 w-[200px]" />
        </div>
      </div>
    );

    expect(screen.getByTestId('avatar-skeleton')).toHaveClass('rounded-full');
    expect(screen.getByTestId('name-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('text-skeleton')).toBeInTheDocument();
  });

  it('should forward style prop', () => {
    render(<Skeleton data-testid="skeleton" style={{ width: '100px', height: '50px' }} />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({ width: '100px', height: '50px' });
  });

  it('should render with children if provided', () => {
    render(
      <Skeleton data-testid="skeleton">
        <span>Content</span>
      </Skeleton>
    );
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveTextContent('Content');
  });
});
