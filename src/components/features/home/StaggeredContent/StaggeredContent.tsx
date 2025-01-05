"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ContentCard } from "@/components/features/content/ContentCard/ContentCard";
import type { ContentItem } from "@/lib/types/content";

interface StaggeredContentProps {
  items: ContentItem[];
  className?: string;
}

export function StaggeredContent({ items, className }: StaggeredContentProps) {
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
        transition: { delay: i * 0.1 },
      }));
    }
  }, [controls, inView]);

  return (
    <div ref={ref} className={className}>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          custom={i}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          <ContentCard content={item} />
        </motion.div>
      ))}
    </div>
  );
}
