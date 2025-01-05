import { Cite } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import type { ResearchPaper } from "@/lib/types/content";

export function generateCitation(
  paper: ResearchPaper,
  format: "bibtex" | "apa"
): string {
  const cite = new Cite({
    title: paper.title,
    author: paper.authors.map((author) => ({
      given: author.name.split(" ")[0],
      family: author.name.split(" ").slice(1).join(" "),
    })),
    issued: { "date-parts": [[new Date(paper.date).getFullYear()]] },
    DOI: paper.doi,
    "container-title": paper.journal,
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
