import { render, screen } from "@testing-library/react";
import { HomeTrendingSection } from "../HomeTrendingSection";
import {
  mockTrendingTopics,
  mockTrendingContent,
} from "@/data/mock/mock-trending";

describe("HomeTrendingSection", () => {
  it("renders trending section with correct headings", () => {
    render(<HomeTrendingSection />);

    expect(screen.getByTestId("home-trending-section")).toBeInTheDocument();
    expect(screen.getByText("Trending Topics")).toBeInTheDocument();
    expect(screen.getByText("Trending Content")).toBeInTheDocument();
  });

  it("renders skeleton loading state when isLoading is true", () => {
    render(<HomeTrendingSection isLoading={true} />);

    expect(
      screen.getByTestId("home-trending-section-skeleton")
    ).toBeInTheDocument();
    expect(screen.queryByText("Trending Topics")).not.toBeInTheDocument();
    expect(screen.queryByText("Trending Content")).not.toBeInTheDocument();
  });

  it("renders top 5 trending topics", () => {
    render(<HomeTrendingSection />);

    const topTopics = mockTrendingTopics.slice(0, 5);
    topTopics.forEach((topic) => {
      expect(screen.getByText(topic.title)).toBeInTheDocument();
      expect(
        screen.getByText(topic.trendMetrics.score.toString())
      ).toBeInTheDocument();
    });
  });

  it("renders top 5 trending content items", () => {
    render(<HomeTrendingSection />);

    const topContent = mockTrendingContent.slice(0, 5);
    topContent.forEach((content) => {
      expect(screen.getByText(content.title)).toBeInTheDocument();
      expect(screen.getByText(content.type)).toBeInTheDocument();
      expect(
        screen.getByText(content.trendMetrics.score.toString())
      ).toBeInTheDocument();
    });
  });

  it("renders correct trend indicators", () => {
    render(<HomeTrendingSection />);

    // Check for trend arrows (up, down, or sideways)
    const trendArrows = screen.getAllByTestId(/trend-arrow/i);
    expect(trendArrows.length).toBeGreaterThan(0);
  });

  it("renders view all links with correct hrefs", () => {
    render(<HomeTrendingSection />);

    const viewAllLinks = screen.getAllByText("View all");
    expect(viewAllLinks).toHaveLength(2);

    viewAllLinks.forEach((link) => {
      expect(link.closest("a")).toHaveAttribute("href", "/trending");
    });
  });
});
