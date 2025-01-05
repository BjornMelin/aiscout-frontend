import type { ContentItem } from "@/lib/types/content";

const mockContent: Record<string, ContentItem> = {
  "paper-1": {
    id: "paper-1",
    type: "paper",
    title: "Understanding Deep Learning Requires Rethinking Generalization",
    description:
      "A groundbreaking paper that challenges conventional wisdom about how neural networks learn.",
    abstract:
      "Deep learning has enabled remarkable progress over the last years in computer vision, speech recognition, and other domains. Despite these successes, we still have a poor understanding of why these networks work as well as they do. In this paper, we present a simple and general framework for studying these questions.",
    authors: [
      { id: "a1", name: "Chiyuan Zhang", affiliation: "MIT" },
      { id: "a2", name: "Samy Bengio", affiliation: "Google Research" },
    ],
    date: "2017-03-15",
    tags: [
      { id: "t1", name: "Deep Learning" },
      { id: "t2", name: "Machine Learning Theory" },
    ],
    metrics: {
      views: 50000,
      citations: 3500,
    },
    doi: "10.1234/example.doi",
    journal: "ICLR 2017",
    citations: 3500,
    url: "https://example.com/paper-1",
  },
  "repo-1": {
    id: "repo-1",
    type: "repo",
    title: "transformers",
    description:
      "State-of-the-art Natural Language Processing for PyTorch and TensorFlow 2.0",
    authors: [{ id: "a3", name: "Hugging Face", affiliation: "Hugging Face" }],
    date: "2018-10-29",
    tags: [
      { id: "t3", name: "NLP" },
      { id: "t4", name: "Deep Learning" },
    ],
    metrics: {
      views: 1000000,
      stars: 45000,
      forks: 10000,
    },
    language: "Python",
    stars: 45000,
    forks: 10000,
    lastCommit: "2024-01-05",
    url: "https://github.com/huggingface/transformers",
    readme:
      "# 🤗 Transformers\n\nState-of-the-art Natural Language Processing for PyTorch and TensorFlow 2.0\n\n## Installation\n\n```bash\npip install transformers\n```",
  },
  "article-1": {
    id: "article-1",
    type: "article",
    title: "The Future of AI: A Comprehensive Overview",
    description:
      "An in-depth look at where artificial intelligence is headed in the next decade.",
    authors: [{ id: "a4", name: "Sarah Johnson", affiliation: "Tech Review" }],
    date: "2024-01-01",
    tags: [
      { id: "t5", name: "AI" },
      { id: "t6", name: "Future Tech" },
    ],
    metrics: {
      views: 25000,
      comments: 150,
    },
    content:
      "# The Future of AI\n\nArtificial Intelligence has come a long way...",
    source: "Tech Review",
    readTime: 8,
    url: "https://example.com/article-1",
  },
  "discussion-1": {
    id: "discussion-1",
    type: "discussion",
    title: "Best Practices for Training Large Language Models",
    description:
      "Community discussion about efficient training methods for LLMs.",
    authors: [{ id: "a5", name: "Alex Chen", affiliation: "ML Community" }],
    date: "2024-01-04",
    tags: [
      { id: "t7", name: "LLM" },
      { id: "t8", name: "Training" },
    ],
    metrics: {
      views: 5000,
      comments: 75,
    },
    platform: "ML Forum",
    threadUrl: "https://example.com/discussion-1",
    participants: 30,
    lastActivity: "2024-01-05",
  },
};

export async function getContent(contentId: string): Promise<ContentItem> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const content = mockContent[contentId];
  if (!content) {
    throw new Error("Content not found");
  }

  return content;
}

export async function getContentMetadata(contentId: string) {
  const content = await getContent(contentId);

  return {
    title: `${content.title} - AIScout`,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      type: "article",
      authors: content.authors.map((a) => a.name),
    },
  };
}
