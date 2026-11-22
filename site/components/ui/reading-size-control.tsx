'use client';

import { useLayoutEffect, useState } from 'react';
import type { Locale } from '../../config/i18n.ts';
import { applySizes, parseSizes, roles, sizes, storageKey } from '../../theme/reading-size.ts';
import type { ReadingSizes, ReadingSize } from '../../theme/reading-size.ts';

let session: ReadingSizes = {};
function loadSizes() {
  try { session = parseSizes(localStorage.getItem(storageKey)); } catch { /* Keep this session's choice. */ }
  return session;
}

export function ReadingSizeControl({ locale, onChange }: { locale: Locale; onChange: () => void }) {
  const [values, setValues] = useState<ReadingSizes>({});
  const zh = locale === 'zh';
  useLayoutEffect(() => {
    function restore() {
      const next = loadSizes();
      applySizes(document.documentElement, next);
      setValues(next);
    }
    restore();
    const changed = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) restore();
    };
    window.addEventListener('storage', changed);
    return () => window.removeEventListener('storage', changed);
  }, []);
  function update(next: ReadingSizes) {
    const passage = [...document.querySelectorAll<HTMLElement>('.chapter-prose > p')].find(p => {
      const rect = p.getBoundingClientRect();
      return rect.bottom > window.innerHeight * .45 && rect.top < window.innerHeight;
    });
    const before = passage?.getBoundingClientRect().top;
    session = next;
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* The current page still applies it. */ }
    applySizes(document.documentElement, next);
    if (passage && before !== undefined && window.scrollY > 0) window.scrollBy({ top: passage.getBoundingClientRect().top - before, behavior: 'instant' });
    onChange();
    setValues(next);
  }
  const localNames = zh ? ['小', '标准', '大'] : ['Small', 'Standard', 'Large'];
  const roleNames = zh ? ['正文', '章题', '小节标题', '代码', '注释和图注'] : ['Body', 'Chapter title', 'Section headings', 'Code', 'Notes and captions'];
  const sizeOptions = sizes.map((size, i) => <option key={size} value={size}>{localNames[i]}</option>);
  return <fieldset className="reader-size-settings">
    <legend>{zh ? '阅读字号' : 'Reading size'}</legend>
    <label>{zh ? '全章字号' : 'Chapter preset'} <select value={values.preset ?? ''} onChange={e => {
      const next = { ...values };
      if (e.target.value) next.preset = e.target.value as ReadingSize;
      else delete next.preset;
      update(next);
    }}><option value="">{zh ? '版式默认' : 'Edition default'}</option>{sizeOptions}</select></label>
    <details><summary>{zh ? '分别调整字号' : 'Adjust individual sizes'}</summary>
      {roles.map((role, i) => <label key={role}>{roleNames[i]} <select value={values[role] ?? ''}
        onChange={event => {
          const next = { ...values };
          if (event.target.value) next[role] = event.target.value as ReadingSize;
          else delete next[role];
          update(next);
        }}><option value="">{zh ? '跟随全章' : 'Use preset'}</option>{sizeOptions}</select></label>)}
    </details>
    <button type="button" onClick={() => update({})}>{zh ? '恢复默认字号' : 'Reset reading sizes'}</button>
  </fieldset>;
}
