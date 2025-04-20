'use client';

import Header from 'app/components/common/Header';
import { useUserStore } from 'app/store/userStore';
import { useEffect } from 'react';
import { getMyInfo } from 'app/lib/api';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  console.log('🔥 [mypage] 렌더됨 (client)');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getMyInfo();
        setUser(data.user);
      } catch (err) {
        const axiosErr = err as AxiosError;
        if (
          axiosErr.response?.status === 401 ||
          axiosErr.response?.status === 403
        ) {
          router.replace('/login');
        } else {
          console.error('Unexpected error:', err);
        }
      }
    };
    if (user) {
      return;
    }
    fetchUser();
  }, [router, setUser, user]);
  if (!user) return <p>로딩 중...</p>;

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
      <Header />
      <h2>{user.name}님의 마이페이지</h2>
      <p>{user.email}</p>
    </main>
  );
}
