import { CuratedContent } from "@/lib/types/home";

export const mockCuratedContent: CuratedContent = {
  papers: [
    {
      id: "paper1",
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
        { id: "t1", name: "Transformers" },
        { id: "t2", name: "Deep Learning" },
        { id: "t3", name: "NLP" },
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
    {
      id: "paper2",
      type: "paper",
      title: "BERT: Pre-training of Deep Bidirectional Transformers",
      description:
        "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers.",
      abstract:
        "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers.",
      authors: [
        { id: "jd1", name: "Jacob Devlin" },
        { id: "mc1", name: "Ming-Wei Chang" },
        { id: "kl1", name: "Kenton Lee" },
      ],
      date: "2018-10-11T00:00:00.000Z",
      tags: [
        { id: "t1", name: "BERT" },
        { id: "t2", name: "NLP" },
        { id: "t3", name: "Transformers" },
      ],
      metrics: {
        views: 800000,
        citations: 98765,
      },
      url: "https://arxiv.org/abs/1810.04805",
      doi: "10.48550/arXiv.1810.04805",
      journal: "arXiv",
      citations: 98765,
    },
  ],
  repositories: [
    {
      id: "repo1",
      type: "repo",
      title: "transformers",
      description:
        "State-of-the-art Machine Learning for PyTorch, TensorFlow, and JAX.",
      authors: [{ id: "hf1", name: "Hugging Face" }],
      date: "2018-10-29T00:00:00.000Z",
      tags: [
        { id: "t1", name: "Machine Learning" },
        { id: "t2", name: "NLP" },
        { id: "t3", name: "Deep Learning" },
      ],
      metrics: {
        views: 500000,
        stars: 123456,
        forks: 23456,
      },
      url: "https://github.com/huggingface/transformers",
      language: "Python",
      stars: 123456,
      forks: 23456,
      lastCommit: "2024-01-04T12:00:00.000Z",
    },
    {
      id: "repo2",
      type: "repo",
      title: "pytorch",
      description:
        "Tensors and Dynamic neural networks in Python with strong GPU acceleration.",
      authors: [{ id: "pt1", name: "PyTorch Team" }],
      date: "2016-08-13T00:00:00.000Z",
      tags: [
        { id: "t1", name: "Deep Learning" },
        { id: "t2", name: "Machine Learning" },
        { id: "t3", name: "Neural Networks" },
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
      lastCommit: "2024-01-04T12:00:00.000Z",
    },
  ],
  articles: [
    {
      id: "article1",
      type: "article",
      title: "A Comprehensive Guide to Transformer Architecture",
      description:
        "Deep dive into the architecture that revolutionized natural language processing and beyond.",
      content: "Full article content here...",
      authors: [{ id: "sj1", name: "Sarah Johnson" }],
      date: "2023-01-15T00:00:00.000Z",
      tags: [
        { id: "t1", name: "Transformers" },
        { id: "t2", name: "Deep Learning" },
        { id: "t3", name: "Tutorial" },
      ],
      metrics: {
        views: 50000,
        comments: 156,
      },
      url: "https://example.com/transformer-guide",
      source: "AI Blog",
      readTime: 15,
    },
    {
      id: "article2",
      type: "article",
      title: "Understanding Large Language Models",
      description:
        "An overview of how large language models work and their impact on AI development.",
      content: "Full article content here...",
      authors: [{ id: "mc2", name: "Michael Chen" }],
      date: "2023-02-20T00:00:00.000Z",
      tags: [
        { id: "t1", name: "LLM" },
        { id: "t2", name: "AI" },
        { id: "t3", name: "Machine Learning" },
      ],
      metrics: {
        views: 40000,
        comments: 123,
      },
      url: "https://example.com/llm-guide",
      source: "AI Blog",
      readTime: 12,
    },
  ],
  discussions: [
    {
      id: "discussion1",
      type: "discussion",
      title: "The Future of AI Safety",
      description:
        "Discussion on ensuring safe and ethical development of artificial intelligence.",
      authors: [{ id: "asc1", name: "AI Safety Community" }],
      date: "2023-03-10T00:00:00.000Z",
      tags: [
        { id: "t1", name: "AI Safety" },
        { id: "t2", name: "Ethics" },
        { id: "t3", name: "AI" },
      ],
      metrics: {
        views: 20000,
        comments: 234,
      },
      url: "https://example.com/ai-safety-discussion",
      platform: "AI Forum",
      threadUrl: "https://example.com/ai-safety-discussion",
      participants: 156,
      lastActivity: "2024-01-04T12:00:00.000Z",
    },
    {
      id: "discussion2",
      type: "discussion",
      title: "Scaling Laws in Machine Learning",
      description:
        "Exploring how model performance scales with compute, data, and model size.",
      authors: [{ id: "mlr1", name: "ML Research Group" }],
      date: "2023-04-05T00:00:00.000Z",
      tags: [
        { id: "t1", name: "Scaling" },
        { id: "t2", name: "Machine Learning" },
        { id: "t3", name: "Research" },
      ],
      metrics: {
        views: 15000,
        comments: 156,
      },
      url: "https://example.com/scaling-laws-discussion",
      platform: "AI Forum",
      threadUrl: "https://example.com/scaling-laws-discussion",
      participants: 89,
      lastActivity: "2024-01-04T12:00:00.000Z",
    },
  ],
};
