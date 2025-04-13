import express from 'express';
import {
  createComment,
  getCommentsByPost,
} from '../controllers/commentController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// 댓글 작성 라우트
router.post('/:postId', verifyToken, createComment);

// 특정 게시글의 댓글 조회 라우트
router.get('/:postId', getCommentsByPost);

export default router;
