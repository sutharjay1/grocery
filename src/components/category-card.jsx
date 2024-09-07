import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/utils";

const CategoryCard = ({ category }) => {
  console.log(category);
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <Link to={category.href} className="flex flex-col items-center p-3">
        {category.imageSrc && (
          <img
            src={category.imageSrc}
            alt={category.title || "Category image"}
            className="h-40 w-full rounded-lg object-cover transition-opacity duration-300 group-hover:opacity-90"
          />
        )}
        <div className="mt-4 text-center">
          {category.title && (
            <h3 className="text-xl font-semibold text-zinc-900">
              {category.title}
            </h3>
          )}
          {category.description && (
            <p className="mt-2 text-sm text-gray-500">{category.description}</p>
          )}
          {category.price && (
            <div className="mt-2">
              {category.discount ? (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    MRP: {formatPrice(category.price)}
                  </span>
                  <span className="ml-2 text-lg font-semibold text-green-600">
                    {formatPrice(
                      category.price -
                        (category.price * category.discount) / 100,
                    )}
                  </span>
                </>
              ) : (
                <span className="text-lg font-semibold text-zinc-900">
                  {formatPrice(category.price)}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
