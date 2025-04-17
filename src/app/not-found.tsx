import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      {/* Background Image with Overlay */}
      <div className='absolute inset-0'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/hero-house.jpg'
          alt='Private Jet Interior'
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-black/60' />
      </div>

      {/* Content */}
      <div className='relative grid min-h-[600px] place-content-center px-4 text-center'>
        <div className='mx-auto max-w-2xl space-y-8'>
          <h1 className='font-serif text-6xl text-white'>404</h1>
          <h2 className='font-serif text-3xl text-white'>Page Not Found</h2>
          <p className='text-lg text-white/80'>
            The page you&apos;re looking for has taken off to another
            destination. Let&apos;s get you back on track.
          </p>
          <div className='flex justify-center'>
            <Button
              asChild
              className='group/btn inline-flex items-center justify-between rounded-full border border-black/10 bg-white px-5 py-2.5 text-foreground transition-all hover:bg-white/90'
            >
              <Link href='/'>
                <div className='relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black'>
                  <ArrowLeft className='h-3 w-3 text-white transition-transform duration-300 group-hover/btn:-translate-x-4 group-hover/btn:opacity-0' />
                  <ArrowLeft className='absolute h-3 w-3 translate-x-6 text-white opacity-0 transition-all duration-300 group-hover/btn:translate-x-0 group-hover/btn:opacity-100' />
                </div>
                <span className='mr-3 text-sm font-medium'>Return Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
