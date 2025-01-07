"use client";

import React, { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { SearchSuggestion } from "@/lib/types/search";

interface SearchBarProps {
  placeholder?: string;
  showAutocomplete?: boolean;
  variant?: "header" | "page";
  className?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({
  placeholder = "Search AI/ML content...",
  showAutocomplete = true,
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

  React.useEffect(() => {
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

      {showAutocomplete && (
        <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
          <CommandInput
            value={value}
            onValueChange={setValue}
            placeholder={placeholder}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {suggestions.length > 0 && (
              <CommandGroup heading="Suggestions">
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion.id}
                    onSelect={() => {
                      setValue(suggestion.text);
                      handleSearch(suggestion.text);
                    }}
                  >
                    <span className="mr-2">
                      {suggestion.type === "term" && "🔍"}
                      {suggestion.type === "paper" && "📄"}
                      {suggestion.type === "author" && "👤"}
                      {suggestion.type === "repository" && "📦"}
                    </span>
                    {suggestion.text}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </CommandDialog>
      )}
    </div>
  );
}
