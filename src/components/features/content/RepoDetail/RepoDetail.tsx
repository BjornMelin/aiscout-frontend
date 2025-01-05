"use client";

import React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, GitFork, Link as LinkIcon, History, Eye } from "lucide-react";
import { Markdown } from "@/components/common/Markdown";
import type { Repository } from "@/lib/types/content";

interface RepoDetailProps {
  repo: Repository;
}

export function RepoDetail({ repo }: RepoDetailProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{repo.title}</h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-sm">
            Repository
          </div>
          <div className="px-2 py-1 rounded-full bg-secondary text-sm">
            {repo.language}
          </div>
          <span className="text-muted-foreground">
            Last updated: {new Date(repo.lastCommit).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {repo.authors.map((author) => (
          <div key={author.id} className="flex items-center gap-2">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-secondary" />
            )}
            <div>
              <p className="font-medium">{author.name}</p>
              {author.affiliation && (
                <p className="text-sm text-muted-foreground">
                  {author.affiliation}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button className="gap-2" asChild>
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            <LinkIcon className="h-4 w-4" />
            View Repository
          </a>
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            {repo.stars} stars
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            {repo.forks} forks
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <p>{repo.description}</p>
      </div>

      <Tabs defaultValue="readme">
        <TabsList>
          <TabsTrigger value="readme">README</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="readme" className="mt-4">
          {repo.readme ? (
            <div className="prose max-w-none">
              <Markdown>{repo.readme}</Markdown>
            </div>
          ) : (
            <p className="text-muted-foreground">No README available</p>
          )}
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <p>Recent activity will be displayed here</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div>
        <h2 className="text-xl font-semibold mb-4">Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Stars</p>
            </div>
            <p className="text-2xl font-semibold mt-2">{repo.stars}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <GitFork className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Forks</p>
            </div>
            <p className="text-2xl font-semibold mt-2">{repo.forks}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Views</p>
            </div>
            <p className="text-2xl font-semibold mt-2">{repo.metrics.views}</p>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {repo.tags.map((tag) => (
            <div
              key={tag.id}
              className="px-3 py-1 rounded-full bg-secondary text-sm"
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
