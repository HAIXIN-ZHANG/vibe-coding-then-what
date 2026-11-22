import { createHash } from 'node:crypto';
import type { Nodes, Root } from 'mdast';

declare module 'mdast' {
  interface ParagraphData { passageId?: string; sectionId?: string }
}

// Scoped to the heading and paragraph text, so inserting unrelated paragraphs does
// not invalidate a saved passage. Equal text within one section gets an ordinal.
export function markPassages(tree: Root, asText: (node: Nodes) => string) {
  const seen = new Map<string, number>();
  let section = '';
  function visit(node: Nodes) {
    if (node.type === 'heading') section = node.data?.id ?? '';
    if (node.type === 'paragraph' && section) {
      const fingerprint = createHash('sha256').update(section).update('\0')
        .update(asText(node).normalize('NFC').replace(/\s+/gu, ' ').trim()).digest('hex').slice(0, 24);
      const count = (seen.get(fingerprint) ?? 0) + 1;
      seen.set(fingerprint, count);
      node.data = { ...node.data, passageId: 'passage-' + fingerprint + (count > 1 ? '-' + count : ''), sectionId: section };
    }
    if ('children' in node) node.children.forEach(visit);
  }
  visit(tree);
}
