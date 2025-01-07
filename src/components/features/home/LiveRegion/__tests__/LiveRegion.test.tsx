import { render, screen, act } from "@testing-library/react";
import { LiveRegion } from "../LiveRegion";

describe("LiveRegion", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders message with default props", () => {
    render(<LiveRegion message="Test message" />);

    const region = screen.getByTestId("live-region");
    expect(region).toHaveAttribute("role", "status");
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region).toHaveTextContent("Test message");
  });

  it("renders with custom role and politeness", () => {
    render(
      <LiveRegion message="Alert message" role="alert" politeness="assertive" />
    );

    const region = screen.getByTestId("live-region");
    expect(region).toHaveAttribute("role", "alert");
    expect(region).toHaveAttribute("aria-live", "assertive");
  });

  it("removes message after timeout", () => {
    render(<LiveRegion message="Temporary message" timeout={1000} />);

    expect(screen.getByTestId("live-region")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByTestId("live-region")).not.toBeInTheDocument();
  });

  it("resets timeout when message changes", () => {
    const { rerender } = render(
      <LiveRegion message="First message" timeout={1000} />
    );

    // Advance halfway through the timeout
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Update the message
    rerender(<LiveRegion message="Second message" timeout={1000} />);

    // Message should still be visible
    expect(screen.getByTestId("live-region")).toBeInTheDocument();
    expect(screen.getByTestId("live-region")).toHaveTextContent(
      "Second message"
    );

    // Advance through the new timeout
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByTestId("live-region")).not.toBeInTheDocument();
  });

  it("cleans up timeout on unmount", () => {
    const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");
    const { unmount } = render(<LiveRegion message="Test message" />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
