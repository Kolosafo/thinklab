/* eslint-disable @typescript-eslint/no-unused-expressions */
import { truncateString } from "@/utils/helpers";
import Image from "next/image";
import React from "react";
import { FacebookIcon, LinkedinIcon, TwitterIcon, X } from "lucide-react";
import { TeamMemberData } from "@/hooks/useCreateTeam";
const TeamMember = ({
  isFullScreen,
  showModal,
  data,
  handleDismiss,
}: {
  isFullScreen?: boolean;
  showModal?: (data: TeamMemberData) => void;
  data: TeamMemberData | null;
  handleDismiss?: () => void;
}) => {
  return !data ? null : (
    <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
      <div className="w-1/2">
        <Image
          width={400}
          height={400}
          className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
          src={data.image}
          alt="User img"
        />
      </div>
      <div
        className={`p-5 w-1/2 cursor-pointer relative ${isFullScreen && "h-full"} `}
        onClick={() => {
          showModal && !isFullScreen ? showModal(data) : null;
        }}
      >
        <div className="absolute top-2 right-2">
          {isFullScreen && <X onClick={handleDismiss} />}
        </div>
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <a>
            {data.firstName} {data.lastName}
          </a>
        </h3>
        <span className="text-gray-500 dark:text-gray-400">
          {data.occupation}
        </span>

        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
          {!isFullScreen ? truncateString(data.about, 300) : data.about}
        </p>
        <ul className="flex space-x-4 sm:mt-0">
          <li>
            <FacebookIcon href={data.facebook} target="_blank" />
          </li>
          <li>
            <LinkedinIcon href={data.linkedIn} target="_blank" />
          </li>

          <li>
            <TwitterIcon href={data.twitter} target="_blank" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TeamMember;
