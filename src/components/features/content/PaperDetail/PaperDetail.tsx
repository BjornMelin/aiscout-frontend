"use client";

import React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { FileText, Download, Link as LinkIcon, Quote, Eye } from "lucide-react";
import type { ResearchPaper } from "@/lib/types/content";
import { generateCitation } from "@/lib/services/citation";

interface PaperDetailProps {
  paper: ResearchPaper;
}

export function PaperDetail({ paper }: PaperDetailProps) {
  const [citationFormat, setCitationFormat] = React.useState<"bibtex" | "apa">(
    "apa"
  );
  const [showCitation, setShowCitation] = React.useState(false);
  const [citation, setCitation] = React.useState<string>("");

  React.useEffect(() => {
    if (showCitation) {
      const newCitation = generateCitation(paper, citationFormat);
      setCitation(newCitation);
    }
  }, [paper, citationFormat, showCitation]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{paper.title}</h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-sm">
            Research Paper
          </div>
          {paper.journal && (
            <span className="text-muted-foreground">
              Published in {paper.journal}
            </span>
          )}
          <span className="text-muted-foreground">
            {new Date(paper.date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {paper.authors.map((author) => (
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
        {paper.pdfUrl && (
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        )}
        {paper.doi && (
          <Button variant="outline" className="gap-2" asChild>
            <a
              href={`https://doi.org/${paper.doi}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon className="h-4 w-4" />
              View on DOI
            </a>
          </Button>
        )}
        <Dialog open={showCitation} onOpenChange={setShowCitation}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Quote className="h-4 w-4" />
              Cite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Citation</DialogTitle>
            </DialogHeader>
            <Tabs
              value={citationFormat}
              onValueChange={(v) => setCitationFormat(v as "bibtex" | "apa")}
            >
              <TabsList>
                <TabsTrigger value="bibtex">BibTeX</TabsTrigger>
                <TabsTrigger value="apa">APA</TabsTrigger>
              </TabsList>
              <TabsContent value="bibtex">
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                  {citation}
                </pre>
              </TabsContent>
              <TabsContent value="apa">
                <p className="bg-secondary p-4 rounded-lg">{citation}</p>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <div className="prose max-w-none">
        <h2>Abstract</h2>
        <p>{paper.abstract}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Citations</p>
            </div>
            <p className="text-2xl font-semibold mt-2">{paper.citations}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Views</p>
            </div>
            <p className="text-2xl font-semibold mt-2">{paper.metrics.views}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Quote className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">References</p>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {/* TODO: Add references count when available */}-
            </p>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {paper.tags.map((tag) => (
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
