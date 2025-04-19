import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from 'app/models/User';

export const signupUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: 'User signuped successfully', user: { name, email } });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  try {
    // 이메일로 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // 사용자 삭제
    await User.deleteOne({ email });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, name, password } = req.body;

  try {
    // 이메일로 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // 사용자 정보 업데이트
    if (name) user.name = name;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({
      message: 'User updated successfully',
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const findUserByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body;

  try {
    // 이름으로 사용자 찾기
    const user = await User.findOne({ name });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User found', email: user.email });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const findPasswordByEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  try {
    // 이메일로 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // 보안상 비밀번호를 직접 반환하지 않는 것이 좋습니다.
    res.status(200).json({ message: 'User found', password: user.password });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
