'use client';

import { useEffect } from 'react';
import { useUserStore } from 'app/store/userStore';
import { getMyInfo } from 'app/lib/api';
import { AxiosError } from 'axios';

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setUser, clearUser } = useUserStore();

  useEffect(() => {
    if (user) return;

    const fetchUser = async () => {
      try {
        const { data } = await getMyInfo(); // 쿠키 인증 기반
        setUser(data.user);
      } catch (err) {
        const axiosErr = err as AxiosError;
        if (axiosErr.response?.status === 401) {
          clearUser();
        }
      }
    };

    fetchUser();
  }, [user, setUser, clearUser]);

  return <>{children}</>;
}
