import { z } from "zod";

export const accountSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password too long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password too long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const companyDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Your full name must be at least 2 characters" }),
  email: z.string().email("Invalid email address"),
  name: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" }),
  dateOfBirth: z.string().min(2, { message: "Invalid Date or Birth" }),

  gender: z.string().min(2, { message: "Invalid gender" }),

  nationality: z.string().min(2, { message: "Invalid nationality" }),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(3, "Please select a valid state"),
  // zipCode: z.string().min(1, "Invalid ZIP code format"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  // website: z.string().url("Invalid URL").optional().or(z.literal("")),
  // cuisine: z.string().min(1, "Please select a cuisine type"),
  // seatingCapacity: z.number().min(1, "Seating capacity is required"),
  // openingHours: z.string().min(1, "Opening hours are required"),
  // closingHours: z.string().min(1, "Closing hours are required"),
});

export type AccountData = z.infer<typeof accountSchema>;
export type CompanyDetailsData = z.infer<typeof companyDetailsSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password too long"),
});

export type LoginData = z.infer<typeof loginSchema>;
