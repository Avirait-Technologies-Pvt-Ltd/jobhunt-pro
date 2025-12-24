import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

// Test component that uses the hook
function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onOutsideClick);

  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside Element
      </div>
      <div data-testid="outside">Outside Element</div>
    </div>
  );
}

describe('useOutsideClick', () => {
  it('should call handler when clicking outside the element', () => {
    const handleOutsideClick = jest.fn();
    const { getByTestId } = render(
      <TestComponent onOutsideClick={handleOutsideClick} />
    );

    fireEvent.mouseDown(getByTestId('outside'));

    expect(handleOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('should not call handler when clicking inside the element', () => {
    const handleOutsideClick = jest.fn();
    const { getByTestId } = render(
      <TestComponent onOutsideClick={handleOutsideClick} />
    );

    fireEvent.mouseDown(getByTestId('inside'));

    expect(handleOutsideClick).not.toHaveBeenCalled();
  });

  it('should call handler on touchstart outside the element', () => {
    const handleOutsideClick = jest.fn();
    const { getByTestId } = render(
      <TestComponent onOutsideClick={handleOutsideClick} />
    );

    fireEvent.touchStart(getByTestId('outside'));

    expect(handleOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('should not call handler on touchstart inside the element', () => {
    const handleOutsideClick = jest.fn();
    const { getByTestId } = render(
      <TestComponent onOutsideClick={handleOutsideClick} />
    );

    fireEvent.touchStart(getByTestId('inside'));

    expect(handleOutsideClick).not.toHaveBeenCalled();
  });

  it('should call handler when clicking on document body', () => {
    const handleOutsideClick = jest.fn();
    render(<TestComponent onOutsideClick={handleOutsideClick} />);

    fireEvent.mouseDown(document.body);

    expect(handleOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('should not call handler when clicking on child elements', () => {
    const handleOutsideClick = jest.fn();

    function TestWithChild({ onOutsideClick }: { onOutsideClick: () => void }) {
      const ref = useRef<HTMLDivElement>(null);
      useOutsideClick(ref, onOutsideClick);

      return (
        <div>
          <div ref={ref} data-testid="parent">
            <span data-testid="child">Child Element</span>
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      );
    }

    const { getByTestId } = render(
      <TestWithChild onOutsideClick={handleOutsideClick} />
    );

    fireEvent.mouseDown(getByTestId('child'));

    expect(handleOutsideClick).not.toHaveBeenCalled();
  });

  it('should cleanup event listeners on unmount', () => {
    const handleOutsideClick = jest.fn();
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = render(
      <TestComponent onOutsideClick={handleOutsideClick} />
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should handle multiple outside clicks', () => {
    const handleOutsideClick = jest.fn();
    const { getByTestId } = render(
      <TestComponent onOutsideClick={handleOutsideClick} />
    );

    fireEvent.mouseDown(getByTestId('outside'));
    fireEvent.mouseDown(getByTestId('outside'));
    fireEvent.mouseDown(getByTestId('outside'));

    expect(handleOutsideClick).toHaveBeenCalledTimes(3);
  });

  it('should work with null ref', () => {
    function NullRefComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
      const ref = useRef<HTMLDivElement>(null);
      useOutsideClick(ref, onOutsideClick);
      // Don't attach ref to any element
      return <div data-testid="element">Element</div>;
    }

    const handleOutsideClick = jest.fn();
    const { getByTestId } = render(
      <NullRefComponent onOutsideClick={handleOutsideClick} />
    );

    // Should not crash when clicking
    fireEvent.mouseDown(getByTestId('element'));
  });

  it('should pass event to handler', () => {
    const handleOutsideClick = jest.fn();
    const { getByTestId } = render(
      <TestComponent onOutsideClick={handleOutsideClick} />
    );

    fireEvent.mouseDown(getByTestId('outside'));

    expect(handleOutsideClick).toHaveBeenCalledWith(expect.any(Object));
  });
});
