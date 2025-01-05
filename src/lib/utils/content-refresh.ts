import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useHomePageStore } from "@/lib/store/home";

export function useContentRefresh() {
  const fetch = useHomePageStore((state) => state.fetch);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      fetch();
    }
  }, [inView, fetch]);

  useEffect(() => {
    const interval = setInterval(fetch, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [fetch]);

  return ref;
}
