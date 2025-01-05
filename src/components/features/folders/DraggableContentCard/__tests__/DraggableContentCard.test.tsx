import { render, screen, fireEvent } from "@testing-library/react";
import { DraggableContentCard } from "../DraggableContentCard";
import type { BookmarkedItem } from "@/lib/types/folder";

// Mock the dnd-kit hooks
jest.mock("@dnd-kit/sortable", () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  }),
}));

const mockItem: BookmarkedItem = {
  id: "item-1",
  contentId: "content-1",
  contentType: "paper",
  title: "Test Paper",
  addedAt: new Date("2024-01-01"),
  note: "Test note",
};

describe("DraggableContentCard", () => {
  it("renders content card correctly", () => {
    render(<DraggableContentCard item={mockItem} onRemove={() => {}} />);

    expect(screen.getByText("Test Paper")).toBeInTheDocument();
    expect(screen.getByText("Test note")).toBeInTheDocument();
    expect(screen.getByText(/1\/1\/2024/)).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const mockOnRemove = jest.fn();
    render(<DraggableContentCard item={mockItem} onRemove={mockOnRemove} />);

    // Open dropdown menu
    fireEvent.click(screen.getByLabelText(/actions/i));

    // Click remove button
    fireEvent.click(screen.getByText(/remove from folder/i));

    expect(mockOnRemove).toHaveBeenCalledWith("item-1");
  });

  it("shows drag handle", () => {
    render(<DraggableContentCard item={mockItem} onRemove={() => {}} />);

    expect(screen.getByLabelText(/drag handle/i)).toBeInTheDocument();
  });

  it("renders without note when not provided", () => {
    const itemWithoutNote = { ...mockItem, note: undefined };
    render(<DraggableContentCard item={itemWithoutNote} onRemove={() => {}} />);

    expect(screen.queryByText("Test note")).not.toBeInTheDocument();
  });
});
