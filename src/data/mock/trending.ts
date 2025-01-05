import { TrendingTopic } from "@/lib/types/trending";
import { subDays, subWeeks, subMonths } from "date-fns";

function generateTrendData(timeframe: "day" | "week" | "month") {
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
    name: "Large Language Models",
    score: 85,
    change: 12,
    count: 1250,
    timeframe: "week",
    sources: {
      papers: 145,
      repos: 230,
      articles: 450,
      discussions: 425,
    },
    relatedTopics: ["Transformers", "GPT-4", "NLP", "Prompt Engineering"],
    description:
      "Advanced AI models capable of understanding and generating human-like text, with recent breakthroughs in reasoning and task automation.",
    trendData: generateTrendData("week"),
  },
  {
    id: "topic-2",
    name: "AI Agents",
    score: 78,
    change: 25,
    count: 980,
    timeframe: "week",
    sources: {
      papers: 95,
      repos: 185,
      articles: 320,
      discussions: 380,
    },
    relatedTopics: ["Autonomous Systems", "Multi-Agent Learning", "Robotics"],
    description:
      "AI systems that can autonomously perform tasks, make decisions, and interact with their environment.",
    trendData: generateTrendData("week"),
  },
  {
    id: "topic-3",
    name: "Computer Vision",
    score: 72,
    change: -5,
    count: 850,
    timeframe: "week",
    sources: {
      papers: 120,
      repos: 195,
      articles: 280,
      discussions: 255,
    },
    relatedTopics: ["Object Detection", "Image Recognition", "Neural Networks"],
    description:
      "Systems that can process, analyze, and understand visual information from the world.",
    trendData: generateTrendData("week"),
  },
  {
    id: "topic-4",
    name: "AI Ethics",
    score: 68,
    change: 8,
    count: 720,
    timeframe: "week",
    sources: {
      papers: 85,
      repos: 120,
      articles: 290,
      discussions: 225,
    },
    relatedTopics: ["Bias", "Fairness", "Transparency", "Responsible AI"],
    description:
      "Ethical considerations and guidelines for AI development and deployment.",
    trendData: generateTrendData("week"),
  },
  {
    id: "topic-5",
    name: "Quantum ML",
    score: 65,
    change: 15,
    count: 580,
    timeframe: "week",
    sources: {
      papers: 75,
      repos: 95,
      articles: 180,
      discussions: 230,
    },
    relatedTopics: [
      "Quantum Computing",
      "Quantum Algorithms",
      "Hybrid Systems",
    ],
    description:
      "Integration of quantum computing principles with machine learning algorithms.",
    trendData: generateTrendData("week"),
  },
];
