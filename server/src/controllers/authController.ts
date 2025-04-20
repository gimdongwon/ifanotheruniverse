import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from 'app/models/User';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' }
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60, // 1시간
      })
      .status(200)
      .json({
        message: 'Login successful',
        token,
        user: { name: user.name, email: user.email },
      });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // 클라이언트 측에서 토큰을 삭제하도록 요청
    res
      .clearCookie('token', {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        sameSite: 'lax',
      })
      .status(200)
      .json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id; // 요청 객체에서 사용자 정보 가져오기

    if (!userId) {
      res.status(401).json({ message: 'Invalid token' });
    }
    const user = await User.findById(userId).select('-password'); // 비밀번호 제외하고 사용자 정보 가져오기
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Success', user });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
