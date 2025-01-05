import type { ContentItem, ContentType } from "../types/content";
import { isPaper } from "../types/content";
import {
  DocumentTextIcon,
  CodeBracketIcon,
  NewspaperIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

// Mock data for development
const mockContent: Record<string, ContentItem> = {
  "paper-1": {
    id: "paper-1",
    type: "paper",
    title: "Understanding Deep Learning Requires Rethinking Generalization",
    description:
      "A groundbreaking paper that challenges conventional wisdom about how neural networks learn.",
    url: "/papers/paper-1",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    author: {
      name: "Chiyuan Zhang",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=CZ",
    },
    metrics: {
      views: 50000,
      likes: 2500,
      comments: 150,
      citations: 3500,
    },
    authors: [
      { name: "Chiyuan Zhang", affiliation: "MIT" },
      { name: "Samy Bengio", affiliation: "Google Research" },
    ],
    abstract:
      "Deep learning has enabled remarkable progress over the last years in computer vision, speech recognition, and other domains...",
    doi: "10.1234/example.doi",
    journal: "ICLR 2017",
    publishedDate: "2017-03-15T00:00:00Z",
    tags: ["Deep Learning", "Machine Learning Theory"],
  },
  "repo-1": {
    id: "repo-1",
    type: "repository",
    title: "transformers",
    description:
      "State-of-the-art Natural Language Processing for PyTorch and TensorFlow 2.0",
    url: "https://github.com/huggingface/transformers",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
    author: {
      name: "Hugging Face",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=HF",
    },
    metrics: {
      views: 1000000,
      likes: 45000,
      comments: 2000,
    },
    owner: "huggingface",
    language: "Python",
    stars: 45000,
    forks: 10000,
    lastCommit: "2024-01-05T00:00:00Z",
    readme:
      "# 🤗 Transformers\n\nState-of-the-art Natural Language Processing...",
    tags: ["NLP", "Deep Learning", "Python"],
  },
};

// Data fetching functions
export async function getContent(id: string): Promise<ContentItem> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const content = mockContent[id];
  if (!content) {
    throw new Error("Content not found");
  }

  return content;
}

export async function getCitationData(content: ContentItem) {
  if (!isPaper(content)) {
    throw new Error("Content is not a paper");
  }

  return {
    title: content.title,
    authors: content.authors,
    journal: content.journal,
    doi: content.doi,
    publishedDate: content.publishedDate,
  };
}

// UI helper functions
export function getContentIcon(type: ContentType) {
  switch (type) {
    case "paper":
      return DocumentTextIcon;
    case "repository":
      return CodeBracketIcon;
    case "article":
      return NewspaperIcon;
    case "discussion":
      return ChatBubbleLeftRightIcon;
  }
}

export function getContentTypeLabel(type: ContentType): string {
  switch (type) {
    case "paper":
      return "Research Paper";
    case "repository":
      return "Repository";
    case "article":
      return "Article";
    case "discussion":
      return "Discussion";
  }
}

// Formatting functions
export function formatContentDate(date: string): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formatter.format(new Date(date));
}

export function summarizeContent(content: ContentItem): string {
  const parts = [content.title];

  if (content.author) {
    parts.push(`by ${content.author.name}`);
  }

  if (content.metrics?.views) {
    parts.push(`${content.metrics.views.toLocaleString()} views`);
  }

  return parts.join(" • ");
}
