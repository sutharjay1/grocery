import React from "react";
import { randomProducts } from "../../config";
import { cn, formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";
import ImageSlider from "../../components/image-slider";
import { renderRating } from "../../components/shared/rating";

const Card = ({ product, index }) => {
  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div
      key={index}
      className="flex h-28 w-full items-center rounded-lg border border-gray-200 bg-white shadow-sm md:h-32"
      draggable={false}
      onSelect={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div className="relative h-28 w-32 overflow-hidden md:h-32">
        {product.imageSrc && <ImageSlider images={product.imageSrc} />}
        {product.discount > 0 && (
          <span className="absolute left-2 top-2 inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
            {product.discount}% OFF
          </span>
        )}
      </div>
      <Link
        to={product.href}
        className="flex w-2/3 flex-col justify-between p-4"
      >
        <div className="space-y-2">
          <span className="truncate text-lg font-semibold">{product.name}</span>
          <div className="flex items-center space-x-2">
            <span
              className={cn(
                "text-lg font-bold",
                discountedPrice < product.price ? "text-base" : "text-lg",
              )}
            >
              {!product.discount ? (
                <span className="text-[#0a7558]">
                  {formatPrice(product.price)}
                </span>
              ) : (
                <>
                  <span className="text-[#ef9f43] line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="ml-2 text-[#0a7558]">
                    {formatPrice(discountedPrice)}
                  </span>
                </>
              )}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {renderRating(product.rating || 0)}
          </div>
        </div>
      </Link>
    </div>
  );
};

const Orders = () => {
  return (
    <div className="h-full w-full">
      <div className="flex w-full flex-col space-y-4 overflow-y-auto">
        {randomProducts.slice(0, 10).map((product, index) => (
          <Card key={index} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
