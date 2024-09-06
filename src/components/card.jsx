import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../components/image-slider"; // Ensure this path is correct
import { cn, formatPrice } from "../lib/utils";
import AddToCartButton from "./cart/add-to-cart-button";

const Card = ({ product, index, showDescription = true }) => {
  return (
    <div
      key={index}
      className={cn(
        "group relative flex h-[22rem] w-full flex-col rounded-lg border border-zinc-600/20 shadow-md",
      )}
      draggable={false}
      onSelect={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="h-48 w-full">
        <ImageSlider images={product.imageSrc} />
      </div>
      <Link
        to={product.href}
        draggable={false}
        className="flex flex-1 flex-col rounded-b-lg"
      >
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          {showDescription && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
              {product.description}
            </p>
          )}
          <div className="mt-auto flex items-end justify-between">
            <p className="text-base font-medium text-gray-900">
              {formatPrice(product.price)}
            </p>
            <AddToCartButton
              product={product}
              quantity={1}
              className="mt-2"
              size="icon"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
