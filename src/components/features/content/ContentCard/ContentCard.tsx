import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Star,
  GitFork,
  MessageSquare,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import type { ContentItem } from "@/lib/types/content";
import { isPaper, isRepository, isDiscussion } from "@/lib/types/content";
import { formatContentDate } from "@/lib/services/content";

interface ContentCardProps {
  content: ContentItem;
  showActions?: boolean;
}

export function ContentCard({ content, showActions = true }: ContentCardProps) {
  const renderMetrics = () => {
    if (isPaper(content) && content.metrics?.citations) {
      return (
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            {content.metrics.citations.toLocaleString()} citations
          </span>
        </div>
      );
    }

    if (isRepository(content)) {
      return (
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            {content.stars.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            {content.forks.toLocaleString()}
          </span>
        </div>
      );
    }

    if (isDiscussion(content)) {
      return (
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {content.participants.toLocaleString()} participants
          </span>
          {content.metrics?.comments && (
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {content.metrics.comments.toLocaleString()} comments
            </span>
          )}
        </div>
      );
    }

    return null;
  };

  const renderAuthor = () => {
    if (isPaper(content)) {
      return (
        <p className="text-sm text-muted-foreground mt-1">
          By {content.authors.map((author) => author.name).join(", ")}
        </p>
      );
    }

    return (
      <p className="text-sm text-muted-foreground mt-1">
        By {content.author.name}
      </p>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Link
              href={`/content/${content.id}`}
              className="text-xl font-semibold hover:text-primary transition-colors"
            >
              {content.title}
            </Link>
            {renderAuthor()}
          </div>
          <div className="px-2 py-1 rounded-full bg-secondary text-xs font-medium capitalize">
            {content.type}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm line-clamp-3">{content.description}</p>

        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {content.tags.map((tag) => (
              <div
                key={tag}
                className="px-2 py-1 rounded-full bg-secondary text-xs"
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatContentDate(content.createdAt)}
          </span>
          {content.url && (
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <LinkIcon className="h-4 w-4" />
              View source
            </a>
          )}
        </div>

        {renderMetrics()}
      </CardFooter>

      {showActions && (
        <CardFooter className="pt-0">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Save
            </Button>
            <Button variant="outline" size="sm">
              Share
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
