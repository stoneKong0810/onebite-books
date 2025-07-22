import BookItem from '@/components/book-item';
import { BookData } from '@/types';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/search?q=${q}`
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
