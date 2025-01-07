import { render, screen, fireEvent } from "@testing-library/react";
import { HomeErrorBoundary } from "../HomeErrorBoundary";

// Mock component that throws an error
const ErrorComponent = () => {
  throw new Error("Test error message");
};

// Mock component that works normally
const WorkingComponent = () => <div>Working content</div>;

describe("HomeErrorBoundary", () => {
  beforeEach(() => {
    // Suppress console.error for cleaner test output
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders children when there is no error", () => {
    render(
      <HomeErrorBoundary>
        <WorkingComponent />
      </HomeErrorBoundary>
    );

    expect(screen.getByText("Working content")).toBeInTheDocument();
  });

  it("renders error UI when an error occurs", () => {
    render(
      <HomeErrorBoundary>
        <ErrorComponent />
      </HomeErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });

  it("renders fallback error message when error has no message", () => {
    const error = new Error();
    render(
      <HomeErrorBoundary>
        {(() => {
          throw error;
        })()}
      </HomeErrorBoundary>
    );

    expect(
      screen.getByText(/an unexpected error occurred/i)
    ).toBeInTheDocument();
  });

  it("logs error to console in development", () => {
    const consoleSpy = jest.spyOn(console, "error");
    render(
      <HomeErrorBoundary>
        <ErrorComponent />
      </HomeErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it("reloads page when try again button is clicked", () => {
    const reloadMock = jest.fn();
    Object.defineProperty(window, "location", {
      value: { reload: reloadMock },
      writable: true,
    });

    render(
      <HomeErrorBoundary>
        <ErrorComponent />
      </HomeErrorBoundary>
    );

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reloadMock).toHaveBeenCalled();
  });
});
