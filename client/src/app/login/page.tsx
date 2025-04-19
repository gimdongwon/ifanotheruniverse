'use client';
import LoginForm from 'app/components/forms/LoginForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyInfo } from 'app/lib';
import { useUserStore } from 'app/store/userStore';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await getMyInfo();
        setUser(data.user);
        router.replace('/'); // ✅ 로그인된 상태라면 홈으로 리다이렉트
      } catch {
        // 인증 안 된 경우만 로그인 폼 노출
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router, setUser]);

  if (isChecking) return <p>로딩 중...</p>;
  return (
    <main style={{ maxWidth: 400, margin: '0 auto', padding: '2rem' }}>
      <LoginForm />
    </main>
  );
}
