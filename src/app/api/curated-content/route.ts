import { NextResponse } from "next/server";
import type {
  ContentType,
  CuratedContent,
  ContentItem,
} from "@/lib/types/content";
import { mockCuratedContent } from "@/data/mock/curated";

export async function GET(request: Request) {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as ContentType | null;
    const limit = Number(searchParams.get("limit")) || 6;
    const sort = searchParams.get("sort") as
      | "popular"
      | "recent"
      | "trending"
      | null;
    const timeframe = searchParams.get("timeframe") as
      | "day"
      | "week"
      | "month"
      | null;

    // Validate type if provided
    if (
      type &&
      !["paper", "repository", "article", "discussion"].includes(type)
    ) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    // Return filtered and sorted content
    if (type) {
      const contentSection =
        mockCuratedContent[`${type}s` as keyof CuratedContent];
      const sortedContent = sort
        ? sortContent(contentSection, sort, timeframe)
        : contentSection;

      return NextResponse.json(sortedContent.slice(0, limit));
    }

    // Return all content with limits applied
    const limitedContent: CuratedContent = {
      papers: mockCuratedContent.papers.slice(0, limit),
      repositories: mockCuratedContent.repositories.slice(0, limit),
      articles: mockCuratedContent.articles.slice(0, limit),
      discussions: mockCuratedContent.discussions.slice(0, limit),
    };

    return NextResponse.json(limitedContent);
  } catch (error) {
    console.error("Error in curated content API:", error);
    return NextResponse.json(
      { error: "Failed to fetch curated content" },
      { status: 500 }
    );
  }
}

function sortContent(
  content: ContentItem[],
  sort: "popular" | "recent" | "trending",
  timeframe: "day" | "week" | "month" | null
): ContentItem[] {
  const now = new Date();
  const timeframeDays = timeframe === "day" ? 1 : timeframe === "week" ? 7 : 30;
  const cutoff = new Date(now.getTime() - timeframeDays * 24 * 60 * 60 * 1000);

  const filteredContent = timeframe
    ? content.filter((item) => new Date(item.createdAt) >= cutoff)
    : content;

  return [...filteredContent].sort((a, b) => {
    switch (sort) {
      case "popular":
        return (b.metrics?.views || 0) - (a.metrics?.views || 0);
      case "recent":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "trending":
        return (b.metrics?.likes || 0) - (a.metrics?.likes || 0);
      default:
        return 0;
    }
  });
}
