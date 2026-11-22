import { loadEnglishBook } from './load-english.ts';
import { cache } from 'react';
import type { BookId } from '../config/books.ts';
import { loadBook, loadedChaptersForBook } from './load-book.ts';

// Deduplicate source validation/parsing within a server-rendering pass; no browser fetch.
const getChapters = cache(() => loadBook());

export const getBook = cache(async (bookId: BookId = 'work') =>
  loadedChaptersForBook(await getChapters(), bookId));

export const getEnglishBook = cache(async () => loadEnglishBook(await getChapters()));
