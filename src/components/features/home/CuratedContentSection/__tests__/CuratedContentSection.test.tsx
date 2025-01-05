import { render, screen, fireEvent } from "@testing-library/react";
import { CuratedContentSection } from "../CuratedContentSection";
import { useHomePageStore } from "@/lib/store/home";

// Mock the store
jest.mock("@/lib/store/home", () => ({
  useHomePageStore: jest.fn(),
}));

const mockCuratedContent = {
  papers: [
    {
      id: "1",
      type: "paper",
      title: "Test Paper",
      description: "Test Description",
      authors: [{ id: "a1", name: "Test Author" }],
      date: "2024-01-01",
      tags: [{ id: "t1", name: "Test Tag" }],
      metrics: { views: 1000 },
    },
  ],
  repositories: [],
  articles: [],
  discussions: [],
};

describe("CuratedContentSection", () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    (useHomePageStore as unknown as jest.Mock).mockReturnValue({
      curatedContent: mockCuratedContent,
      isLoading: false,
      error: null,
      activeTab: "papers",
      setActiveTab: jest.fn(),
      fetch: mockFetch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the section title", () => {
    render(<CuratedContentSection />);
    expect(screen.getByText("Popular Content")).toBeInTheDocument();
  });

  it("renders all content type tabs", () => {
    render(<CuratedContentSection />);
    expect(screen.getByText("Research Papers")).toBeInTheDocument();
    expect(screen.getByText("Repositories")).toBeInTheDocument();
    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("Discussions")).toBeInTheDocument();
  });

  it("fetches content on mount", () => {
    render(<CuratedContentSection />);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("displays loading skeleton when loading", () => {
    (useHomePageStore as unknown as jest.Mock).mockReturnValue({
      curatedContent: mockCuratedContent,
      isLoading: true,
      error: null,
      activeTab: "papers",
      setActiveTab: jest.fn(),
      fetch: mockFetch,
    });

    render(<CuratedContentSection />);
    expect(screen.getByTestId("curated-content")).toBeInTheDocument();
  });

  it("displays error message with retry button when error occurs", () => {
    const error = new Error("Failed to fetch");
    (useHomePageStore as unknown as jest.Mock).mockReturnValue({
      curatedContent: mockCuratedContent,
      isLoading: false,
      error,
      activeTab: "papers",
      setActiveTab: jest.fn(),
      fetch: mockFetch,
    });

    render(<CuratedContentSection />);
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
    expect(screen.getByText("Try again")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Try again"));
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("renders content cards when data is available", () => {
    render(<CuratedContentSection />);
    expect(screen.getByText("Test Paper")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("switches content when tab is changed", async () => {
    const mockSetActiveTab = jest.fn();
    (useHomePageStore as unknown as jest.Mock).mockReturnValue({
      curatedContent: mockCuratedContent,
      isLoading: false,
      error: null,
      activeTab: "papers",
      setActiveTab: mockSetActiveTab,
      fetch: mockFetch,
    });

    render(<CuratedContentSection />);
    fireEvent.click(screen.getByText("Repositories"));

    expect(mockSetActiveTab).toHaveBeenCalledWith("repositories");
  });
});
