import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ShareFolderDialog } from "../ShareFolderDialog";
import * as api from "@/lib/api/folders";
import type { Folder } from "@/lib/types/folder";

// Mock the API module
jest.mock("@/lib/api/folders", () => ({
  shareFolder: jest.fn(),
}));

const mockFolder: Folder = {
  id: "folder-1",
  name: "Test Folder",
  description: "A test folder",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
  userId: "user-1",
  items: [],
  isShared: false,
  shareSettings: {
    id: "share-1",
    folderId: "folder-1",
    isPublic: false,
    allowEdits: false,
    sharedWith: [],
  },
};

describe("ShareFolderDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders dialog with current share settings", () => {
    render(
      <ShareFolderDialog
        folder={mockFolder}
        open={true}
        onOpenChange={() => {}}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Share Folder")).toBeInTheDocument();
    expect(screen.getByLabelText(/public access/i)).not.toBeChecked();
    expect(screen.getByLabelText(/allow edits/i)).not.toBeChecked();
  });

  it("updates share settings when form is submitted", async () => {
    const mockShareResponse = {
      id: "share-1",
      folderId: "folder-1",
      isPublic: true,
      allowEdits: true,
      sharedWith: [],
      shareToken: "test-token",
    };

    (api.shareFolder as jest.Mock).mockResolvedValueOnce(mockShareResponse);

    render(
      <ShareFolderDialog
        folder={mockFolder}
        open={true}
        onOpenChange={() => {}}
      />
    );

    // Toggle public access and allow edits
    fireEvent.click(screen.getByLabelText(/public access/i));
    fireEvent.click(screen.getByLabelText(/allow edits/i));

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /update sharing/i }));

    await waitFor(() => {
      expect(api.shareFolder).toHaveBeenCalledWith("folder-1", {
        isPublic: true,
        allowEdits: true,
        users: [],
      });
    });

    // Share URL should be displayed
    expect(screen.getByText(/share link/i)).toBeInTheDocument();
  });

  it("displays error toast when API call fails", async () => {
    (api.shareFolder as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to update sharing settings")
    );

    render(
      <ShareFolderDialog
        folder={mockFolder}
        open={true}
        onOpenChange={() => {}}
      />
    );

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /update sharing/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/failed to update sharing settings/i)
      ).toBeInTheDocument();
    });
  });

  it("allows adding and removing shared users", () => {
    render(
      <ShareFolderDialog
        folder={mockFolder}
        open={true}
        onOpenChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText(/enter email addresses/i);

    // Add email
    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.blur(input);

    expect(input).toHaveValue("test@example.com");
  });
});
