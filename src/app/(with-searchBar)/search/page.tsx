import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';

async function SearchResults({ q }: { q: string }) {
  await delay(1000);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/search?q=${q}`,
    { cache: 'force-cache' }
  );
  if (!res.ok) {
    return <div>Failed to fetch books...</div>;
  }

  const books: BookData[] = await res.json();

  return (
    <>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense key={q} fallback={<BookListSkeleton count={3} />}>
      <SearchResults q={q ?? ''} />
    </Suspense>
  );
}
