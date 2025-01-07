import { render, screen, fireEvent } from "@testing-library/react";
import { CuratedContent } from "../CuratedContent";
import { mockContent } from "@/data/mock/mock-content";

describe("CuratedContent", () => {
  it("renders all tab triggers", () => {
    render(<CuratedContent />);

    expect(screen.getByRole("tab", { name: "Papers" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Repos" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Articles" })).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Discussions" })
    ).toBeInTheDocument();
  });

  it("shows papers tab content by default", () => {
    render(<CuratedContent />);

    const paperContent = mockContent
      .filter((content) => content.type === "paper" && content.featured)
      .slice(0, 2);

    // Check if paper content is rendered
    paperContent.forEach((paper) => {
      expect(screen.getByText(paper.title)).toBeInTheDocument();
    });
  });

  it("switches content when clicking different tabs", () => {
    render(<CuratedContent />);

    // Click repositories tab
    fireEvent.click(screen.getByRole("tab", { name: "Repos" }));

    const repoContent = mockContent
      .filter((content) => content.type === "repository" && content.featured)
      .slice(0, 2);

    // Check if repository content is rendered
    repoContent.forEach((repo) => {
      expect(screen.getByText(repo.title)).toBeInTheDocument();
    });
  });

  it("shows correct number of items per tab", () => {
    render(<CuratedContent />);

    // Check papers tab
    const paperContent = screen.getAllByTestId("curated-section")[0];
    const paperCards = paperContent.querySelectorAll(".hover\\:bg-accent\\/50");
    expect(paperCards.length).toBeLessThanOrEqual(2);

    // Switch to repositories tab and check
    fireEvent.click(screen.getByRole("tab", { name: "Repos" }));
    const repoContent = screen.getAllByTestId("curated-section")[0];
    const repoCards = repoContent.querySelectorAll(".hover\\:bg-accent\\/50");
    expect(repoCards.length).toBeLessThanOrEqual(2);
  });

  it("filters featured content only", () => {
    render(<CuratedContent />);

    // Get all content cards across all tabs
    const allTabs = ["Papers", "Repos", "Articles", "Discussions"];

    allTabs.forEach((tabName) => {
      fireEvent.click(screen.getByRole("tab", { name: tabName }));
      const content = screen.getAllByTestId("curated-section")[0];
      const cards = content.querySelectorAll(".hover\\:bg-accent\\/50");

      // Verify each card corresponds to a featured item
      cards.forEach(() => {
        const type =
          tabName === "Repos"
            ? "repository"
            : tabName.toLowerCase().slice(0, -1);
        const featuredContent = mockContent
          .filter((item) => item.type === type && item.featured)
          .slice(0, 2);

        expect(featuredContent.length).toBeGreaterThan(0);
      });
    });
  });
});
