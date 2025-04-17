'use client';

import { use, useEffect, useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import Image from 'next/image';
import { listings } from '@/data/listings';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import {
  Bed,
  Bath,
  Grid,
  MapPin,
  Share,
  Heart,
  Star,
  ArrowRight,
  Building,
} from 'lucide-react';
import type { Listing } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema for booking
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().optional(),
});

interface PageProps {
  params: Promise<{ id: string }>;
}


export default function PropertyDetailPage({
  params,
}: PageProps) {
  const [property, setProperty] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const { id } = use(params);

  
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  useEffect(() => {
    // Find the property by ID
    const foundProperty = listings.find((listing) => listing.id === id);
    setProperty(foundProperty || null);
    setLoading(false);
  }, [id]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ ...values, viewingDate: selectedDate });
    toast.success('Booking request sent successfully!');
    form.reset();
    setSelectedDate(undefined);
  };

  if (loading) {
    return (
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='container mx-auto px-4 py-8 flex-1 flex items-center justify-center'>
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='container mx-auto px-4 py-8 flex-1 flex items-center justify-center'>
          <p>Property not found.</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <main className='flex-1'>
        {/* Property Title */}
        <div className='container mx-auto px-4 py-6'>
          <h1 className='text-3xl font-bold'>{property.title}</h1>
          <div className='flex items-center justify-between mt-2'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center'>
                <Star className='h-5 w-5 fill-amber-400 text-amber-400' />
                <span className='ml-1 font-medium'>{property.rating}</span>
              </div>
              <span className='text-gray-500'>•</span>
              <div className='flex items-center text-gray-600'>
                <MapPin className='h-4 w-4 mr-1' />
                <span>
                  {property.location}, {property.city}
                </span>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <Button
                variant='ghost'
                size='sm'
                className='flex items-center gap-1'
              >
                <Share className='h-4 w-4' />
                <span>Share</span>
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='flex items-center gap-1'
              >
                <Heart className='h-4 w-4' />
                <span>Save</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className='container mx-auto px-4 pb-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden'>
            <div className='col-span-2 row-span-2 relative h-[400px]'>
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className='object-cover'
              />
            </div>

            {property.images.slice(1, 5).map((image: string, index: number) => (
              <div key={index} className='relative h-[196px]'>
                <Image
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  fill
                  className='object-cover'
                />
              </div>
            ))}

            {/* Show all photos button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='absolute bottom-4 right-4 bg-white'
                >
                  Show all photos
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-5xl p-0'>
                <div className='grid grid-cols-2 gap-2 p-4'>
                  {property.images.map((image: string, index: number) => (
                    <div key={index} className='relative h-[300px]'>
                      <Image
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        fill
                        className='object-cover rounded-lg'
                      />
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Property Details */}
        <div className='container mx-auto px-4 py-8'>
          <div className='flex flex-col lg:flex-row gap-12'>
            {/* Left Column - Property Info */}
            <div className='flex-1'>
              <div className='border-b pb-6 mb-6'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h2 className='text-2xl font-bold mb-2'>
                      {property.propertyType} in {property.location}
                    </h2>
                    <p className='text-gray-600'>
                      {property.bedrooms} bedrooms • {property.bathrooms}{' '}
                      bathrooms • {property.squareFeet} sqft
                    </p>
                  </div>
                  {property.owner === 'ThinkLab' && (
                    <div className='flex items-center bg-gray-100 p-2 rounded-full'>
                      <div className='h-10 w-10 rounded-full bg-rose-500 flex items-center justify-center text-white mr-2'>
                        <Building className='h-5 w-5' />
                      </div>
                      <div>
                        <p className='font-semibold'>ThinkLab Property</p>
                        <p className='text-xs text-gray-600'>
                          Verified Listing
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex gap-6 py-6 border-b mb-6'>
                <div className='flex flex-col items-center'>
                  <Bed className='h-6 w-6 mb-2' />
                  <p className='font-semibold'>{property.bedrooms}</p>
                  <p className='text-sm text-gray-600'>Bedrooms</p>
                </div>
                <div className='flex flex-col items-center'>
                  <Bath className='h-6 w-6 mb-2' />
                  <p className='font-semibold'>{property.bathrooms}</p>
                  <p className='text-sm text-gray-600'>Bathrooms</p>
                </div>
                <div className='flex flex-col items-center'>
                  <Grid className='h-6 w-6 mb-2' />
                  <p className='font-semibold'>{property.squareFeet}</p>
                  <p className='text-sm text-gray-600'>Square Feet</p>
                </div>
              </div>

              {/* Description */}
              <div className='mb-8'>
                <h3 className='text-xl font-bold mb-4'>About this property</h3>
                <p className='text-gray-700 whitespace-pre-line'>
                  {property.description}
                </p>
              </div>

              {/* Location */}
              <div className='mb-8'>
                <h3 className='text-xl font-bold mb-4'>Location</h3>
                <div className='relative h-[300px] rounded-xl overflow-hidden'>
                  <Image
                    src='/location.jpg'
                    alt='Map location'
                    fill
                    className='object-cover'
                  />
                </div>
                <p className='mt-2 text-gray-700'>
                  {property.location}, {property.city}, Nigeria
                </p>
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className='w-full lg:w-[400px] sticky top-24 h-fit'>
              <div className='border rounded-xl p-6 shadow-sm'>
                <div className='mb-6'>
                  <p className='text-2xl font-bold'>
                    {formatPrice(property.price)}
                    {property.listingType === 'rent' && (
                      <span className='font-normal text-sm text-gray-600'>
                        {' '}
                        / month
                      </span>
                    )}
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                  >
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder='John Doe' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder='john@example.com' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='phone'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder='+234 800 000 0000' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='space-y-2'>
                      <FormLabel>Preferred Viewing Date</FormLabel>
                      <Calendar
                        mode='single'
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className='border rounded-md p-2 w-full'
                        disabled={(date) => date < new Date()}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Additional Information (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Any specific details or questions about the property'
                              className='min-h-[100px]'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type='submit' className='w-full'>
                      Request Viewing
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </form>
                </Form>

                <p className='text-center text-sm text-gray-600 mt-4'>
                  You won&apos;t be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className='bg-gray-100 py-8'>
        <div className='container mx-auto px-4'>
          <div className='border-t pt-8 text-center'>
            <p className='text-gray-600'>© 2025 ThinkLab Properties, Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
