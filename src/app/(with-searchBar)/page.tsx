import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';

async function AllBooks() {
  await delay(1500);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/book`, {
    cache: 'force-cache',
  });
  if (!res.ok) {
    return <div>Failed to fetch books...</div>;
  }

  const allBooks: BookData[] = await res.json();

  return (
    <>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

async function RecommendedBooks() {
  await delay(3000);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/random`,
    {
      next: {
        revalidate: 5,
      },
    }
  );
  if (!res.ok) {
    return <div>Failed to fetch books...</div>;
  }

  const recommendedBooks: BookData[] = await res.json();

  return (
    <>
      {recommendedBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          <Suspense fallback={<BookListSkeleton count={3} />}>
            <RecommendedBooks />
          </Suspense>
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          <Suspense fallback={<BookListSkeleton count={10} />}>
            <AllBooks />
          </Suspense>
        </section>
      </div>
    </>
  );
}
