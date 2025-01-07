import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TrendingInsight } from "@/lib/types/trending";

interface TrendingInsightsProps {
  insights: TrendingInsight[];
  showViewAll?: boolean;
}

export function TrendingInsights({ insights, showViewAll = true }: TrendingInsightsProps) {
  return (
    <div className="space-y-4">
      {showViewAll && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Trending Insights</h2>
          </div>
          <Link href="/trending" className="text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
      <div className="space-y-3">
        {insights.map((insight) => (
          <Card key={insight.id}>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <Badge variant="outline">{insight.topic}</Badge>
                <p className="text-sm">{insight.insight}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{insight.source}</span>
                  <span>{new Date(insight.date).toLocaleDateString()}</span>
                  <Link href={insight.url} className="text-primary hover:underline flex items-center gap-1">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
