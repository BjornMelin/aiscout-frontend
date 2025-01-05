import { toast } from 'sonner';
import type { NotificationData } from '../types/notification';
import { useNotificationStore } from '../store/notifications';

export function showNotificationToast(notification: NotificationData) {
  toast(notification.title, {
    description: notification.message,
    action: notification.actionUrl
      ? {
          label: 'View',
          onClick: () => window.location.href = notification.actionUrl!,
        }
      : undefined,
  });
}

export function setupNotificationWebSocket() {
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
  if (!wsUrl) {
    console.error('WebSocket URL not configured');
    return null;
  }

  const ws = new WebSocket(wsUrl);
  
  ws.onmessage = (event) => {
    try {
      const notification = JSON.parse(event.data);
      const store = useNotificationStore.getState();

      // Update store
      store.notifications.unshift(notification);
      if (!notification.read) {
        store.unreadCount += 1;
      }
      
      // Show toast
      showNotificationToast(notification);
    } catch (error) {
      console.error('Failed to process notification:', error);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
    // Attempt to reconnect after 5 seconds
    setTimeout(() => setupNotificationWebSocket(), 5000);
  };
  
  return ws;
} 