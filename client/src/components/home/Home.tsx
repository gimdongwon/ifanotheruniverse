'use client';

import PostCard from 'app/components/PostCard';
import { useQuery } from '@tanstack/react-query';
import { getPosts, PostCardProps } from 'app/lib/api';
import styled from 'styled-components';

export default function Home() {
  const { data: posts } = useQuery<PostCardProps[]>({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
  console.log(posts);
  return (
    <Container>
      <h2>최신 글</h2>
      {posts?.map((post: PostCardProps) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          summary={post.summary}
          author={post.author.name}
          createdAt={new Date(post.createdAt).toLocaleDateString()}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

// const Meta = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: 12px;
//   color: #999;
//   margin-top: 12px;
// `;
