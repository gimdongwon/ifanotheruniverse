import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from 'app/controllers/postController';
import { verifyToken } from 'app/middleware/authMiddleware';

const router = express.Router();

// 글쓰기 라우트
router.post('/create', verifyToken, createPost);

// 글 목록 조회 라우트
router.get('/', getPosts);

// 특정 글 조회 라우트
router.get('/:id', getPostById);

// 글 수정 라우트
router.put('/:id', verifyToken, updatePost);

// 글 삭제 라우트
router.delete('/:id', verifyToken, deletePost);

export default router;
