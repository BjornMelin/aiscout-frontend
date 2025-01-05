"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ContentType } from "@/lib/types/search";

export const contentTypes: { id: ContentType; label: string }[] = [
  { id: "paper", label: "Research Papers" },
  { id: "repo", label: "Repositories" },
  { id: "article", label: "Articles" },
  { id: "discussion", label: "Discussions" },
];

export const dateRanges = [
  { id: "week", label: "Last Week" },
  { id: "month", label: "Last Month" },
  { id: "year", label: "Last Year" },
  { id: "custom", label: "Custom Range" },
];

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTypes, setSelectedTypes] = React.useState<ContentType[]>([]);
  const [dateRange, setDateRange] = React.useState("");
  const [customRange, setCustomRange] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Initialize filters from URL params
  React.useEffect(() => {
    const types = searchParams.getAll("type") as ContentType[];
    if (types.length) setSelectedTypes(types);

    const dateRangeParam = searchParams.get("dateRange");
    if (dateRangeParam) setDateRange(dateRangeParam);

    const fromDate = searchParams.get("from");
    const toDate = searchParams.get("to");
    if (fromDate && toDate) {
      setCustomRange({
        from: new Date(fromDate),
        to: new Date(toDate),
      });
    }
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Apply content type filters
    params.delete("type");
    selectedTypes.forEach((type) => params.append("type", type));

    // Apply date range
    if (dateRange) {
      params.set("dateRange", dateRange);
      if (dateRange === "custom" && customRange.from && customRange.to) {
        params.set("from", customRange.from.toISOString());
        params.set("to", customRange.to.toISOString());
      }
    } else {
      params.delete("dateRange");
      params.delete("from");
      params.delete("to");
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div>
        <h3 className="font-medium mb-2">Content Type</h3>
        <div className="space-y-2">
          {contentTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={(checked) => {
                  setSelectedTypes((prev) =>
                    checked
                      ? [...prev, type.id]
                      : prev.filter((t) => t !== type.id)
                  );
                }}
              />
              <label
                htmlFor={type.id}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Date Range</h3>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            {dateRanges.map((range) => (
              <SelectItem key={range.id} value={range.id}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {dateRange === "custom" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="mt-2 w-full justify-start text-left font-normal"
              >
                {customRange.from
                  ? `${customRange.from.toLocaleDateString()} - ${
                      customRange.to?.toLocaleDateString() || "Select"
                    }`
                  : "Select dates"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{
                  from: customRange.from,
                  to: customRange.to,
                }}
                onSelect={(range) => {
                  setCustomRange({
                    from: range?.from,
                    to: range?.to,
                  });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      </div>

      <Button onClick={applyFilters} className="mt-2">
        Apply Filters
      </Button>
    </div>
  );
}
