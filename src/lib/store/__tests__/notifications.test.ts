import { act } from '@testing-library/react';
import { useNotificationStore } from '../notifications';

// Mock fetch
global.fetch = jest.fn();

describe('useNotificationStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useNotificationStore.setState({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
      error: null,
    });
  });

  describe('fetch', () => {
    it('fetches notifications successfully', async () => {
      const mockNotifications = [
        {
          id: '1',
          type: 'comment',
          title: 'New Comment',
          message: 'Test message',
          createdAt: new Date(),
          read: false,
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve({ notifications: mockNotifications }),
      });

      await act(async () => {
        await useNotificationStore.getState().fetch();
      });

      expect(useNotificationStore.getState().notifications).toEqual(mockNotifications);
      expect(useNotificationStore.getState().unreadCount).toBe(1);
      expect(useNotificationStore.getState().isLoading).toBe(false);
      expect(useNotificationStore.getState().error).toBeNull();
    });

    it('handles fetch error', async () => {
      const error = new Error('Failed to fetch');
      (global.fetch as jest.Mock).mockRejectedValueOnce(error);

      await act(async () => {
        await useNotificationStore.getState().fetch();
      });

      expect(useNotificationStore.getState().error).toBe(error);
      expect(useNotificationStore.getState().isLoading).toBe(false);
    });
  });

  describe('markAsRead', () => {
    it('marks a notification as read', async () => {
      useNotificationStore.setState({
        notifications: [
          {
            id: '1',
            type: 'comment',
            title: 'Test',
            message: 'Test',
            createdAt: new Date(),
            read: false,
          },
        ],
        unreadCount: 1,
      });

      (global.fetch as jest.Mock).mockResolvedValueOnce({});

      await act(async () => {
        await useNotificationStore.getState().markAsRead('1');
      });

      expect(useNotificationStore.getState().notifications[0].read).toBe(true);
      expect(useNotificationStore.getState().unreadCount).toBe(0);
    });

    it('handles mark as read error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to mark as read'));

      await act(async () => {
        await useNotificationStore.getState().markAsRead('1');
      });

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('markAllAsRead', () => {
    it('marks all notifications as read', async () => {
      useNotificationStore.setState({
        notifications: [
          {
            id: '1',
            type: 'comment',
            title: 'Test 1',
            message: 'Test 1',
            createdAt: new Date(),
            read: false,
          },
          {
            id: '2',
            type: 'share',
            title: 'Test 2',
            message: 'Test 2',
            createdAt: new Date(),
            read: false,
          },
        ],
        unreadCount: 2,
      });

      (global.fetch as jest.Mock).mockResolvedValueOnce({});

      await act(async () => {
        await useNotificationStore.getState().markAllAsRead();
      });

      expect(useNotificationStore.getState().notifications.every(n => n.read)).toBe(true);
      expect(useNotificationStore.getState().unreadCount).toBe(0);
    });
  });

  describe('clear', () => {
    it('clears a single notification', async () => {
      useNotificationStore.setState({
        notifications: [
          {
            id: '1',
            type: 'comment',
            title: 'Test',
            message: 'Test',
            createdAt: new Date(),
            read: false,
          },
        ],
        unreadCount: 1,
      });

      (global.fetch as jest.Mock).mockResolvedValueOnce({});

      await act(async () => {
        await useNotificationStore.getState().clear('1');
      });

      expect(useNotificationStore.getState().notifications).toHaveLength(0);
      expect(useNotificationStore.getState().unreadCount).toBe(0);
    });
  });

  describe('clearAll', () => {
    it('clears all notifications', async () => {
      useNotificationStore.setState({
        notifications: [
          {
            id: '1',
            type: 'comment',
            title: 'Test 1',
            message: 'Test 1',
            createdAt: new Date(),
            read: false,
          },
          {
            id: '2',
            type: 'share',
            title: 'Test 2',
            message: 'Test 2',
            createdAt: new Date(),
            read: true,
          },
        ],
        unreadCount: 1,
      });

      (global.fetch as jest.Mock).mockResolvedValueOnce({});

      await act(async () => {
        await useNotificationStore.getState().clearAll();
      });

      expect(useNotificationStore.getState().notifications).toHaveLength(0);
      expect(useNotificationStore.getState().unreadCount).toBe(0);
    });
  });
}); 