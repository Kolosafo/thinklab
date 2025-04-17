'use client';

import type React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Building,
  Home,
  Hotel,
  Castle,
  Landmark,
  Store,
  Building2,
} from 'lucide-react';

interface PropertyType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const propertyTypes: PropertyType[] = [
  {
    id: 'Apartment',
    name: 'Apartment',
    icon: <Building className='h-5 w-5' />,
  },
  { id: 'Duplex', name: 'Duplex', icon: <Home className='h-5 w-5' /> },
  {
    id: 'Semi-Detached',
    name: 'Semi-Detached',
    icon: <Building2 className='h-5 w-5' />,
  },
  { id: 'Detached', name: 'Detached', icon: <Home className='h-5 w-5' /> },
  { id: 'Penthouse', name: 'Penthouse', icon: <Hotel className='h-5 w-5' /> },
  { id: 'Terraced', name: 'Terraced', icon: <Building2 className='h-5 w-5' /> },
  { id: 'Bungalow', name: 'Bungalow', icon: <Home className='h-5 w-5' /> },
  { id: 'Mansion', name: 'Mansion', icon: <Castle className='h-5 w-5' /> },
  { id: 'Commercial', name: 'Commercial', icon: <Store className='h-5 w-5' /> },
  { id: 'Land', name: 'Land', icon: <Landmark className='h-5 w-5' /> },
];

interface PropertyTypeFiltersProps {
  activePropertyType?: string;
}

export function PropertyTypeFilters({
  activePropertyType,
}: PropertyTypeFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePropertyTypeClick = (propertyTypeId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (propertyTypeId === activePropertyType) {
      params.delete('propertyType');
    } else {
      params.set('propertyType', propertyTypeId);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <ScrollArea className='w-full whitespace-nowrap'>
      <div className='flex space-x-4 py-2'>
        {propertyTypes.map((propertyType) => (
          <Button
            key={propertyType.id}
            variant={
              activePropertyType === propertyType.id ? 'default' : 'outline'
            }
            className='flex flex-col items-center px-4 py-2 h-auto gap-2'
            onClick={() => handlePropertyTypeClick(propertyType.id)}
          >
            {propertyType.icon}
            <span className='text-xs'>{propertyType.name}</span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
