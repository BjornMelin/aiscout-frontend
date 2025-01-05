import { NextResponse } from "next/server";

export async function POST() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return new NextResponse(null, { status: 200 });
}
