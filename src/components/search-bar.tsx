'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchBarProps {
  initialValues?: {
    location?: string;
    propertyType?: string;
    minPrice?: string;
    maxPrice?: string;
    rooms?: string;
  };
}

export function SearchBar({ initialValues = {} }: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState(initialValues.location || '');
  const [propertyType, setPropertyType] = useState(
    initialValues.propertyType || 'any'
  );
  const [rooms, setRooms] = useState(initialValues.rooms || 'any');

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location.trim()) params.set('location', location.trim());
    if (propertyType && propertyType !== 'any')
      params.set('propertyType', propertyType);
    if (rooms && rooms !== 'any') params.set('rooms', rooms);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className='flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0 md:divide-x'>
      <div className='relative flex-1'>
        <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
        <Input
          type='text'
          placeholder='Location? (City, Area, etc.)'
          className='pl-10  rounded-l-lg border-0 shadow-none focus-visible:ring-0'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </div>

      <div className='relative flex-1'>
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className='pl-10  border-0 shadow-none focus-visible:ring-0 rounded-none'>
            <SelectValue placeholder='Property Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='any'>Any Type</SelectItem>
            <SelectItem value='Apartment'>Apartment</SelectItem>
            <SelectItem value='Duplex'>Duplex</SelectItem>
            <SelectItem value='Semi-Detached'>Semi-Detached</SelectItem>
            <SelectItem value='Detached'>Detached</SelectItem>
            <SelectItem value='Penthouse'>Penthouse</SelectItem>
            <SelectItem value='Terraced'>Terraced</SelectItem>
            <SelectItem value='Bungalow'>Bungalow</SelectItem>
            <SelectItem value='Mansion'>Mansion</SelectItem>
            <SelectItem value='Villa'>Villa</SelectItem>
            <SelectItem value='Studio'>Studio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='relative flex-1'>
        <Select value={rooms} onValueChange={setRooms}>
          <SelectTrigger className=' border-0 shadow-none focus-visible:ring-0 rounded-none'>
            <SelectValue placeholder='Bedrooms' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='any'>Any</SelectItem>
            <SelectItem value='1'>1+</SelectItem>
            <SelectItem value='2'>2+</SelectItem>
            <SelectItem value='3'>3+</SelectItem>
            <SelectItem value='4'>4+</SelectItem>
            <SelectItem value='5'>5+</SelectItem>
            <SelectItem value='6'>6+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        className='rounded-r-lg px-6 w-full flex-1'
        size='lg'
        onClick={handleSearch}
      >
        <Search className='h-5 w-5 mr-2' />
        Search
      </Button>
    </div>
  );
}
