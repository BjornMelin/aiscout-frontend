import { render, screen } from "@testing-library/react";
import { StaggeredContent } from "../StaggeredContent";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

// Mock dependencies
jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
  useAnimation: jest.fn(),
}));

const mockItems = [
  {
    id: "1",
    type: "article" as const,
    title: "Test Article 1",
    description: "Description 1",
    authors: [{ id: "a1", name: "Author 1" }],
    date: "2024-01-01",
    tags: [{ id: "t1", name: "Tag 1" }],
    metrics: { views: 1000 },
    content: "Test content 1",
    source: "Test Source",
  },
  {
    id: "2",
    type: "article" as const,
    title: "Test Article 2",
    description: "Description 2",
    authors: [{ id: "a2", name: "Author 2" }],
    date: "2024-01-02",
    tags: [{ id: "t2", name: "Tag 2" }],
    metrics: { views: 2000 },
    content: "Test content 2",
    source: "Test Source",
  },
];

describe("StaggeredContent", () => {
  const mockStart = jest.fn();
  const mockInView = jest.fn();

  beforeEach(() => {
    (useAnimation as jest.Mock).mockReturnValue({ start: mockStart });
    (useInView as jest.Mock).mockReturnValue([null, true, mockInView]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all content items", () => {
    render(<StaggeredContent items={mockItems} />);

    expect(screen.getByText("Test Article 1")).toBeInTheDocument();
    expect(screen.getByText("Test Article 2")).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <StaggeredContent items={mockItems} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("starts animation when in view", () => {
    render(<StaggeredContent items={mockItems} />);

    expect(mockStart).toHaveBeenCalledWith(
      expect.objectContaining({
        opacity: 1,
        y: 0,
      })
    );
  });

  it("renders items with initial animation state", () => {
    const { container } = render(<StaggeredContent items={mockItems} />);
    const items = container.querySelectorAll("[style]");

    items.forEach((item) => {
      expect(item).toHaveStyle({
        opacity: "0",
        transform: "translateY(20px)",
      });
    });
  });

  it("handles empty items array", () => {
    const { container } = render(<StaggeredContent items={[]} />);
    expect(container.children).toHaveLength(0);
  });
});
