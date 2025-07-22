import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';

async function AllBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/book`);
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/random`
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

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          <RecommendedBooks />
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          <AllBooks />
        </section>
      </div>
    </>
  );
}
