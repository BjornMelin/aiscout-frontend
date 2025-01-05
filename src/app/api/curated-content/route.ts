import { NextResponse } from "next/server";
import { mockCuratedContent } from "@/data/mock/curated-content";
import type { ContentType } from "@/lib/types/content";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as ContentType | null;
    const limit = parseInt(searchParams.get("limit") || "6", 10);
    const sort = searchParams.get("sort") || "popular";
    const timeframe = searchParams.get("timeframe") || "week";

    const timeframeMs = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
    }[timeframe] as number;

    const content = type 
      ? { [type + 's']: mockCuratedContent[type + 's' as keyof typeof mockCuratedContent] }
      : { ...mockCuratedContent };

    Object.keys(content).forEach(key => {
      content[key as keyof typeof content] = content[key as keyof typeof content]
        .filter(item => new Date(item.date).getTime() > Date.now() - timeframeMs)
        .sort((a, b) => {
          if (sort === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime();
          return b.metrics.views - a.metrics.views;
        })
        .slice(0, limit);
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching curated content:", error);
    return NextResponse.json(
      { error: "Failed to fetch curated content" },
      { status: 500 }
    );
  }
}
