import { AnalyticsData } from '@/lib/types/analytics';
import { subDays, format } from 'date-fns';

// Generate last 30 days of view data
const generateViewData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: format(subDays(new Date(), 29 - i), 'yyyy-MM-dd'),
    views: Math.floor(Math.random() * 500) + 100,
    uniqueVisitors: Math.floor(Math.random() * 300) + 50,
  }));
};

export const mockAnalyticsData: AnalyticsData = {
  viewsData: generateViewData(),
  topContent: [
    {
      id: '1',
      title: 'Deep Learning Research Paper',
      type: 'paper',
      views: 1250,
      interactions: 450,
      savedCount: 89,
    },
    {
      id: '2',
      title: 'Machine Learning Repository',
      type: 'repository',
      views: 980,
      interactions: 320,
      savedCount: 67,
    },
    {
      id: '3',
      title: 'AI Ethics Discussion',
      type: 'discussion',
      views: 750,
      interactions: 280,
      savedCount: 45,
    },
    {
      id: '4',
      title: 'Neural Networks Overview',
      type: 'article',
      views: 620,
      interactions: 180,
      savedCount: 34,
    },
  ],
  topicDistribution: [
    {
      topic: 'Machine Learning',
      count: 145,
      percentage: 35,
    },
    {
      topic: 'Deep Learning',
      count: 98,
      percentage: 24,
    },
    {
      topic: 'Computer Vision',
      count: 67,
      percentage: 16,
    },
    {
      topic: 'Natural Language Processing',
      count: 54,
      percentage: 13,
    },
    {
      topic: 'Other',
      count: 48,
      percentage: 12,
    },
  ],
  totalViews: 15780,
  totalInteractions: 4320,
  totalSaves: 892,
}; 