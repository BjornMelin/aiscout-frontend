"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
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
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  showAutocomplete?: boolean;
  variant?: "header" | "page";
  onSearch?: (query: string) => void;
}

export function SearchBar({
  placeholder = "Search AI/ML content...",
  showAutocomplete = true,
  variant = "page",
  onSearch,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [debouncedValue] = useDebounce(value, 500);

  // Autocomplete suggestions state
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (debouncedValue.length < 2) return;
    // TODO: Implement API call for suggestions
    // For now, we'll use mock suggestions
    setSuggestions([
      `${debouncedValue} in papers`,
      `${debouncedValue} in repositories`,
      `${debouncedValue} in articles`,
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
  };

  return (
    <div
      className={`relative w-full ${
        variant === "header" ? "max-w-lg" : "max-w-2xl"
      } mx-auto`}
    >
      <div className="relative flex items-center">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`w-full pr-10 ${variant === "header" ? "h-9" : "h-12"}`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(value);
            }
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
          onClick={() => handleSearch(value)}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {showAutocomplete && suggestions.length > 0 && (
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {suggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion}
                  onSelect={() => {
                    setValue(suggestion);
                    handleSearch(suggestion);
                    setOpen(false);
                  }}
                >
                  {suggestion}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      )}
    </div>
  );
}
