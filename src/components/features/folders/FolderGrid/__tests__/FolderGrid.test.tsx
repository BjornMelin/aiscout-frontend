import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FolderGrid } from "../FolderGrid";
import { useFoldersStore } from "@/lib/store/folders";
import type { Folder } from "@/lib/types/folder";

// Mock the store
jest.mock("@/lib/store/folders");
// Mock next-auth
jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { user: { id: "user-1" } },
    status: "authenticated",
  }),
}));

const mockFolders: Folder[] = [
  {
    id: "folder-1",
    name: "Test Folder 1",
    description: "First test folder",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    userId: "user-1",
    items: [],
    isShared: false,
  },
  {
    id: "folder-2",
    name: "Test Folder 2",
    description: "Second test folder",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    userId: "user-1",
    items: [],
    isShared: true,
  },
];

describe("FolderGrid", () => {
  beforeEach(() => {
    (useFoldersStore as unknown as jest.Mock).mockReturnValue({
      folders: mockFolders,
      isLoading: false,
      error: null,
      fetch: jest.fn(),
      delete: jest.fn(),
    });
  });

  it("renders folders correctly", () => {
    render(<FolderGrid />);

    expect(screen.getByText("Test Folder 1")).toBeInTheDocument();
    expect(screen.getByText("Test Folder 2")).toBeInTheDocument();
    expect(screen.getByText("First test folder")).toBeInTheDocument();
    expect(screen.getByText("Second test folder")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    (useFoldersStore as unknown as jest.Mock).mockReturnValue({
      folders: [],
      isLoading: true,
      error: null,
      fetch: jest.fn(),
    });

    render(<FolderGrid />);

    expect(screen.getAllByRole("alert")[0]).toHaveAttribute(
      "aria-busy",
      "true"
    );
  });

  it("shows error state", () => {
    (useFoldersStore as unknown as jest.Mock).mockReturnValue({
      folders: [],
      isLoading: false,
      error: new Error("Failed to load folders"),
      fetch: jest.fn(),
    });

    render(<FolderGrid />);

    expect(screen.getByText("Failed to load folders")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });

  it("shows empty state", () => {
    (useFoldersStore as unknown as jest.Mock).mockReturnValue({
      folders: [],
      isLoading: false,
      error: null,
      fetch: jest.fn(),
    });

    render(<FolderGrid />);

    expect(
      screen.getByText(/you haven't created any folders yet/i)
    ).toBeInTheDocument();
  });

  it("opens create folder dialog", () => {
    render(<FolderGrid />);

    fireEvent.click(screen.getByRole("button", { name: /create folder/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Create New Folder")).toBeInTheDocument();
  });

  it("handles folder deletion", async () => {
    const mockDelete = jest.fn();
    (useFoldersStore as unknown as jest.Mock).mockReturnValue({
      folders: mockFolders,
      isLoading: false,
      error: null,
      fetch: jest.fn(),
      delete: mockDelete,
    });

    // Mock window.confirm
    const confirmSpy = jest.spyOn(window, "confirm");
    confirmSpy.mockImplementation(() => true);

    render(<FolderGrid />);

    // Open context menu and click delete
    const contextTrigger = screen.getAllByRole("button", {
      name: /actions/i,
    })[0];
    fireEvent.contextMenu(contextTrigger);
    fireEvent.click(screen.getByText(/delete/i));

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith("folder-1");
    });

    confirmSpy.mockRestore();
  });

  it("fetches folders on mount", () => {
    const mockFetch = jest.fn();
    (useFoldersStore as unknown as jest.Mock).mockReturnValue({
      folders: [],
      isLoading: false,
      error: null,
      fetch: mockFetch,
    });

    render(<FolderGrid />);

    expect(mockFetch).toHaveBeenCalled();
  });
});
