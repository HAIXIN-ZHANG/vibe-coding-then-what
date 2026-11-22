export function ChapterArrow({ direction }: { direction: 'forward' | 'back' }) {
  return <svg aria-hidden="true" focusable="false" className="chapter-arrow" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    <path d={direction === 'back' ? 'M20 12H4m7-7-7 7 7 7' : 'M4 12h16m-7-7 7 7-7 7'} />
  </svg>;
}
