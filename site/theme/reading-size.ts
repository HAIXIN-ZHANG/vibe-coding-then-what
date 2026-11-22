export const roles = ['body', 'title', 'heading', 'code', 'notes'] as const;
export type ReadingRole = typeof roles[number];
export const sizes = ['small', 'standard', 'large'] as const;
export type ReadingSize = typeof sizes[number];
export type ReadingSizes = { preset?: ReadingSize } & Partial<Record<ReadingRole, ReadingSize>>;
export const storageKey = 'vctw.reading-sizes.v1';

export function parseSizes(raw: string | null): ReadingSizes {
  let data: unknown;
  try { data = JSON.parse(raw ?? '{}'); } catch { return {}; }
  if (!data || typeof data !== 'object') return {};
  const entries = Object.entries(data).filter(([key, value]) =>
    (key === 'preset' || roles.some(role => role === key)) && sizes.some(size => size === value));
  return Object.fromEntries(entries);
}

const measures = {
  body: [1, 1.125, 1.375], title: [1.75, 2, 2.375], heading: [1.25, 1.4375, 1.75],
  code: [.875, 1, 1.1875], notes: [.8125, .9375, 1.125],
};

export function applySizes(root: HTMLElement, values: ReadingSizes) {
  for (const role of roles) {
    const size = values[role] ?? values.preset;
    const property = '--reader-size-' + role;
    root.toggleAttribute('data-reader-' + role, Boolean(size));
    if (size) root.style.setProperty(property, measures[role][sizes.indexOf(size)] + 'rem');
    else root.style.removeProperty(property);
  }
}
