'use client';

import Link from 'next/link';
import { styled } from 'styled-components';
import { logout } from 'app/lib/api';
import { useUserStore } from 'app/store/userStore';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const { user } = useUserStore();
  const clearUser = useUserStore((state) => state.clearUser);
  const pathname = usePathname();
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
    <HeaderContainer>
      <h1>IFANOTHERUNIVERSE</h1>
      <WrapButton>
        {pathname !== '/mypage' && (
          <MyPageButton href='/mypage'>
            <span>마이페이지</span>
          </MyPageButton>
        )}
        {user ? (
          <MyPageButton href='/login' onClick={handleLogout}>
            <span>로그아웃</span>
          </MyPageButton>
        ) : (
          <MyPageButton href='/login'>
            <span>로그인</span>
          </MyPageButton>
        )}
      </WrapButton>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

const WrapButton = styled.div`
  display: flex;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
`;

const MyPageButton = styled(Link)`
  background-color: #f2f4f7;
  color: #333;
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
`;
