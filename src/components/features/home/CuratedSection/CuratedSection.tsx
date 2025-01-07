"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import type { ContentItem } from "@/lib/types/content";

interface CuratedSectionProps {
  /** Array of content items to display */
  items: ContentItem[];
  /** Type of content being displayed */
  type: ContentItem["type"];
}

/**
 * Card component for displaying individual content items
 */
function CuratedContentCard({ item }: { item: ContentItem }) {
  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <Link href={`/content/${item.type}/${item.id}`}>
        <CardContent className="p-6 space-y-4">
          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="mb-2">
                {item.type}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-xl font-semibold leading-tight">
              {item.title}
            </h3>
            <p className="text-muted-foreground line-clamp-5">
              {item.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2 justify-start">
            {item.tags.map((tag) => (
              <Badge key={tag.name} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>

          {/* Authors */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-4">
              {item.authors?.map((author, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={author.avatar || ''} alt={author.name} />
                    <AvatarFallback>{author.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{author.name}</span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            {item.type === "paper" && item.metrics.citations && (
              <Badge variant="secondary" className="text-xs">
                {item.metrics.citations} citations
              </Badge>
            )}
            {item.type === "repository" && item.metrics.stars && (
              <Badge variant="secondary" className="text-xs">
                {item.metrics.stars} stars
              </Badge>
            )}
            {item.type === "repository" && item.metrics.forks && (
              <Badge variant="secondary" className="text-xs">
                {item.metrics.forks} forks
              </Badge>
            )}
            {item.type === "article" && item.metrics.views && (
              <Badge variant="secondary" className="text-xs">
                {item.metrics.views} views
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

/**
 * CuratedSection component displays a grid of curated content items
 * @param props CuratedSectionProps
 * @returns React component
 */
export function CuratedSection({ items, type }: CuratedSectionProps) {
  return (
    <div className="space-y-6" data-testid="curated-section">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {items.map((item) => (
          <CuratedContentCard key={item.id} item={item} />
        ))}
      </div>
      <div className="text-center">
        <Button asChild>
          <Link href={`/search?type=${type}`}>
            View More {type.charAt(0).toUpperCase() + type.slice(1)}s
          </Link>
        </Button>
      </div>
    </div>
  );
}
