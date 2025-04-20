'use client';
import PostCard from 'app/components/PostCard';

export default function Home() {
  const dummyPost = {
    title: '윈드의 첫 블로그 글 ✍️',
    summary: '이 글은 내가 만든 커뮤니티 블로그의 첫 포스트입니다!',
    author: 'Wind',
    createdAt: '2025-04-06',
  };
  return (
    <div>
      <PostCard
        id={'123'}
        {...dummyPost}
        onClick={() => alert('상세 페이지로 이동!')}
      />
    </div>
  );
}
