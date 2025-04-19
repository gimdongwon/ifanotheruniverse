import express from 'express';
import {
  loginUser,
  logoutUser,
  verifyUser,
} from 'app/controllers/authController';
import { verifyToken } from 'app/middleware/authMiddleware';

const router = express.Router();

// 로그인 라우트
router.post('/login', loginUser);

// 로그아웃 라우트
router.post('/logout', logoutUser);

// jwt 검증 라우트
router.get('/me', verifyToken, verifyUser);

export default router;
