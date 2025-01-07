"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { setupNotificationWebSocket } from "@/lib/utils/notifications";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const ws = setupNotificationWebSocket();
    return () => ws?.close();
  }, []);

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-right" expand={true} richColors />
      </ThemeProvider>
    </SessionProvider>
  );
}
