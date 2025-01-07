import Link from "next/link";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { TrendingTopic, TrendingContent } from "@/lib/types/trending";

interface TrendingContentCardProps {
  content: TrendingContent | TrendingTopic;
  showFullDescription?: boolean;
}

export function TrendingContentCard({
  content,
  showFullDescription = false,
}: TrendingContentCardProps) {
  const isTopic = !('type' in content);
  
  const contentUrl = isTopic
    ? `/search?topic=${encodeURIComponent(content.title)}`
    : `/content/${content.id}`;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div>
              <Link href={contentUrl}>
                <h3 className="font-semibold mb-1 hover:text-primary">
                  {content.title}
                </h3>
              </Link>
              <p
                className={`text-sm text-muted-foreground ${
                  !showFullDescription && "line-clamp-2"
                }`}
              >
                {content.description}
              </p>
            </div>
            <div className="flex gap-2">
              {!isTopic && <Badge variant="outline">{content.type}</Badge>}
              {content.tags.map((tag) => (
                <Badge key={tag.name} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
            {!isTopic && content.authors && (
              <p className="text-sm text-muted-foreground">
                By {content.authors[0].name}
                {content.authors.length > 1 &&
                  ` and ${content.authors.length - 1} others`}{" "}
                · {new Date(content.date).toLocaleDateString()}
              </p>
            )}
            {isTopic && (
              <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div>
                  <p>Papers</p>
                  <p className="font-medium text-foreground">
                    {content.relatedContent.papers}
                  </p>
                </div>
                <div>
                  <p>Repositories</p>
                  <p className="font-medium text-foreground">
                    {content.relatedContent.repositories}
                  </p>
                </div>
                <div>
                  <p>Discussions</p>
                  <p className="font-medium text-foreground">
                    {content.relatedContent.discussions}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-2">
              {content.trendMetrics.change > 0 ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={
                  content.trendMetrics.change > 0 ? "text-green-500" : "text-red-500"
                }
              >
                {Math.abs(content.trendMetrics.change)}%
              </span>
            </div>
            <Progress value={content.trendMetrics.score} className="w-32" />
            <p className="text-sm text-muted-foreground mt-1">
              Trend Score: {content.trendMetrics.score}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
