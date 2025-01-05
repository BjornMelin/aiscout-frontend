import { render, screen, fireEvent } from "@testing-library/react";
import { NotificationPanel } from "../NotificationPanel";
import { useNotificationStore } from "@/lib/store/notifications";
import { useRouter } from "next/navigation";

// Mock the dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/store/notifications", () => ({
  useNotificationStore: jest.fn(),
}));

describe("NotificationPanel", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockNotifications = [
    {
      id: "1",
      type: "comment",
      title: "New Comment",
      message: "Someone commented on your post",
      createdAt: new Date(),
      read: false,
      actionUrl: "/posts/1",
      metadata: {
        senderName: "John Doe",
        senderAvatar: "https://example.com/avatar.jpg",
      },
    },
  ];

  const mockStore = {
    notifications: mockNotifications,
    unreadCount: 1,
    markAsRead: jest.fn(),
    markAllAsRead: jest.fn(),
    clear: jest.fn(),
    clearAll: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useNotificationStore as unknown as jest.Mock).mockReturnValue(mockStore);
  });

  it("renders empty state when there are no notifications", () => {
    (useNotificationStore as unknown as jest.Mock).mockReturnValue({
      ...mockStore,
      notifications: [],
      unreadCount: 0,
    });

    render(<NotificationPanel />);

    expect(screen.getByText("No notifications")).toBeInTheDocument();
  });

  it("renders notifications list when there are notifications", () => {
    render(<NotificationPanel />);

    expect(screen.getByText("New Comment")).toBeInTheDocument();
    expect(
      screen.getByText("Someone commented on your post")
    ).toBeInTheDocument();
  });

  it("shows mark all read button when there are unread notifications", () => {
    render(<NotificationPanel />);

    const markAllReadButton = screen.getByText("Mark all read");
    expect(markAllReadButton).toBeInTheDocument();

    fireEvent.click(markAllReadButton);
    expect(mockStore.markAllAsRead).toHaveBeenCalled();
  });

  it("handles notification click correctly", () => {
    render(<NotificationPanel />);

    const notification = screen.getByText("New Comment").closest("div");
    fireEvent.click(notification!);

    expect(mockStore.markAsRead).toHaveBeenCalledWith("1");
    expect(mockRouter.push).toHaveBeenCalledWith("/posts/1");
  });

  it("handles clear all notifications", () => {
    render(<NotificationPanel />);

    const clearAllButton = screen.getByText("Clear all");
    fireEvent.click(clearAllButton);

    expect(mockStore.clearAll).toHaveBeenCalled();
  });

  it("handles clear single notification", () => {
    render(<NotificationPanel />);

    const clearButton = screen.getByRole("button", {
      name: /clear notification/i,
    });
    fireEvent.click(clearButton);

    expect(mockStore.clear).toHaveBeenCalledWith("1");
  });

  it("displays sender avatar when available", () => {
    render(<NotificationPanel />);

    const avatar = screen.getByAltText("John Doe");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("displays fallback avatar when sender avatar is not available", () => {
    (useNotificationStore as unknown as jest.Mock).mockReturnValue({
      ...mockStore,
      notifications: [
        {
          ...mockNotifications[0],
          metadata: {
            senderName: "John Doe",
          },
        },
      ],
    });

    render(<NotificationPanel />);

    expect(screen.getByText("J")).toBeInTheDocument(); // First letter of sender name
  });
});
