import { BookmarkItem, BookmarkFolder } from '@/lib/types/bookmarks';

export const mockFolders: BookmarkFolder[] = [
  {
    id: 'reading-list',
    name: 'Reading List',
    itemCount: 12,
    updatedAt: '2024-01-15T12:00:00Z',
  },
  {
    id: 'favorites',
    name: 'Favorites',
    itemCount: 5,
    updatedAt: '2024-01-14T15:30:00Z',
  },
  {
    id: 'ml-papers',
    name: 'ML Papers',
    itemCount: 8,
    updatedAt: '2024-01-13T09:45:00Z',
  },
];

export const mockBookmarks: BookmarkItem[] = [
  {
    id: '1',
    type: 'paper',
    title: 'Attention Is All You Need',
    description: 'We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
    authors: [
      { id: '1', name: 'Ashish Vaswani' },
      { id: '2', name: 'Noam Shazeer' },
      { id: '3', name: 'Niki Parmar' },
    ],
    source: {
      name: 'arXiv',
      url: 'https://arxiv.org/abs/1706.03762',
    },
    date: '2017-06-12',
    metrics: {
      citations: 75000,
      views: 150000,
    },
    tags: ['Deep Learning', 'NLP', 'Transformers'],
    addedAt: '2024-01-15T12:00:00Z',
    folderId: 'ml-papers',
  },
  {
    id: '2',
    type: 'repository',
    title: 'tensorflow/tensorflow',
    description: 'An open source machine learning framework for everyone',
    authors: [
      { id: '4', name: 'Google Research' },
    ],
    source: {
      name: 'GitHub',
      url: 'https://github.com/tensorflow/tensorflow',
    },
    date: '2015-11-09',
    metrics: {
      stars: 178000,
      forks: 89000,
      views: 500000,
    },
    tags: ['Machine Learning', 'Deep Learning', 'Framework'],
    addedAt: '2024-01-10T15:30:00Z',
    folderId: 'favorites',
  },
  {
    id: '3',
    type: 'article',
    title: 'The Future of AI: A Comprehensive Overview',
    description: 'An in-depth analysis of current AI trends and future predictions from leading researchers and industry experts.',
    authors: [
      { id: '5', name: 'Sarah Chen' },
      { id: '6', name: 'Michael Brown' },
    ],
    source: {
      name: 'AI Review',
      url: 'https://aireview.example/future-of-ai',
    },
    date: '2024-01-05',
    metrics: {
      views: 25000,
      comments: 342,
    },
    tags: ['AI', 'Future Tech', 'Industry Trends'],
    addedAt: '2024-01-08T09:15:00Z',
    folderId: 'reading-list',
  },
]; 