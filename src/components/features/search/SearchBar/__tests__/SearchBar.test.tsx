import { render, screen, fireEvent, act } from "@testing-library/react";
import { SearchBar } from "../SearchBar";
import { useRouter, useSearchParams } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("SearchBar", () => {
  const mockPush = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("renders with default placeholder", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Search AI/ML content...")
    ).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(<SearchBar placeholder="Custom placeholder" />);
    expect(
      screen.getByPlaceholderText("Custom placeholder")
    ).toBeInTheDocument();
  });

  it("shows suggestions after typing", async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search AI/ML content...");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.focus(input);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByText("test in papers")).toBeInTheDocument();
    expect(screen.getByText("test in repositories")).toBeInTheDocument();
    expect(screen.getByText("test in articles")).toBeInTheDocument();
  });

  it("hides suggestions when clicking outside", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search AI/ML content...");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.focus(input);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent.mouseDown(document.body);

    expect(screen.queryByText("test in papers")).not.toBeInTheDocument();
  });

  it("navigates to search page on form submission", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search AI/ML content...");

    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.submit(input.closest("form")!);

    expect(mockPush).toHaveBeenCalledWith("/search?q=test%20query");
  });

  it("calls onSearch callback when provided", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search AI/ML content...");

    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.submit(input.closest("form")!);

    expect(mockOnSearch).toHaveBeenCalledWith("test query");
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("applies variant styles correctly", () => {
    render(<SearchBar variant="header" />);
    const input = screen.getByPlaceholderText("Search AI/ML content...");
    expect(input).toHaveClass("h-9");

    render(<SearchBar variant="page" />);
    const pageInput = screen.getByPlaceholderText("Search AI/ML content...");
    expect(pageInput).toHaveClass("h-12");
  });

  it("applies custom className", () => {
    render(<SearchBar className="custom-class" />);
    const container = screen
      .getByPlaceholderText("Search AI/ML content...")
      .closest("div");
    expect(container).toHaveClass("custom-class");
  });
});
