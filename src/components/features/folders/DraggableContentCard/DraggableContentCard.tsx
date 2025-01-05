"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Grip, MoreVertical, Trash } from "lucide-react";
import type { BookmarkedItem } from "@/lib/types/folder";

interface DraggableContentCardProps {
  item: BookmarkedItem;
  onRemove: (itemId: string) => void;
}

export function DraggableContentCard({
  item,
  onRemove,
}: DraggableContentCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} className="relative">
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
        aria-label="Drag handle"
        role="button"
        tabIndex={0}
      >
        <Grip className="h-4 w-4 text-muted-foreground" />
      </div>

      <CardContent className="pt-6 pl-10">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-muted-foreground">
              Added on {new Date(item.addedAt).toLocaleDateString()}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Actions">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onRemove(item.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Remove from Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>

      {item.note && (
        <CardFooter className="text-sm">
          <p>{item.note}</p>
        </CardFooter>
      )}
    </Card>
  );
}
