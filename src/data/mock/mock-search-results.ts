import type { SearchResult } from "@/lib/types/search";

export const MOCK_RESULTS: SearchResult[] = [
  {
    id: "1",
    type: "paper",
    title: "Attention Is All You Need",
    description:
      "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    authors: [
      {
        id: "1",
        name: "Ashish Vaswani",
      },
      {
        id: "2",
        name: "Noam Shazeer",
      },
      {
        id: "3",
        name: "Niki Parmar",
      },
    ],
    date: "2023-12-01",
    tags: ["Transformers", "Deep Learning", "NLP"],
    source: "arXiv",
    sourceUrl: "https://arxiv.org/abs/1706.03762",
    metrics: {
      views: 250000,
      citations: 123456,
    },
  },
  {
    id: "2",
    type: "repository",
    title: "transformers",
    description:
      "State-of-the-art Machine Learning for PyTorch, TensorFlow, and JAX.",
    authors: [
      {
        id: "4",
        name: "Hugging Face",
      },
    ],
    date: "2023-12-15",
    tags: ["PyTorch", "TensorFlow", "NLP"],
    source: "GitHub",
    sourceUrl: "https://github.com/huggingface/transformers",
    metrics: {
      views: 500000,
      stars: 45678,
    },
  },
  {
    id: "3",
    type: "article",
    title: "Understanding Transformers: A Deep Dive",
    description:
      "A comprehensive guide to understanding transformer architecture and its applications in modern AI.",
    authors: [
      {
        id: "5",
        name: "Sarah Smith",
      },
    ],
    date: "2023-12-20",
    tags: ["Transformers", "Tutorial", "AI"],
    source: "Medium",
    sourceUrl: "https://medium.com/article",
    metrics: {
      views: 15000,
      comments: 234,
    },
  },
];
