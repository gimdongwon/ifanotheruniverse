'use client';

// PostCard.tsx
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

interface PostCardProps {
  id: string;
  title: string;
  summary: string;
  author: string;
  createdAt: string;
  onClick?: () => void;
}

export default function PostCard({
  id,
  title,
  summary,
  author,
  createdAt,
}: PostCardProps) {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/post/${id}`)}>
      <Title>{title}</Title>
      <Summary>{summary}</Summary>
      <Footer>
        <Author>{author}</Author>
        <Date>{createdAt}</Date>
      </Footer>
    </Card>
  );
}

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h2`
  margin: 0 0 10px;
  font-size: 20px;
`;

const Summary = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0 0 16px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
`;

const Author = styled.span``;

const Date = styled.span``;
