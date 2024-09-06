import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  if (!category) {
    return null; // Return null if category is undefined or null
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <Link
        to={category.href || "#"}
        className="flex flex-col items-center p-3"
      >
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
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
