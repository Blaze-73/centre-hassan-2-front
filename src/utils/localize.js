export function localized(obj, lang) {
  if (obj === null || obj === undefined) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.fr || obj.en || '';
}
