import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "@/components/features/search/SearchBar";

/**
 * Header component for the AIScout application.
 * Contains the main navigation, search bar, notifications, and user profile.
 */
export default function Header() {
  // TODO: Replace with actual auth state
  const isLoggedIn = false;

  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log("Search query:", query);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold">
            AIScout
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/trending"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Trending
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 items-center justify-center px-6">
          <SearchBar variant="header" onSearch={handleSearch} />
        </div>

        {/* Right Section: Notifications & Profile */}
        <div className="flex items-center gap-4">
          <button
            className="rounded-full hover:bg-accent hover:text-accent-foreground p-2"
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5" />
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
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
