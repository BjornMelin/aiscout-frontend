"use client";

import React, { useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { SearchSuggestion } from "@/lib/types/search";

interface SearchBarProps {
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Whether to show search suggestions */
  showSuggestions?: boolean;
  /** Variant of the search bar */
  variant?: "header" | "page";
  /** Additional CSS classes */
  className?: string;
  /** Callback when search is performed */
  onSearch?: (query: string) => void;
}

export function SearchBar({
  placeholder = "Search AI/ML content...",
  showSuggestions = true,
  variant = "page",
  className,
  onSearch,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState("");
  const [debouncedValue] = useDebounce(value, 500);
  const [isOpen, setIsOpen] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<SearchSuggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debouncedValue.length < 2) {
      setSuggestions([]);
      return;
    }
    // TODO: Implement API call for suggestions
    setSuggestions([
      { id: "1", type: "term", text: `${debouncedValue} in papers` },
      { id: "2", type: "paper", text: `${debouncedValue} in repositories` },
      { id: "3", type: "author", text: `${debouncedValue} in articles` },
    ]);
  }, [debouncedValue]);

  const handleSearch = (searchTerm: string) => {
    if (onSearch) {
      onSearch(searchTerm);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set("q", searchTerm);
    } else {
      params.delete("q");
    }
    router.push(`/search?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div
      className={cn(
        "relative w-full",
        variant === "header" ? "max-w-lg" : "max-w-2xl",
        "mx-auto",
        className
      )}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(value);
        }}
        className="relative flex items-center"
      >
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={cn("w-full pr-10", variant === "header" ? "h-9" : "h-12")}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </form>

      {showSuggestions && isOpen && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 w-full mt-1 bg-popover border rounded-md shadow-md z-50"
        >
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground px-2 py-1.5">
              Suggestions
            </div>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => {
                  setValue(suggestion.text);
                  handleSearch(suggestion.text);
                }}
                className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-sm flex items-center gap-2"
              >
                <span>
                  {suggestion.type === "term" && "🔍"}
                  {suggestion.type === "paper" && "📄"}
                  {suggestion.type === "author" && "👤"}
                  {suggestion.type === "repository" && "📦"}
                </span>
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
