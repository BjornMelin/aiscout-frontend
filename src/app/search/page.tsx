import { Suspense } from "react";
import { SearchBar } from "@/components/features/search/SearchBar/SearchBar";
import { SearchFilters } from "@/components/features/search/SearchFilters/SearchFilters";
import { SearchResultCard } from "@/components/features/search/SearchResultCard/SearchResultCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { SearchResult } from "@/lib/types/search";

// Mock data for demonstration
const MOCK_RESULTS: SearchResult[] = [
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

async function SearchResults({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // TODO: Implement actual API call using searchParams
  // For now, using mock data with filtering
  const results = MOCK_RESULTS.filter(result => {
    const query = searchParams.q?.toString().toLowerCase();
    const types = (Array.isArray(searchParams.type) ? searchParams.type : [searchParams.type]).filter(Boolean);
    
    // Filter by search query
    if (query && !result.title.toLowerCase().includes(query) && !result.description.toLowerCase().includes(query)) {
      return false;
    }
    
    // Filter by content type
    if (types.length > 0 && !types.includes(result.type)) {
      return false;
    }
    
    return true;
  });

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-2">No results found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <SearchResultCard key={result.id} {...result} />
      ))}
    </div>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border rounded-lg p-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} className="h-6 w-16" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <SearchFilters />
        </aside>

        <main className="md:col-span-3">
          <Suspense fallback={<SearchResultsSkeleton />}>
            <SearchResults searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
