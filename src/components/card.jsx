import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../components/image-slider"; // Make sure this path is correct
import { cn } from "../lib/utils";

const Card = ({ product, index, showDescription = true }) => {
  return (
    <div
      key={index}
      className={cn(
        "group relative flex h-48 w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md sm:h-96",
        index === 0 &&
          "rounded-bl-none rounded-tl-lg lg:rounded-bl-lg lg:rounded-tr-none",
        index === 1 && "rounded-bl-none rounded-tr-lg sm:rounded-none",
        index === 2 &&
          "rounded-bl-none rounded-tr-none sm:rounded-br-lg sm:rounded-tr-lg lg:rounded-br-none lg:rounded-tr-none",
        index === 3 &&
          "sm:rounded-bl-lg sm:rounded-tl-none md:rounded-bl-lg md:rounded-tl-lg lg:rounded-none",
        index === 4 && "rounded-bl-lg rounded-tr-none lg:rounded-none",
        index === 5 &&
          "rounded-bl-none rounded-tr-lg sm:rounded-br-lg sm:rounded-tr-lg",
      )}
    >
      <div className="h-48 w-full sm:h-64">
        <ImageSlider images={product.imageSrc} />
      </div>
      <Link to={product.href}>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          {showDescription && (
            <p className="mt-1 text-sm text-gray-600">{product.description}</p>
          )}
          <div className="mt-2 flex flex-1 items-end justify-between">
            <p className="text-base font-medium text-gray-900">
              {product.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
