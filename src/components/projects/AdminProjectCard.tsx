"use client";
import { ProjectCreationData } from "@/hooks/useCreateProject";
import { truncateString } from "@/utils/helpers";
import { CameraIcon, HeartIcon, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const AdminProjectCard = (props: ProjectCreationData) => {
  const router = useRouter();

  return (
    <div className="grid w-[25%]">
      <div className="relative w-full">
        <div className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <div className="rounded-lg bg-white p-4 shadow">
            <div
              className="relative flex h-52 justify-center overflow-hidden rounded-lg"
              onClick={() => {
                router.push(`/projects/${props.id}`);
              }}
            >
              <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer">
                <div className="absolute inset-0 bg-black bg-opacity-80">
                  <Image
                    src={props.images[0]}
                    alt="image"
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              <div className="absolute bottom-0 left-5 mb-3 flex">
                <p className="flex items-center font-medium text-white shadow-sm">
                  <CameraIcon className="mr-2 text-xl text-white" />
                  {props.images.length}
                </p>
              </div>
              <div className="absolute bottom-0 right-5 mb-3 flex">
                <p className="flex items-center font-medium text-gray-800">
                  <HeartIcon className="mr-2 text-2xl text-white" />
                </p>
              </div>

              <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white">
                {" "}
                <Star />
              </span>
            </div>

            <div className="mt-4">
              <h2
                className="line-clamp-1 text-2xl font-medium text-gray-800 md:text-lg"
                title={props.title}
              >
                {truncateString(props?.description ?? "", 30)}
              </h2>

              {/* <p className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                <span className="text-sm uppercase"> NGN </span>
                <span className="text-2xl">
                  {convertToFormattedNaira(props.price)}
                </span>
              </p> */}
            </div>
            <div className="mt-4">
              <p className="line-clamp-1 mt-2 text-base text-gray-800 font-semibold">
                {truncateString(props?.location ?? "", 30)}
                <MapPin className="mr-1" />
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-6 w-6 rounded-full bg-gray-200 md:h-8 md:w-8"></div>
                  <span className="bg-primary-red absolute top-0 right-0 inline-block h-3 w-3 rounded-full"></span>
                </div>

                <p className="line-clamp-1 ml-2 text-gray-800">
                  {truncateString("ThinkLab Properties", 25)}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  className="cursor-pointer mx-1 rounded-md bg-[#0174E1] py-1 px-3 text-white text-lg"
                  onClick={() => {
                    router.push(`/admin/update-project/${props.id}`);
                  }}
                >
                  Edit
                </button>
                <button className="rounded-md bg-red-500 py-1 px-3 text-lg text-white cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectCard;
