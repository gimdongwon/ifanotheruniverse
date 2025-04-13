import { Request, Response } from 'express';
import Comment, { IComment } from 'app/models/Comment';
import Post from 'app/models/Post';

export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { content } = req.body;
  const { postId } = req.params;
  const userId = (req as any).user.id; // JWT 인증 미들웨어에서 추가된 사용자 ID

  try {
    // 게시글 존재 여부 확인
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // 댓글 생성
    const newComment: IComment = new Comment({
      content,
      author: userId,
      post: postId,
    });

    await newComment.save();

    res
      .status(201)
      .json({ message: 'Comment created successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getCommentsByPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId }).populate(
      'author',
      'name email'
    );
    res
      .status(200)
      .json({ message: 'Comments retrieved successfully', comments });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
