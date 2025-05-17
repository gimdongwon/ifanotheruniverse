'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from 'app/lib/api';
import { LoginRequest } from 'app/lib/api/login/auth';
import { useUserStore } from 'app/store/userStore';

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { setUser } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { status, data } = await login(form);

      if (status === 200 && data.token) {
        localStorage.setItem('userToken', data.token); // ✅ 이후 인증 처리에 사용
        if (data.user) {
          setUser(data.user);
        } else {
          setError('유효하지 않은 사용자 데이터입니다.');
        }
        router.push('/');
      } else {
        setError(data.message || '로그인 실패');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        setError('서버 오류가 발생했습니다.');
      } else {
        console.error(err);
        setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <h2>로그인</h2>
      <input
        type='email'
        name='email'
        placeholder='이메일'
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type='password'
        name='password'
        placeholder='비밀번호'
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type='submit'>로그인</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
