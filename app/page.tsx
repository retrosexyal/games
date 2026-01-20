import { getDictionary } from "@/lib/i18n/dictionary";
import GamesList from "@/components/games/GamesList";

export function generateMetadata() {
  const dict = getDictionary("en");
  const { site } = dict;

  return {
    title: site.title,
    description: site.description,
  };
}

export default function HomePage() {
  const dict = getDictionary("en");
  const { site } = dict;

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold">{site.title}</h1>

      <GamesList dict={dict} />
    </main>
  );
}
