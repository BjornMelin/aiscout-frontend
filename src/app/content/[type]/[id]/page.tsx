"use client";

import { useState } from "react";
import { ContentDetail } from "@/components/features/content/ContentDetail/ContentDetail";
import { getContentById } from "@/lib/utils/content";
import { mockContent } from "@/data/mock/mock-content";
import { ContentType } from "@/lib/types/shared";
import { notFound } from "next/navigation";

interface ContentPageProps {
  params: {
    type: ContentType;
    id: string;
  };
}

export default function ContentPage({ params }: ContentPageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Find the content in the mock data
  const content = getContentById(mockContent, params.id);

  if (!content || content.type !== params.type) {
    notFound();
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark functionality
  };

  const handleShare = () => {
    // TODO: Implement share functionality
  };

  return (
    <main className="container py-8">
      <ContentDetail
        {...content}
        isBookmarked={isBookmarked}
        onBookmark={handleBookmark}
        onShare={handleShare}
      />
    </main>
  );
}
