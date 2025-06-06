import { Request, Response } from 'express';
import Post, { IPost } from 'app/models/Post';
import { Types } from 'mongoose';

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, content } = req.body;
  const userId = (req as any).user.id; // JWT 인증 미들웨어에서 추가된 사용자 ID

  try {
    const newPost: IPost = new Post({
      title,
      content,
      author: userId,
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const rowPosts = await Post.find().populate('author', 'name email').lean(); // 작성자 정보 포함

    const posts = rowPosts.map((post) => {
      const author = post.author as unknown as {
        _id: Types.ObjectId;
        name: string;
        email: string;
      };
      return {
        ...post,
        id: post._id.toString(),
        author: {
          id: author._id.toString(),
          name: author.name,
          email: author.email,
        },
      };
    });

    res.status(200).json({ message: 'Posts retrieved successfully', posts });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const rowPost = await Post.findById(id)
      .populate('author', 'name email')
      .lean();
    if (!rowPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    const { _id, author, ...rest } = rowPost;

    const post = {
      ...rest,
      id: _id.toString(),
      author: {
        id: (author as any)._id.toString(),
        name: (author as any).name,
        email: (author as any).email,
      },
    };

    res.status(200).json({ message: 'Post retrieved successfully', post });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = (req as any).user.id;

  try {
    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    if (post.author.toString() !== userId) {
      res
        .status(403)
        .json({ message: 'Unauthorized: You can only edit your own posts' });
      return;
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    if (post.author.toString() !== userId) {
      res
        .status(403)
        .json({ message: 'Unauthorized: You can only delete your own posts' });
      return;
    }

    await post.deleteOne();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
