import { getDictionary } from "@/lib/i18n/dictionary";
import SnakeGame from "@/components/games/snake/SnakeGame";

export function generateMetadata() {
  const dict = getDictionary("en");

  return {
    title: dict.snake.title,
    description: dict.snake.description,
  };
}

export default function SnakePage() {
  const dict = getDictionary("en");

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{dict.snake.title}</h1>

      <SnakeGame dict={dict} />

      <p className="mt-6 text-gray-600">{dict.snake.description}</p>
    </main>
  );
}
