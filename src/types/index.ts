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
  politicallyExposedPerson: boolean;
  gender: "Male" | "Female";
  maritalStatus: "single" | "married" | "divorced" | "widowed";
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

  // PROPERTY DETAILS
  propertyAddress: string;
  propertyType: "residential" | "commercial" | "land";
  propertyPrice: number;
  dateOfPurchase: string;

  // EMPLOYMENT
  occupation: "employed" | "self employed" | "unemployed";
  currentEmployer: string;
  employerAddress: string;
  position: string;
  workPhoneNumber: string;
  otherIncomeSources: string;
  annualIncome: string;
  incomeFrequency: string;
  incomeType: string;
  settlementType: "installment" | "full time";

  // FINANCIAL INFO
  outrightPurchase: boolean;
  purchaseMedium: "bankTransfer" | "financing/mortage" | "installment Plan";
  purchaseTimeframe: string;
  purchaseWithLoan: boolean;
  lenderBank?: string;
  loanAmount?: number;
  downpaymentAmount?: number;
  totalPaymentAvailableAmount: number;

  // ADDITIONAL INFO
  legalRestrictionsPurchase: boolean;
  legalRestrictionsPurchaseExplanation: string;
  previousPurchase: boolean;
  previousPurchaseDetails?: string;
};
