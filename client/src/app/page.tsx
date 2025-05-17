'use client';

import Header from 'app/components/common/Header';
import Home from 'app/components/home/Home';

export default function HomePage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <Home />
      </main>
    </>
  );
}
