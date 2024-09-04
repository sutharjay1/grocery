"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleUserRound } from "lucide-react";
import { GiProfit } from "react-icons/gi";

const Profile = () => {
  return (
    <>
      <Tooltip delayDuration={100}>
        <TooltipTrigger className="-m-2 flex items-center p-1">
          <CircleUserRound
            aria-hidden="true"
            className="h-6 w-6 flex-shrink-0 text-zinc-600 group-hover:text-zinc-700 dark:text-zinc-400"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Profile</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default Profile;
