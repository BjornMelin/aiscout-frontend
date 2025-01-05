"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Users,
  MessageSquare,
  Link as LinkIcon,
  Eye,
  History,
} from "lucide-react";
import { Markdown } from "@/components/common/Markdown";
import type { Discussion } from "@/lib/types/content";

interface DiscussionDetailProps {
  discussion: Discussion;
}

export function DiscussionDetail({ discussion }: DiscussionDetailProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{discussion.title}</h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-sm">
            Discussion
          </div>
          <div className="px-2 py-1 rounded-full bg-secondary text-sm">
            {discussion.platform}
          </div>
          <span className="text-muted-foreground">
            Last activity:{" "}
            {new Date(discussion.lastActivity).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {discussion.authors.map((author) => (
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
          <a
            href={discussion.threadUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkIcon className="h-4 w-4" />
            View Thread
          </a>
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {discussion.participants} participants
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            {discussion.metrics.comments} comments
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <Markdown>{discussion.description}</Markdown>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Activity Timeline</h2>
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-muted-foreground" />
              <p>Recent activity will be displayed here</p>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Participants</p>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {discussion.participants}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Comments</p>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {discussion.metrics.comments}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Views</p>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {discussion.metrics.views}
            </p>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {discussion.tags.map((tag) => (
            <div
              key={tag.id}
              className="px-3 py-1 rounded-full bg-secondary text-sm"
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Platform</h2>
        <p className="text-muted-foreground">
          This discussion is from{" "}
          <a
            href={discussion.threadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {discussion.platform}
          </a>
        </p>
      </div>
    </div>
  );
}
