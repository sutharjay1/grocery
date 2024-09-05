import React from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Highlight = ({
  className,
  badge,
  title,
  description,
  buttonText,
  buttonLink,
  image,
}) => {
  return (
    <div
      className={cn("relative overflow-hidden rounded-lg shadow-lg", className)}
    >
      <div className="absolute inset-0">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>
      <div className="relative flex h-full flex-col justify-end p-6 text-white sm:p-8">
        <div className="space-y-2 sm:space-y-3">
          {badge && (
            <span className="inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
              {badge}
            </span>
          )}
          {title && (
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="max-w-md text-sm text-gray-200 sm:text-base">
              {description}
            </p>
          )}
          {buttonText && buttonLink && (
            <Link to={buttonLink} className="mt-4 inline-block">
              <Button
                variant="outline"
                className="bg-white text-gray-800 transition-colors duration-200 hover:bg-gray-100"
              >
                {buttonText}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Highlight;
