import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FolderContentsView } from "../FolderContentsView";
import { useFolderContentsStore } from "@/lib/store/folderContents";
import type { Folder, BookmarkedItem } from "@/lib/types/folder";

// Mock the store
jest.mock("@/lib/store/folderContents");

const mockFolder: Folder = {
  id: "folder-1",
  name: "Test Folder",
  description: "A test folder",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
  userId: "user-1",
  items: [],
  isShared: false,
};

const mockItems: BookmarkedItem[] = [
  {
    id: "item-1",
    contentId: "content-1",
    contentType: "paper",
    title: "Test Paper 1",
    addedAt: new Date("2024-01-01"),
    note: "Test note",
  },
  {
    id: "item-2",
    contentId: "content-2",
    contentType: "article",
    title: "Test Article",
    addedAt: new Date("2024-01-01"),
  },
];

describe("FolderContentsView", () => {
  beforeEach(() => {
    (useFolderContentsStore as unknown as jest.Mock).mockReturnValue({
      items: mockItems,
      isLoading: false,
      error: null,
      fetch: jest.fn(),
      reorder: jest.fn(),
      remove: jest.fn(),
    });
  });

  it("renders folder contents correctly", () => {
    render(<FolderContentsView folder={mockFolder} />);

    expect(screen.getByText("Test Paper 1")).toBeInTheDocument();
    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("Test note")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    (useFolderContentsStore as unknown as jest.Mock).mockReturnValue({
      items: [],
      isLoading: true,
      error: null,
      fetch: jest.fn(),
    });

    render(<FolderContentsView folder={mockFolder} />);

    expect(
      screen.getByLabelText(/loading folder contents/i)
    ).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useFolderContentsStore as unknown as jest.Mock).mockReturnValue({
      items: [],
      isLoading: false,
      error: new Error("Failed to load contents"),
      fetch: jest.fn(),
    });

    render(<FolderContentsView folder={mockFolder} />);

    expect(screen.getByText(/failed to load contents/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });

  it("shows empty state", () => {
    (useFolderContentsStore as unknown as jest.Mock).mockReturnValue({
      items: [],
      isLoading: false,
      error: null,
      fetch: jest.fn(),
    });

    render(<FolderContentsView folder={mockFolder} />);

    expect(screen.getByText(/this folder is empty/i)).toBeInTheDocument();
  });

  it("handles item removal", async () => {
    const mockRemove = jest.fn();
    (useFolderContentsStore as unknown as jest.Mock).mockReturnValue({
      items: mockItems,
      isLoading: false,
      error: null,
      fetch: jest.fn(),
      remove: mockRemove,
    });

    render(<FolderContentsView folder={mockFolder} />);

    // Open dropdown menu and click remove
    const moreButtons = screen.getAllByLabelText(/actions/i);
    fireEvent.click(moreButtons[0]);
    fireEvent.click(screen.getByText(/remove from folder/i));

    await waitFor(() => {
      expect(mockRemove).toHaveBeenCalledWith("item-1");
    });
  });

  it("fetches contents on mount", () => {
    const mockFetch = jest.fn();
    (useFolderContentsStore as unknown as jest.Mock).mockReturnValue({
      items: [],
      isLoading: false,
      error: null,
      fetch: mockFetch,
    });

    render(<FolderContentsView folder={mockFolder} />);

    expect(mockFetch).toHaveBeenCalledWith("folder-1");
  });
});
