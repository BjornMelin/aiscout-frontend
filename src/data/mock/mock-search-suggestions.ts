import type { SearchSuggestion } from "@/lib/types/search";

export const searchSuggestions: SearchSuggestion[] = [
  // AI/ML Terms
  { id: "1", type: "term", text: "Transformer Architecture" },
  { id: "2", type: "term", text: "Reinforcement Learning" },
  { id: "3", type: "term", text: "Neural Networks" },
  { id: "4", type: "term", text: "Computer Vision" },
  { id: "5", type: "term", text: "Natural Language Processing" },

  // Paper Titles
  { id: "6", type: "paper", text: "Attention Is All You Need" },
  {
    id: "7",
    type: "paper",
    text: "BERT: Pre-training of Deep Bidirectional Transformers",
  },
  {
    id: "8",
    type: "paper",
    text: "GPT-3: Language Models are Few-Shot Learners",
  },

  // Author Names
  { id: "9", type: "author", text: "Geoffrey Hinton" },
  { id: "10", type: "author", text: "Yann LeCun" },
  { id: "11", type: "author", text: "Yoshua Bengio" },

  // Repositories
  { id: "12", type: "repository", text: "tensorflow/tensorflow" },
  { id: "13", type: "repository", text: "pytorch/pytorch" },
  { id: "14", type: "repository", text: "huggingface/transformers" },
];
