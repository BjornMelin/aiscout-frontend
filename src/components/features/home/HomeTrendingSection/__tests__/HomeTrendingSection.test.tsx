import { render, screen, fireEvent } from "@testing-library/react";
import { HomeTrendingSection } from "../HomeTrendingSection";
import { useTrendingStore } from "@/lib/store/trending";
import { useRouter } from "next/navigation";

jest.mock("@/lib/store/trending", () => ({
  useTrendingStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockTopics = [
  {
    id: "1",
    title: "AI Safety",
    description: "Trending discussions about AI safety measures",
    trendData: [{ date: "2024-01-01", value: 100 }],
    timeframe: "week",
  },
  {
    id: "2",
    title: "LLM Training",
    description: "Latest developments in LLM training",
    trendData: [{ date: "2024-01-01", value: 90 }],
    timeframe: "week",
  },
  {
    id: "3",
    title: "Neural Networks",
    description: "Advances in neural network architectures",
    trendData: [{ date: "2024-01-01", value: 80 }],
    timeframe: "week",
  },
];

describe("HomeTrendingSection", () => {
  const mockFetch = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useTrendingStore as unknown as jest.Mock).mockReturnValue({
      topics: mockTopics,
      isLoading: false,
      error: null,
      fetch: mockFetch,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the section title", () => {
    render(<HomeTrendingSection />);
    expect(screen.getByText("Trending in AI/ML")).toBeInTheDocument();
  });

  it("fetches trending topics on mount", () => {
    render(<HomeTrendingSection />);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("displays loading skeleton when loading", () => {
    (useTrendingStore as unknown as jest.Mock).mockReturnValue({
      topics: [],
      isLoading: true,
      error: null,
      fetch: mockFetch,
    });

    render(<HomeTrendingSection />);
    expect(screen.getAllByTestId("trending-skeleton")).toHaveLength(1);
  });

  it("displays error message with retry button when error occurs", () => {
    const error = new Error("Failed to fetch trending topics");
    (useTrendingStore as unknown as jest.Mock).mockReturnValue({
      topics: [],
      isLoading: false,
      error,
      fetch: mockFetch,
    });

    render(<HomeTrendingSection />);
    expect(screen.getByText(error.message)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Try Again"));
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("renders top 3 trending topics", () => {
    render(<HomeTrendingSection />);
    expect(screen.getByText("AI Safety")).toBeInTheDocument();
    expect(screen.getByText("LLM Training")).toBeInTheDocument();
    expect(screen.getByText("Neural Networks")).toBeInTheDocument();
  });

  it("navigates to trending page when View all is clicked", () => {
    render(<HomeTrendingSection />);
    fireEvent.click(screen.getByText("View all"));
    expect(mockPush).toHaveBeenCalledWith("/trending");
  });
});
