"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Share2, Trash2, FolderOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Folder } from "@/lib/types/folder";

interface FolderCardProps {
  folder: Folder;
  onShare: () => void;
  onDelete: () => void;
}

export function FolderCard({ folder, onShare, onDelete }: FolderCardProps) {
  const router = useRouter();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          className="p-4 h-48 flex flex-col cursor-pointer hover:border-primary transition-colors"
          onClick={() => router.push(`/folders/${folder.id}`)}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold truncate">{folder.name}</h3>
              {folder.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {folder.description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-auto">
            <p className="text-sm text-muted-foreground">
              {folder.items.length} items
            </p>
            {folder.isShared && (
              <p className="text-sm text-muted-foreground">Shared</p>
            )}
          </div>
        </Card>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem onClick={() => router.push(`/folders/${folder.id}`)}>
          <FolderOpen className="h-4 w-4 mr-2" />
          Open Folder
        </ContextMenuItem>
        <ContextMenuItem onClick={onShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </ContextMenuItem>
        <ContextMenuItem
          onClick={onDelete}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
