'use client';

import { useRef, useState } from 'react';
import type { SharingContext } from './sharing.ts';
import { sectionUrl, correctionUrl } from './sharing.ts';
import { PassageTools } from './passage-tools.tsx';
import { Button } from '../ui/button.tsx';

export function SectionActions({ context, headingId, headingTitle }: { context: SharingContext; headingId: string; headingTitle: string }) {
  const zh = context.locale !== 'en';
  const details = useRef<HTMLDetailsElement>(null), summary = useRef<HTMLElement>(null);
  const [copy, setCopy] = useState<{ url: string; result: 'copied' | 'manual' } | null>(null);
  const [preview, setPreview] = useState<{ url: string; issue: string } | null>(null);
  return <details ref={details} className="section-actions" data-heading-id={headingId}
    onKeyDown={event => {
      if (event.key === 'Escape') { event.stopPropagation(); if (details.current) details.current.open = false; summary.current?.focus({ preventScroll: true }); }
    }}>
    <summary ref={summary}>{zh ? '链接与纠错' : 'Links and feedback'}<span className="visually-hidden">{zh ? '：' : ': '}{headingTitle}</span></summary>
    <div className="section-actions-body">
      <div className="section-action-controls">
        <Button visual="quiet" onClick={async () => {
          const url = sectionUrl(window.location.href, headingId);
          try {
            if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
            await navigator.clipboard.writeText(url); setCopy({ url, result: 'copied' });
          } catch { setCopy({ url, result: 'manual' }); }
        }}>{zh ? '复制本节链接' : 'Copy section link'}</Button>
        <Button visual="quiet" onClick={() => {
          const url = sectionUrl(window.location.href, headingId);
          setPreview({ url, issue: correctionUrl(context, headingTitle, url) });
        }}>{zh ? '查看纠错信息' : 'Preview correction'}</Button>
      </div>
      <p className="section-copy-status" role="status">{copy?.result === 'copied' ? (zh ? '本节链接已复制' : 'Section link copied') : copy?.result === 'manual' ? (zh ? '无法自动复制，请选择下方链接并手动复制。' : 'Select and copy the link below.') : ''}</p>
      {copy?.result === 'manual' ? <label className="manual-section-link">{zh ? '本节链接' : 'Section link'}<textarea readOnly value={copy.url} onFocus={event => event.currentTarget.select()} /></label> : null}
      {preview ? <div className="correction-preview">
        <p>{zh ? '将在 GitHub 打开可编辑的问题草稿，请检查后自行提交。' : 'Review and edit the draft on GitHub before submitting.'}</p>
        <dl><dt>{zh ? '章节' : 'Chapter'}</dt><dd>{context.chapterTitle} ({context.chapterId})</dd><dt>{zh ? '小节' : 'Section'}</dt><dd>{headingTitle}</dd>
          <dt>{zh ? '原稿版本 SHA-256' : 'Source SHA-256'}</dt><dd><code>{context.sourceHash}</code></dd><dt>{zh ? '本节链接' : 'Section link'}</dt><dd>{preview.url}</dd></dl>
        <a href={preview.issue} target="_blank" rel="noopener noreferrer">{zh ? '在 GitHub 查看并编辑草稿 ↗' : 'Edit the draft on GitHub ↗'}</a>
      </div> : null}
      <PassageTools context={context} headingId={headingId} headingTitle={headingTitle} />
    </div>
  </details>;
}
