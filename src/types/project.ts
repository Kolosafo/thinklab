export type Project = {
  id: string;
  name: string;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // Assuming square feet or meters
  price: number;
  status: 'for_sale' | 'sold' | 'coming_soon';
  image: string;
  gallery: string[];
};
