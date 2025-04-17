import React from 'react';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MarketingLayout;
