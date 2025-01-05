"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import * as api from "@/lib/api/folders";
import type { Folder } from "@/lib/types/folder";

const formSchema = z.object({
  isPublic: z.boolean(),
  allowEdits: z.boolean(),
  users: z.array(z.string().email()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ShareFolderDialogProps {
  folder: Folder;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareFolderDialog({
  folder,
  open,
  onOpenChange,
}: ShareFolderDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isPublic: folder.shareSettings?.isPublic ?? false,
      allowEdits: folder.shareSettings?.allowEdits ?? false,
      users: folder.shareSettings?.sharedWith.map((u) => u.email) ?? [],
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const result = await api.shareFolder(folder.id, values);
      setShareUrl(`${window.location.origin}/shared/${result.shareToken}`);
      toast({
        title: "Success",
        description: "Folder sharing settings updated",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update sharing settings";
      console.error("Share folder error:", error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Folder</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div>
                    <FormLabel>Public Access</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Allow anyone with the link to view
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allowEdits"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div>
                    <FormLabel>Allow Edits</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Let others add or remove items
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="users"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Share with specific users</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email addresses"
                      value={field.value?.join(", ") ?? ""}
                      onChange={(e) => {
                        const emails = e.target.value
                          .split(",")
                          .map((email) => email.trim())
                          .filter(Boolean);
                        field.onChange(emails);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {shareUrl && (
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm font-medium mb-2">Share Link:</p>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={shareUrl}
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      toast({
                        title: "Copied!",
                        description: "Share link copied to clipboard",
                      });
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Sharing"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
