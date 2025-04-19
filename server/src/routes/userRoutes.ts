import express from 'express';
import {
  signupUser,
  deleteUser,
  updateUser,
  findUserByName,
  findPasswordByEmail,
} from 'app/controllers/userController';

const router = express.Router();

// 회원가입 라우트
router.post('/signup', signupUser);

// 회원 삭제 라우트
router.delete('/delete', deleteUser);

// 회원정보 수정 라우트
router.put('/update', updateUser);

// 아이디(이메일) 찾기 라우트
router.post('/find-email', findUserByName);

// 비밀번호 찾기 라우트
router.post('/find-password', findPasswordByEmail);

export default router;
