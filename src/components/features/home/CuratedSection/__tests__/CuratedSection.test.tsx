import { render, screen } from "@testing-library/react";
import { CuratedSection } from "../CuratedSection";
import { mockContent } from "@/data/mock/mock-content";

// Mock content items for testing
const mockItems = mockContent.slice(0, 2);
const mockType = "paper";

describe("CuratedSection", () => {
  it("renders content items correctly", () => {
    render(<CuratedSection items={mockItems} type={mockType} />);

    // Check if component rendered with correct test id
    expect(screen.getByTestId("curated-section")).toBeInTheDocument();

    // Check if all items are rendered
    mockItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();

      // Check if type badge is rendered
      expect(screen.getByText(item.type)).toBeInTheDocument();

      // Check if tags are rendered
      item.tags.forEach((tag) => {
        expect(screen.getByText(tag.name)).toBeInTheDocument();
      });

      // Check if authors are rendered
      item.authors.forEach((author) => {
        expect(screen.getByText(author.name)).toBeInTheDocument();
      });
    });
  });

  it("renders metrics based on content type", () => {
    const paperWithMetrics = mockContent.find(item => item.type === "paper");
    if (!paperWithMetrics) throw new Error("No paper found in mock content");

    render(<CuratedSection items={[paperWithMetrics]} type="paper" />);
    expect(screen.getByText(`${paperWithMetrics.metrics.citations} citations`)).toBeInTheDocument();
  });

  it("renders view more button with correct link", () => {
    render(<CuratedSection items={mockItems} type={mockType} />);

    const viewMoreButton = screen.getByText(
      `View More ${mockType.charAt(0).toUpperCase() + mockType.slice(1)}s`
    );
    expect(viewMoreButton).toBeInTheDocument();
    expect(viewMoreButton.closest("a")).toHaveAttribute(
      "href",
      `/search?type=${mockType}`
    );
  });
});
