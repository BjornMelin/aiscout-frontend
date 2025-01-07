"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "sonner";
import Header from "@/components/common/layout/Header/Header";
import Footer from "@/components/common/layout/Footer/Footer";
import { cn } from "@/lib/utils";
import { setupNotificationWebSocket } from "@/lib/utils/notifications";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

function LoadingSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="h-[60vh] bg-gradient-to-b from-background to-secondary/20 animate-pulse" />
      <div className="container py-16 space-y-16">
        <div className="space-y-8">
          <div className="h-10 w-48 bg-muted rounded-lg animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        <div className="h-96 bg-muted rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const ws = setupNotificationWebSocket();
    return () => ws?.close();
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <Suspense fallback={<LoadingSkeleton />}>
              <main className="flex-1">{children}</main>
            </Suspense>
            <Footer />
          </div>
          <Toaster position="top-right" expand={true} richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
