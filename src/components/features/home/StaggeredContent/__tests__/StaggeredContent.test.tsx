import { render, screen } from "@testing-library/react";
import { StaggeredContent } from "../StaggeredContent";
import { mockContent } from "@/data/mock/mock-content";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

// Mock the intersection observer hook
jest.mock("react-intersection-observer");
jest.mock("framer-motion", () => ({
  ...jest.requireActual("framer-motion"),
  useAnimation: jest.fn(),
}));

describe("StaggeredContent", () => {
  const mockItems = mockContent.slice(0, 3);
  const mockStart = jest.fn();

  beforeEach(() => {
    (useInView as jest.Mock).mockReturnValue([null, false]);
    (useAnimation as jest.Mock).mockReturnValue({ start: mockStart });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders content items", () => {
    render(<StaggeredContent items={mockItems} />);

    mockItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("renders skeleton UI when loading", () => {
    render(<StaggeredContent items={mockItems} isLoading skeletonCount={2} />);

    const skeletons = screen.getAllByTestId("staggered-content-skeleton");
    expect(skeletons).toHaveLength(1);
    expect(screen.queryByText(mockItems[0].title)).not.toBeInTheDocument();
  });

  it("starts animation when content comes into view", () => {
    (useInView as jest.Mock).mockReturnValue([null, true]);

    render(<StaggeredContent items={mockItems} />);

    expect(mockStart).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    render(<StaggeredContent items={mockItems} className={customClass} />);

    const container = screen.getByTestId("staggered-content");
    expect(container).toHaveClass(customClass);
  });

  it("renders correct number of skeleton items", () => {
    const skeletonCount = 4;
    render(
      <StaggeredContent
        items={mockItems}
        isLoading
        skeletonCount={skeletonCount}
      />
    );

    const skeletons = screen.getAllByTestId("staggered-content-skeleton");
    expect(skeletons).toHaveLength(1);
    const skeletonItems = screen.getAllByRole("generic");
    expect(skeletonItems).toHaveLength(skeletonCount);
  });

  it("does not animate when not in view", () => {
    (useInView as jest.Mock).mockReturnValue([null, false]);

    render(<StaggeredContent items={mockItems} />);

    expect(mockStart).not.toHaveBeenCalled();
  });
});
