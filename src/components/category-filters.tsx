'use client';

import type React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Building,
  Castle,
  Home,
  Mountain,
  Palmtree,
  Ship,
  Tent,
  Trees,
  Warehouse,
  Waves,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { id: 'beachfront', name: 'Beachfront', icon: <Waves className='h-5 w-5' /> },
  { id: 'cabins', name: 'Cabins', icon: <Home className='h-5 w-5' /> },
  { id: 'mansions', name: 'Mansions', icon: <Building className='h-5 w-5' /> },
  {
    id: 'countryside',
    name: 'Countryside',
    icon: <Mountain className='h-5 w-5' />,
  },
  { id: 'tropical', name: 'Tropical', icon: <Palmtree className='h-5 w-5' /> },
  { id: 'lakefront', name: 'Lakefront', icon: <Ship className='h-5 w-5' /> },
  { id: 'castles', name: 'Castles', icon: <Castle className='h-5 w-5' /> },
  { id: 'camping', name: 'Camping', icon: <Tent className='h-5 w-5' /> },
  { id: 'forest', name: 'Forest', icon: <Trees className='h-5 w-5' /> },
  { id: 'lofts', name: 'Lofts', icon: <Warehouse className='h-5 w-5' /> },
];

interface CategoryFiltersProps {
  activeCategory?: string;
}

export function CategoryFilters({ activeCategory }: CategoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId === activeCategory) {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <ScrollArea className='w-full whitespace-nowrap'>
      <div className='flex space-x-4 py-2'>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            className='flex flex-col items-center px-4 py-2 h-auto gap-2'
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.icon}
            <span className='text-xs'>{category.name}</span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
