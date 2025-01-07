"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CuratedSection } from "@/components/features/home/CuratedSection/CuratedSection";
import { mockContent } from "@/data/mock/mock-content";
import type { ContentItem } from "@/lib/types/content";

interface CuratedContentProps {
  /** Whether the content is currently loading */
  isLoading?: boolean;
  /** Error object if content loading failed */
  error?: Error;
  /** Callback function to retry loading content */
  onRetry?: () => void;
}

/**
 * CuratedContent component displays a tabbed interface of curated content by type
 * @param props CuratedContentProps
 * @returns React component
 */
export function CuratedContent({}: CuratedContentProps) {
  const [activeTab, setActiveTab] = React.useState<string>("paper");

  const getCuratedContent = (type: ContentItem["type"]) => {
    return mockContent
      .filter((content) => content.type === type && content.featured)
      .slice(0, 2);
  };

  return (
    <Tabs
      defaultValue="paper"
      className="space-y-6"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="paper">Papers</TabsTrigger>
        <TabsTrigger value="repository">Repos</TabsTrigger>
        <TabsTrigger value="article">Articles</TabsTrigger>
        <TabsTrigger value="discussion">Discussions</TabsTrigger>
      </TabsList>
      <TabsContent value="paper">
        <CuratedSection type="paper" items={getCuratedContent("paper")} />
      </TabsContent>
      <TabsContent value="repository">
        <CuratedSection
          type="repository"
          items={getCuratedContent("repository")}
        />
      </TabsContent>
      <TabsContent value="article">
        <CuratedSection type="article" items={getCuratedContent("article")} />
      </TabsContent>
      <TabsContent value="discussion">
        <CuratedSection
          type="discussion"
          items={getCuratedContent("discussion")}
        />
      </TabsContent>
    </Tabs>
  );
}
