# HeroSection Component

A hero section component that displays a search bar and popular search terms for the AI/ML content discovery platform.

## Features

- Large title and descriptive text
- Search bar with autocomplete
- Popular search terms as clickable badges
- Loading state with skeleton UI
- Responsive design

## Props

| Prop      | Type      | Required | Default | Description                                    |
| --------- | --------- | -------- | ------- | ---------------------------------------------- |
| isLoading | `boolean` | No       | `false` | Whether the component is in a loading state    |

## Usage

```tsx
import { HeroSection } from "@/components/features/home/HeroSection/HeroSection";

// Basic usage
<HeroSection />

// With loading state
<HeroSection isLoading={true} />
```

## Loading State

When `isLoading` is true, the component displays a skeleton UI that includes:
- Placeholder for the title
- Placeholder for the description
- Placeholder for the search bar
- Placeholders for popular search terms

The skeleton UI maintains the same layout and spacing as the loaded content, providing a smooth transition when data becomes available.

## Search Functionality

- The search bar accepts user input and triggers a search on Enter
- Popular search terms can be clicked to instantly search for that term
- All searches navigate to the search page with the appropriate query parameter

## Popular Searches

The component includes a predefined list of popular search terms:
- Large Language Models
- Transformers
- Computer Vision
- Reinforcement Learning
- Neural Networks

## Styling

- Uses Tailwind CSS for styling
- Responsive design that adapts to different screen sizes
- Consistent with the application's design system
- Uses shadcn/ui components for UI elements

## Testing

The component includes comprehensive tests that cover:
- Rendering of all main elements
- Loading state display
- Search functionality
- Popular search term interactions
- Navigation behavior 