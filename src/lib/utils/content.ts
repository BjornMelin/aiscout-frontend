import type { ContentItem } from "@/lib/types/content";
import type {
  TrendingContent,
  TrendingTopic,
  TrendingMetrics,
} from "@/lib/types/trending";
import { mockContent } from "@/data/mock/mock-content";

export interface ContentSection {
  id: string;
  title: string;
  description?: string;
  items: ContentItem[];
}

export const getContentById = (
  contents: ContentItem[],
  id: string
): ContentItem | undefined => {
  return contents.find((item) => item.id === id);
};

export const getContentByType = (
  contents: ContentItem[],
  type: ContentItem["type"]
): ContentItem[] => {
  return contents.filter((item) => item.type === type);
};

export const getFeaturedContent = (contents: ContentItem[]): ContentItem[] => {
  return contents.filter((item) => item.featured);
};

function calculateTrendingMetrics(content: ContentItem): TrendingMetrics {
  // In a real application, you would:
  // 1. Calculate trending score based on views, likes, shares in last 24h/7d
  // 2. Calculate change percent based on previous period's engagement
  // 3. Determine timeframe based on data availability
  const score =
    content.metrics.views * 10 +
    (content.metrics.stars || 0) * 5 +
    (content.metrics.citations || 0) * 3;

  return {
    score: Math.min(100, Math.floor(score / 10)),
    change: Math.floor(Math.random() * 40) - 20,
    timeframe: "day" as const,
  };
}

export function getTrendingContent(limit?: number): TrendingContent[] {
  const trendingContent = mockContent
    .map((content) => {
      const metrics = calculateTrendingMetrics(content);
      return {
        ...content,
        ...metrics,
      } as TrendingContent;
    })
    .sort((a, b) => b.trendingScore - a.trendingScore);

  return limit ? trendingContent.slice(0, limit) : trendingContent;
}

export function getTrendingTopics(
  contents: ContentItem[] = mockContent,
  limit?: number
): TrendingTopic[] {
  const topicScores = new Map<
    string,
    {
      score: number;
      content: ContentItem[];
      relatedCount: {
        papers: number;
        repositories: number;
        discussions: number;
      };
    }
  >();

  contents.forEach((content) => {
    content.tags.forEach((tag) => {
      const existing = topicScores.get(tag);
      if (existing) {
        existing.score += content.metrics.views;
        existing.content.push(content);
        existing.relatedCount[
          content.type === "paper"
            ? "papers"
            : content.type === "repository"
            ? "repositories"
            : "discussions"
        ] += 1;
      } else {
        topicScores.set(tag, {
          score: content.metrics.views,
          content: [content],
          relatedCount: {
            papers: content.type === "paper" ? 1 : 0,
            repositories: content.type === "repository" ? 1 : 0,
            discussions:
              content.type === "discussion" || content.type === "article"
                ? 1
                : 0,
          },
        });
      }
    });
  });

  const trendingTopics = Array.from(topicScores.entries())
    .map(
      ([tag, data]): TrendingTopic => ({
        id: tag,
        title: tag,
        description: `Trending content about ${tag}`,
        trendingScore: Math.round(data.score / data.content.length),
        changePercent: Math.floor(Math.random() * 40) - 20,
        timeframe: "day",
        tags: Array.from(new Set(data.content.flatMap((c) => c.tags))).filter(
          (t) => t !== tag
        ),
        relatedContent: data.relatedCount,
      })
    )
    .sort((a, b) => b.trendingScore - a.trendingScore);

  return limit ? trendingTopics.slice(0, limit) : trendingTopics;
}

export const searchContent = (
  contents: Content[],
  query: string
): Content[] => {
  const lowercaseQuery = query.toLowerCase();
  return contents.filter(
    (item) =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRelatedContent = (
  contents: Content[],
  contentId: string
): Content[] => {
  const content = getContentById(contents, contentId);
  if (!content?.relatedContent) return [];

  return content.relatedContent
    .map((related) => getContentById(contents, related.id))
    .filter((item): item is Content => !!item);
};

export const getContentSections = (contents: Content[]): ContentSection[] => {
  return [
    {
      id: "trending",
      title: "Trending Now",
      description: "Most popular content in AI/ML right now",
      items: getTrendingContent(6),
    },
    {
      id: "featured",
      title: "Featured Content",
      description: "Curated selection of must-read content",
      items: getFeaturedContent(contents),
    },
    {
      id: "latest",
      title: "Latest Additions",
      description: "Recently added content",
      items: [...contents]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6),
    },
  ];
};
