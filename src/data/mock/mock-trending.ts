import { TrendingTopic, TrendingTimeframe, TrendingContent, TrendingMetrics } from "@/lib/types/trending";
import { ContentItem } from "@/lib/types/content";
import { mockContent } from "./mock-content";
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
      score: 95,
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
      score: 92,
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
      score: 88,
      change: 15,
      timeframe: "week",
      count: 850,
    },
  },
  {
    id: "topic-4",
    title: "Diffusion Models",
    description: "Advanced generative models for creating high-quality images and content",
    tags: [
      { id: "tag-10", name: "Image Generation" },
      { id: "tag-11", name: "Stable Diffusion" },
      { id: "tag-12", name: "Deep Learning" },
    ],
    sources: {
      papers: 85,
      repos: 150,
      articles: 290,
      discussions: 320,
    },
    relatedContent: {
      papers: 85,
      repositories: 150,
      articles: 290,
      discussions: 320,
    },
    trendData: generateTrendData("week"),
    topicMetrics: {
      totalMentions: 845,
      paperCitations: 3200,
      repoStars: 8500,
      discussionEngagement: 3200,
    },
    trendMetrics: {
      score: 86,
      change: 18,
      timeframe: "week",
      count: 845,
    },
  },
  {
    id: "topic-5",
    title: "Reinforcement Learning",
    description: "Learning through interaction with environments and reward systems",
    tags: [
      { id: "tag-13", name: "RL" },
      { id: "tag-14", name: "Deep RL" },
      { id: "tag-15", name: "Game AI" },
    ],
    sources: {
      papers: 110,
      repos: 175,
      articles: 220,
      discussions: 280,
    },
    relatedContent: {
      papers: 110,
      repositories: 175,
      articles: 220,
      discussions: 280,
    },
    trendData: generateTrendData("week"),
    topicMetrics: {
      totalMentions: 785,
      paperCitations: 4100,
      repoStars: 7800,
      discussionEngagement: 2800,
    },
    trendMetrics: {
      score: 84,
      change: 10,
      timeframe: "week",
      count: 785,
    },
  },
  {
    id: "topic-6",
    title: "AI Ethics",
    description: "Ethical considerations and responsible development of AI systems",
    tags: [
      { id: "tag-16", name: "Responsible AI" },
      { id: "tag-17", name: "AI Safety" },
      { id: "tag-18", name: "AI Policy" },
    ],
    sources: {
      papers: 75,
      repos: 90,
      articles: 380,
      discussions: 450,
    },
    relatedContent: {
      papers: 75,
      repositories: 90,
      articles: 380,
      discussions: 450,
    },
    trendData: generateTrendData("week"),
    topicMetrics: {
      totalMentions: 995,
      paperCitations: 2800,
      repoStars: 4500,
      discussionEngagement: 4500,
    },
    trendMetrics: {
      score: 82,
      change: 22,
      timeframe: "week",
      count: 995,
    },
  },
  {
    id: "topic-7",
    title: "Neural Networks",
    description: "Fundamental building blocks of modern AI systems",
    tags: [
      { id: "tag-19", name: "Deep Learning" },
      { id: "tag-20", name: "Machine Learning" },
      { id: "tag-21", name: "AI" },
    ],
    sources: {
      papers: 130,
      repos: 210,
      articles: 310,
      discussions: 290,
    },
    relatedContent: {
      papers: 130,
      repositories: 210,
      articles: 310,
      discussions: 290,
    },
    trendData: generateTrendData("week"),
    topicMetrics: {
      totalMentions: 940,
      paperCitations: 5200,
      repoStars: 9200,
      discussionEngagement: 2900,
    },
    trendMetrics: {
      score: 80,
      change: 8,
      timeframe: "week",
      count: 940,
    },
  },
  {
    id: "topic-8",
    title: "MLOps",
    description: "Machine Learning Operations and deployment practices",
    tags: [
      { id: "tag-22", name: "DevOps" },
      { id: "tag-23", name: "ML Engineering" },
      { id: "tag-24", name: "Production AI" },
    ],
    sources: {
      papers: 45,
      repos: 280,
      articles: 250,
      discussions: 320,
    },
    relatedContent: {
      papers: 45,
      repositories: 280,
      articles: 250,
      discussions: 320,
    },
    trendData: generateTrendData("week"),
    topicMetrics: {
      totalMentions: 895,
      paperCitations: 1800,
      repoStars: 11000,
      discussionEngagement: 3200,
    },
    trendMetrics: {
      score: 78,
      change: 30,
      timeframe: "week",
      count: 895,
    },
  },
  {
    id: "topic-9",
    title: "Edge AI",
    description: "AI systems that run on edge devices and IoT",
    tags: [
      { id: "tag-25", name: "IoT" },
      { id: "tag-26", name: "Edge Computing" },
      { id: "tag-27", name: "Mobile AI" },
    ],
    sources: {
      papers: 65,
      repos: 155,
      articles: 190,
      discussions: 210,
    },
    relatedContent: {
      papers: 65,
      repositories: 155,
      articles: 190,
      discussions: 210,
    },
    trendData: generateTrendData("week"),
    topicMetrics: {
      totalMentions: 620,
      paperCitations: 2200,
      repoStars: 6500,
      discussionEngagement: 2100,
    },
    trendMetrics: {
      score: 76,
      change: 15,
      timeframe: "week",
      count: 620,
    },
  },
  {
    id: "topic-10",
    title: "AI Hardware",
    description: "Specialized hardware and chips for AI computation",
    tags: [
      { id: "tag-28", name: "GPU" },
      { id: "tag-29", name: "TPU" },
      { id: "tag-30", name: "AI Accelerators" },
    ],
    sources: {
      papers: 55,
      repos: 120,
      articles: 180,
      discussions: 195,
    },
    relatedContent: {
      papers: 55,
      repositories: 120,
      articles: 180,
      discussions: 195,
    },
    trendData: generateTrendData("week"),
    topicMetrics: {
      totalMentions: 550,
      paperCitations: 1900,
      repoStars: 5500,
      discussionEngagement: 1950,
    },
    trendMetrics: {
      score: 74,
      change: 5,
      timeframe: "week",
      count: 550,
    },
  },
];

// Function to calculate trending metrics based on content metrics
function calculateTrendingMetrics(content: ContentItem): TrendingMetrics {
  const baseScore = content.metrics.views / 1000;
  const citationScore = content.metrics?.citations ? content.metrics.citations / 100 : 0;
  const starsScore = content.metrics?.stars ? content.metrics.stars / 100 : 0;
  const score = Math.min(100, Math.round(baseScore + citationScore + starsScore));
  
  return {
    score,
    change: Math.floor(Math.random() * 40) - 20,
    timeframe: "week",
    count: content.metrics.views
  };
}

// Get top trending content from mock content
export const mockTrendingContent: TrendingContent[] = mockContent
  .map(content => ({
    ...content,
    trendMetrics: calculateTrendingMetrics(content)
  }))
  .sort((a, b) => b.trendMetrics.score - a.trendMetrics.score)
  .slice(0, 10);
