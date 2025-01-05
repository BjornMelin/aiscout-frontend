import { useEffect } from "react";
import { useHomePageStore } from "@/lib/store/home";
import { useInView } from "react-intersection-observer";

export function useContentRefresh() {
  const fetch = useHomePageStore((state) => state.fetch);
  const { ref, inView } = useInView();

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
