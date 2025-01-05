import { useEffect, useRef } from "react";

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  action: () => void;
}

export function useKeyboardNavigation(shortcuts: KeyboardShortcut[]) {
  const shortcutsRef = useRef(shortcuts);
  shortcutsRef.current = shortcuts;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const shortcut = shortcutsRef.current.find(
        (s) =>
          s.key === e.key &&
          (!s.ctrlKey || e.ctrlKey) &&
          (!s.metaKey || e.metaKey)
      );

      if (shortcut) {
        e.preventDefault();
        shortcut.action();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);
}
