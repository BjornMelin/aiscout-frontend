"use client";

import { useEffect, useState } from "react";

interface LiveRegionProps {
  /** The message to be announced by screen readers */
  message: string;
  /** Optional timeout in milliseconds before the message is removed */
  timeout?: number;
  /** Optional role for the live region */
  role?: "status" | "alert" | "log";
  /** Optional politeness setting for the live region */
  politeness?: "polite" | "assertive" | "off";
}

/**
 * LiveRegion component for announcing dynamic content changes to screen readers
 */
export function LiveRegion({
  message,
  timeout = 5000,
  role = "status",
  politeness = "polite",
}: LiveRegionProps) {
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
    <div
      role={role}
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
      data-testid="live-region"
    >
      {message}
    </div>
  );
}
