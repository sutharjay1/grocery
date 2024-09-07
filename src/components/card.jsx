import React from "react";
import ImageSlider from "../components/image-slider";
import { formatPrice } from "../lib/utils";
import AddToCartButton from "./cart/add-to-cart-button";
import AddToWishButton from "./cart/add-to-wish-button";
import { Link } from "react-router-dom";

const Card = ({ product, index, showDescription = true }) => {
  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <Link to={product.href}>
      <div
        key={index}
        className="flex h-[26rem] w-full flex-1 flex-col items-center justify-between rounded-md border bg-[#fbfcfc]"
        draggable={false}
        onSelect={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="relative h-[200px] w-full">
          <ImageSlider images={product.imageSrc} />
          {product.discount > 0 && (
            <span
              className="absolute left-2 top-2 mb-2 mr-2 inline-block rounded-full px-3 py-1 text-sm font-semibold"
              style={{
                backgroundColor: "#ef9f43",
                color: "#ffffff",
              }}
            >
              {product.discount}% OFF
            </span>
          )}
        </div>
        <div className="relative flex w-full flex-grow flex-col space-y-2.5 p-4">
          <span className="inline-flex items-center text-xl font-semibold">
            {product.name}
          </span>
          {showDescription && (
            <p className="mt-3 line-clamp-2 w-full text-sm text-[#868686] selection:text-[#16191E]">
              {product.description}
            </p>
          )}
          <div className="mt-auto flex w-full flex-col items-center justify-center space-y-4">
            <div className="flex w-full items-center justify-between text-sm text-[#868686]">
              <span className="selection:text-[#16191E]">
                Price:{" "}
                <span className="font-bold text-[#ef9f43] selection:text-[#16191E]">
                  {formatPrice(discountedPrice)}
                </span>
              </span>
              {product.discount > 0 && (
                <span className="selection:text-[#16191E]">
                  Original:{" "}
                  <span className="font-bold text-[#0a7558] line-through selection:text-[#16191E]">
                    {formatPrice(product.price)}
                  </span>
                </span>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex w-full space-x-2 p-4">
            <AddToWishButton
              className="w-full"
              product={product}
              quantity={1}
              size="icon"
            />
            <AddToCartButton
              className="w-full"
              product={product}
              quantity={1}
              size="icon"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
