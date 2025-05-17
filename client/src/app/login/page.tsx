'use client';
import LoginForm from 'app/components/forms/LoginForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from 'app/store/userStore';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useUserStore();

  const onClickSignup = () => {
    router.push('/signup');
  };

  useEffect(() => {
    if (user) {
      // 이미 로그인된 경우 홈으로 리디렉션
      router.replace('/');
    }
  }, [user, router]);

  if (user) return <p>로딩 중...</p>;
  return (
    <main style={{ maxWidth: 400, margin: '0 auto', padding: '2rem' }}>
      <LoginForm />
      <button type='button' onClick={onClickSignup}>
        회원가입
      </button>
    </main>
  );
}
