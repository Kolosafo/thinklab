export interface Listing {
  id: string;
  title: string;
  location: string;
  city: string;
  images: string[];
  price: number;
  rating: number;
  owner: string;
  propertyType: string;
  listingType: "rent" | "sale";
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  amenities?: string[];
}

export type User = {
  id?: string;
  email: string;
};

export type Company = {
  userId: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  phone: string;
};

export type PropertyType = {
  id: string;
  userId: string;
  state: string;
  address: string;
  bedrooms: number;
  price: number;
  description: string;
  images: string[]; // Or string[] if you're storing image URLs
  status: "pending" | "rejected" | "approved";
  size: string;
  company: string;
};

export type KYCFormData = {
  // Personal Information
  id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // ISO format: YYYY-MM-DD
  gender: "Male" | "Female";
  nationality: string;
  governmentIDType: "NIN" | "Passport" | "DriverLicense" | "Other";
  governmentIDNumber: string;
  idDocumentUrl: string; // URL or base64 of uploaded ID document
  state: string;
  city: string;
  address: string;

  isAgent: boolean;
  companyName?: string;
  CAC?: string;
  // Verification Status (system-side, not user input)
  isVerified: boolean;
  isReviewed: boolean;
  verificationDate?: string;
};
