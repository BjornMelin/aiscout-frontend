import { toast } from "sonner";
import {
  showNotificationToast,
  setupNotificationWebSocket,
} from "../notifications";
import { useNotificationStore } from "@/lib/store/notifications";
import type { NotificationType } from "@/lib/types/notification";

// Mock dependencies
jest.mock("sonner", () => ({
  toast: jest.fn(),
}));

jest.mock("@/lib/store/notifications", () => ({
  useNotificationStore: {
    getState: jest.fn(),
  },
}));

describe("Notification Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment variables
    delete process.env.NEXT_PUBLIC_WS_URL;
  });

  describe("showNotificationToast", () => {
    it("shows toast with title and message", () => {
      const notification = {
        id: "1",
        type: "comment" as NotificationType,
        title: "Test Title",
        message: "Test Message",
        createdAt: new Date(),
        read: false,
      };

      showNotificationToast(notification);

      expect(toast).toHaveBeenCalledWith("Test Title", {
        description: "Test Message",
        action: undefined,
      });
    });

    it("includes action when actionUrl is present", () => {
      const notification = {
        id: "1",
        type: "comment" as NotificationType,
        title: "Test Title",
        message: "Test Message",
        createdAt: new Date(),
        read: false,
        actionUrl: "/test",
      };

      showNotificationToast(notification);

      expect(toast).toHaveBeenCalledWith("Test Title", {
        description: "Test Message",
        action: {
          label: "View",
          onClick: expect.any(Function),
        },
      });
    });
  });

  describe("setupNotificationWebSocket", () => {
    interface MockWebSocket {
      onmessage: ((event: { data: string }) => void) | null;
      onerror: ((error: Error) => void) | null;
      onclose: (() => void) | null;
      close: jest.Mock;
    }

    interface MockStore {
      notifications: [];
      unreadCount: number;
    }

    let mockWebSocket: MockWebSocket;
    let mockStore: MockStore;

    beforeEach(() => {
      // Mock WebSocket
      mockWebSocket = {
        onmessage: null,
        onerror: null,
        onclose: null,
        close: jest.fn(),
      };
      global.WebSocket = jest.fn(
        () => mockWebSocket
      ) as unknown as typeof WebSocket;

      // Mock store
      mockStore = {
        notifications: [],
        unreadCount: 0,
      };
      (useNotificationStore.getState as jest.Mock).mockReturnValue(mockStore);
    });

    it("returns null when WebSocket URL is not configured", () => {
      const ws = setupNotificationWebSocket();
      expect(ws).toBeNull();
    });

    it("creates WebSocket connection with configured URL", () => {
      process.env.NEXT_PUBLIC_WS_URL = "ws://test.com";
      setupNotificationWebSocket();
      expect(WebSocket).toHaveBeenCalledWith("ws://test.com");
    });

    it("handles incoming notification message", () => {
      process.env.NEXT_PUBLIC_WS_URL = "ws://test.com";
      setupNotificationWebSocket();

      const notification = {
        id: "1",
        type: "comment" as NotificationType,
        title: "Test",
        message: "Test",
        createdAt: new Date(),
        read: false,
      };

      // Ensure handler is initialized before simulating message
      if (mockWebSocket.onmessage) {
        mockWebSocket.onmessage({ data: JSON.stringify(notification) });
      }

      expect(toast).toHaveBeenCalled();
    });

    it("handles WebSocket error", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      process.env.NEXT_PUBLIC_WS_URL = "ws://test.com";
      setupNotificationWebSocket();

      const error = new Error("WebSocket error");
      if (mockWebSocket.onerror) {
        mockWebSocket.onerror(error);
      }

      expect(consoleSpy).toHaveBeenCalledWith("WebSocket error:", error);
      consoleSpy.mockRestore();
    });

    it("attempts to reconnect on close", () => {
      jest.useFakeTimers();
      process.env.NEXT_PUBLIC_WS_URL = "ws://test.com";
      setupNotificationWebSocket();

      if (mockWebSocket.onclose) {
        mockWebSocket.onclose();
      }
      jest.advanceTimersByTime(5000);

      expect(WebSocket).toHaveBeenCalledTimes(2);
      jest.useRealTimers();
    });

    it("handles invalid JSON in message", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      process.env.NEXT_PUBLIC_WS_URL = "ws://test.com";
      setupNotificationWebSocket();

      if (mockWebSocket.onmessage) {
        mockWebSocket.onmessage({ data: "invalid json" });
      }

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to process notification:",
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });
});
