import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import GlobalStyle from '../../styles/GlobalStyle';
import StyledComponentsRegistry from 'app/lib/styled-components';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IFANOTHERUNIVERSE',
  description:
    '콘텐츠 거래와 후원으로 시작하여 크리에이터를 위한 슈퍼앱으로 만화, 애니메이션 등 서브 컬처 분야의 창작자와 팬들이 활발히 활동하는 커뮤니티',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>
          <GlobalStyle />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
