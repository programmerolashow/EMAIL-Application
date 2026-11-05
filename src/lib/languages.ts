/**
 * Languages offered by "Translate email". Shared by the client (dropdown, detection) and the
 * server (input validation). `iso3` is the ISO 639-3 code franc returns; `iso1` matches
 * navigator.language prefixes.
 */
export interface TranslationLanguage {
  code: string;
  name: string;
  iso1: string;
  iso3: string;
}

export const TRANSLATION_LANGUAGES = [
  { code: "en", name: "English", iso1: "en", iso3: "eng" },
  { code: "fr", name: "French", iso1: "fr", iso3: "fra" },
  { code: "es", name: "Spanish", iso1: "es", iso3: "spa" },
  { code: "pt", name: "Portuguese", iso1: "pt", iso3: "por" },
  { code: "de", name: "German", iso1: "de", iso3: "deu" },
  { code: "it", name: "Italian", iso1: "it", iso3: "ita" },
  { code: "nl", name: "Dutch", iso1: "nl", iso3: "nld" },
  { code: "ar", name: "Arabic", iso1: "ar", iso3: "arb" },
  { code: "zh", name: "Chinese (Simplified)", iso1: "zh", iso3: "cmn" },
  { code: "ja", name: "Japanese", iso1: "ja", iso3: "jpn" },
  { code: "ko", name: "Korean", iso1: "ko", iso3: "kor" },
  { code: "hi", name: "Hindi", iso1: "hi", iso3: "hin" },
  { code: "ru", name: "Russian", iso1: "ru", iso3: "rus" },
  { code: "tr", name: "Turkish", iso1: "tr", iso3: "tur" },
  { code: "sw", name: "Swahili", iso1: "sw", iso3: "swh" },
  { code: "yo", name: "Yoruba", iso1: "yo", iso3: "yor" },
  { code: "ig", name: "Igbo", iso1: "ig", iso3: "ibo" },
  { code: "ha", name: "Hausa", iso1: "ha", iso3: "hau" },
  { code: "pcm", name: "Nigerian Pidgin", iso1: "pcm", iso3: "pcm" },
] as const satisfies readonly TranslationLanguage[];

export type TranslationLanguageCode = (typeof TRANSLATION_LANGUAGES)[number]["code"];

export const TRANSLATION_LANGUAGE_CODES = TRANSLATION_LANGUAGES.map((l) => l.code) as [
  TranslationLanguageCode,
  ...TranslationLanguageCode[],
];

export function languageName(code: string): string {
  return TRANSLATION_LANGUAGES.find((l) => l.code === code)?.name ?? code;
}
