import { Cite } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import type { ContentItem } from "@/lib/types/content";
import { isPaper } from "@/lib/types/content";

export function generateCitation(
  content: ContentItem,
  format: "bibtex" | "apa"
): string {
  if (!isPaper(content)) {
    throw new Error("Content is not a paper");
  }

  const cite = new Cite({
    title: content.title,
    author: content.authors.map((author) => ({
      given: author.name.split(" ")[0],
      family: author.name.split(" ").slice(1).join(" "),
    })),
    issued: { "date-parts": [[new Date(content.publishedDate).getFullYear()]] },
    DOI: content.doi,
    "container-title": content.journal,
    type: "article-journal",
  });

  switch (format) {
    case "bibtex":
      return cite.format("bibtex");
    case "apa":
      return cite.format("bibliography", {
        template: "apa",
        lang: "en-US",
      });
    default:
      throw new Error("Unsupported citation format");
  }
}
