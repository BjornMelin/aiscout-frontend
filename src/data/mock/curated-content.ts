import { CuratedContent } from "@/lib/types/home";

export const mockCuratedContent: CuratedContent = {
  papers: [
    {
      id: "1",
      type: "paper",
      title: "Understanding Deep Learning Requires Rethinking Generalization",
      description:
        "A groundbreaking paper that challenges conventional wisdom about how neural networks learn.",
      abstract:
        "Deep learning has enabled remarkable progress over the last years in computer vision, speech recognition, and other domains. Despite these successes, we still have a poor understanding of why these networks work as well as they do.",
      authors: [
        { id: "a1", name: "Chiyuan Zhang" },
        { id: "a2", name: "Samy Bengio" },
      ],
      date: "2017-03-15T00:00:00.000Z",
      tags: [
        { id: "t1", name: "Deep Learning" },
        { id: "t2", name: "Machine Learning Theory" },
      ],
      metrics: {
        views: 50000,
        citations: 3500,
      },
      url: "https://example.com/paper-1",
      doi: "10.1234/example.doi",
      journal: "ICLR 2017",
      citations: 3500,
    },
    {
      id: "2",
      type: "paper",
      title: "Attention Is All You Need",
      description:
        "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder.",
      abstract:
        "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism.",
      authors: [
        { id: "av1", name: "Ashish Vaswani" },
        { id: "ns1", name: "Noam Shazeer" },
        { id: "np1", name: "Niki Parmar" },
      ],
      date: "2017-06-12T00:00:00.000Z",
      tags: [
        { id: "t3", name: "Transformers" },
        { id: "t4", name: "Deep Learning" },
        { id: "t5", name: "NLP" },
      ],
      metrics: {
        views: 1000000,
        citations: 123456,
      },
      url: "https://arxiv.org/abs/1706.03762",
      doi: "10.48550/arXiv.1706.03762",
      journal: "arXiv",
      citations: 123456,
    },
  ],
  repositories: [
    {
      id: "4",
      type: "repo",
      title: "transformers",
      description:
        "State-of-the-art Natural Language Processing for PyTorch and TensorFlow 2.0",
      authors: [{ id: "hf1", name: "Hugging Face" }],
      date: "2018-10-29T00:00:00.000Z",
      tags: [
        { id: "t9", name: "Machine Learning" },
        { id: "t10", name: "NLP" },
        { id: "t11", name: "Deep Learning" },
      ],
      metrics: {
        views: 1000000,
        stars: 45000,
        forks: 10000,
      },
      url: "https://github.com/huggingface/transformers",
      language: "Python",
      stars: 45000,
      forks: 10000,
      lastCommit: "2024-01-05T00:00:00.000Z",
    },
    {
      id: "5",
      type: "repo",
      title: "pytorch",
      description:
        "Tensors and Dynamic neural networks in Python with strong GPU acceleration.",
      authors: [{ id: "pt1", name: "PyTorch Team" }],
      date: "2016-08-13T00:00:00.000Z",
      tags: [
        { id: "t12", name: "Deep Learning" },
        { id: "t13", name: "Machine Learning" },
        { id: "t14", name: "Neural Networks" },
      ],
      metrics: {
        views: 400000,
        stars: 98765,
        forks: 12345,
      },
      url: "https://github.com/pytorch/pytorch",
      language: "Python",
      stars: 98765,
      forks: 12345,
      lastCommit: "2024-01-04T00:00:00.000Z",
    },
  ],
  articles: [
    {
      id: "6",
      type: "article",
      title: "Understanding Transformers: A Deep Dive",
      description:
        "A comprehensive guide to understanding transformer architecture and its applications in modern AI.",
      content:
        "# The Future of AI\n\nArtificial Intelligence has come a long way...",
      authors: [{ id: "sj1", name: "Sarah Johnson" }],
      date: "2024-01-01T00:00:00.000Z",
      tags: [
        { id: "t15", name: "AI" },
        { id: "t16", name: "Future Tech" },
      ],
      metrics: {
        views: 25000,
        comments: 150,
      },
      url: "https://example.com/article-1",
      source: "Tech Review",
      readTime: 8,
    },
    {
      id: "7",
      type: "article",
      title: "A Comprehensive Guide to Transformer Architecture",
      description:
        "Deep dive into the architecture that revolutionized natural language processing and beyond.",
      content: "Full article content here...",
      authors: [{ id: "sj2", name: "Sarah Johnson" }],
      date: "2023-01-15T00:00:00.000Z",
      tags: [
        { id: "t17", name: "Transformers" },
        { id: "t18", name: "Deep Learning" },
        { id: "t19", name: "Tutorial" },
      ],
      metrics: {
        views: 50000,
        comments: 156,
      },
      url: "https://example.com/transformer-guide",
      source: "AI Blog",
      readTime: 15,
    },
  ],
  discussions: [
    {
      id: "9",
      type: "discussion",
      title: "Best Practices for Training Large Language Models",
      description:
        "Community discussion about efficient training methods for LLMs.",
      authors: [{ id: "ac1", name: "Alex Chen" }],
      date: "2024-01-04T00:00:00.000Z",
      tags: [
        { id: "t23", name: "LLM" },
        { id: "t24", name: "Training" },
      ],
      metrics: {
        views: 5000,
        comments: 75,
      },
      url: "https://example.com/discussion-1",
      platform: "ML Forum",
      threadUrl: "https://example.com/discussion-1",
      participants: 30,
      lastActivity: "2024-01-05T00:00:00.000Z",
    },
    {
      id: "10",
      type: "discussion",
      title: "The Future of AI Safety",
      description:
        "Discussion on ensuring safe and ethical development of artificial intelligence.",
      authors: [{ id: "asc1", name: "AI Safety Community" }],
      date: "2023-03-10T00:00:00.000Z",
      tags: [
        { id: "t25", name: "AI Safety" },
        { id: "t26", name: "Ethics" },
        { id: "t27", name: "AI" },
      ],
      metrics: {
        views: 20000,
        comments: 234,
      },
      url: "https://example.com/ai-safety-discussion",
      platform: "AI Forum",
      threadUrl: "https://example.com/ai-safety-discussion",
      participants: 156,
      lastActivity: "2024-01-04T00:00:00.000Z",
    },
  ],
};
