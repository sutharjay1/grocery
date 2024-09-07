import React from "react";
import ImageSlider from "../components/image-slider";
import { cn, formatPrice } from "../lib/utils";
import AddToCartButton from "./cart/add-to-cart-button";
import AddToWishButton from "./cart/add-to-wish-button";
import { Link } from "react-router-dom";
import { renderRating } from "./shared/rating";

const Card = ({ product, index, showDescription = true }) => {
  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <Link to={product.href} className="w-full">
      <div
        key={index}
        className="flex h-[26rem] w-full flex-col rounded-lg border bg-[#fbfcfc]"
        draggable={false}
        onSelect={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="relative h-[200px] w-full">
          <ImageSlider images={product.imageSrc} />
          {product.discount > 0 && (
            <span className="absolute left-2 top-2 mb-2 mr-2 inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div className="space-y-2">
            <span className="inline-flex items-center truncate text-xl font-semibold">
              {product.name}
            </span>
            {showDescription && (
              <p className="line-clamp-2 w-full text-sm text-[#868686] selection:text-[#16191E]">
                {product.description}
              </p>
            )}
            <div className="w-full">{renderRating(product.rating || 0)}</div>
          </div>
          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col items-start text-[#868686]">
              <span
                className={cn(
                  "selection:text-[#16191E]",
                  discountedPrice < product.price ? "text-base" : "text-lg",
                )}
              >
                {!product.discount ? (
                  <span className="mt-1 text-xl selection:text-[#16191E]">
                    <span className="font-bold text-[#0a7558] selection:text-[#16191E]">
                      {formatPrice(product.price)}
                    </span>
                  </span>
                ) : (
                  <>
                    MRP:
                    <span
                      className={cn(
                        "font-bold text-[#ef9f43] selection:text-[#16191E]",
                        discountedPrice < product.price && "line-through",
                      )}
                    >
                      {formatPrice(product.price)}
                    </span>
                  </>
                )}
              </span>
              {product.discount > 0 && (
                <span className="mt-1 text-xl selection:text-[#16191E]">
                  <span className="font-bold text-[#0a7558] selection:text-[#16191E]">
                    {formatPrice(discountedPrice)}
                  </span>
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <AddToWishButton
                className="w-fit px-2"
                product={product}
                quantity={1}
                size="icon"
              />
              <AddToCartButton
                className="w-fit px-2"
                product={product}
                quantity={1}
                size="icon"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
