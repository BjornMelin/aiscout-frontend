import { render, screen, fireEvent } from "@testing-library/react";
import { ShareFolderButton } from "../ShareFolderButton";
import type { Folder } from "@/lib/types/folder";

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

describe("ShareFolderButton", () => {
  it("renders share button correctly", () => {
    render(<ShareFolderButton folder={mockFolder} />);

    const button = screen.getByRole("button", { name: /share folder/i });
    expect(button).toBeInTheDocument();
  });

  it("opens share dialog when clicked", () => {
    render(<ShareFolderButton folder={mockFolder} />);

    const button = screen.getByRole("button", { name: /share folder/i });
    fireEvent.click(button);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Share Folder")).toBeInTheDocument();
  });

  it("closes share dialog when clicking outside", () => {
    render(<ShareFolderButton folder={mockFolder} />);

    // Open dialog
    fireEvent.click(screen.getByRole("button", { name: /share folder/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click close button
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
