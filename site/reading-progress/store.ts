import { parseReadingPosition, readingStorageKey } from './model.ts';
import type { ReadingPosition } from './model.ts';

type StorageAccess = Pick<Storage, 'getItem' | 'setItem'>;

export function createReadingStore(access: () => StorageAccess | null, key: string = readingStorageKey) {
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach(listener => listener());
  const getSnapshot = (): string | null => {
    try {
      const raw = access()?.getItem(key) ?? null;
      return parseReadingPosition(raw) ? raw : null;
    } catch { return null; }
  };
  return {
    getSnapshot, notify,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    write(position: ReadingPosition) {
      const raw = JSON.stringify(position);
      if (!parseReadingPosition(raw)) return false;
      try {
        const storage = access();
        if (!storage) return false;
        if (storage.getItem(key) !== raw) storage.setItem(key, raw);
        if (storage.getItem(key) !== raw) return false;
        notify(); return true;
      } catch { return false; }
    },
  };
}

function browserStorage(): Storage | null {
  try { return typeof window === 'undefined' ? null : window.localStorage; } catch { return null; }
}
export const englishReadingKey = 'vctw.reading.v1.en.last';
const store = createReadingStore(browserStorage);
const englishStore = createReadingStore(browserStorage, englishReadingKey);
export const getEnglishReadingSnapshot = englishStore.getSnapshot;
export const writeEnglishReadingPosition = englishStore.write;
export function subscribeEnglishReading(listener: () => void) {
  const local = englishStore.subscribe(listener);
  const external = subscribeExternalReadingChange(listener, englishReadingKey);
  return () => { local(); external(); };
}
export const getReadingSnapshot = store.getSnapshot;
export const writeReadingPosition = store.write;
export const getServerReadingSnapshot = () => null;

export function subscribeExternalReadingChange(listener: () => void, key: string = readingStorageKey) {
  const change = (event: StorageEvent) => {
    const area = browserStorage();
    if (area && event.storageArea === area && (event.key === key || event.key === null)) listener();
  };
  window.addEventListener('storage', change);
  return () => window.removeEventListener('storage', change);
}

export function subscribeReadingPosition(listener: () => void) {
  const unsubscribe = store.subscribe(listener);
  const external = subscribeExternalReadingChange(listener);
  return () => { unsubscribe(); external(); };
}
