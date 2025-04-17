import { IRootState } from "@/redux/store";
import { PropertyType } from "@/types";
import { convertToFormattedNaira, truncateString } from "@/utils/helpers";
import {
  Bed,
  CameraIcon,
  HeartIcon,
  House,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const PropertyDashboardCard = (props: PropertyType) => {
  const router = useRouter();
  const { isAdmin } = useSelector((store: IRootState) => store.user);

  return (
    <div
      className="grid cursor-pointer w-[25%]"
      onClick={() => {
        router.push(!isAdmin ? `/dashboard/${props.id}` : `/admin/${props.id}`);
      }}
    >
      <div className="relative w-full">
        <a
          href="#"
          className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
        >
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="relative flex h-52 justify-center overflow-hidden rounded-lg">
              <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
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

              <span
                className={`absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm ${
                  props.status === "pending"
                    ? "bg-orange-400"
                    : props.status === "approved"
                    ? "bg-green-500"
                    : "bg-red-500"
                } px-2 py-1 text-xs font-semibold text-white`}
              >
                {" "}
                {props.status} {props.status === "pending" && "approval"}
              </span>
              <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white">
                {" "}
                <Star />
              </span>
            </div>

            <div className="mt-4">
              <h2
                className="line-clamp-1 text-2xl font-medium text-gray-800 md:text-lg"
                title="New York"
              >
                {truncateString(props.description, 30)}
              </h2>

              <p className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                <span className="text-sm uppercase"> NGN </span>
                <span className="text-2xl">
                  {convertToFormattedNaira(props.price)}
                </span>
              </p>
            </div>
            <div className="mt-4">
              <p className="line-clamp-1 mt-2 text-base text-gray-800 font-semibold">
                {truncateString(props.address, 30)}, <MapPin className="mr-1" />
                {props.state}
              </p>
            </div>
            <div className="justify-center">
              <div className="mt-4 flex space-x-3 overflow-hidden rounded-lg px-1 py-1">
                <p className="flex items-center font-medium text-gray-800">
                  <Bed className="mr-2 text-blue-900" />
                  {props.bedrooms}
                </p>

                <p className="flex items-center font-medium text-gray-800">
                  <House className="mr-1 text-blue-900 text-sm" />

                  {props.size}
                  <sup>2</sup>
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-6 w-6 rounded-full bg-gray-200 md:h-8 md:w-8"></div>
                  <span className="bg-primary-red absolute top-0 right-0 inline-block h-3 w-3 rounded-full"></span>
                </div>

                <p className="line-clamp-1 ml-2 text-gray-800">
                  {truncateString(props.company, 25)}
                </p>
              </div>

              <div className="flex justify-end">
                <button className="mx-1 rounded-md bg-[#0174E1] py-1 px-3 text-white">
                  <Mail className="text-2xl" />
                </button>
                <button className="rounded-md bg-[#0174E1] py-1 px-3 text-2xl text-white">
                  <Phone className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default PropertyDashboardCard;
