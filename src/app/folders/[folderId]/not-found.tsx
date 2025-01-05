import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderX } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Folder Not Found - AIScout",
  description: "The requested folder could not be found.",
};

export default function FolderNotFound() {
  return (
    <div
      className="container py-32 text-center"
      role="alert"
      aria-labelledby="error-title"
    >
      <FolderX
        className="h-16 w-16 mx-auto mb-6 text-muted-foreground"
        aria-hidden="true"
      />
      <h1 id="error-title" className="text-3xl font-bold mb-2">
        Folder Not Found
      </h1>
      <p className="text-muted-foreground mb-6">
        The folder you&apos;re looking for doesn&apos;t exist or you don&apos;t
        have access to it.
      </p>
      <Button asChild>
        <Link href="/folders">Back to Folders</Link>
      </Button>
    </div>
  );
}
