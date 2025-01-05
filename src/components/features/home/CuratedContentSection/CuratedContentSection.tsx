"use client";

import React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useHomePageStore } from "@/lib/store/home";
import type { ContentItem } from "@/lib/types/content";

function CuratedContentSkeleton() {
  return (
    <div className="space-y-8" data-testid="curated-content-skeleton">
      <div className="h-10 w-48 bg-muted rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function ContentCard({ content }: { content: ContentItem }) {
  return (
    <Card className="p-6 hover:bg-accent transition-colors">
      <h3 className="font-semibold mb-2 line-clamp-2">{content.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
        {content.description}
      </p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {content.author.avatar && (
            <Image
              src={content.author.avatar}
              alt={content.author.name}
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
          <span>{content.author.name}</span>
        </div>
        {content.metrics && (
          <div className="flex items-center gap-4">
            {content.metrics.views && (
              <span>{content.metrics.views} views</span>
            )}
            {content.metrics.likes && (
              <span>{content.metrics.likes} likes</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

function CuratedContentError({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) {
  return (
    <div className="text-center py-8">
      <p className="text-destructive mb-4">{error.message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Try Again
      </button>
    </div>
  );
}

export function CuratedContentSection() {
  const { curatedContent, isLoading, error, activeTab, setActiveTab, fetch } =
    useHomePageStore();

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  if (error) {
    return <CuratedContentError error={error} onRetry={fetch} />;
  }

  if (isLoading) {
    return <CuratedContentSkeleton />;
  }

  return (
    <section className="space-y-8" data-testid="curated-content">
      <h2 className="text-3xl font-bold tracking-tight">Popular Content</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="papers">Research Papers</TabsTrigger>
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="papers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {curatedContent.papers.map((paper) => (
                <ContentCard key={paper.id} content={paper} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="repositories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {curatedContent.repositories.map((repo) => (
                <ContentCard key={repo.id} content={repo} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {curatedContent.articles.map((article) => (
                <ContentCard key={article.id} content={article} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discussions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {curatedContent.discussions.map((discussion) => (
                <ContentCard key={discussion.id} content={discussion} />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
