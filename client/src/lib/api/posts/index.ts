import http from '../api';

export interface PostCardProps {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
    _id: string;
  };
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export const getPosts = async (): Promise<PostCardProps[]> => {
  const { data } = await http.get('/api/posts');
  return data.posts;
};

export const getPostById = async (id: string): Promise<PostCardProps> => {
  const { data } = await http.get(`/api/posts/${id}`);
  return data.post;
};
