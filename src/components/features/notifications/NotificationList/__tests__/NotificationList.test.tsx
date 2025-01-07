import { render, screen, fireEvent, act } from "@testing-library/react";
import { NotificationList } from "../NotificationList";
import { useNotificationStore } from "@/lib/store/notifications";
import { ContentType } from "@/lib/types/shared";

jest.mock("@/lib/store/notifications", () => ({
  useNotificationStore: jest.fn(),
}));

describe("NotificationList", () => {
  const mockNotifications = [
    {
      id: "1",
      type: "comment" as const,
      title: "New Comment",
      message: "Someone commented on your post",
      createdAt: new Date(),
      link: "/posts/1",
      isRead: false,
      sender: {
        id: "user1",
        name: "John Doe",
        avatar: "https://example.com/avatar.jpg",
      },
      metadata: {
        contentId: "post1",
        contentType: "paper" as ContentType,
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
    fetch: jest.fn(),
    isLoading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNotificationStore as unknown as jest.Mock).mockImplementation(() => mockStore);
  });

  it("renders notification icon with badge", () => {
    render(<NotificationList />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("displays 99+ when unread count exceeds 99", () => {
    (useNotificationStore as unknown as jest.Mock).mockImplementation(() => ({
      ...mockStore,
      unreadCount: 100,
    }));

    render(<NotificationList />);

    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("shows empty state when there are no notifications", () => {
    (useNotificationStore as unknown as jest.Mock).mockImplementation(() => ({
      ...mockStore,
      notifications: [],
      unreadCount: 0,
    }));

    render(<NotificationList />);
    fireEvent.mouseEnter(screen.getByRole("button"));
    expect(screen.getByText("No notifications")).toBeInTheDocument();
  });

  it("renders notifications list when there are notifications", () => {
    render(<NotificationList />);
    fireEvent.mouseEnter(screen.getByRole("button"));

    expect(screen.getByText("New Comment")).toBeInTheDocument();
    expect(
      screen.getByText("Someone commented on your post")
    ).toBeInTheDocument();
  });

  it("shows mark all read button when there are unread notifications", () => {
    render(<NotificationList />);
    fireEvent.mouseEnter(screen.getByRole("button"));

    const markAllReadButton = screen.getByText("Mark all read");
    expect(markAllReadButton).toBeInTheDocument();

    fireEvent.click(markAllReadButton);
    expect(mockStore.markAllAsRead).toHaveBeenCalled();
  });

  it("handles clear all notifications", () => {
    render(<NotificationList />);
    fireEvent.mouseEnter(screen.getByRole("button"));

    const clearAllButton = screen.getByText("Clear all");
    fireEvent.click(clearAllButton);

    expect(mockStore.clearAll).toHaveBeenCalled();
  });

  it("fetches notifications on mount and sets up polling", () => {
    jest.useFakeTimers();
    render(<NotificationList />);

    expect(mockStore.fetch).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(mockStore.fetch).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });

  it("cleans up polling interval on unmount", () => {
    jest.useFakeTimers();
    const { unmount } = render(<NotificationList />);
    unmount();

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(mockStore.fetch).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it("applies custom variant prop to notification icon", () => {
    render(<NotificationList variant="default" />);
    expect(screen.getByRole("button")).toHaveClass("default");
  });

  it("displays correct unread count in header", () => {
    render(<NotificationList />);
    fireEvent.mouseEnter(screen.getByRole("button"));
    expect(screen.getByText("Notifications (1)")).toBeInTheDocument();
  });
});
