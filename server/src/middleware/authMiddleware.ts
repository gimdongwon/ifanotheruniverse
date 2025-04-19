import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'defaultsecret'
    );
    (req as any).user = decoded; // 요청 객체에 사용자 정보 추가
    next(); // 다음 미들웨어로 이동
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
