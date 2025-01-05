import type { SearchResult } from "@/lib/types/search";

export const MOCK_RESULTS: SearchResult[] = [
  {
    id: "1",
    type: "paper",
    title: "Attention Is All You Need",
    description:
      "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar"],
    date: "2023-12-01",
    tags: ["Transformers", "Deep Learning", "NLP"],
    source: "arXiv",
    sourceUrl: "https://arxiv.org/abs/1706.03762",
    metrics: {
      citations: 123456,
    },
  },
  {
    id: "2",
    type: "repo",
    title: "transformers",
    description:
      "State-of-the-art Machine Learning for PyTorch, TensorFlow, and JAX.",
    authors: ["Hugging Face"],
    date: "2023-12-15",
    tags: ["PyTorch", "TensorFlow", "NLP"],
    source: "GitHub",
    sourceUrl: "https://github.com/huggingface/transformers",
    metrics: {
      stars: 45678,
    },
  },
  {
    id: "3",
    type: "article",
    title: "Understanding Transformers: A Deep Dive",
    description:
      "A comprehensive guide to understanding transformer architecture and its applications in modern AI.",
    authors: ["Sarah Smith"],
    date: "2023-12-20",
    tags: ["Transformers", "Tutorial", "AI"],
    source: "Medium",
    sourceUrl: "https://medium.com/article",
    metrics: {
      comments: 234,
    },
  },
];
