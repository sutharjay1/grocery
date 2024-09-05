import React from "react";
import MaxWidthWrapper from "../components/max-width-wrapper";
import ImageSlider from "../components/image-slider";
import { useParams } from "react-router-dom";
import { productsByCategory } from "../config";

const Product = () => {
  const { productId } = useParams();

  const product = productsByCategory[productId];

  console.log(product);

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-4">
        <ImageSlider images={product?.imageSrc} />
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product?.name}</h1>
          <p className="text-gray-500">{product?.description}</p>
          <p className="text-gray-500">{product?.price}</p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Product;
