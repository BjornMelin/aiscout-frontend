"use client";

import { useEffect, useState } from "react";

interface LiveRegionProps {
  message: string;
  timeout?: number;
}

export function LiveRegion({ message, timeout = 5000 }: LiveRegionProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, [message, timeout]);

  if (!isVisible) return null;

  return (
    <div role="status" aria-live="polite" className="sr-only">
      {message}
    </div>
  );
}
