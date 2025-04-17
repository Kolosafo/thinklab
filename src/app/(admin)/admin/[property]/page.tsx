"use client";
import { Button } from "@/components/ui/button";
import { IRootState } from "@/redux/store";
import { PropertyType } from "@/types";
import { convertToFormattedNaira } from "@/utils/helpers";
import { Bed, House, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = ({ params }: { params: { property: string } }) => {
  const { properties } = useSelector((store: IRootState) => store.properties);
  const [imgIndex, setImgIndex] = useState(0);
  const [displayProperty, setDisplayProperty] = useState<PropertyType | null>(
    null
  );
  const { isLogged } = useSelector((store: IRootState) => store.user);
  const router = useRouter();
  useEffect(() => {
    const findProperty = properties.find((item) => item.id === params.property);
    if (findProperty) setDisplayProperty(findProperty);
  }, [params.property, properties]);

  useEffect(() => {
    if (!isLogged) {
      router.push("/auth/login");
    }
  }, [isLogged, router]);
  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      {!displayProperty ? (
        <span className="self-center font-bold text-2xl">
          Property not found
        </span>
      ) : (
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 mt-40">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <Image
                width={400}
                height={400}
                className="w-full"
                src={displayProperty.images[imgIndex]}
                alt="img"
              />

              <div className="w-full flex items-center justify-between">
                <Button className="bg-green-500">Accept</Button>
                <Button className="bg-red-500">Reject</Button>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {displayProperty.description}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  {convertToFormattedNaira(displayProperty.price)}
                </p>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    (5.0)
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    345 Reviews
                  </a>
                </div>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a
                  href="#"
                  title=""
                  className={`flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                  role="button"
                >
                  {displayProperty.status}{" "}
                  {displayProperty.status === "pending" && "approval"}
                </a>
                <div className="justify-center">
                  <div className="mt-4 flex space-x-3 overflow-hidden rounded-lg px-1 py-1">
                    <p className="flex items-center font-medium text-gray-800">
                      <Bed className="mr-2 text-blue-900" />
                      {displayProperty.bedrooms}
                    </p>

                    <p className="flex items-center font-medium text-gray-800">
                      <House className="mr-1 text-blue-900 text-sm" />

                      {displayProperty.size}
                      <sup>2</sup>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <p className="line-clamp-1 text-base text-gray-800 font-semibold">
                  {displayProperty.address},
                </p>
                <p className="flex items-center ml-4">
                  {" "}
                  <MapPin className="mr-1 text-red-500" />{" "}
                  {displayProperty.state}
                </p>
              </div>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              {displayProperty.images.length > 0 && (
                <div className="h-60 border w-full flex flex-row space-x-4 overflow-x-scroll p-4">
                  {displayProperty.images.map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt={`${idx}-img`}
                      width={400}
                      height={400}
                      className="object-contain rounded-2xl cursor-pointer"
                      priority
                      onClick={() => {
                        setImgIndex(idx);
                      }}
                    />
                  ))}
                </div>
              )}
              {/* <p className="mb-6 text-gray-500 dark:text-gray-400">
                Studio quality three mic array for crystal clear calls and voice
                recordings. Six-speaker sound system for a remarkably robust and
                high-quality audio experience. Up to 256GB of ultrafast SSD
                storage.
              </p>

              <p className="text-gray-500 dark:text-gray-400">
                Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
                Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse
                with Magic Keyboard or Magic Keyboard with Touch ID.
              </p> */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
