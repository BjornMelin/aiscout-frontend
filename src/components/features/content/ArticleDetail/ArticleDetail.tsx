"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Clock,
  Link as LinkIcon,
  Eye,
  MessageSquare,
  Bookmark,
} from "lucide-react";
import { Markdown } from "@/components/common/Markdown";
import type { Article } from "@/lib/types/content";

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-sm">
            Article
          </div>
          <span className="text-muted-foreground">
            Published on {new Date(article.date).toLocaleDateString()}
          </span>
          {article.readTime && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {article.readTime} min read
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {article.authors.map((author) => (
          <div key={author.id} className="flex items-center gap-2">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-secondary" />
            )}
            <div>
              <p className="font-medium">{author.name}</p>
              {author.affiliation && (
                <p className="text-sm text-muted-foreground">
                  {author.affiliation}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button className="gap-2" asChild>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <LinkIcon className="h-4 w-4" />
            View Original
          </a>
        </Button>
        <Button variant="outline" className="gap-2">
          <Bookmark className="h-4 w-4" />
          Save
        </Button>
      </div>

      <div className="prose max-w-none">
        <Markdown>{article.content}</Markdown>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Views</p>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {article.metrics.views}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Comments</p>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {article.metrics.comments || 0}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Saves</p>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {/* TODO: Add saves count when available */}-
            </p>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <div
              key={tag.id}
              className="px-3 py-1 rounded-full bg-secondary text-sm"
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Source</h2>
        <p className="text-muted-foreground">
          Originally published on{" "}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {article.source}
          </a>
        </p>
      </div>
    </div>
  );
}
