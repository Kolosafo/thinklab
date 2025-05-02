'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Instagram, XformerlyTwitter } from '@/components/icons/social';
import Container from '@/components/shared/container';
import { toast } from 'sonner';
import Image from 'next/image';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: XformerlyTwitter, href: '#', label: 'Twitter' },
];

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Projects', href: '/projects' },
    { label: 'Properties', href: '/properties' },
    { label: 'Blog', href: '/blog' },
  ],
  services: [
    { label: 'Property Search', href: '/search' },
    // { label: 'Virtual Tours', href: '/virtual-tours' },
    // { label: 'Financing', href: '/financing' },
    // { label: 'Market Analysis', href: '/market-analysis' },
  ],
};

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  // { label: 'Terms of Service', href: '/terms' },
  // { label: 'Cookie Policy', href: '/cookies' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');

    toast.success('Email subscribed successfully');
  };

  return (
    <footer className='border-t bg-white'>
      {/* Newsletter Section */}
      <div className='border-b'>
        <Container className='py-8'>
          <div className='flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center'>
            <div className='max-w-md'>
              <h3 className='font-serif text-xl font-medium'>
                Subscribe to Our Newsletter
              </h3>
              <p className='mt-1 text-muted-foreground'>
                Stay updated with our latest properties and real estate news.
              </p>
            </div>
            <div className='flex w-full max-w-md items-center gap-2'>
              <Input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='flex-1'
              />
              <Button onClick={handleSubmit}>Subscribe</Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <Container className='py-16'>
        <div className='flex flex-wrap justify-between gap-16'>
          {/* Brand Column */}
          <div className='flex flex-col gap-6'>
            <Link href='/' className='inline-block'>
              <Image
                src='/logo.png'
                alt='ThinkLab Properties Logo'
                width={150}
                height={80}
                className='object-contain'
              />
            </Link>
            <p className='max-w-xs text-sm text-muted-foreground'>
              Experience luxury living with our premium real estate and property
              development services.
            </p>
            <div className='flex gap-4'>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className='text-muted-foreground transition-colors hover:text-foreground'
                  aria-label={social.label}
                >
                  <social.icon className='h-5 w-5' />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className='flex gap-24'>
            <div className='flex flex-col gap-4'>
              <h3 className='font-medium'>Company</h3>
              <div className='flex flex-col gap-3 text-muted-foreground'>
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className='hover:text-foreground text-sm transition-colors duration-300'
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <h3 className='font-medium'>Services</h3>
              <div className='flex flex-col gap-3 text-muted-foreground'>
                {footerLinks.services.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className='hover:text-foreground text-sm transition-colors duration-300'
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Copyright and Legal Links */}
      <div className='border-t'>
        <Container className='py-6'>
          <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-between'>
            <p className='text-xs text-muted-foreground'>
              © {new Date().getFullYear()} Think labs. All rights reserved.
            </p>
            <div className='flex gap-6'>
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className='text-xs text-muted-foreground hover:text-foreground'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
