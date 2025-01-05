import { useInfiniteQuery } from "@tanstack/react-query";
import type { ContentItem, ContentType } from "@/lib/types/content";

interface FetchContentOptions {
  type?: ContentType;
  limit?: number;
  sort?: "popular" | "recent" | "trending";
  timeframe?: "day" | "week" | "month";
  page?: number;
}

export async function fetchCuratedContent({
  type,
  limit = 6,
  sort = "popular",
  timeframe = "week",
  page = 1,
}: FetchContentOptions = {}): Promise<ContentItem[]> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sort,
    timeframe,
    page: page.toString(),
    ...(type && { type }),
  });

  const response = await fetch(`/api/curated-content?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch curated content");
  }

  return response.json();
}

export function useCuratedContent(options: FetchContentOptions = {}) {
  return useInfiniteQuery({
    queryKey: ["curated-content", options],
    queryFn: ({ pageParam }) =>
      fetchCuratedContent({
        ...options,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < (options.limit ?? 6)) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}
