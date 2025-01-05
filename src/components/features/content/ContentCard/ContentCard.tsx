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

interface ContentCardProps {
  content: ContentItem;
  showActions?: boolean;
}

export function ContentCard({ content, showActions = true }: ContentCardProps) {
  const renderMetrics = () => {
    switch (content.type) {
      case "paper":
        return (
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {content.citations} citations
            </span>
          </div>
        );
      case "repo":
        return (
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {content.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-4 w-4" />
              {content.forks}
            </span>
          </div>
        );
      case "discussion":
        return (
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {content.participants} participants
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {content.metrics.comments} comments
            </span>
          </div>
        );
      default:
        return null;
    }
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
            <p className="text-sm text-muted-foreground mt-1">
              By {content.authors.map((author) => author.name).join(", ")}
            </p>
          </div>
          <div className="px-2 py-1 rounded-full bg-secondary text-xs font-medium">
            {content.type}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm line-clamp-3">{content.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {content.tags.map((tag) => (
            <div
              key={tag.id}
              className="px-2 py-1 rounded-full bg-secondary text-xs"
            >
              {tag.name}
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(content.date).toLocaleDateString()}
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
