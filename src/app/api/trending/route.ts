import { NextResponse } from "next/server";
import { mockTrendingTopics } from "@/data/mock/mock-trending";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export async function GET(request: Request) {
  try {
    // Get timeframe from query params
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get("timeframe") || "week";

    if (USE_MOCK_DATA) {
      // Return mock data with the correct timeframe
      const topics = mockTrendingTopics.map((topic) => ({
        ...topic,
        timeframe,
        trendData: topic.trendData.map((point) => ({
          ...point,
          value: Math.floor(Math.random() * 50) + 50, // Randomize values for visual effect
        })),
      }));
      return NextResponse.json({ topics });
    }

    // Forward the request to FastAPI backend
    const response = await fetch(
      `${API_BASE_URL}/api/trending?timeframe=${timeframe}`,
      {
        headers: {
          "Content-Type": "application/json",
          // Forward any auth headers if needed
          ...(request.headers.get("authorization")
            ? { Authorization: request.headers.get("authorization")! }
            : {}),
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.detail || "Failed to fetch trending topics" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in trending API:", error);

    // Fallback to mock data in case of error
    const topics = mockTrendingTopics;
    return NextResponse.json({ topics });
  }
}
