import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PaperDetail } from "@/components/features/content/PaperDetail/PaperDetail";
import { RepoDetail } from "@/components/features/content/RepoDetail/RepoDetail";
import { ArticleDetail } from "@/components/features/content/ArticleDetail/ArticleDetail";
import { DiscussionDetail } from "@/components/features/content/DiscussionDetail/DiscussionDetail";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { getContent, getContentMetadata } from "@/lib/services/content";
import type { ContentItem } from "@/lib/types/content";
import type { Metadata } from "next";

interface ContentPageProps {
  params: {
    contentId: string;
  };
}

export async function generateMetadata({
  params,
}: ContentPageProps): Promise<Metadata> {
  try {
    return await getContentMetadata(params.contentId);
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Content Not Found - AIScout",
      description: "The requested content could not be found.",
    };
  }
}

function ContentDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-12 bg-muted rounded-lg animate-pulse" />
      <div className="h-6 bg-muted rounded-lg w-1/3 animate-pulse" />
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded-lg animate-pulse" />
        <div className="h-4 bg-muted rounded-lg animate-pulse" />
        <div className="h-4 bg-muted rounded-lg w-2/3 animate-pulse" />
      </div>
    </div>
  );
}

function ContentDetail({ content }: { content: ContentItem }) {
  switch (content.type) {
    case "paper":
      return <PaperDetail paper={content} />;
    case "repo":
      return <RepoDetail repo={content} />;
    case "article":
      return <ArticleDetail article={content} />;
    case "discussion":
      return <DiscussionDetail discussion={content} />;
    default:
      const _exhaustiveCheck: never = content;
      return _exhaustiveCheck;
  }
}

export default async function ContentPage({ params }: ContentPageProps) {
  let content: ContentItem;

  try {
    content = await getContent(params.contentId);
  } catch (error) {
    console.error("Failed to fetch content:", error);
    return notFound();
  }

  return (
    <div className="container py-8">
      <ErrorBoundary>
        <Suspense fallback={<ContentDetailSkeleton />}>
          <ContentDetail content={content} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
