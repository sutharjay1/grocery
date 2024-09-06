import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MaxWidthWrapper from "../components/max-width-wrapper";
import ProductSlider from "../components/product-slider";
import { productsByCategory } from "../config";
const Product = () => {
  const { productId } = useParams();
  const [isHovered, setIsHovered] = useState(false);

  const product = Object.values(productsByCategory)
    .flat()
    .find((product) => product.href === `/products/${productId}`);

  if (!product) {
    return (
      <MaxWidthWrapper>
        <div>Product not found</div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="relative py-4">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-1/2">
          <ProductSlider
            images={product.imageSrc}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
          />
        </div>
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600">
            {product.price}
          </p>
          <button className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
      {isHovered && (
        <div className="h-full w-full bg-black/50">
          <ChevronLeft className="text-white" size={24} />
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default Product;
