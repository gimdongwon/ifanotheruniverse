// app/post/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPostById, PostCardProps } from 'app/lib/api';

export default function PostDetailPage() {
  const { id } = useParams();
  const postId = id as string;
  const [post, setPost] = useState<PostCardProps | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const posts = await getPostById(postId);
        console.log(posts);

        setPost(posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
    // Cleanup function to avoid memory leaks
    return () => {
      setPost(null);
    };
  }, [id, postId]);

  if (!post) return <p>불러오는 중...</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 40 }}>
      <h1>{post.title}</h1>
      <p style={{ color: '#999', fontSize: 14 }}>
        by {post.author.name} | {post.createdAt}
      </p>
      <div style={{ marginTop: 20, lineHeight: '1.6' }}>{post.content}</div>
    </div>
  );
}
