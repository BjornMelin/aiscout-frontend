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
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders the hero section with title and description", () => {
    render(<HeroSection />);

    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByText("Discover AI/ML Content")).toBeInTheDocument();
    expect(
      screen.getByText(/Find and explore cutting-edge research papers/i)
    ).toBeInTheDocument();
  });

  it("renders skeleton loading state when isLoading is true", () => {
    render(<HeroSection isLoading={true} />);

    expect(screen.getByTestId("hero-section-skeleton")).toBeInTheDocument();
    expect(
      screen.queryByText("Discover AI/ML Content")
    ).not.toBeInTheDocument();
  });

  it("renders search bar with correct placeholder", () => {
    render(<HeroSection />);

    expect(
      screen.getByPlaceholderText("Search AI research and projects...")
    ).toBeInTheDocument();
  });

  it("renders all popular search terms", () => {
    render(<HeroSection />);

    const popularSearches = [
      "Large Language Models",
      "Transformers",
      "Computer Vision",
      "Reinforcement Learning",
      "Neural Networks",
    ];

    popularSearches.forEach((term) => {
      expect(screen.getByText(term)).toBeInTheDocument();
    });
  });

  it("navigates to search page when search is performed", () => {
    render(<HeroSection />);

    const searchBar = screen.getByPlaceholderText(
      "Search AI research and projects..."
    );
    const searchQuery = "test query";

    // Trigger search
    fireEvent.change(searchBar, { target: { value: searchQuery } });
    fireEvent.keyDown(searchBar, { key: "Enter", code: "Enter" });

    expect(mockPush).toHaveBeenCalledWith(
      `/search?q=${encodeURIComponent(searchQuery)}`
    );
  });

  it("navigates to search page when popular term is clicked", () => {
    render(<HeroSection />);

    const popularTerm = "Large Language Models";
    fireEvent.click(screen.getByText(popularTerm));

    expect(mockPush).toHaveBeenCalledWith(
      `/search?q=${encodeURIComponent(popularTerm)}`
    );
  });
});
