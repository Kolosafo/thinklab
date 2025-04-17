"use client";
// import AnimatedImage from "@/components/motion/animated-image";
// import { PropertyCard } from "@/components/property-card";
// import { SearchBar } from "@/components/search-bar";
import { ProjectSection } from "@/components/sections/projects";
import ActiveSlider from "@/components/slider-card";
import { Button } from "@/components/ui/button";
// import { listings } from "@/data/listings";
import Image from "next/image";
// import Link from "next/link";

export default function Home() {
  // const trendingProperties = listings
  //   .filter((listing) => listing.owner === "ThinkLab")
  //   .slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/home-hero.jpg"
            alt="Modern buildings"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-red-900/50" />
        </div>

        {/* Wave Overlay */}
        <div className="absolute -bottom-30 left-0 right-0 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,40 C480,120 960,120 1440,40 L1440,320 L0,320 Z"
            ></path>
          </svg>
        </div>

        {/* Hero Content */}
        {/* <div className="container mx-auto px-4 z-10 text-center">
          <AnimatedText
            text="Welcome to a New"
            className="text-4xl md:text-5xl font-medium text-white mb-2 font-serif"
            delay={0.3}
          />
          <AnimatedText
            text="Era of Smart Living."
            className="text-4xl md:text-5xl font-medium text-white mb-8 font-serif"
            delay={0.5}
            highlight
          />
          <AnimatedText
            text="Step into a realm of unparalleled grandeur, where the future of luxury is elegantly crafted today"
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12"
            delay={0.7}
          />

          <Link
            href={"/projects"}
            className={cn(
              "group inline-flex items-center justify-between rounded-full bg-white px-8 py-4",
              "w-full sm:w-auto mx-auto"
            )}
          >
            <span className="mr-3 text-base text-black">Explore projects</span>
            <div className="relative size-6 shrink-0 rounded-full bg-primary">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-4" />
                <ArrowRight className="absolute h-4 w-4 -translate-x-6 text-white transition-transform duration-300 group-hover:translate-x-0" />
              </div>
            </div>
          </Link>
        </div> */}
        <div style={{ zIndex: 50 }} className="container z-50 w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white mt-20 text-center">
            Our Featured Properties
          </h1>
          <ActiveSlider />
        </div>
      </section>

      {/* SEARCH SECTION */}
      {/* <section className="relative min-h-[30vh] flex items-center justify-center -mt-20">
        <Image
          src="/hero.jpg"
          alt="Beautiful Nigerian properties"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-xl md:text-3xl lg:text-4xl text-white mb-6">
            Can&apos;t get what you want?
          </h1>
          <h1 className="text-6xl text-white mb-8 mx-auto font-bold whitespace-nowrap self-center text-center">
            Explore our Broader E-Realtor Market
          </h1>

          <div className="bg-white rounded-xl shadow-xl p-4 max-w-6xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section> */}

      {/* TRENDING PROPERTIES SECTION */}
      {/* THIS IS WHERE WE IMPORT FROM MARKETING COMPONENT: PropertyLisitingSection.tsx */}
      {/* Projects Section */}
      <ProjectSection />

      {/* Services Section */}
      {/* <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the exceptional amenities and thoughtful details that
              make our properties stand out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <AnimatedImage key={item}>
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <Image
                      src={`/placeholder.svg?height=400&width=600&text=Feature ${item}`}
                      alt={`Feature ${item}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Premium Feature {item}
                    </h3>
                    <p className="text-gray-600">
                      Experience the finest in modern living with our carefully
                      designed spaces and amenities.
                    </p>
                  </div>
                </div>
              </AnimatedImage>
            ))}
          </div>
        </div>
      </section> */}
      {/* About Us Section */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are a team of experienced professionals who are dedicated to
              providing the best possible service to our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Luxury Living?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Contact us today to schedule a tour of our properties and discover
            your dream home.
          </p>
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100 rounded-full px-8"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}
