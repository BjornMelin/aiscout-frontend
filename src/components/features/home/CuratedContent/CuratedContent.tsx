"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CuratedSection } from "@/components/features/home/CuratedSection/CuratedSection";
import { mockContent } from "@/data/mock/mock-content";
import type { ContentItem } from "@/lib/types/content";

export function CuratedContent() {
  const getCuratedContent = (type: ContentItem["type"]) => {
    return mockContent
      .filter((content) => content.type === type && content.featured)
      .slice(0, 2);
  };

  return (
    <Tabs defaultValue="paper" className="space-y-6">
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
