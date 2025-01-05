import { render, screen, act } from "@testing-library/react";
import { LiveRegion } from "../LiveRegion";

describe("LiveRegion", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders message in live region", () => {
    render(<LiveRegion message="Test message" />);

    const liveRegion = screen.getByRole("status");
    expect(liveRegion).toHaveTextContent("Test message");
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
  });

  it("hides message after timeout", () => {
    render(<LiveRegion message="Test message" timeout={1000} />);

    expect(screen.getByRole("status")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("uses default timeout of 5000ms when not specified", () => {
    render(<LiveRegion message="Test message" />);

    expect(screen.getByRole("status")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(4999);
    });
    expect(screen.getByRole("status")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("cleans up timer on unmount", () => {
    const { unmount } = render(<LiveRegion message="Test message" />);

    unmount();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // No errors should be thrown
  });

  it("resets timer when message changes", () => {
    const { rerender } = render(<LiveRegion message="First message" />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    rerender(<LiveRegion message="Second message" />);
    expect(screen.getByRole("status")).toHaveTextContent("Second message");

    act(() => {
      jest.advanceTimersByTime(4999);
    });
    expect(screen.getByRole("status")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("has sr-only class for visual hiding", () => {
    render(<LiveRegion message="Test message" />);
    expect(screen.getByRole("status")).toHaveClass("sr-only");
  });
});
