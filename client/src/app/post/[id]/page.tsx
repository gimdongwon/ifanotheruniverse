// app/post/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function PostDetailPage() {
  const { id } = useParams();
  const postId = id as string;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // 임시 dummy fetch
    const fetchPost = async () => {
      // 실제로는 API 호출
      const dummy = {
        id: postId,
        title: '윈드의 첫 번째 포스트',
        content: '이것은 글의 본문입니다. styled-components도 쓸 수 있어요!',
        author: 'Wind',
        createdAt: '2025-04-06',
      };
      setPost(dummy);
    };

    if (id) fetchPost();
  }, [id, postId]);

  if (!post) return <p>불러오는 중...</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 40 }}>
      <h1>{post.title}</h1>
      <p style={{ color: '#999', fontSize: 14 }}>
        by {post.author} | {post.createdAt}
      </p>
      <div style={{ marginTop: 20, lineHeight: '1.6' }}>{post.content}</div>
    </div>
  );
}
