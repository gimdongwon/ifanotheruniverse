'use client';

import { logout } from 'app/lib';
import { useUserStore } from 'app/store/userStore';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
      로그아웃
    </button>
  );
}
