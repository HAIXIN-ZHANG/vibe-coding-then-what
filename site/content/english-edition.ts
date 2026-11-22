// Only these reviewed editions have English routes. The order follows the Chinese contents.
type EnglishEdition = { slug: string; source?: string; sha256?: string; chineseSha256?: string };
export const englishEditions: Readonly<Record<string, EnglishEdition>> = {
  opening: { slug: 'before-we-start', chineseSha256: '168aeecdb063085511e7807bc33d10fb266ce1b2d0757b4ded0c1455b3c5c891', source: 'book/adaptations/en/00-before-we-start.md', sha256: 'f0858676a396e5b39b37a37e0d375a69e80125d21e407c8dba6a6a285434c2de' },
  G01: { slug: 'a-page-and-a-system' },
  F01: { slug: 'browser-foundations', chineseSha256: '833d20da8d946635221af05e264d506cc9e5d5692c24b75fccb2812cd57b854d', source: 'book/adaptations/en/02-browser-foundations.md', sha256: 'e717bfd11b43dedeaa7529d274934fe98f6986b9455314da4ea19c890b369ab9' },
  P810: { slug: 'after-ai-finishes' },
};
export function hasEnglishEdition(id: string): boolean {
  return Object.hasOwn(englishEditions, id);
}
export function englishStatus(id: string): string {
  return englishEditions[id]?.source ? 'Full chapter in English' : 'Overview · Chinese original';
}
