/**
 * Slugify — URL-safe string conversion with non-Latin script support.
 *
 * Handles CJK, Arabic, Hebrew, Cyrillic, Thai, Korean, and Latin characters.
 * Preserves non-Latin characters (encoded by the browser), strips diacritics
 * from Latin characters, and normalizes separators.
 *
 * Examples:
 *   slugify("Hello World")        → "hello-world"
 *   slugify("Über die Brücke")    → "uber-die-brucke"
 *   slugify("日本語のタイトル")      → "日本語のタイトル"
 *   slugify("مرحبا بالعالم")       → "مرحبا-بالعالم"
 *   slugify("Привет мир")          → "привет-мир"
 */

export function slugify(text: string): string {
  return (
    text
      // Normalize Unicode (NFC → NFD to decompose diacritics)
      .normalize('NFD')
      // Remove combining diacritical marks (accents on Latin chars)
      .replace(/[\u0300-\u036f]/g, '')
      // Normalize back
      .normalize('NFC')
      // Lowercase
      .toLowerCase()
      // Replace whitespace and underscores with hyphens
      .replace(/[\s_]+/g, '-')
      // Remove characters that are not: word chars, hyphens, or non-Latin scripts
      // \w covers [a-zA-Z0-9_], the rest covers CJK, Arabic, Hebrew, Cyrillic, Thai, Korean, etc.
      .replace(/[^\w\u0080-\uffff-]/g, '')
      // Collapse consecutive hyphens
      .replace(/-{2,}/g, '-')
      // Trim leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
  )
}
