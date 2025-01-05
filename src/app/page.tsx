import { TrendingSection } from "@/components/features/trending/TrendingSection/TrendingSection";

export default function Home() {
  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-4xl font-bold">Welcome to AIScout</h1>
      <p className="text-muted-foreground">
        Stay up to date with the latest trends in AI and Machine Learning
      </p>
      <TrendingSection />
    </div>
  );
}
