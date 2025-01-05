import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { refractor } from "refractor";
import { toHtml } from "hast-util-to-html";
import { Root } from "hast";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

// Import commonly used languages
import js from "refractor/lang/javascript";
import ts from "refractor/lang/typescript";
import jsx from "refractor/lang/jsx";
import tsx from "refractor/lang/tsx";
import bash from "refractor/lang/bash";
import css from "refractor/lang/css";
import json from "refractor/lang/json";
import python from "refractor/lang/python";

// Register languages
refractor.register(js);
refractor.register(ts);
refractor.register(jsx);
refractor.register(tsx);
refractor.register(bash);
refractor.register(css);
refractor.register(json);
refractor.register(python);

interface MarkdownViewerProps {
  children: string;
  className?: string;
}

export function MarkdownViewer({ children, className }: MarkdownViewerProps) {
  // const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Wait until mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const codeString = String(children).replace(/\n$/, "");

      // Handle inline code blocks
      if (!match) {
        return (
          <code
            className={cn(
              "relative rounded bg-muted px-[0.3em] py-[0.2em] font-mono text-sm",
              className
            )}
            {...props}
          >
            {codeString}
          </code>
        );
      }

      // Handle multi-line code blocks
      try {
        const highlighted = refractor.highlight(codeString, language);
        const html = toHtml(highlighted as unknown as Root);

        return (
          <div className="relative my-4">
            <div className="absolute top-0 right-0 px-3 py-2 text-xs font-medium text-muted-foreground rounded-tr">
              {language}
            </div>
            <pre className="mt-4 overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
              <code
                className={cn(className, "relative")}
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
                {...props}
              />
            </pre>
          </div>
        );
      } catch (err) {
        console.warn(`Language '${language}' not supported by refractor`, err);
        return (
          <pre className="mt-4 overflow-x-auto rounded-lg border bg-muted p-4">
            <code className={className} {...props}>
              {codeString}
            </code>
          </pre>
        );
      }
    },
    // Tables
    table({ children }) {
      return (
        <div className="my-6 w-full overflow-y-auto rounded-lg border">
          <table className="w-full">{children}</table>
        </div>
      );
    },
    thead({ children }) {
      return <thead className="border-b bg-muted">{children}</thead>;
    },
    th({ children }) {
      return (
        <th className="border-r px-4 py-2 text-left font-bold last:border-r-0">
          {children}
        </th>
      );
    },
    td({ children }) {
      return (
        <td className="border-r border-t px-4 py-2 last:border-r-0">
          {children}
        </td>
      );
    },
    // Links
    a({ children, href }) {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          className={cn(
            "font-medium underline underline-offset-4 transition-colors",
            "text-primary hover:text-primary/80"
          )}
          {...(isExternal && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
        >
          {children}
        </a>
      );
    },
    // Blockquotes
    blockquote({ children }) {
      return (
        <blockquote
          className={cn(
            "mt-6 border-l-4 pl-6 italic",
            "border-muted-foreground"
          )}
        >
          {children}
        </blockquote>
      );
    },
    // Images
    img({ src, alt }) {
      if (!src) return null;
      return (
        <div className="my-6 overflow-hidden rounded-lg border">
          <Image
            src={src}
            alt={alt || ""}
            width={800}
            height={400}
            className="w-full"
            style={{ height: "auto" }}
          />
        </div>
      );
    },
    // Headings
    h1({ children }) {
      return <h1 className="mt-10 mb-4 text-4xl font-bold">{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="mt-10 mb-4 text-3xl font-bold">{children}</h2>;
    },
    h3({ children }) {
      return <h3 className="mt-8 mb-4 text-2xl font-bold">{children}</h3>;
    },
    h4({ children }) {
      return <h4 className="mt-6 mb-4 text-xl font-bold">{children}</h4>;
    },
    // Lists
    ul({ children }) {
      return <ul className="my-6 ml-6 list-disc">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="my-6 ml-6 list-decimal">{children}</ol>;
    },
    // Paragraphs
    p({ children }) {
      return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
    },
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "prose dark:prose-invert max-w-none",
        "prose-headings:scroll-m-20",
        "prose-a:no-underline",
        "prose-p:leading-7",
        "prose-ul:my-6 prose-ul:ml-6",
        "prose-ol:my-6 prose-ol:ml-6",
        "prose-blockquote:border-l-4 prose-blockquote:border-muted",
        "prose-pre:my-6 prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:bg-muted prose-pre:p-4",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
