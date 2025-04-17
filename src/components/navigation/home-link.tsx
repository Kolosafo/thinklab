'use client';

import Link from 'next/link';
import Image from 'next/image';

export function HomeLink() {
  return (
    <Link href='/' className='flex items-center gap-2'>
      <div className='relative w-8 h-8'>
        <Image
          src='/logo.png'
          alt='ThinkLab Properties Logo'
          fill
          className='object-contain'
        />
      </div>
      <span className='text-xl font-bold text-rose-500'>
        ThinkLab Properties
      </span>
    </Link>
  );
}
