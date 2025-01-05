import { NextResponse } from "next/server";
import type { NotificationData } from "@/lib/types/notification";

// Mock notifications data
const mockNotifications: NotificationData[] = [
  {
    id: "1",
    type: "share",
    title: "New Share",
    message: "John Doe shared a folder with you",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    actionUrl: "/folders/shared",
    metadata: {
      senderId: "user-1",
      senderName: "John Doe",
      folderId: "folder-1",
      folderName: "AI Research Papers",
    },
  },
  {
    id: "2",
    type: "comment",
    title: "New Comment",
    message: "Alice commented on your bookmark",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    actionUrl: "/bookmarks/1#comments",
    metadata: {
      senderId: "user-2",
      senderName: "Alice Smith",
      contentId: "bookmark-1",
    },
  },
  {
    id: "3",
    type: "system",
    title: "Welcome to AIScout",
    message:
      "Get started by exploring trending topics and creating your first collection",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    actionUrl: "/getting-started",
  },
];

// GET /api/notifications
export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({ notifications: mockNotifications });
}

// POST /api/notifications/:id/read
export async function POST(request: Request) {
  const id = request.url.split("/notifications/")[1]?.split("/")[0];

  if (!id) {
    return new NextResponse("Missing notification ID", { status: 400 });
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return new NextResponse(null, { status: 200 });
}

// DELETE /api/notifications
export async function DELETE() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return new NextResponse(null, { status: 200 });
}
