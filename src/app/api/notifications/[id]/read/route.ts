import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return new NextResponse("Missing notification ID", { status: 400 });
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return new NextResponse(null, { status: 200 });
}
