import { NextResponse } from "next/server";
// import type { NotificationData } from "@/lib/types/notification";
import { mockNotifications } from "@/data/mock/notifications";

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
