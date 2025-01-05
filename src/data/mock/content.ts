import { ContentMap } from "@/lib/types/content";

export const mockContent: ContentMap = {
  "1": {
    id: "1",
    type: "paper",
    title: "Understanding Deep Learning Requires Rethinking Generalization",
    description:
      "A groundbreaking paper that challenges conventional wisdom about how neural networks learn.",
    abstract:
      "Deep learning has enabled remarkable progress over the last years in computer vision, speech recognition, and other domains. Despite these successes, we still have a poor understanding of why these networks work as well as they do.",
    authors: [
      { id: "a1", name: "Chiyuan Zhang", affiliation: "Google Brain" },
      { id: "a2", name: "Samy Bengio", affiliation: "Google Brain" },
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
    url: "https://example.com/paper-1",
    doi: "10.1234/example.doi",
    journal: "ICLR 2017",
    citations: 3500,
  },
  "2": {
    id: "2",
    type: "paper",
    title: "Attention Is All You Need",
    description:
      "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder.",
    abstract:
      "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism.",
    authors: [
      { id: "av1", name: "Ashish Vaswani", affiliation: "Google Research" },
      { id: "ns1", name: "Noam Shazeer", affiliation: "Google Research" },
      { id: "np1", name: "Niki Parmar", affiliation: "Google Research" },
    ],
    date: "2017-06-12",
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
  "3": {
    id: "3",
    type: "paper",
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    description:
      "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers.",
    abstract:
      "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers.",
    authors: [
      { id: "jd1", name: "Jacob Devlin", affiliation: "Google AI Language" },
      { id: "mc1", name: "Ming-Wei Chang", affiliation: "Google AI Language" },
      { id: "kl1", name: "Kenton Lee", affiliation: "Google AI Language" },
    ],
    date: "2018-10-11",
    tags: [
      { id: "t6", name: "BERT" },
      { id: "t7", name: "NLP" },
      { id: "t8", name: "Transformers" },
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
  "4": {
    id: "4",
    type: "repo",
    title: "transformers",
    description:
      "State-of-the-art Natural Language Processing for PyTorch and TensorFlow 2.0",
    authors: [{ id: "hf1", name: "Hugging Face", affiliation: "Hugging Face" }],
    date: "2018-10-29",
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
    lastCommit: "2024-01-05",
  },
  "5": {
    id: "5",
    type: "repo",
    title: "pytorch",
    description:
      "Tensors and Dynamic neural networks in Python with strong GPU acceleration.",
    authors: [{ id: "pt1", name: "PyTorch Team", affiliation: "Meta AI" }],
    date: "2016-08-13",
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
    lastCommit: "2024-01-04",
  },
  "6": {
    id: "6",
    type: "article",
    title: "Understanding Transformers: A Deep Dive",
    description:
      "A comprehensive guide to understanding transformer architecture and its applications in modern AI.",
    authors: [{ id: "sj1", name: "Sarah Johnson", affiliation: "Tech Review" }],
    date: "2024-01-01",
    tags: [
      { id: "t15", name: "AI" },
      { id: "t16", name: "Future Tech" },
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
  "7": {
    id: "7",
    type: "article",
    title: "A Comprehensive Guide to Transformer Architecture",
    description:
      "Deep dive into the architecture that revolutionized natural language processing and beyond.",
    authors: [{ id: "sj2", name: "Sarah Johnson", affiliation: "AI Blog" }],
    date: "2023-01-15",
    tags: [
      { id: "t17", name: "Transformers" },
      { id: "t18", name: "Deep Learning" },
      { id: "t19", name: "Tutorial" },
    ],
    metrics: {
      views: 50000,
      comments: 156,
    },
    content: "Full article content here...",
    source: "AI Blog",
    readTime: 15,
    url: "https://example.com/transformer-guide",
  },
  "8": {
    id: "8",
    type: "article",
    title: "Understanding Large Language Models",
    description:
      "An overview of how large language models work and their impact on AI development.",
    authors: [{ id: "mc2", name: "Michael Chen", affiliation: "AI Blog" }],
    date: "2023-02-20",
    tags: [
      { id: "t20", name: "LLM" },
      { id: "t21", name: "AI" },
      { id: "t22", name: "Machine Learning" },
    ],
    metrics: {
      views: 40000,
      comments: 123,
    },
    content: "Full article content here...",
    source: "AI Blog",
    readTime: 12,
    url: "https://example.com/llm-guide",
  },
  "9": {
    id: "9",
    type: "discussion",
    title: "Best Practices for Training Large Language Models",
    description:
      "Community discussion about efficient training methods for LLMs.",
    authors: [{ id: "ac1", name: "Alex Chen", affiliation: "ML Community" }],
    date: "2024-01-04",
    tags: [
      { id: "t23", name: "LLM" },
      { id: "t24", name: "Training" },
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
  "10": {
    id: "10",
    type: "discussion",
    title: "The Future of AI Safety",
    description:
      "Discussion on ensuring safe and ethical development of artificial intelligence.",
    authors: [
      { id: "asc1", name: "AI Safety Community", affiliation: "AI Forum" },
    ],
    date: "2023-03-10",
    tags: [
      { id: "t25", name: "AI Safety" },
      { id: "t26", name: "Ethics" },
      { id: "t27", name: "AI" },
    ],
    metrics: {
      views: 20000,
      comments: 234,
    },
    platform: "AI Forum",
    threadUrl: "https://example.com/ai-safety-discussion",
    participants: 156,
    lastActivity: "2024-01-04",
  },
  "11": {
    id: "11",
    type: "discussion",
    title: "Scaling Laws in Machine Learning",
    description:
      "Exploring how model performance scales with compute, data, and model size.",
    authors: [
      { id: "mlr1", name: "ML Research Group", affiliation: "AI Forum" },
    ],
    date: "2023-04-05",
    tags: [
      { id: "t28", name: "Scaling" },
      { id: "t29", name: "Machine Learning" },
      { id: "t30", name: "Research" },
    ],
    metrics: {
      views: 15000,
      comments: 156,
    },
    platform: "AI Forum",
    threadUrl: "https://example.com/scaling-laws-discussion",
    participants: 89,
    lastActivity: "2024-01-04",
  },
};
