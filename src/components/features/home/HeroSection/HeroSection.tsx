"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/features/search/SearchBar/SearchBar";

const popularSearches = [
  "Large Language Models",
  "Transformers",
  "Computer Vision",
  "Reinforcement Learning",
  "Neural Networks",
];

export function HeroSection() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const params = new URLSearchParams({ q: query });
      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <section
      className="relative bg-gradient-to-b from-background to-secondary/20 py-24 sm:py-32"
      data-testid="hero-section"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Discover AI/ML Content
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Find and explore cutting-edge research papers, repositories,
            articles, and discussions in artificial intelligence and machine
            learning.
          </p>
          <div className="mt-10">
            <SearchBar
              variant="page"
              showAutocomplete
              onSearch={handleSearch}
              placeholder="Search papers, repositories, articles, and discussions..."
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="px-3 py-1 text-sm rounded-full border hover:bg-accent transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
