import { NextResponse } from "next/server";
import { getContent } from "@/lib/services/content";

const mockCuratedContent = {
  featured: {
    title: "Featured Content",
    items: ["paper-1", "repo-1"],
  },
  trending: {
    title: "Trending This Week",
    items: ["repo-1", "paper-1"],
  },
  latest: {
    title: "Latest Additions",
    items: ["paper-1"],
  },
};

export async function GET() {
  try {
    // Fetch full content for each section
    const sections = await Promise.all(
      Object.entries(mockCuratedContent).map(async ([key, section]) => {
        const items = await Promise.all(
          section.items.map(id => getContent(id))
        );
        return [key, { ...section, items }];
      })
    );

    return NextResponse.json(Object.fromEntries(sections));
  } catch (error) {
    console.error("Failed to fetch curated content:", error);
    return NextResponse.json(
      { error: "Failed to fetch curated content" },
      { status: 500 }
    );
  }
}
