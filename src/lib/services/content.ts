import { mockContent } from "@/data/mock/content";
import type { ContentItem } from "@/lib/types/content";
import { notFound } from "next/navigation";

export async function getContent(contentId: string): Promise<ContentItem> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const content = mockContent[contentId];
  if (!content) {
    notFound();
  }

  return content;
}

export async function getContentMetadata(contentId: string) {
  try {
    const content = await getContent(contentId);

    // Map content types to valid OpenGraph types
    const ogType = content.type === 'article' ? 'article' : 'website';

    return {
      title: `${content.title} - AIScout`,
      description: content.description,
      openGraph: {
        title: content.title,
        description: content.description,
        type: ogType,
        authors: content.authors.map((a) => a.name),
      },
    };
  } catch {
    return {
      title: "Content Not Found - AIScout",
      description: "The requested content could not be found.",
    };
  }
}
