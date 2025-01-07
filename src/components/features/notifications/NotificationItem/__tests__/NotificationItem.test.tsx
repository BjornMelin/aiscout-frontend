import { render, screen, fireEvent } from "@testing-library/react";
import { NotificationItem } from "../NotificationItem";
import { ContentType } from "@/lib/types/shared";

describe("NotificationItem", () => {
  const mockNotification = {
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
  };

  const mockHandlers = {
    onMarkAsRead: jest.fn(),
    onClear: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders notification content correctly", () => {
    render(<NotificationItem notification={mockNotification} />);

    expect(screen.getByText("New Comment")).toBeInTheDocument();
    expect(
      screen.getByText("Someone commented on your post")
    ).toBeInTheDocument();
  });

  it("displays sender avatar when available", () => {
    render(<NotificationItem notification={mockNotification} />);

    const avatar = screen.getByAltText("John Doe");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("displays icon when no sender is available", () => {
    const notificationWithoutSender = {
      ...mockNotification,
      sender: undefined,
    };

    render(<NotificationItem notification={notificationWithoutSender} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(document.querySelector(".h-8.w-8")).toBeInTheDocument();
  });

  it("calls onMarkAsRead when clicking mark as read button", () => {
    render(
      <NotificationItem
        notification={mockNotification}
        onMarkAsRead={mockHandlers.onMarkAsRead}
      />
    );

    const markAsReadButton = screen.getByLabelText("Mark as read");
    fireEvent.click(markAsReadButton);

    expect(mockHandlers.onMarkAsRead).toHaveBeenCalledWith("1");
  });

  it("calls onClear when clicking clear button", () => {
    render(
      <NotificationItem
        notification={mockNotification}
        onClear={mockHandlers.onClear}
      />
    );

    const clearButton = screen.getByLabelText("Clear notification");
    fireEvent.click(clearButton);

    expect(mockHandlers.onClear).toHaveBeenCalledWith("1");
  });

  it("applies correct styles for read/unread states", () => {
    const { rerender } = render(
      <NotificationItem notification={mockNotification} />
    );

    expect(screen.getByRole("button")).toHaveClass("bg-accent/50");

    rerender(
      <NotificationItem notification={{ ...mockNotification, isRead: true }} />
    );

    expect(screen.getByRole("button")).toHaveClass("bg-background");
  });

  it("renders as a link when link is provided", () => {
    render(<NotificationItem notification={mockNotification} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/posts/1");
  });

  it("calls onMarkAsRead when clicking notification with link", () => {
    render(
      <NotificationItem
        notification={mockNotification}
        onMarkAsRead={mockHandlers.onMarkAsRead}
      />
    );

    const link = screen.getByRole("link");
    fireEvent.click(link);

    expect(mockHandlers.onMarkAsRead).toHaveBeenCalledWith("1");
  });

  it("does not show mark as read button for read notifications", () => {
    render(
      <NotificationItem
        notification={{ ...mockNotification, isRead: true }}
        onMarkAsRead={mockHandlers.onMarkAsRead}
      />
    );

    expect(screen.queryByLabelText("Mark as read")).not.toBeInTheDocument();
  });
});
