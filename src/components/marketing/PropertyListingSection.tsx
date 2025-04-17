import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { PropertyCard } from "../property-card";
import { Listing } from "@/types";

const PropertyListingSection = ({
  trendingPropterties,
}: {
  trendingPropterties: Listing[];
}) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            {/* <h2 className="text-3xl font-bold">Trending Properties</h2> */}
            {/* <p className="text-gray-600 mt-2">
                     Discover our premium listings curated by ThinkLab
                   </p> */}
          </div>
          <Button asChild variant="outline">
            <Link href="/search?owner=ThinkLab">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingPropterties.map((property) => (
            <PropertyCard key={property.id} listing={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyListingSection;
