"use client";
import React, { useState } from "react";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";

// Form schema for booking
const formSchema = z.object({
  term: z.number().min(1, "Please enter a valid term"),
  interestRate: z.number().min(0.1, "Please enter a valid interest rate value"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const MortgageCalculator = ({ projectName }: { projectName: string }) => {
  //   const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    resolver: zodResolver(formSchema),
    defaultValues: {
      term: 0,
      interestRate: 0,
      phone: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    // await requestViewing({
    //   ...values,
    //   selectedDate: selectedDate?.toDateString() ?? "",
    //   projectName,
    //   subject: "Viewing Request Recieved",
    // });
    // console.log({ ...values, viewingDate: selectedDate });
    toast.success("Booking request sent successfully!");
    form.reset();
    // setSelectedDate(undefined);
    setIsLoading(false);
  };
  return (
    <div className="w-full lg:w-[400px] sticky top-24 h-fit ml-4">
      <div className="border rounded-xl p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xl font-bold">{projectName} Mortgage Calculator</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Term (Years)</FormLabel>
                  <FormControl>
                    <Input placeholder="2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+234 800 000 0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <Loader2 className="size-4 animate-spin transition" />
              )}
              {isLoading ? "Loading..." : "Calculate"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </Form>

        {/* <p className="text-center text-sm text-gray-600 mt-4">
          You won&apos;t be charged yet
        </p> */}
      </div>
    </div>
  );
};

export default MortgageCalculator;
