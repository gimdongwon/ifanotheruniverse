'use client';

import { logout } from 'app/lib/api';
import { useUserStore } from 'app/store/userStore';
import { styled } from 'styled-components';
import Link from 'next/link';

export default function LogoutButton() {
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <LogoutButtonStyle href={'/login'} onClick={handleLogout}>
      <span>로그아웃</span>
    </LogoutButtonStyle>
  );
}

const LogoutButtonStyle = styled(Link)`
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
