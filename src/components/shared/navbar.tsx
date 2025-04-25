'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BecomeAgentDialog } from '@/components/modals/become-agent';

interface NavbarProps {
  showSearchBar?: boolean;
  children?: React.ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  return (
    <header className='border-b sticky top-0 z-50 bg-white/60 backdrop-blur-3xl '>
      <div className='container mx-auto px-4 flex items-center justify-between'>
        <div>
          <Link href='/' className='inline-block'>
            <Image
              src='/logo.png'
              alt='ThinkLab Properties Logo'
              width={150}
              height={80}
              className='object-contain'
              unoptimized
            />
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          <BecomeAgentDialog />
        </div>
      </div>

      {children && (
        <div className='container mx-auto px-4 py-4'>{children}</div>
      )}
    </header>
  );
}
