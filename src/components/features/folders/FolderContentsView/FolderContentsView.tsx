"use client";

import React from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DraggableContentCard } from "../DraggableContentCard/DraggableContentCard";
import { useFolderContentsStore } from "@/lib/store/folderContents";
import type { Folder } from "@/lib/types/folder";

interface FolderContentsViewProps {
  folder: Folder;
}

export function FolderContentsView({ folder }: FolderContentsViewProps) {
  const { toast } = useToast();
  const { items, isLoading, error, fetch, reorder, remove } =
    useFolderContentsStore();

  React.useEffect(() => {
    fetch(folder.id).catch((error: Error) => {
      console.error("Failed to fetch folder contents:", error);
    });
  }, [folder.id, fetch]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    const newOrder = arrayMove(items, oldIndex, newIndex);
    const orderedIds = newOrder.map((item) => item.id);

    try {
      await reorder(orderedIds);
      toast({
        title: "Success",
        description: "Items reordered successfully",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to reorder items";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      await remove(itemId);
      toast({
        title: "Success",
        description: "Item removed from folder",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to remove item";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <FolderContentsSkeleton />;
  }

  if (error) {
    return (
      <FolderContentsError error={error} onRetry={() => fetch(folder.id)} />
    );
  }

  if (items.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground mb-4">This folder is empty</p>
        <p className="text-sm text-muted-foreground">
          Save some content to add it to this folder
        </p>
      </Card>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4" role="list" aria-label="Folder contents">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <DraggableContentCard
              key={item.id}
              item={item}
              onRemove={handleRemove}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}

function FolderContentsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

function FolderContentsError({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) {
  return (
    <Card className="p-6 text-center">
      <p className="text-destructive mb-4">{error.message}</p>
      <Button onClick={onRetry}>Try Again</Button>
    </Card>
  );
}
