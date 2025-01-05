import { render, screen } from "@testing-library/react";
import { MarkdownViewer } from "../MarkdownViewer";

// Mock next/image since we're using it in the component
jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt = '', ...props }: { alt?: string } & Record<string, unknown>) => <img alt={alt} {...props} />,
}));

describe("MarkdownViewer", () => {
  const sampleMarkdown = `
# Heading 1
## Heading 2

Normal paragraph with **bold** and *italic* text.

[Link to Google](https://google.com)

\`\`\`typescript
interface User {
  id: string;
  name: string;
}
\`\`\`

> Blockquote text

* List item 1
* List item 2

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |

![Test Image](https://example.com/image.jpg)
`;

  it("renders basic markdown elements correctly", () => {
    render(<MarkdownViewer>{sampleMarkdown}</MarkdownViewer>);

    expect(screen.getByText("Heading 1")).toBeInTheDocument();
    expect(screen.getByText("Heading 2")).toBeInTheDocument();
    expect(screen.getByText(/Normal paragraph/)).toBeInTheDocument();
  });

  it("renders code blocks with syntax highlighting", () => {
    render(<MarkdownViewer>{sampleMarkdown}</MarkdownViewer>);

    const codeBlock = screen.getByText(/interface User/);
    expect(codeBlock).toBeInTheDocument();
    expect(codeBlock.closest("pre")).toHaveClass("bg-muted");
  });

  it("renders links with correct attributes", () => {
    render(<MarkdownViewer>{sampleMarkdown}</MarkdownViewer>);

    const link = screen.getByText("Link to Google");
    expect(link).toHaveAttribute("href", "https://google.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders lists correctly", () => {
    render(<MarkdownViewer>{sampleMarkdown}</MarkdownViewer>);

    const listItems = screen.getAllByText(/List item/);
    expect(listItems).toHaveLength(2);
    expect(listItems[0].closest("ul")).toBeInTheDocument();
  });

  it("renders tables with proper structure", () => {
    render(<MarkdownViewer>{sampleMarkdown}</MarkdownViewer>);

    expect(screen.getByText("Header 1")).toBeInTheDocument();
    expect(screen.getByText("Cell 1")).toBeInTheDocument();
    const table = screen.getByText("Header 1").closest("table");
    expect(table).toHaveClass("min-w-full");
  });

  it("renders images with next/image component", () => {
    render(<MarkdownViewer>{sampleMarkdown}</MarkdownViewer>);

    const image = screen.getByAltText("Test Image");
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(image).toHaveAttribute("width", "800");
    expect(image).toHaveAttribute("height", "400");
  });

  it("renders blockquotes with proper styling", () => {
    render(<MarkdownViewer>{sampleMarkdown}</MarkdownViewer>);

    const blockquote = screen.getByText("Blockquote text");
    expect(blockquote.closest("blockquote")).toHaveClass("border-l-4");
  });
}); 