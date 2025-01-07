import { TrendingTopic, TrendingTimeframe } from "@/lib/types/trending";
import { subDays, subWeeks, subMonths } from "date-fns";

function generateTrendData(timeframe: TrendingTimeframe) {
  const points = [];
  const now = new Date();
  let startDate;

  switch (timeframe) {
    case "day":
      startDate = subDays(now, 1);
      break;
    case "week":
      startDate = subWeeks(now, 1);
      break;
    case "month":
      startDate = subMonths(now, 1);
      break;
  }

  let currentDate = startDate;
  while (currentDate <= now) {
    points.push({
      timestamp: currentDate.toISOString(),
      value: Math.floor(Math.random() * 50) + 50, // Random value between 50-100
    });
    // Add 1 hour
    currentDate = new Date(currentDate.getTime() + 3600000);
  }

  return points;
}

export const mockTrendingTopics: TrendingTopic[] = [
  {
    id: "topic-1",
    title: "Large Language Models",
    description: "Advanced AI models capable of understanding and generating human-like text",
    tags: [
      { id: "tag-1", name: "Transformers" },
      { id: "tag-2", name: "GPT-4" },
      { id: "tag-3", name: "NLP" },
    ],
    sources: {
      papers: 145,
      repos: 230,
      articles: 450,
      discussions: 425,
    },
    relatedContent: {
      papers: 145,
      repositories: 230,
      articles: 450,
      discussions: 425,
    },
    trendData: generateTrendData("week"),
    topicMetrics: {
      totalMentions: 1250,
      paperCitations: 7500,
      repoStars: 15000,
      discussionEngagement: 4500,
    },
    trendMetrics: {
      score: 85,
      change: 12,
      timeframe: "week",
      count: 1250,
    },
  },
  {
    id: "topic-2",
    title: "AI Agents",
    description: "AI systems that can autonomously perform tasks and make decisions",
    tags: [
      { id: "tag-4", name: "Autonomous Systems" },
      { id: "tag-5", name: "Multi-Agent Learning" },
      { id: "tag-6", name: "Robotics" },
    ],
    sources: {
      papers: 95,
      repos: 185,
      articles: 320,
      discussions: 380,
    },
    relatedContent: {
      papers: 95,
      repositories: 185,
      articles: 320,
      discussions: 380,
    },
    trendData: generateTrendData("week"),
    topicMetrics: {
      totalMentions: 980,
      paperCitations: 4200,
      repoStars: 12000,
      discussionEngagement: 3800,
    },
    trendMetrics: {
      score: 78,
      change: 25,
      timeframe: "week",
      count: 980,
    },
  },
  {
    id: "topic-3",
    title: "Computer Vision",
    description: "Systems that can process and understand visual information",
    tags: [
      { id: "tag-7", name: "Object Detection" },
      { id: "tag-8", name: "Image Recognition" },
      { id: "tag-9", name: "Neural Networks" },
    ],
    sources: {
      papers: 120,
      repos: 195,
      articles: 280,
      discussions: 255,
    },
    relatedContent: {
      papers: 120,
      repositories: 195,
      articles: 280,
      discussions: 255,
    },
    trendData: generateTrendData("week"),
    topicMetrics: {
      totalMentions: 850,
      paperCitations: 5600,
      repoStars: 9800,
      discussionEngagement: 2900,
    },
    trendMetrics: {
      score: 72,
      change: -5,
      timeframe: "week",
      count: 850,
    },
  },
];
