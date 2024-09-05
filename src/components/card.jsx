import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../components/image-slider"; // Make sure this path is correct

const Card = ({ product }) => {
  console.log(product);
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="h-48 w-full sm:h-64 lg:h-72">
        <ImageSlider images={product.imageSrc} />
      </div>
      <Link to={product.href}>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{product.description}</p>
          <div className="mt-4 flex flex-1 items-end justify-between">
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
