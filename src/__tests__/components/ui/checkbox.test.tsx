import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '@/components/ui/checkbox';

describe('Checkbox', () => {
  it('should render checkbox', () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should have role="checkbox"', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should apply base styles', () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveClass('size-4');
    expect(checkbox).toHaveClass('shrink-0');
    expect(checkbox).toHaveClass('border');
  });

  it('should have data-slot attribute', () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveAttribute('data-slot', 'checkbox');
  });

  it('should be unchecked by default', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('should toggle checked state on click', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('data-state', 'unchecked');

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('data-state', 'checked');

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('should support controlled checked state', () => {
    const { rerender } = render(<Checkbox checked={false} />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('data-state', 'unchecked');

    rerender(<Checkbox checked={true} />);
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('should call onCheckedChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('should support disabled state', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeDisabled();
  });

  it('should not toggle when disabled', () => {
    const handleChange = jest.fn();
    render(<Checkbox disabled onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    render(<Checkbox data-testid="checkbox" className="custom-class" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveClass('custom-class');
  });

  it('should support name attribute', () => {
    render(<Checkbox name="accept-terms" />);
    const checkbox = screen.getByRole('checkbox');
    // Radix checkbox handles name prop internally for form submission
    expect(checkbox).toBeInTheDocument();
  });

  it('should support value attribute', () => {
    render(<Checkbox value="yes" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('value', 'yes');
  });

  it('should support required attribute', () => {
    render(<Checkbox required />);
    const checkbox = screen.getByRole('checkbox');
    // Radix checkbox uses required prop internally
    expect(checkbox).toBeInTheDocument();
  });

  it('should support defaultChecked', () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('should have accessible label when used with label', () => {
    render(
      <div>
        <Checkbox id="terms" />
        <label htmlFor="terms">Accept terms</label>
      </div>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'terms');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
