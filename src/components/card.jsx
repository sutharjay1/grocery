import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../components/image-slider"; // Ensure this path is correct
import { cn, formatPrice } from "../lib/utils";
import AddToCartButton from "./cart/add-to-cart-button";
import AddToWishButton from "./cart/add-to-wish-button";

const Card = ({ product, index, showDescription = true }) => {
  return (
    <div
      key={index}
      className={cn(
        "group relative flex h-[22rem] w-full flex-col overflow-hidden rounded-lg border border-zinc-600/20 shadow-md",
      )}
      draggable={false}
      onSelect={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="relative h-48 w-full">
        <ImageSlider images={product.imageSrc} />
        {product.discount && (
          <div className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
            {product.discount}% OFF
          </div>
        )}
      </div>
      <Link
        to={product.href}
        draggable={false}
        className="flex flex-1 flex-col"
      >
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          {showDescription && (
            <p className="mt-2 line-clamp-2 text-sm text-gray-600">
              {product.description}
            </p>
          )}
          <div className="mt-auto flex items-center justify-between pt-4">
            <p className="text-base font-medium text-gray-900">
              {formatPrice(product.price)}
            </p>
            <div className="flex space-x-2">
              <AddToWishButton product={product} quantity={1} size="icon" />
              <AddToCartButton product={product} quantity={1} size="icon" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
