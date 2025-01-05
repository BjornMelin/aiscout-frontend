import { render, screen, fireEvent } from "@testing-library/react";
import { HomeErrorBoundary } from "../HomeErrorBoundary";

// Mock console.error to avoid test noise
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

// Mock component that throws error
function ErrorComponent(): JSX.Element {
  throw new Error("Test error");
  return <div>This will never render</div>;
}

describe("HomeErrorBoundary", () => {
  const mockReload = jest.fn();
  const originalLocation = window.location;

  beforeAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...originalLocation, reload: mockReload },
    });
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders children when no error occurs", () => {
    render(
      <HomeErrorBoundary>
        <div>Test Content</div>
      </HomeErrorBoundary>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders error UI when error occurs", () => {
    const spy = jest.spyOn(console, "error");
    render(
      <HomeErrorBoundary>
        <ErrorComponent />
      </HomeErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
    expect(screen.getByText("Try again")).toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
  });

  it("reloads page when try again button is clicked", () => {
    render(
      <HomeErrorBoundary>
        <ErrorComponent />
      </HomeErrorBoundary>
    );

    fireEvent.click(screen.getByText("Try again"));
    expect(mockReload).toHaveBeenCalled();
  });

  it("logs error information to console", () => {
    const spy = jest.spyOn(console, "error");
    render(
      <HomeErrorBoundary>
        <ErrorComponent />
      </HomeErrorBoundary>
    );

    expect(spy).toHaveBeenCalledWith(
      "Home page error:",
      new Error("Test error"),
      expect.any(Object)
    );
  });
});
