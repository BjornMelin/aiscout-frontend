/**
 * Author information in a citation
 */
interface Author {
  given: string;
  family: string;
  suffix?: string;
  prefix?: string;
  literal?: string;
  "dropping-particle"?: string;
  "non-dropping-particle"?: string;
}

/**
 * Date information in a citation
 */
interface DateParts {
  "date-parts": [number, number?, number?][];
  raw?: string;
  season?: number;
  circa?: boolean;
}

/**
 * Core citation data structure
 */
interface CitationData {
  id?: string;
  title: string;
  author: Author[];
  issued: DateParts;
  DOI?: string;
  URL?: string;
  ISBN?: string;
  ISSN?: string;
  "container-title"?: string;
  volume?: string;
  issue?: string;
  page?: string;
  type:
    | "article-journal"
    | "book"
    | "chapter"
    | "paper-conference"
    | "report"
    | "thesis"
    | string;
  publisher?: string;
  "publisher-place"?: string;
  abstract?: string;
  language?: string;
  categories?: string[];
  keywords?: string[];
}

/**
 * Options for bibliography formatting
 */
interface BibliographyOptions {
  template?: "apa" | "vancouver" | "harvard1" | string;
  lang?: string;
  format?: "text" | "html";
  lineOffset?: number;
  maxOffset?: number;
}

/**
 * Options for BibTeX formatting
 */
interface BibtexOptions {
  type?: string;
  format?: "text" | "html";
}

type CitationOptions = BibliographyOptions | BibtexOptions;

declare module "@citation-js/core" {
  export class Cite {
    constructor(data: CitationData | CitationData[]);
    format(format: "bibtex", options?: BibtexOptions): string;
    format(format: "bibliography", options?: BibliographyOptions): string;
    format(format: string, options?: CitationOptions): string;
  }
}

declare module "@citation-js/plugin-bibtex";
