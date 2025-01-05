import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreateFolderDialog } from "../CreateFolderDialog";
import { useFoldersStore } from "@/lib/store/folders";

// Mock the store
jest.mock("@/lib/store/folders", () => ({
  useFoldersStore: jest.fn(),
}));

describe("CreateFolderDialog", () => {
  const mockCreate = jest.fn();
  const mockOnOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFoldersStore as unknown as jest.Mock).mockReturnValue({
      create: mockCreate,
    });
  });

  it("renders dialog when open", () => {
    render(<CreateFolderDialog open={true} onOpenChange={mockOnOpenChange} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Create New Folder")).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<CreateFolderDialog open={true} onOpenChange={mockOnOpenChange} />);

    // Submit without name
    fireEvent.click(screen.getByRole("button", { name: /create folder/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("creates folder with valid data", async () => {
    mockCreate.mockResolvedValueOnce({
      id: "new-folder",
      name: "Test Folder",
      description: "Test Description",
    });

    render(<CreateFolderDialog open={true} onOpenChange={mockOnOpenChange} />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test Folder" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /create folder/i }));

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledWith({
        name: "Test Folder",
        description: "Test Description",
      });
    });

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it("handles creation error", async () => {
    mockCreate.mockRejectedValueOnce(new Error("Failed to create folder"));

    render(<CreateFolderDialog open={true} onOpenChange={mockOnOpenChange} />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test Folder" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /create folder/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to create folder/i)).toBeInTheDocument();
    });

    expect(mockOnOpenChange).not.toHaveBeenCalled();
  });

  it("closes dialog when cancel is clicked", () => {
    render(<CreateFolderDialog open={true} onOpenChange={mockOnOpenChange} />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it("shows loading state during creation", async () => {
    mockCreate.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<CreateFolderDialog open={true} onOpenChange={mockOnOpenChange} />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test Folder" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /create folder/i }));

    expect(screen.getByText(/creating.../i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /creating.../i })).toBeDisabled();
  });
});
