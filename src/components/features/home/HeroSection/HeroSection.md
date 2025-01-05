# HeroSection Component

The HeroSection component is the main banner section displayed at the top of the home page. It provides a search interface and quick access to popular search terms.

## Features

- Animated entrance with Framer Motion
- Search bar with autocomplete
- Popular search terms as clickable buttons
- Responsive design

## Usage

```tsx
import { HeroSection } from "@/components/features/home/HeroSection/HeroSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
```

## Props

This component doesn't accept any props as it's self-contained.

## Technical Details

- Uses `framer-motion` for animations
- Integrates with the search functionality through the SearchBar component
- Handles navigation using Next.js router
- Implements responsive design using Tailwind CSS

## Accessibility

- Search bar is keyboard accessible
- Popular search terms are properly labeled
- Proper heading hierarchy
- High contrast text for readability
