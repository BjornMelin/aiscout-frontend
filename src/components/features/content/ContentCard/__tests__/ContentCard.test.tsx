import { render, screen } from "@testing-library/react";
import { ContentCard } from "../ContentCard";
import type { ContentItem } from "@/lib/types/content";

const mockPaper: ContentItem = {
  id: "paper-1",
  type: "paper",
  title: "Test Paper",
  description: "A test paper description",
  abstract: "Test abstract",
  authors: [{ id: "a1", name: "John Doe" }],
  date: "2024-01-01",
  tags: [{ id: "t1", name: "Test" }],
  metrics: { views: 100, citations: 10 },
  citations: 10,
};

const mockRepo: ContentItem = {
  id: "repo-1",
  type: "repo",
  title: "Test Repo",
  description: "A test repository description",
  authors: [{ id: "a1", name: "Jane Doe" }],
  date: "2024-01-01",
  tags: [{ id: "t1", name: "Test" }],
  metrics: { views: 100, stars: 50, forks: 20 },
  language: "TypeScript",
  stars: 50,
  forks: 20,
  lastCommit: "2024-01-01",
};

describe("ContentCard", () => {
  it("renders paper content correctly", () => {
    render(<ContentCard content={mockPaper} />);

    expect(screen.getByText("Test Paper")).toBeInTheDocument();
    expect(screen.getByText("A test paper description")).toBeInTheDocument();
    expect(screen.getByText("By John Doe")).toBeInTheDocument();
    expect(screen.getByText("10 citations")).toBeInTheDocument();
  });

  it("renders repository content correctly", () => {
    render(<ContentCard content={mockRepo} />);

    expect(screen.getByText("Test Repo")).toBeInTheDocument();
    expect(
      screen.getByText("A test repository description")
    ).toBeInTheDocument();
    expect(screen.getByText("By Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument(); // stars
    expect(screen.getByText("20")).toBeInTheDocument(); // forks
  });

  it("hides action buttons when showActions is false", () => {
    render(<ContentCard content={mockPaper} showActions={false} />);

    expect(screen.queryByText("Save")).not.toBeInTheDocument();
    expect(screen.queryByText("Share")).not.toBeInTheDocument();
  });

  it("shows source link when url is provided", () => {
    const contentWithUrl = { ...mockPaper, url: "https://example.com" };
    render(<ContentCard content={contentWithUrl} />);

    const link = screen.getByText("View source");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("formats date correctly", () => {
    render(<ContentCard content={mockPaper} />);

    // Note: This test might need to be adjusted based on the user's locale
    expect(screen.getByText(/1\/1\/2024/)).toBeInTheDocument();
  });
});
