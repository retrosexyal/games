import { getDictionary } from '@/lib/i18n/dictionary';
import GamesList from '@/components/games/GamesList';
import { LanguageType } from '@/lib/i18n/types';


type Props = {
  params: {
    lang: LanguageType;
  };
};

export default function LocalizedHomePage({ params }: Props) {
  const dict = getDictionary(params.lang);
  const { site } = dict;

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold">
        {site.title}
      </h1>

      <GamesList dict={dict} lang={params.lang} />
    </main>
  );
}
