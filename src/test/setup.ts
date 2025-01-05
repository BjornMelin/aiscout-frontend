import React from "react";
import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";
import type { ReactNode } from "react";

interface ImageProps extends Record<string, unknown> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface LinkProps extends Record<string, unknown> {
  children: ReactNode;
  href?: string;
}

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "",
  notFound: jest.fn(),
}));

// Mock Next.js image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: function Image(props: ImageProps) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return React.createElement("img", props);
  },
}));

// Mock Next.js link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: function Link({ children, ...props }: LinkProps) {
    return React.createElement("a", props, children);
  },
}));

// Add TextEncoder and TextDecoder to global scope for DOMPurify
global.TextEncoder = TextEncoder;
// TextDecoder has a complex type that's not worth replicating for tests
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;

interface MediaQueryList {
  matches: boolean;
  media: string;
  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => void) | null;
  addListener: (callback: (event: MediaQueryListEvent) => void) => void;
  removeListener: (callback: (event: MediaQueryListEvent) => void) => void;
  addEventListener: (
    type: string,
    callback: (event: MediaQueryListEvent) => void
  ) => void;
  removeEventListener: (
    type: string,
    callback: (event: MediaQueryListEvent) => void
  ) => void;
  dispatchEvent: (event: Event) => boolean;
}

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(
    (query: string): MediaQueryList => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })
  ),
});
