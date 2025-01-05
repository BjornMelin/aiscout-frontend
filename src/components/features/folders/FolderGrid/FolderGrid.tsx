"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderCard } from "../FolderCard/FolderCard";
import { CreateFolderDialog } from "../CreateFolderDialog/CreateFolderDialog";
import { ShareFolderDialog } from "../ShareFolderDialog/ShareFolderDialog";
import { useFoldersStore } from "@/lib/store/folders";
import type { Folder } from "@/lib/types/folder";
import { useToast } from "@/hooks/use-toast";

export function FolderGrid() {
  const { data: session } = useSession();
  const [selectedFolder, setSelectedFolder] = React.useState<Folder | null>(
    null
  );
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isShareOpen, setIsShareOpen] = React.useState(false);
  const { toast } = useToast();

  const {
    folders,
    isLoading,
    error,
    fetch,
    delete: deleteFolder,
  } = useFoldersStore();

  React.useEffect(() => {
    if (session?.user) {
      fetch().catch((error: Error) => {
        console.error("Failed to fetch folders:", error);
      });
    }
  }, [session, fetch]);

  const handleShare = (folder: Folder) => {
    setSelectedFolder(folder);
    setIsShareOpen(true);
  };

  const handleDelete = async (folder: Folder) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      try {
        await deleteFolder(folder.id);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to delete folder";
        console.error("Delete folder error:", error);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return <FolderGridSkeleton />;
  }

  if (error) {
    return <FolderGridError error={error} onRetry={fetch} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Folders</h2>
        <Button onClick={() => setIsCreateOpen(true)}>Create Folder</Button>
      </div>

      {folders.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground mb-4">
            You haven&apos;t created any folders yet
          </p>
          <Button onClick={() => setIsCreateOpen(true)}>
            Create Your First Folder
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              onShare={() => handleShare(folder)}
              onDelete={() => handleDelete(folder)}
            />
          ))}
        </div>
      )}

      <CreateFolderDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      {selectedFolder && (
        <ShareFolderDialog
          folder={selectedFolder}
          open={isShareOpen}
          onOpenChange={setIsShareOpen}
        />
      )}
    </div>
  );
}

function FolderGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

function FolderGridError({
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
