import { BookData } from '@/types';
import style from './page.module.css';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/book/${id}`);
  if (!res.ok) {
    return <div>Failed to fetch book...</div>;
  }
  const book: BookData = await res.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
