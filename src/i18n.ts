import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = [
  "zh-Hant",
  "zh-Hans", // Traditional Chinese, Simplified Chinese
  "en", // English
  "pt", // Portuguese
  "es", // Spanish
  "ja", // Japanese
  "de", // German
  "fr", // French
  "it", // Italian
  "bn", // Bengali
  "hi", // Hindi
  "ru", // Russian
  "ko", // Korean
  "vi", // Vietnamese
  "te", // Telugu
  "yue", // Cantonese
  "mr", // Marathi
  "ta", // Tamil
  "tr", // Turkish
  "ur", // Urdu
  "gu", // Gujarati
  "pl", // Polish
  "uk", // Ukrainian
  "ms", // Malay
  "kn", // Kannada
  "or", // Oriya
  "pa", // Punjabi
  "ro", // Romanian
  "az", // Azerbaijani
  "fa", // Farsi
  "my", // Burmese
  "th", // Thai
  "nl", // Dutch
  "yo", // Yoruba
  "sd", // Sindhi
];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../lang/${locale}.json`)).default,
  };
});
