"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "motion/react";

import type { Listing } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  MapPin,
  Bed,
  Bath,
  Grid,
} from "lucide-react";

export interface PropertyCardProps {
  listing: Listing;
}

export function PropertyCard({ listing }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="overflow-hidden group py-0 gap-0"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={listing.images[currentImageIndex] || "/placeholder.svg"}
          alt={listing.title}
          fill
          className="object-cover transition-all"
        />

        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2 bg-white/80 hover:bg-white/90 h-8 w-8 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </Button>

        {listing.images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                prevImage();
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {listing.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {listing.owner === "ThinkLab" && (
          <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
            ThinkLab
          </Badge>
        )}

        <Badge
          className={`absolute right-2 bottom-2 ${
            listing.listingType === "sale"
              ? "bg-emerald-500 hover:bg-emerald-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {listing.listingType === "sale" ? "For Sale" : "For Rent"}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{listing.title}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              <span>
                {listing.location}, {listing.city}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
            <span>{listing.rating}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{listing.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{listing.bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <Grid className="h-4 w-4 mr-1" />
            <span>{listing.squareFeet} sqft</span>
          </div>
        </div>

        <div className="mt-3">
          <p className="font-semibold text-lg">
            {formatPrice(listing.price)}
            {listing.listingType === "rent" && (
              <span className="font-normal text-sm text-muted-foreground">
                {" "}
                / month
              </span>
            )}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{listing.propertyType}</p>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/property/${listing.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </motion.div>
  );
}
