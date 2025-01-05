import { render, screen, act } from "@testing-library/react";
import { NotificationIcon } from "../NotificationIcon";
import { useNotificationStore } from "@/lib/store/notifications";

// Mock the store
jest.mock("@/lib/store/notifications", () => ({
  useNotificationStore: jest.fn(),
}));

describe("NotificationIcon", () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNotificationStore as unknown as jest.Mock).mockImplementation(() => ({
      unreadCount: 0,
      fetch: mockFetch,
    }));
  });

  it("renders without unread notifications", () => {
    render(<NotificationIcon />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
  });

  it("displays unread count badge when there are unread notifications", () => {
    (useNotificationStore as unknown as jest.Mock).mockImplementation(() => ({
      unreadCount: 5,
      fetch: mockFetch,
    }));

    render(<NotificationIcon />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("displays 99+ when unread count exceeds 99", () => {
    (useNotificationStore as unknown as jest.Mock).mockImplementation(() => ({
      unreadCount: 100,
      fetch: mockFetch,
    }));

    render(<NotificationIcon />);

    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("fetches notifications on mount", () => {
    render(<NotificationIcon />);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("sets up polling interval for notifications", () => {
    jest.useFakeTimers();

    render(<NotificationIcon />);

    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Fast-forward 30 seconds
    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
  });

  it("cleans up polling interval on unmount", () => {
    jest.useFakeTimers();

    const { unmount } = render(<NotificationIcon />);
    unmount();

    // Fast-forward 30 seconds
    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(mockFetch).toHaveBeenCalledTimes(1); // Only the initial fetch

    jest.useRealTimers();
  });

  it("applies custom variant prop", () => {
    render(<NotificationIcon variant="default" />);

    expect(screen.getByRole("button")).toHaveClass("default");
  });
});
