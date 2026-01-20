import Link from 'next/link';
import { GAMES } from '@/data/games';
import type { GamesListProps } from './types';

export default function GamesList({ dict, lang }: GamesListProps) {
  const { games } = dict;

  return (
    <section className="mt-8 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        {games.allGames}
      </h2>

      <ul className="flex flex-col gap-4">
        {GAMES.map(({ id, path }) => {
          const gameDict = games[id];
          const href = lang ? `/${lang}${path}` : path;

          return (
            <li
              key={id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-bold">
                  {gameDict.title}
                </div>
                <div className="text-sm text-gray-600">
                  {gameDict.description}
                </div>
              </div>

              <Link
                href={href}
                className="px-3 py-1 bg-black text-white text-sm"
              >
                {games.play}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
