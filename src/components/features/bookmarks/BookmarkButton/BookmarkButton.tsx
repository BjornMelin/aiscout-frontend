"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bookmark, FolderPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFoldersStore } from "@/lib/store/folders";
import * as api from "@/lib/api/folders";
import type { ContentItem } from "@/lib/types/content";

interface BookmarkButtonProps {
  content: ContentItem;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function BookmarkButton({
  content,
  variant = "outline",
  size = "default",
}: BookmarkButtonProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const folders = useFoldersStore((state) => state.folders);
  const fetchFolders = useFoldersStore((state) => state.fetch);

  React.useEffect(() => {
    if (session?.user && isOpen) {
      fetchFolders().catch((error: Error) => {
        console.error("Failed to fetch folders:", error);
        toast({
          title: "Error",
          description: "Failed to load folders",
          variant: "destructive",
        });
      });
    }
  }, [session?.user, isOpen, fetchFolders, toast]);

  const handleBookmark = async (folderId?: string) => {
    if (!session) {
      router.push("/sign-in");
      return;
    }

    setIsLoading(true);

    try {
      await api.addBookmark(content.id, { folderId });

      toast({
        title: "Success",
        description: "Content bookmarked successfully",
      });
      setIsOpen(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to bookmark content";
      console.error("Bookmark error:", error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateFolder = async (name: string) => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Folder name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const createFolder = useFoldersStore.getState().create;

    try {
      await createFolder({ name: name.trim() });

      toast({
        title: "Success",
        description: "Folder created successfully",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create folder";
      console.error("Create folder error:", error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className="gap-2">
          <Bookmark className="h-4 w-4" />
          Save
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save to Folder</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            disabled={isLoading}
            onClick={() => handleBookmark()}
          >
            <Bookmark className="h-4 w-4" />
            Save to Bookmarks
          </Button>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Folders</h4>
            {folders.map((folder) => (
              <Button
                key={folder.id}
                variant="ghost"
                className="w-full justify-start gap-2"
                disabled={isLoading}
                onClick={() => handleBookmark(folder.id)}
              >
                <FolderPlus className="h-4 w-4" />
                {folder.name}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => {
              const name = window.prompt("Enter folder name");
              if (name) handleCreateFolder(name);
            }}
          >
            <FolderPlus className="h-4 w-4" />
            Create New Folder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
