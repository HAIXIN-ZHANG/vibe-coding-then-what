'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChapterRecording } from '../../content/chapter-recordings.ts';
import { formatDuration } from '../../content/chapter-recordings.ts';
import { withBasePath } from '../../config/deployment.ts';

export function PassageLanding() {
  useEffect(() => {
    function recover() {
      const { hash, search } = window.location;
      if (!/^#passage-[a-f0-9]{24}(?:-\d+)?$/.test(hash)) return;
      const article = document.querySelector('.chapter-prose');
      if (!article || article.contains(document.getElementById(hash.slice(1)))) return;
      const section = document.getElementById(new URLSearchParams(search).get('section') ?? '');
      const target = section && article.contains(section) ? section : article.querySelector('h1');
      if (target instanceof HTMLElement) {
        target.focus({ preventScroll: true });
        target.scrollIntoView();
      }
    }
    recover();
    window.addEventListener('hashchange', recover);
    return () => window.removeEventListener('hashchange', recover);
  }, []);
  return null;
}

export function ChapterAudio({ recording }: { recording: ChapterRecording }) {
  const zh = recording.locale === 'zh';
  const ref = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [rate, setRate] = useState(1);
  const url = withBasePath(recording.audio, process.env.NEXT_PUBLIC_BASE_PATH);
  async function start() {
    const audio = ref.current;
    if (!audio) return;
    setStarted(true); setFailed(false);
    if (!audio.src) audio.src = url;
    if (audio.error) audio.load();
    try { await audio.play(); } catch { setFailed(true); }
  }
  return <div className="chapter-audio">
    {(!started || failed) && <button type="button" onClick={start}>{failed ? (zh ? '重新播放录音' : 'Retry recording') : (zh ? '听本章' : 'Listen to this chapter')} · {formatDuration(recording.durationSeconds)}</button>}
    <audio ref={ref} controls preload="none" hidden={!started} aria-label={zh ? '本章中文录音' : 'Chapter recording'} onError={() => setFailed(true)} />
    {started && <label>{zh ? '播放速度' : 'Playback speed'} <select value={rate} onChange={event => {
      const value = Number(event.target.value);
      if (ref.current) ref.current.playbackRate = value;
      setRate(value);
    }}>{[.75, 1, 1.25, 1.5, 2].map(value => <option value={value} key={value}>{value}×</option>)}</select></label>}
    {failed && <p role="status">{zh ? '录音未能播放。可以重试，或继续阅读下方正文。' : 'The recording could not play. Retry or continue reading below.'}</p>}
  </div>;
}
