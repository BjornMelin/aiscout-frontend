"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Settings,
  LogOut,
  User,
  Bookmark,
  ChartBar,
  Users,
  Search as SearchIcon,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
// import { useSession } from "next-auth/react";
// import { getUserDisplayImage } from "@/lib/types/userAuth";
import { signOut } from "next-auth/react";
import { mockUsers } from "@/data/mock/mock-user";
import { mockNotifications } from "@/data/mock/mock-notifications";

// Mock user data - TODO: replace with actual user data
const mockUser = mockUsers[0];

export default function Header() {
  const router = useRouter();
  // TODO: replace with actual auth state
  // const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // TODO: replace with actual auth state

  // TODO: Replace with real notifications data
  const unreadCount = 0;

  const handleLogout = async () => {
    await signOut();
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const NavSeparator = () => (
    <span className="text-muted-foreground/30">|</span>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex flex-1 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold">
              AIScout
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/trending"
                className="text-base text-muted-foreground transition-colors hover:text-primary"
              >
                Trending
              </Link>
              <NavSeparator />
              <Link
                href="/about"
                className="text-base text-muted-foreground transition-colors hover:text-primary"
              >
                About
              </Link>
              <NavSeparator />
              <Link
                href="/contact"
                className="text-base text-muted-foreground transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex max-w-sm flex-1 mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Right side: Theme, Notifications, Profile */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* TODO: replace with actual auth state */}
            {/* {session?.user ? ( */}
            {isLoggedIn ? (
              <>
                {/* Notifications Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                          {unreadCount}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {mockNotifications.slice(0, 5).map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="flex flex-col items-start gap-1 p-3"
                      >
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {notification.message}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(
                            notification.createdAt
                          ).toLocaleDateString()}
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/notifications"
                        className="w-full cursor-pointer"
                      >
                        <span className="flex-1">View all notifications</span>
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Separator orientation="vertical" className="h-6" />

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          // TODO: replace with actual user avatar
                          // src={getUserDisplayImage(session.user)}
                          src={mockUser.avatarSeed}
                          alt={mockUser.name || "User"}
                          // alt={session.user.name || "User"}
                        />
                        <AvatarFallback>
                          {/* TODO: replace with actual user avatar */}
                          {/* {session.user.name?.[0] || "U"} */}
                          {mockUser.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">
                          {/* TODO: replace with actual user name */}
                          {/* {session.user.name} */}
                          {mockUser.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {/* TODO: replace with actual user email */}
                          {/* {session.user.email} */}
                          {mockUser.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/user/${mockUser.id}`}
                          className="cursor-pointer"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/bookmarks" className="cursor-pointer">
                          <Bookmark className="mr-2 h-4 w-4" />
                          Bookmarks
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/analytics" className="cursor-pointer">
                          <ChartBar className="mr-2 h-4 w-4" />
                          Analytics
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/collaboration" className="cursor-pointer">
                          <Users className="mr-2 h-4 w-4" />
                          Collaboration
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-destructive focus:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/sign-in")}
                  >
                    Sign in
                  </Button>
                  <Button onClick={() => router.push("/sign-up")}>
                    Sign up
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
