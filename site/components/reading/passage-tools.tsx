'use client';

import { useState } from 'react';
import { contextText, passageUrl, readBookmarks } from './passage-model.ts';
import type { Bookmark } from './passage-model.ts';
import { correctionUrl } from './sharing.ts';
import type { SharingContext } from './sharing.ts';

type Passage = { id: string; text: string };
type Props = { context: SharingContext; headingId: string; headingTitle: string };
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
const storageKey = 'vctw.reader-bookmarks.v1' + prefix;

function storedMarks() {
  try { return readBookmarks(localStorage.getItem(storageKey), location.origin, prefix); } catch { return []; }
}

export function PassageTools({ context, headingId, headingTitle }: Props) {
  const zh = context.locale !== 'en';
  const [open, setOpen] = useState(false);
  const [passages, setPassages] = useState<Passage[]>([]);
  const [selected, setSelected] = useState('');
  const [marks, setMarks] = useState<Bookmark[]>([]);
  const [text, setText] = useState<string | null>(null);
  const [correction, setCorrection] = useState(false);
  const [include, setInclude] = useState(false);
  const [manual, setManual] = useState('');
  const [status, setStatus] = useState('');
  const chosen = passages.find(p => p.id === selected);
  const url = open ? passageUrl(location.href, headingId, selected, context.sourceHash) : '';
  const relative = open ? url.slice(location.origin.length) : '';
  const excerpt = chosen?.text.slice(0, 600) ?? '';

  function clearResults() {
    setStatus(''); setManual(''); setText(null); setCorrection(false); setInclude(false);
  }
  function show() {
    const article = document.getElementById(headingId)?.closest('article');
    const paragraphs = [...article?.querySelectorAll<HTMLElement>('p[data-passage-section]') ?? []]
      .filter(p => p.dataset.passageSection === headingId)
      .map(p => ({ id: p.id, text: p.textContent ?? '' }));
    const currentId = window.getSelection()?.anchorNode?.parentElement?.closest('p[data-passage-section]')?.id;
    setPassages(paragraphs); setSelected(paragraphs.find(p => p.id === currentId)?.id ?? paragraphs[0]?.id ?? '');
    setMarks(storedMarks()); clearResults(); setOpen(true);
  }
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value); setManual(''); setStatus(zh ? '已复制' : 'Copied');
    } catch {
      setManual(value); setStatus(zh ? '请选择下方文本，手动复制。' : 'Select the text below to copy it manually.');
    }
  }
  function changeMark(href: string, add: boolean) {
    const items = storedMarks().filter(item => item.href !== href);
    if (add) items.unshift({ href, title: context.chapterTitle, label: chosen?.text.slice(0, 52) || headingTitle });
    try {
      localStorage.setItem(storageKey, JSON.stringify(items)); setMarks(items);
      setStatus(add ? (zh ? '书签已保存在本浏览器' : 'Bookmark saved in this browser') : (zh ? '已移除书签' : 'Bookmark removed'));
    } catch { setStatus(zh ? '此浏览器无法保存书签。可以复制链接留存。' : 'Bookmarks cannot be saved here. Copy the link to keep it.'); }
  }
  return <details className="passage-tools" onToggle={e => {
    if (e.target !== e.currentTarget) return;
    if (e.currentTarget.open) show();
    else { setOpen(false); clearResults(); }
  }}>
    <summary>{zh ? '段落、书签与 AI 上下文' : 'Passages, bookmarks and AI context'}</summary>
    {open && <div>
      {passages.length > 0 && <label>{zh ? '选择段落' : 'Choose a passage'} <select value={selected} onChange={e => { setSelected(e.target.value); clearResults(); }}>
        {passages.map((p, index) => <option key={p.id} value={p.id}>{index + 1}. {p.text.slice(0, 44)}</option>)}
      </select></label>}
      <div className="passage-actions">
        <button type="button" onClick={() => copy(url)}>{zh ? '复制定位链接' : 'Copy passage link'}</button>
        <button type="button" onClick={() => changeMark(relative, !marks.some(m => m.href === relative))}>{marks.some(m => m.href === relative)
          ? (zh ? '移除此书签' : 'Remove bookmark') : (zh ? '加书签' : 'Bookmark')}</button>
        <button type="button" onClick={() => { clearResults(); setCorrection(true); }}>{zh ? '反馈这一处' : 'Report this passage'}</button>
        <button type="button" onClick={() => { clearResults(); setText(contextText(zh, context.chapterTitle, headingTitle, excerpt, url, context.sourceHash)); }}>
          {zh ? '编辑 AI 上下文卡' : 'Edit AI context card'}
        </button>
      </div>
      {text !== null && <div><label>{zh ? '可编辑的原文、问题与出处' : 'Editable passage, question and source'}
        <textarea value={text} onChange={e => setText(e.target.value)} rows={7} /></label>
        <button type="button" onClick={() => copy(text)}>{zh ? '复制卡片' : 'Copy card'}</button></div>}
      {correction && <div className="passage-feedback">
        {excerpt && <label><input type="checkbox" checked={include} onChange={e => setInclude(e.target.checked)} />
          {zh ? '将以下节选附在 GitHub 草稿里' : 'Include this excerpt in the GitHub draft'}</label>}
        {excerpt && <blockquote>{excerpt}</blockquote>}
        <a href={correctionUrl(context, headingTitle, url, include ? excerpt : undefined)} target="_blank" rel="noopener noreferrer">
          {zh ? '带上位置与版本，到 GitHub 编辑草稿 ↗' : 'Open a GitHub draft with the location and source version ↗'}</a>
      </div>}
      {marks.length > 0 && <details><summary>{zh ? '本机书签' : 'Bookmarks on this device'} ({marks.length})</summary>
        <ul>{marks.map(mark => <li key={mark.href}><a href={mark.href}>{mark.title} · {mark.label}</a>{' '}
          <button type="button" onClick={() => changeMark(mark.href, false)}>{zh ? '移除' : 'Remove'}</button></li>)}</ul>
      </details>}
      <span role="status">{status}</span>
      {manual && <label>{zh ? '手动复制' : 'Copy manually'}<textarea value={manual} readOnly onFocus={e => e.target.select()} /></label>}
    </div>}
  </details>;
}
