import type { Metadata } from 'next';
import StyledComponentsRegistry from 'app/lib/styled-components';
import { ReactQueryProvider } from 'app/components/common/ReactQueryProvider';
import AuthInitializer from 'app/components/common/AuthInitializer';

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
      <body>
        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <AuthInitializer>{children}</AuthInitializer>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
