import type { CuratedContent } from "@/lib/types/content";

export const mockCuratedContent: CuratedContent = {
  papers: [
    {
      id: "1",
      type: "paper",
      title: "GPT-4: Architecture, Infrastructure, and Training Process",
      description:
        "A comprehensive analysis of GPT-4's technical implementation and training methodology.",
      url: "/papers/gpt4-architecture",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      author: {
        name: "OpenAI Research Team",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=OpenAI",
      },
      metrics: { views: 15234, likes: 892, comments: 156, citations: 234 },
      authors: [
        { name: "OpenAI Research Team", affiliation: "OpenAI" },
        { name: "Sam Altman", affiliation: "OpenAI" },
      ],
      abstract:
        "This paper presents a detailed analysis of GPT-4's architecture and training methodology...",
      doi: "10.48550/arXiv.2401.00123",
      journal: "arXiv preprint",
      publishedDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      tags: ["AI", "Language Models", "Deep Learning"],
    },
    {
      id: "2",
      type: "paper",
      title: "Transformer Models: A New Era in Computer Vision",
      description:
        "Exploring the application of transformer architectures in visual recognition tasks.",
      url: "/papers/transformers-vision",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      author: {
        name: "Vision Research Lab",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=VRL",
      },
      metrics: { views: 8921, likes: 445, comments: 89, citations: 156 },
      authors: [
        { name: "Vision Research Lab", affiliation: "Stanford University" },
        { name: "Jane Smith", affiliation: "Stanford University" },
      ],
      abstract:
        "This paper investigates the application of transformer architectures in computer vision...",
      doi: "10.48550/arXiv.2401.00456",
      journal: "CVPR 2024",
      publishedDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      tags: ["Computer Vision", "Transformers", "Deep Learning"],
    },
  ],
  repositories: [
    {
      id: "3",
      type: "repository",
      title: "LangChain: Building applications with LLMs",
      description:
        "A framework for developing applications powered by language models.",
      url: "/repositories/langchain",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      author: {
        name: "LangChain Team",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=LCT",
      },
      metrics: { views: 12453, likes: 1234, comments: 234 },
      owner: "langchain-ai",
      language: "Python",
      stars: 45000,
      forks: 10000,
      lastCommit: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      readme:
        "# LangChain\n\nA framework for developing applications powered by language models...",
      tags: ["LLM", "Framework", "Python"],
    },
  ],
  articles: [
    {
      id: "4",
      type: "article",
      title: "The Future of AI: 2024 and Beyond",
      description:
        "An in-depth analysis of upcoming AI trends and their potential impact.",
      url: "/articles/ai-future-2024",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      author: {
        name: "AI Insights Team",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AIT",
      },
      metrics: { views: 5678, likes: 234, comments: 45 },
      readTime: 8,
      source: "AI Insights Blog",
      tags: ["AI", "Future Tech", "Trends"],
    },
  ],
  discussions: [
    {
      id: "5",
      type: "discussion",
      title: "Best Practices for Fine-tuning LLMs",
      description:
        "Community discussion on optimal approaches to LLM fine-tuning.",
      url: "/discussions/llm-finetuning",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      author: {
        name: "ML Community",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MLC",
      },
      metrics: { views: 3421, likes: 167, comments: 89 },
      participants: 30,
      lastActivity: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      platform: "AI Forum",
      tags: ["LLM", "Fine-tuning", "Best Practices"],
    },
  ],
};
