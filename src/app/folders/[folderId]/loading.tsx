import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function FolderLoading() {
  return (
    <div
      className="container py-8 space-y-8"
      aria-busy="true"
      aria-label="Loading folder contents"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <Skeleton className="h-9 w-64" aria-hidden="true" />
          <Skeleton className="h-5 w-96" aria-hidden="true" />
        </div>

        <Skeleton className="h-10 w-24" aria-hidden="true" />
      </div>

      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" aria-hidden="true" />
                <Skeleton className="h-4 w-32" aria-hidden="true" />
              </div>
              <Skeleton className="h-8 w-8" aria-hidden="true" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
