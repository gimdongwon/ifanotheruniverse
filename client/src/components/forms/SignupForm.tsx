'use client';

import { useState } from 'react';
import { signup } from 'app/lib';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { status, data } = await signup(form);

      if (status === 201) {
        router.push('/login');
      } else {
        setError(data.message || '회원가입에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      setError('서버 오류가 발생했습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <h2>회원가입</h2>
      <input
        type='text'
        name='name'
        placeholder='닉네임'
        value={form.name}
        onChange={handleChange}
        required
      />
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
      <button type='submit'>회원가입</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
