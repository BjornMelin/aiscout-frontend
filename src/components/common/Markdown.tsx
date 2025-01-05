import React from "react";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import DOMPurify from "dompurify";
import type { Components } from "react-markdown";
import type { SyntaxHighlighterProps } from "react-syntax-highlighter";

interface MarkdownProps {
  children: string;
}

// Safe cast as unknown first to avoid type mismatch
const SyntaxHighlighterComponent = (SyntaxHighlighter as unknown) as React.FC<SyntaxHighlighterProps>;

export function Markdown({ children }: MarkdownProps) {
  const sanitizedContent = DOMPurify.sanitize(children);

  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const content = String(children).replace(/\n$/, "");

      if (!match) {
        return (
          <code className={className} {...props}>
            {content}
          </code>
        );
      }

      return (
        <SyntaxHighlighterComponent
          {...props}
          style={oneDark}
          language={match[1]}
          PreTag="div"
        >
          {content}
        </SyntaxHighlighterComponent>
      );
    },
  };

  return (
    <ReactMarkdown components={components}>{sanitizedContent}</ReactMarkdown>
  );
}
