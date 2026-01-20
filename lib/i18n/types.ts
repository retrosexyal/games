import { DICTIONARY } from "./dictionary";

export type LanguageType = keyof typeof DICTIONARY;

export type DictionaryType = (typeof DICTIONARY)[keyof typeof DICTIONARY];
