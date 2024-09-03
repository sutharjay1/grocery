import React from "react";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { Link } from "react-router-dom";
import { categories } from "../config";

const Home = () => {
  return (
    <MaxWidthWrapper className="h-full pt-0">
      <div className="mx-auto max-w-6xl">
        {/* Hero Image Section */}
        <div className="mt-12 sm:mt-14">
          <div className="relative overflow-hidden rounded-xl bg-zinc-900/5 ring-1 ring-inset ring-zinc-900/10 lg:rounded-2xl">
            <img
              src="https://images.pexels.com/photos/27367865/pexels-photo-27367865/free-photo-of-mount-everest.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Mount Everest"
              className="h-64 w-full object-cover sm:h-72 lg:h-96"
              draggable="false"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <h1 className="text-3xl font-bold text-white lg:text-5xl">
                Explore the World’s Highest Peaks
              </h1>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mx-auto mt-10 w-full max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
            Top Categories
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.title}
                to={category.href}
                className="group relative block transform overflow-hidden rounded-lg bg-white shadow-md transition duration-300 ease-in-out hover:shadow-lg"
              >
                <img
                  src={category.imageSrc}
                  alt={category.title}
                  className="h-32 w-full object-cover transition duration-300 ease-in-out group-hover:opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                  <h3 className="text-center text-sm font-medium text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="py-0.5 pb-1 text-center">
                  <h3 className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;
