import {
  ContentItem,
  Paper,
  Repository,
  Article,
  Discussion,
} from "@/lib/types/content";
import { Tag } from "@/lib/types/shared";

// Helper function to convert string tags to Tag objects
const createTags = (tagNames: string[]): Tag[] =>
  tagNames.map((name, index) => ({
    id: `tag-${index + 1}`,
    name,
  }));

export const mockContent: ContentItem[] = [
  {
    id: "1",
    type: "paper",
    title: "Attention Is All You Need",
    description:
      "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    abstract:
      "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    content: `# Abstract

The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.

## Introduction

Recurrent neural networks, long short-term memory and gated recurrent neural networks in particular, have been firmly established as state of the art approaches in sequence modeling and transduction problems such as language modeling and machine translation.`,
    authors: [
      {
        id: "1",
        name: "Ashish Vaswani",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ashish",
        affiliation: "Google Research",
      },
      {
        id: "2",
        name: "Noam Shazeer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noam",
        affiliation: "Google Brain",
      },
    ],
    sources: [{ name: "arXiv", url: "https://arxiv.org/abs/1706.03762" }],
    date: "2017-06-12",
    metrics: { citations: 75000, views: 150000 },
    tags: createTags([
      "Deep Learning",
      "NLP",
      "Transformers",
      "Neural Networks",
    ]),
    isBookmarked: false,
    references: [
      {
        id: "ref1",
        title:
          "Neural Machine Translation by Jointly Learning to Align and Translate",
        authors: ["Dzmitry Bahdanau", "Kyunghyun Cho", "Yoshua Bengio"],
        year: "2014",
        url: "https://arxiv.org/abs/1409.0473",
      },
    ],
    relatedContent: [
      {
        id: "5",
        type: "paper",
        title:
          "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
        authors: ["Jacob Devlin", "Ming-Wei Chang", "Kenton Lee"],
        description:
          "We introduce a new language representation model called BERT.",
      },
    ],
    featured: true,
  } as Paper,
  {
    id: "2",
    type: "repository",
    title: "tensorflow/tensorflow",
    description: "An open source machine learning framework for everyone",
    readmeContent: `# TensorFlow

TensorFlow is an end-to-end open source platform for machine learning. It has a comprehensive, flexible ecosystem of tools, libraries, and community resources.`,
    authors: [
      {
        id: "4",
        name: "Google Research",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Google",
        affiliation: "Google",
      },
    ],
    sources: [
      { name: "GitHub", url: "https://github.com/tensorflow/tensorflow" },
    ],
    date: "2015-11-09",
    metrics: { stars: 178000, forks: 89000, views: 500000, contributors: 3500 },
    tags: createTags([
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
      "Python",
    ]),
    isBookmarked: false,
    repositoryUrl: "https://github.com/tensorflow/tensorflow",
    programmingLanguages: [
      { name: "C++", percentage: 45 },
      { name: "Python", percentage: 35 },
      { name: "CUDA", percentage: 10 },
    ],
    relatedContent: [
      {
        id: "7",
        type: "repository",
        title: "pytorch/pytorch",
        authors: ["Facebook Research"],
        description:
          "Tensors and Dynamic neural networks in Python with strong GPU acceleration",
      },
    ],
    featured: true,
  } as Repository,
  {
    id: "3",
    type: "article",
    title: "The Future of AI: GPT-4 and Beyond",
    description:
      "An in-depth analysis of GPT-4's capabilities and what it means for the future of AI",
    content: `# The Future of AI: GPT-4 and Beyond

As language models continue to evolve, we're seeing unprecedented capabilities in natural language processing and generation.`,
    authors: [
      {
        id: "8",
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        affiliation: "AI Research Institute",
      },
    ],
    sources: [
      { name: "AI Insights Blog", url: "https://aiinsights.blog/gpt4-future" },
    ],
    date: "2023-12-01",
    metrics: { views: 25000, comments: 128 },
    tags: createTags([
      "GPT-4",
      "Language Models",
      "AI Future",
      "Machine Learning",
    ]),
    isBookmarked: false,
    relatedContent: [
      {
        id: "9",
        type: "paper",
        title: "Language Models are Few-Shot Learners",
        authors: ["OpenAI Research Team"],
        description: "Introducing GPT-3 and its capabilities",
      },
    ],
    featured: true,
  } as Article,
  {
    id: "4",
    type: "discussion",
    title: "The Ethics of AI Development",
    description:
      "A community discussion on responsible AI development and its implications",
    content: `# The Ethics of AI Development

Join us in discussing the ethical considerations and responsibilities in AI development.`,
    authors: [
      {
        id: "10",
        name: "Ethics in AI Group",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethics",
        affiliation: "AI Ethics Institute",
      },
    ],
    sources: [
      {
        name: "AI Ethics Forum",
        url: "https://aiethics.forum/discussions/ethics",
      },
    ],
    date: "2023-12-05",
    metrics: { views: 15000, comments: 342 },
    tags: createTags(["AI Ethics", "Responsible AI", "AI Safety", "AI Policy"]),
    isBookmarked: false,
    participants: [
      {
        id: "11",
        name: "John Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        affiliation: "AI Safety Research",
      },
      {
        id: "12",
        name: "Maria Garcia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        affiliation: "Ethics Board",
      },
    ],
    platform: "AI Ethics Forum",
    threadUrl: "https://aiethics.forum/discussions/ethics",
    participantsCount: 2,
    lastActivity: "2023-12-05T12:00:00Z",
    relatedContent: [
      {
        id: "13",
        type: "article",
        title: "Building Safe AI Systems",
        authors: ["AI Safety Team"],
        description: "Guidelines for developing safe AI systems",
      },
    ],
    featured: false,
  } as Discussion,
  {
    id: "5",
    type: "paper",
    title:
      "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    description:
      "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers.",
    abstract:
      "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text.",
    content: `# BERT: Pre-training of Deep Bidirectional Transformers

We introduce BERT, a deep bidirectional transformer model that revolutionizes NLP tasks.`,
    authors: [
      {
        id: "14",
        name: "Jacob Devlin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob",
        affiliation: "Google AI Language",
      },
    ],
    sources: [{ name: "arXiv", url: "https://arxiv.org/abs/1810.04805" }],
    date: "2018-10-11",
    metrics: { citations: 52000, views: 120000 },
    tags: createTags(["BERT", "NLP", "Deep Learning", "Transformers"]),
    isBookmarked: false,
    references: [
      {
        id: "ref2",
        title: "Attention Is All You Need",
        authors: ["Ashish Vaswani", "Noam Shazeer"],
        year: "2017",
      },
    ],
    relatedContent: [
      {
        id: "1",
        type: "paper",
        title: "Attention Is All You Need",
        authors: ["Ashish Vaswani", "Noam Shazeer"],
        description: "The original Transformer paper",
      },
    ],
    featured: true,
  } as Paper,
  {
    id: "6",
    type: "repository",
    title: "huggingface/transformers",
    description:
      "State-of-the-art Natural Language Processing for PyTorch and TensorFlow 2.0",
    readmeContent: `# Hugging Face Transformers

🤗 Transformers provides thousands of pretrained models to perform tasks on texts such as classification, information extraction, question answering, summarization, translation, text generation and more in over 100 languages.`,
    authors: [
      {
        id: "15",
        name: "Hugging Face",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HuggingFace",
        affiliation: "Hugging Face",
      },
    ],
    sources: [
      { name: "GitHub", url: "https://github.com/huggingface/transformers" },
    ],
    date: "2018-10-29",
    metrics: { stars: 108000, forks: 21000, views: 300000, contributors: 1200 },
    tags: createTags(["NLP", "Machine Learning", "Deep Learning", "Python"]),
    isBookmarked: false,
    repositoryUrl: "https://github.com/huggingface/transformers",
    programmingLanguages: [
      { name: "Python", percentage: 85 },
      { name: "C++", percentage: 10 },
      { name: "Other", percentage: 5 },
    ],
    relatedContent: [
      {
        id: "2",
        type: "repository",
        title: "tensorflow/tensorflow",
        authors: ["Google Research"],
        description: "An open source machine learning framework",
      },
    ],
    featured: true,
  } as Repository,
  {
    id: "7",
    type: "article",
    title:
      "Understanding Diffusion Models: The Latest Innovation in Image Generation",
    description:
      "A comprehensive guide to understanding how diffusion models work and their impact on AI image generation",
    content: `# Understanding Diffusion Models

Diffusion models have emerged as a powerful new approach to generating high-quality images...`,
    authors: [
      {
        id: "16",
        name: "Alex Turner",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        affiliation: "AI Research Weekly",
      },
    ],
    sources: [
      {
        name: "AI Research Weekly",
        url: "https://airesearch.weekly/diffusion-models",
      },
    ],
    date: "2023-11-28",
    metrics: { views: 35000, comments: 245 },
    tags: createTags([
      "Diffusion Models",
      "Computer Vision",
      "Deep Learning",
      "Image Generation",
    ]),
    isBookmarked: false,
    relatedContent: [
      {
        id: "17",
        type: "paper",
        title: "High-Resolution Image Synthesis with Latent Diffusion Models",
        authors: ["Stability AI Team"],
        description: "Technical details of latent diffusion models",
      },
    ],
    featured: true,
  } as Article,
  {
    id: "8",
    type: "discussion",
    title: "The Role of Reinforcement Learning in Robotics",
    description:
      "Exploring the latest advances in applying RL to robotic control and manipulation",
    content: `# Reinforcement Learning in Robotics

Let's discuss how recent advances in RL are transforming robotics...`,
    authors: [
      {
        id: "18",
        name: "Robotics Research Group",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robotics",
        affiliation: "MIT",
      },
    ],
    sources: [
      {
        name: "AI Research Forum",
        url: "https://airesearch.forum/robotics-rl",
      },
    ],
    date: "2023-12-03",
    metrics: { views: 12000, comments: 178 },
    tags: createTags([
      "Robotics",
      "Reinforcement Learning",
      "Control Systems",
      "AI",
    ]),
    isBookmarked: false,
    participants: [
      {
        id: "19",
        name: "Dr. Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        affiliation: "MIT",
      },
      {
        id: "20",
        name: "Prof. James Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
        affiliation: "Stanford",
      },
    ],
    platform: "AI Research Forum",
    threadUrl: "https://airesearch.forum/robotics-rl",
    participantsCount: 2,
    lastActivity: "2023-12-03T15:30:00Z",
    relatedContent: [
      {
        id: "21",
        type: "paper",
        title: "Deep Reinforcement Learning for Robotic Manipulation",
        authors: ["OpenAI Robotics Team"],
        description: "Latest research in RL for robotics",
      },
    ],
    featured: false,
  } as Discussion,
  {
    id: "9",
    type: "paper",
    title: "Large Language Models are Zero-Shot Reasoners",
    description:
      "Exploring the zero-shot reasoning capabilities of large language models through careful prompting",
    abstract:
      "Recent work has demonstrated the remarkable ability of large language models to perform zero-shot reasoning. We investigate this phenomenon in detail...",
    content: `# Zero-Shot Reasoning in Large Language Models

We explore how large language models can perform complex reasoning tasks without any task-specific training...`,
    authors: [
      {
        id: "22",
        name: "Emily White",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        affiliation: "Stanford AI Lab",
      },
      {
        id: "23",
        name: "David Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        affiliation: "DeepMind",
      },
    ],
    sources: [{ name: "arXiv", url: "https://arxiv.org/abs/2301.00001" }],
    date: "2023-01-15",
    metrics: { citations: 850, views: 45000 },
    tags: createTags([
      "Language Models",
      "Zero-Shot Learning",
      "AI Reasoning",
      "NLP",
    ]),
    isBookmarked: false,
    references: [
      {
        id: "ref3",
        title: "Language Models are Few-Shot Learners",
        authors: ["OpenAI Team"],
        year: "2020",
      },
    ],
    relatedContent: [
      {
        id: "24",
        type: "article",
        title: "Understanding Zero-Shot Learning",
        authors: ["AI Research Team"],
        description: "A comprehensive guide to zero-shot learning in AI",
      },
    ],
    featured: true,
  } as Paper,
  {
    id: "10",
    type: "repository",
    title: "openai/gym",
    description:
      "A toolkit for developing and comparing reinforcement learning algorithms",
    readmeContent: `# OpenAI Gym

OpenAI Gym is a toolkit for developing and comparing reinforcement learning algorithms. It supports teaching agents everything from walking to playing games like Pong or Pinball.`,
    authors: [
      {
        id: "25",
        name: "OpenAI",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=OpenAI",
        affiliation: "OpenAI",
      },
    ],
    sources: [{ name: "GitHub", url: "https://github.com/openai/gym" }],
    date: "2016-04-27",
    metrics: { stars: 31000, forks: 8200, views: 150000, contributors: 380 },
    tags: createTags([
      "Reinforcement Learning",
      "Machine Learning",
      "Python",
      "AI",
    ]),
    isBookmarked: false,
    repositoryUrl: "https://github.com/openai/gym",
    programmingLanguages: [
      { name: "Python", percentage: 90 },
      { name: "C++", percentage: 8 },
      { name: "Other", percentage: 2 },
    ],
    relatedContent: [
      {
        id: "26",
        type: "article",
        title: "Getting Started with RL using OpenAI Gym",
        authors: ["RL Tutorial Team"],
        description:
          "A beginner's guide to reinforcement learning with OpenAI Gym",
      },
    ],
    featured: false,
  } as Repository,
];
