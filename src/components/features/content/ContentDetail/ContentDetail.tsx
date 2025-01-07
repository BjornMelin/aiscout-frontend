"use client";

import { useState } from "react";
import {
  Bookmark,
  Share,
  FileText,
  GitFork,
  Star,
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import Image from "next/image";
import { ContentItem } from "@/lib/types/content";

interface ContentDetailProps {
  id: string;
  type: ContentItem['type'];
  title: string;
  authors: ContentItem['authors'];
  sources: ContentItem['sources'];
  date: string;
  metrics?: ContentItem['metrics'];
  isBookmarked: boolean;
  onBookmark?: () => void;
  onShare?: () => void;
  className?: string;
  abstract?: string;
  content?: string;
  pdfUrl?: string;
  readmeContent?: string;
  repositoryUrl?: string;
  programmingLanguages?: Array<{ name: string; percentage: number }>;
  references?: Array<{
    id: string;
    title: string;
    authors: string[];
    year: string;
    url?: string;
  }>;
  relatedContent?: Array<{
    id: string;
    type: ContentItem['type'];
    title: string;
    authors: string[];
    description?: string;
  }>;
}

export function ContentDetail({
  // id,
  type,
  title,
  authors,
  sources,
  date,
  metrics,
  isBookmarked,
  onBookmark,
  onShare,
  className,
  abstract,
  content,
  pdfUrl,
  readmeContent,
  repositoryUrl,
  programmingLanguages,
  // references,
  relatedContent,
}: ContentDetailProps) {
  const [citationFormat, setCitationFormat] = useState<"bibtex" | "apa">(
    "bibtex"
  );
  const [hasCopied, setHasCopied] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const renderMetrics = () => {
    return (
      <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
        {metrics?.citations !== undefined && (
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary">
              {metrics.citations}
            </span>
            <span className="text-foreground/80 dark:text-foreground/90">
              Citations
            </span>
          </div>
        )}
        {metrics?.stars !== undefined && (
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-3xl font-bold text-primary">
              {metrics.stars}
              <Star className="h-6 w-6" />
            </span>
            <span className="text-foreground/80 dark:text-foreground/90">
              Stars
            </span>
          </div>
        )}
        {metrics?.forks !== undefined && (
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-3xl font-bold text-primary">
              {metrics.forks}
              <GitFork className="h-6 w-6" />
            </span>
            <span className="text-foreground/80 dark:text-foreground/90">
              Forks
            </span>
          </div>
        )}
        {metrics?.contributors !== undefined && (
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary">
              {metrics.contributors}
            </span>
            <span className="text-foreground/80 dark:text-foreground/90">
              Contributors
            </span>
          </div>
        )}
        {metrics?.comments !== undefined && (
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-3xl font-bold text-primary">
              {metrics.comments}
              <MessageSquare className="h-6 w-6" />
            </span>
            <span className="text-foreground/80 dark:text-foreground/90">
              Comments
            </span>
          </div>
        )}
      </div>
    );
  };

  const markdownComponents = {
    h1: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className="mt-8 mb-4 text-3xl font-bold text-foreground" {...props} />
    ),
    h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className="mt-6 mb-3 text-2xl font-semibold text-foreground"
        {...props}
      />
    ),
    h3: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className="mt-4 mb-2 text-xl font-semibold text-foreground"
        {...props}
      />
    ),
    p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className="mb-4 leading-7 text-foreground/80 dark:text-foreground/90"
        {...props}
      />
    ),
    a: ({ ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        className="text-primary underline-offset-4 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    ul: ({ ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul
        className="mb-4 list-disc pl-6 text-foreground/80 dark:text-foreground/90"
        {...props}
      />
    ),
    ol: ({ ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol
        className="mb-4 list-decimal pl-6 text-foreground/80 dark:text-foreground/90"
        {...props}
      />
    ),
    li: ({ ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
      <li className="mt-1" {...props} />
    ),
    code: ({
      className,
      children,
      ...props
    }: React.HTMLAttributes<HTMLElement>) => (
      <code
        className={cn(
          "rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className
        )}
        {...props}
      >
        {children}
      </code>
    ),
    blockquote: ({
      ...props
    }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className="mt-6 border-l-4 border-border pl-6 italic text-foreground/80 dark:text-foreground/90"
        {...props}
      />
    ),
    img: ({ src, alt, width, height, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={Number(width) || 800}
        height={Number(height) || 400}
        className="rounded-lg border border-border bg-muted"
        {...props}
      />
    ),
    table: ({ ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    th: ({ ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
      <th
        className="border border-border bg-muted px-4 py-2 text-left font-medium text-foreground/80"
        {...props}
      />
    ),
    td: ({ ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
      <td
        className="border border-border px-4 py-2 text-foreground/80 dark:text-foreground/90"
        {...props}
      />
    ),
  };

  return (
    <div className={cn("container max-w-6xl space-y-8 py-8", className)}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs uppercase">
                {type}
              </Badge>
              <time
                dateTime={date}
                className="text-sm text-foreground/80 dark:text-foreground/90"
              >
                {formattedDate}
              </time>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-foreground/80 dark:text-foreground/90">
              <span className="font-medium">
                {authors.map((author, index) => (
                  <span key={author.id}>
                    <Link
                      href={`/author/${author.id}`}
                      className="hover:text-primary hover:underline"
                    >
                      {author.name}
                    </Link>
                    {index < authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
              {sources && sources.length > 0 && (
                <>
                  <span>•</span>
                  <Link
                    href={sources[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-primary hover:underline"
                  >
                    {sources[0].name}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onBookmark}
              className={cn(isBookmarked && "text-primary")}
            >
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={onShare}>
              <Share className="h-5 w-5" />
            </Button>
            {pdfUrl && (
              <Button variant="outline" size="icon" asChild>
                <Link href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {repositoryUrl && (
              <Button variant="default" asChild>
                <Link
                  href={repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <span>View Repository</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {metrics && (
          <Card className="overflow-hidden border-border bg-card/50">
            <CardContent className="p-8">{renderMetrics()}</CardContent>
          </Card>
        )}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {content && <TabsTrigger value="fulltext">Full Text</TabsTrigger>}
          {readmeContent && <TabsTrigger value="readme">README</TabsTrigger>}
          <TabsTrigger value="cite">Cite</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 pt-6">
          {abstract && (
            <Card>
              <CardHeader>
                <CardTitle>Abstract</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactMarkdown
                  className="leading-7 text-foreground/80 dark:text-foreground/90"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={markdownComponents}
                >
                  {abstract}
                </ReactMarkdown>
              </CardContent>
            </Card>
          )}

          {programmingLanguages && programmingLanguages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
                <CardDescription className="text-foreground/80 dark:text-foreground/90">
                  Programming languages used in this repository
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programmingLanguages.map((lang) => (
                    <div key={lang.name} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          {lang.name}
                        </span>
                        <span className="text-foreground/80 dark:text-foreground/90">
                          {lang.percentage}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-accent/50">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {relatedContent && relatedContent.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Content</CardTitle>
                <CardDescription className="text-foreground/80 dark:text-foreground/90">
                  Related {type === 'paper' ? 'papers' : type === 'repository' ? 'repositories' : type === 'article' ? 'articles' : 'discussions'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedContent.map((item) => (
                    <Link
                      key={item.id}
                      href={`/content/${item.type}/${item.id}`}
                      className="group block space-y-2 rounded-lg border border-border bg-card/50 p-4 transition-colors hover:bg-accent"
                    >
                      <div className="font-medium text-foreground group-hover:text-primary">
                        {item.title}
                      </div>
                      <div className="text-sm text-foreground/80 dark:text-foreground/90">
                        {item.authors.join(", ")}
                      </div>
                      {item.description && (
                        <div className="text-sm text-foreground/60 dark:text-foreground/70">
                          {item.description}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {content && (
          <TabsContent value="fulltext" className="pt-6">
            <Card>
              <CardContent className="p-6">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={markdownComponents}
                >
                  {content}
                </ReactMarkdown>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {readmeContent && (
          <TabsContent value="readme" className="pt-6">
            <Card>
              <CardContent className="p-6">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={markdownComponents}
                >
                  {readmeContent}
                </ReactMarkdown>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="cite" className="pt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Citation</CardTitle>
                  <CardDescription className="text-foreground/80 dark:text-foreground/90">
                    Cite this work in your research
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={
                      citationFormat === "bibtex" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setCitationFormat("bibtex")}
                  >
                    BibTeX
                  </Button>
                  <Button
                    variant={citationFormat === "apa" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCitationFormat("apa")}
                  >
                    APA
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="rounded-lg bg-muted p-4 font-mono text-sm text-foreground/80 dark:text-foreground/90">
                  {citationFormat === "bibtex"
                    ? `@article{${title.toLowerCase().replace(/\s+/g, "_")},
  title={${title}},
  author={${authors.map((a) => a.name).join(" and ")}},
  journal={${sources?.[0]?.name || "Unknown"}},
  year={${new Date(date).getFullYear()}}
}`
                    : `${authors.map((a) => a.name).join(", ")} (${new Date(
                        date
                      ).getFullYear()}). ${title}. ${sources?.[0]?.name || "Unknown"}.`}
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8"
                  onClick={() => {
                    handleCopy(
                      citationFormat === "bibtex"
                        ? `@article{${title.toLowerCase().replace(/\s+/g, "_")},
  title={${title}},
  author={${authors.map((a) => a.name).join(" and ")}},
  journal={${sources?.[0]?.name || "Unknown"}},
  year={${new Date(date).getFullYear()}}
}`
                        : `${authors.map((a) => a.name).join(", ")} (${new Date(
                            date
                          ).getFullYear()}). ${title}. ${sources?.[0]?.name || "Unknown"}.`
                    );
                  }}
                >
                  {hasCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
