import { getDictionary } from "@/lib/i18n/dictionary";

import SnakeGame from "@/components/games/snake/SnakeGame";
import { LanguageType } from "@/lib/i18n/types";

type Props = {
  params: {
    lang: LanguageType;
  };
};

export function generateMetadata({ params }: Props) {
  const dict = getDictionary(params.lang);

  return {
    title: dict.snake.title,
    description: dict.snake.description,
  };
}

export default function LocalizedSnakePage({ params }: Props) {
  const dict = getDictionary(params.lang);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{dict.snake.title}</h1>

      <SnakeGame dict={dict} />

      <p className="mt-6 text-gray-600">{dict.snake.description}</p>
    </main>
  );
}
