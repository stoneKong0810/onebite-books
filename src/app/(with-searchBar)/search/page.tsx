import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { delay } from '@/util/delay';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  await delay(1500);
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
