import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TrendingSection } from "../TrendingSection/TrendingSection";
import { useTrendingStore } from "@/lib/store/trending";

// Mock the store
jest.mock("@/lib/store/trending", () => ({
  useTrendingStore: jest.fn(),
}));

const mockTopic = {
  id: "topic-1",
  name: "Test Topic",
  score: 75,
  change: 10,
  count: 1000,
  timeframe: "week" as const,
  sources: {
    papers: 100,
    repos: 200,
    articles: 300,
    discussions: 400,
  },
  relatedTopics: ["Test1", "Test2"],
  description: "Test Description",
  trendData: [
    { timestamp: "2024-01-01T00:00:00Z", value: 50 },
    { timestamp: "2024-01-02T00:00:00Z", value: 75 },
  ],
};

describe("TrendingSection", () => {
  const mockFetch = jest.fn();
  const mockSetTimeframe = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTrendingStore as unknown as jest.Mock).mockImplementation(() => ({
      topics: [mockTopic],
      isLoading: false,
      error: null,
      timeframe: "week",
      setTimeframe: mockSetTimeframe,
      fetch: mockFetch,
    }));
  });

  it("renders trending topics", () => {
    render(<TrendingSection />);
    expect(screen.getByText("Trending in AI/ML")).toBeInTheDocument();
    expect(screen.getByText("Test Topic")).toBeInTheDocument();
  });

  it("handles timeframe changes", () => {
    render(<TrendingSection />);
    fireEvent.click(screen.getByText("24h"));
    expect(mockSetTimeframe).toHaveBeenCalledWith("day");
  });

  it("displays loading state", () => {
    (useTrendingStore as unknown as jest.Mock).mockImplementation(() => ({
      topics: [],
      isLoading: true,
      error: null,
      timeframe: "week",
      setTimeframe: mockSetTimeframe,
      fetch: mockFetch,
    }));

    render(<TrendingSection />);
    expect(screen.queryByText("Trending in AI/ML")).not.toBeInTheDocument();
    // Check for loading skeleton
    expect(document.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("displays error state", () => {
    const errorMessage = "Failed to fetch trending topics";
    (useTrendingStore as unknown as jest.Mock).mockImplementation(() => ({
      topics: [],
      isLoading: false,
      error: new Error(errorMessage),
      timeframe: "week",
      setTimeframe: mockSetTimeframe,
      fetch: mockFetch,
    }));

    render(<TrendingSection />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText("Try Again")).toBeInTheDocument();
  });

  it("fetches data on mount and sets up polling", () => {
    jest.useFakeTimers();
    render(<TrendingSection />);

    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Fast-forward 5 minutes
    jest.advanceTimersByTime(5 * 60 * 1000);
    expect(mockFetch).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
  });

  it("retries on error", () => {
    const errorMessage = "Failed to fetch trending topics";
    (useTrendingStore as unknown as jest.Mock).mockImplementation(() => ({
      topics: [],
      isLoading: false,
      error: new Error(errorMessage),
      timeframe: "week",
      setTimeframe: mockSetTimeframe,
      fetch: mockFetch,
    }));

    render(<TrendingSection />);
    fireEvent.click(screen.getByText("Try Again"));
    expect(mockFetch).toHaveBeenCalled();
  });
});
