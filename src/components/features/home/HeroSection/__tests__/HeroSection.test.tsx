import { render, screen, fireEvent } from "@testing-library/react";
import { HeroSection } from "../HeroSection";
import { useRouter } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("HeroSection", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the hero section with title and description", () => {
    render(<HeroSection />);

    expect(screen.getByText("Discover AI/ML Content")).toBeInTheDocument();
    expect(
      screen.getByText(/Find and explore cutting-edge research papers/i)
    ).toBeInTheDocument();
  });

  it("renders the search bar", () => {
    render(<HeroSection />);

    expect(
      screen.getByPlaceholderText(
        /Search papers, repositories, articles, and discussions/i
      )
    ).toBeInTheDocument();
  });

  it("renders popular search terms", () => {
    render(<HeroSection />);

    expect(screen.getByText("Large Language Models")).toBeInTheDocument();
    expect(screen.getByText("Transformers")).toBeInTheDocument();
    expect(screen.getByText("Computer Vision")).toBeInTheDocument();
  });

  it("navigates to search page when search is performed", () => {
    render(<HeroSection />);

    const searchInput = screen.getByPlaceholderText(
      /Search papers, repositories, articles, and discussions/i
    );
    fireEvent.change(searchInput, { target: { value: "AI Safety" } });
    fireEvent.keyDown(searchInput, { key: "Enter" });

    expect(mockPush).toHaveBeenCalledWith("/search?q=AI%20Safety");
  });

  it("navigates to search page when popular term is clicked", () => {
    render(<HeroSection />);

    fireEvent.click(screen.getByText("Transformers"));

    expect(mockPush).toHaveBeenCalledWith("/search?q=Transformers");
  });

  it("doesn't navigate when search query is empty", () => {
    render(<HeroSection />);

    const searchInput = screen.getByPlaceholderText(
      /Search papers, repositories, articles, and discussions/i
    );
    fireEvent.change(searchInput, { target: { value: "" } });
    fireEvent.keyDown(searchInput, { key: "Enter" });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
