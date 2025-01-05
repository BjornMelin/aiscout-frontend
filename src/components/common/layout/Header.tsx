"use client";

import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchBar } from "@/components/features/search/SearchBar/SearchBar";
import { ThemeToggle } from "@/components/theme/theme-toggle";

/**
 * Header component for the AIScout application.
 * Contains the main navigation, search bar, notifications, and user profile.
 */
export default function Header() {
  const isLoggedIn = false;

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="mr-4 flex items-center space-x-2">
          <Link href="/" className="text-xl font-bold">
            AIScout
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/trending"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Trending
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 px-2 md:px-6">
          <SearchBar variant="header" onSearch={handleSearch} />
        </div>

        {/* Right Section: Theme, Notifications & Profile */}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <button
            className="rounded-full hover:bg-accent hover:text-accent-foreground p-2"
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5" />
          </button>

          {isLoggedIn ? (
            <Avatar>
              <AvatarImage src="" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
