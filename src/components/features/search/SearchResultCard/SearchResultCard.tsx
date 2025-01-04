"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Calendar,
  Tag,
  Link as LinkIcon,
  Star,
  MessageSquare,
  Quote,
} from "lucide-react";
import type { SearchResult } from "@/lib/types/search";

export function SearchResultCard({
  id,
  type,
  title,
  description,
  authors,
  date,
  tags,
  source,
  sourceUrl,
  metrics,
}: SearchResult) {
  const renderMetricIcon = (type: string) => {
    switch (type) {
      case "citations":
        return <Quote className="h-4 w-4" />;
      case "stars":
        return <Star className="h-4 w-4" />;
      case "comments":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </div>
            <Link
              href={`/content/${id}`}
              className="text-xl font-semibold hover:text-primary transition-colors"
            >
              {title}
            </Link>
            {authors && authors.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                By {authors.join(", ")}
              </p>
            )}
          </div>

          <p className="text-sm line-clamp-3">{description}</p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center text-xs bg-secondary px-2 py-1 rounded"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(date).toLocaleDateString()}
          </div>
          {source && (
            <div className="flex items-center">
              <LinkIcon className="h-4 w-4 mr-1" />
              {sourceUrl ? (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {source}
                </a>
              ) : (
                source
              )}
            </div>
          )}
        </div>

        {metrics && Object.keys(metrics).length > 0 && (
          <div className="flex items-center gap-4">
            {Object.entries(metrics).map(
              ([key, value]) =>
                value !== undefined && (
                  <div key={key} className="flex items-center gap-1">
                    {renderMetricIcon(key)}
                    <span>{value.toLocaleString()}</span>
                  </div>
                )
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
