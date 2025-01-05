"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHomePageStore } from "@/lib/store/home";
import { ContentCard } from "@/components/features/content/ContentCard/ContentCard";

function CuratedContentSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-48 bg-muted rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
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
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold mb-2">Failed to load content</h3>
      <p className="text-muted-foreground mb-4">{error.message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Try again
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

  if (isLoading) {
    return <CuratedContentSkeleton />;
  }

  if (error) {
    return <CuratedContentError error={error} onRetry={fetch} />;
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
      </Tabs>
    </section>
  );
}
