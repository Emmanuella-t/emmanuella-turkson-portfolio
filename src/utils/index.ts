


// Kept for backwards compatibility with existing imports.
export function createPageUrl(pageName: string) {
  return '/' + pageName.toLowerCase().replace(/ /g, '-');
}