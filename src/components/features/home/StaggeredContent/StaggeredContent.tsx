"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ContentCard } from "@/components/features/content/ContentCard/ContentCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { ContentItem } from "@/lib/types/content";

interface StaggeredContentProps {
  /** Array of content items to display */
  items: ContentItem[];
  /** Optional className for container styling */
  className?: string;
  /** Whether the content is loading */
  isLoading?: boolean;
  /** Number of skeleton items to show while loading */
  skeletonCount?: number;
}

/**
 * StaggeredContent component that animates content items as they come into view
 */
export function StaggeredContent({
  items,
  className,
  isLoading = false,
  skeletonCount = 3,
}: StaggeredContentProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
      }));
    }
  }, [controls, inView]);

  if (isLoading) {
    return (
      <div className={className} data-testid="staggered-content-skeleton">
        {[...Array(skeletonCount)].map((_, i) => (
          <div key={i} className="mb-4">
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} data-testid="staggered-content">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          custom={i}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className="mb-4"
        >
          <ContentCard content={item} />
        </motion.div>
      ))}
    </div>
  );
}
