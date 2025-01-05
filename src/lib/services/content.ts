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
  const content = await getContent(contentId);

  return {
    title: `${content.title} - AIScout`,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      type: "article",
      authors: content.authors.map((a) => a.name),
    },
  };
}
