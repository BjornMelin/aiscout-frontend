import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { FolderCard } from "../FolderCard";
import type { Folder } from "@/lib/types/folder";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockFolder: Folder = {
  id: "folder-1",
  name: "Test Folder",
  description: "A test folder description",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
  userId: "user-1",
  items: [
    {
      id: "item-1",
      contentId: "content-1",
      contentType: "paper",
      title: "Test Paper",
      addedAt: new Date("2024-01-01"),
    },
  ],
  isShared: true,
};

describe("FolderCard", () => {
  const mockOnShare = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders folder information correctly", () => {
    render(
      <FolderCard
        folder={mockFolder}
        onShare={mockOnShare}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Test Folder")).toBeInTheDocument();
    expect(screen.getByText("A test folder description")).toBeInTheDocument();
    expect(screen.getByText("1 items")).toBeInTheDocument();
    expect(screen.getByText("Shared")).toBeInTheDocument();
  });

  it("calls onShare when share button is clicked", () => {
    render(
      <FolderCard
        folder={mockFolder}
        onShare={mockOnShare}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /share/i }));
    expect(mockOnShare).toHaveBeenCalled();
  });

  it("calls onDelete when delete option is clicked", () => {
    render(
      <FolderCard
        folder={mockFolder}
        onShare={mockOnShare}
        onDelete={mockOnDelete}
      />
    );

    // Open context menu
    fireEvent.contextMenu(screen.getByRole("button", { name: /actions/i }));
    // Click delete option
    fireEvent.click(screen.getByText(/delete/i));

    expect(mockOnDelete).toHaveBeenCalled();
  });

  it("navigates to folder when clicked", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(
      <FolderCard
        folder={mockFolder}
        onShare={mockOnShare}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open folder/i }));
    expect(mockPush).toHaveBeenCalledWith("/folders/folder-1");
  });

  it("prevents event propagation when clicking share button", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(
      <FolderCard
        folder={mockFolder}
        onShare={mockOnShare}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /share/i }));
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockOnShare).toHaveBeenCalled();
  });

  it("renders without description when not provided", () => {
    const folderWithoutDesc = { ...mockFolder, description: undefined };
    render(
      <FolderCard
        folder={folderWithoutDesc}
        onShare={mockOnShare}
        onDelete={mockOnDelete}
      />
    );

    expect(
      screen.queryByText("A test folder description")
    ).not.toBeInTheDocument();
  });
});
