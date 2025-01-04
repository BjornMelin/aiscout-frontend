import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

// Static suggestions for testing
const suggestions = [
  "Reinforcement Learning",
  "Computer Vision",
  "Natural Language Processing",
  "Generative Adversarial Networks",
  "Transformers",
  "Convolutional Neural Networks",
  "Recurrent Neural Networks",
  "Deep Learning",
  "Machine Learning",
  "Artificial Intelligence",
  "GPT-4",
  "BERT",
  "ResNet",
  "arXiv",
  "GitHub",
  "OpenAI",
  "DeepMind",
];

interface SearchBarProps {
  variant?: "header" | "page";
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchBar({
  variant = "header",
  onSearch,
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
  useEffect(() => {
    const filtered = suggestions
      .filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 suggestions
    setFilteredSuggestions(filtered);
  }, [query]);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
    setShowSuggestions(false);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch?.(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div
      ref={searchRef}
      className={`relative ${className} ${
        variant === "page" ? "w-full max-w-3xl" : "w-full max-w-lg"
      }`}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search papers, repositories, articles..."
            className={`w-full rounded-md border border-input bg-background pl-9 ${
              variant === "page" ? "h-12 text-base px-4" : "h-9 text-sm px-3"
            } ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
            role="combobox"
            aria-label="Search"
            aria-controls="search-suggestions"
            aria-expanded={showSuggestions && query.length > 0}
            aria-haspopup="listbox"
          />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions &&
          query.length > 0 &&
          filteredSuggestions.length > 0 && (
            <ul
              id="search-suggestions"
              className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg py-1"
              role="listbox"
            >
              {filteredSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  role="option"
                  aria-selected={false}
                  className="px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
      </form>
    </div>
  );
}
