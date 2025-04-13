import express from 'express';
import { loginUser, logoutUser } from 'app/controllers/authController';

const router = express.Router();

// 로그인 라우트
router.post('/login', loginUser);

// 로그아웃 라우트
router.post('/logout', logoutUser);

export default router;
