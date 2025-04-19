'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMyInfo } from 'app/lib';
import { AxiosError } from 'axios';
import { useUserStore } from 'app/store/userStore';
import LogoutButton from 'app/components/common/LogoutButton';

export default function MyPage() {
  const router = useRouter();
  const { user, setUser } = useUserStore();

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
          router.replace('/login'); // 🔁 로그인 페이지로 이동
        } else {
          console.error('Unexpected error:', err);
        }
      }
    };

    fetchUser();
  }, [router, setUser, user]);

  if (!user) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>{user.name}님의 마이페이지</h2>
      <p>{user.email}</p>
      <LogoutButton />
    </div>
  );
}
