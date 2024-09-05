import React from "react";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { Link } from "react-router-dom";

// Assuming the categories array is imported here
import { categories } from "../config";

const Categories = () => {
  return (
    <MaxWidthWrapper className="h-full pt-0">
      <div className="mx-auto max-w-6xl">
        <div className="bg-white">
          <div className="border-b border-gray-200 pb-10 pt-10">
            <h2 className="text-2xl font-bold capitalize tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl md:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-4 text-sm text-gray-500 sm:text-base">
              Browse through our diverse categories of fresh and high-quality
              products.
            </p>
          </div>

          <div className="py-6 sm:pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <main className="w-full lg:col-span-3 xl:col-span-4">
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categories.map((category) => (
                  <CategoryCard key={category.title} category={category} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

const CategoryCard = ({ category }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <Link to={category.href} className="flex flex-col items-center p-3">
        <img
          src={category.imageSrc}
          alt={category.title}
          className="h-40 w-full rounded-lg object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold text-zinc-900">
            {category.title}
          </h3>
          <p className="mt-2 text-sm text-gray-500">{category.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Categories;
