import React from "react";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { categories } from "../config";
import CategoryCard from "../components/category-card";

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

          <div className="py-6 sm:pt-12">
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard key={category.title} category={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Categories;
