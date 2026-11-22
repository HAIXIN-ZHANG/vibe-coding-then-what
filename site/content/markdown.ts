import type { Nodes, Root } from 'mdast';
import { markPassages } from './passage-anchors.ts';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmTableFromMarkdown } from 'mdast-util-gfm-table';
import { gfmTable } from 'micromark-extension-gfm-table';

declare module 'mdast' {
  interface HeadingData { id?: string; legacyIds?: readonly string[] }
  interface CodeData { sectionTitle?: string }
  interface TableData { sectionTitle?: string }
}

export type HeadingLink = { id: string; title: string; level: 2 | 3 | 4 };
export type ParsedMarkdown = { tree: Root; title: string; headings: HeadingLink[]; headingIds: string[] };

export function nodeText(node: Nodes): string {
  if ('value' in node) return node.value;
  if ('children' in node) return node.children.map(nodeText).join('');
  return '';
}

export function walkMarkdown(node: Nodes, visit: (node: Nodes) => void): void {
  visit(node);
  if ('children' in node) node.children.forEach(child => walkMarkdown(child, visit));
}

const supportedNodes = new Set([
  'root', 'heading', 'paragraph', 'text', 'strong', 'emphasis', 'inlineCode', 'break',
  'list', 'listItem', 'blockquote', 'code', 'link', 'table', 'tableRow', 'tableCell', 'thematicBreak',
]);

export function parseMarkdown(source: string): ParsedMarkdown {
  const tree = fromMarkdown(source, { extensions: [gfmTable()], mdastExtensions: [gfmTableFromMarkdown()] });
  const headings: HeadingLink[] = [];
  const usedIds = new Set(['main']);
  const headingIds: string[] = [];
  let title = '';
  let h1Count = 0;
  let sectionTitle = '';
  walkMarkdown(tree, node => {
    if (!supportedNodes.has(node.type)) throw new Error(`Unsupported or unsafe Markdown node: ${node.type}`);
    if (node.type === 'heading') {
      const text = nodeText(node);
      const base = text.normalize('NFC').toLowerCase().replace(/[^\p{Letter}\p{Number}\p{Mark}\s-]/gu, '')
        .trim().replace(/[\s-]+/g, '-') || 'section';
      let id = base;
      let suffix = 2;
      while (usedIds.has(id)) id = `${base}-${suffix++}`;
      usedIds.add(id); headingIds.push(id); sectionTitle = text;
      node.data = { ...node.data, id };
      if (node.depth === 1) { title = text; h1Count++; }
      if (node.depth === 2 || node.depth === 3 || node.depth === 4) headings.push({ id, title: text, level: node.depth });
    }
    if (node.type === 'code' || node.type === 'table') node.data = { ...node.data, sectionTitle };
  });
  if (tree.children[0]?.type !== 'heading' || tree.children[0].depth !== 1 || h1Count !== 1) {
    throw new Error('A chapter must start with exactly one H1');
  }
  // Only this exact, recognized preamble is superseded by the reviewed manifest.
  const preamble = tree.children[1];
  if (preamble?.type === 'blockquote' &&
    source.slice(preamble.position?.start.offset, preamble.position?.end.offset) === '> 中文初稿 · 待 review') {
    tree.children.splice(1, 1);
  }
  markPassages(tree, nodeText);
  return { tree, title, headings, headingIds };
}

// Trusted build metadata only: aliases must never manufacture canonical headings.
export function applyLegacyHeadingAlias(parsed: ParsedMarkdown, legacyId: string, headingId: string): void {
  const headings: Extract<Nodes, { type: 'heading' }>[] = [];
  walkMarkdown(parsed.tree, node => { if (node.type === 'heading') headings.push(node); });
  const target = headings.find(node => node.data?.id === headingId);
  if (!target) throw new Error(`Legacy heading target is missing: ${headingId}`);
  if (!/^[\p{Letter}\p{Number}\p{Mark}]+(?:-[\p{Letter}\p{Number}\p{Mark}]+)*$/u.test(legacyId) ||
    legacyId === 'main' || parsed.headingIds.includes(legacyId) ||
    headings.some(node => node.data?.legacyIds?.includes(legacyId))) {
    throw new Error(`Legacy heading ID is invalid or collides: ${legacyId}`);
  }
  target.data = { ...target.data, legacyIds: [...(target.data?.legacyIds ?? []), legacyId] };
}
