"use client";

import { PropertyCard } from "@/components/property-card";
import { SearchBar } from "@/components/search-bar";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { listings } from "@/data/listings";
import type { Listing } from "@/types";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [showOtherListings, setShowOtherListings] = useState(false);

  // Get search parameters
  const location = searchParams.get("location") || "";
  const propertyType = searchParams.get("propertyType") || "";
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "1000000000";
  const rooms = searchParams.get("rooms") || "";
  const listingType = searchParams.get("listingType") || "all";

  // Filter state for the filter sheet
  const [filterState, setFilterState] = useState({
    priceRange: [0, 1000000000],
    rooms: "",
    listingType: "all",
  });

  useEffect(() => {
    // Set initial filter state from URL params
    setFilterState({
      priceRange: [
        minPrice ? Number.parseInt(minPrice) : 0,
        maxPrice ? Number.parseInt(maxPrice) : 1000000000,
      ],
      rooms: rooms || "",
      listingType: listingType || "all",
    });
  }, [minPrice, maxPrice, rooms, listingType]);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);

    setTimeout(() => {
      let results = [...listings];

      // Apply filters
      if (location) {
        const searchTerm = location.toLowerCase();
        results = results.filter(
          (listing) =>
            listing.location.toLowerCase().includes(searchTerm) ||
            listing.city.toLowerCase().includes(searchTerm) ||
            listing.title.toLowerCase().includes(searchTerm)
        );
      }

      if (propertyType && propertyType !== "any") {
        results = results.filter(
          (listing) => listing.propertyType === propertyType
        );
      }

      // Only apply price filters if they are explicitly set
      if (minPrice && minPrice !== "0") {
        results = results.filter(
          (listing) => listing.price >= Number.parseInt(minPrice)
        );
      }

      if (maxPrice && maxPrice !== "1000000000") {
        results = results.filter(
          (listing) => listing.price <= Number.parseInt(maxPrice)
        );
      }

      if (rooms && rooms !== "") {
        results = results.filter(
          (listing) => listing.bedrooms >= Number.parseInt(rooms)
        );
      }

      if (listingType && listingType !== "all") {
        results = results.filter(
          (listing) => listing.listingType === listingType
        );
      }

      // Sort by owner (ThinkLab first)
      results.sort((a, b) => {
        if (a.owner === "ThinkLab" && b.owner !== "ThinkLab") return -1;
        if (a.owner !== "ThinkLab" && b.owner === "ThinkLab") return 1;
        return 0;
      });

      setFilteredListings(results);
      setIsLoading(false);
    }, 1000);
  }, [location, propertyType, minPrice, maxPrice, rooms, listingType]);

  // Get ThinkLab listings and other listings
  const thinkLabListings = filteredListings.filter(
    (listing: Listing) => listing.owner === "ThinkLab"
  );
  const otherListings = filteredListings.filter(
    (listing: Listing) => listing.owner !== "ThinkLab"
  );

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("minPrice", filterState.priceRange[0].toString());
    params.set("maxPrice", filterState.priceRange[1].toString());

    if (filterState.rooms) {
      params.set("rooms", filterState.rooms);
    } else {
      params.delete("rooms");
    }

    if (filterState.listingType !== "all") {
      params.set("listingType", filterState.listingType);
    } else {
      params.delete("listingType");
    }

    router.push(`/search?${params.toString()}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <SearchBar initialValues={{ location }} />
        </div>
      </Navbar>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-64" />
              ) : (
                `${filteredListings.length} properties ${
                  location ? `in ${location}` : ""
                }`
              )}
            </h1>
            <p className="text-gray-500">
              {propertyType ? `${propertyType} · ` : ""}
              {minPrice && maxPrice
                ? `${formatPrice(Number.parseInt(minPrice))} - ${formatPrice(
                    Number.parseInt(maxPrice)
                  )}`
                : ""}
              {rooms ? ` · ${rooms}+ bedrooms` : ""}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="show-map"
                checked={false}
                onCheckedChange={() => {}}
              />
              <Label htmlFor="show-map">Show map</Label>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Properties</SheetTitle>
                  <SheetDescription>
                    Refine your search with these filters
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-6 p-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="pt-4">
                      <Slider
                        defaultValue={filterState.priceRange}
                        min={0}
                        max={1000000000}
                        step={50000}
                        onValueChange={(value: number[]) =>
                          setFilterState({
                            ...filterState,
                            priceRange: value as [number, number],
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>{formatPrice(filterState.priceRange[0])}</span>
                      <span>{formatPrice(filterState.priceRange[1])}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Minimum Bedrooms</h3>
                    <RadioGroup
                      value={filterState.rooms}
                      onValueChange={(value) =>
                        setFilterState({ ...filterState, rooms: value })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="any" />
                        <Label htmlFor="any">Any</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="r1" />
                        <Label htmlFor="r1">1+</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="r2" />
                        <Label htmlFor="r2">2+</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id="r3" />
                        <Label htmlFor="r3">3+</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4" id="r4" />
                        <Label htmlFor="r4">4+</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5" id="r5" />
                        <Label htmlFor="r5">5+</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Listing Type</h3>
                    <RadioGroup
                      value={filterState.listingType}
                      onValueChange={(value) =>
                        setFilterState({ ...filterState, listingType: value })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">All</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rent" id="rent" />
                        <Label htmlFor="rent">For Rent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sale" id="sale" />
                        <Label htmlFor="sale">For Sale</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <SheetFooter>
                  <Button onClick={applyFilters}>Apply Filters</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <>
            {filteredListings.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-2">No properties found</h2>
                <p className="text-gray-600 mb-8">
                  Try adjusting your search criteria
                </p>
                <Button onClick={() => router.push("/")}>
                  Return to homepage
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {thinkLabListings.length > 0 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">
                      ThinkLab Properties
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {thinkLabListings.map((listing: Listing) => (
                        <PropertyCard key={listing.id} listing={listing} />
                      ))}
                    </div>
                  </div>
                )}

                {otherListings.length > 0 && (
                  <div className="space-y-6">
                    {thinkLabListings.length === 0 ? (
                      <div className="bg-gray-50 p-6 rounded-xl text-center">
                        <h2 className="text-xl font-semibold mb-2">
                          No ThinkLab properties match your search
                        </h2>
                        <p className="text-gray-600 mb-4">
                          Don&apos;t see what you like? Check out these other
                          great options.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setShowOtherListings(true)}
                          className="mb-4"
                        >
                          See more options
                        </Button>
                      </div>
                    ) : (
                      <h2 className="text-xl font-semibold">
                        Other Properties
                      </h2>
                    )}

                    {(thinkLabListings.length > 0 || showOtherListings) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {otherListings.map((listing: Listing) => (
                          <PropertyCard key={listing.id} listing={listing} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    Safety Information
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    Cancellation Options
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    Referral Program
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    Agent Partnerships
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    ThinkLab Magazine
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Property Owners</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    List Your Property
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    Owner Resources
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    Community Forum
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">ThinkLab</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              © 2025 ThinkLab Properties, Inc.
            </p>
            <div className="flex gap-4">
              <Link href="/" className="text-gray-600 hover:underline">
                Privacy
              </Link>
              <Link href="/" className="text-gray-600 hover:underline">
                Terms
              </Link>
              <Link href="/" className="text-gray-600 hover:underline">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
