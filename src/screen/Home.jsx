import React from "react";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { Link } from "react-router-dom";
import { categories } from "../config";
import { Button } from "../components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "../lib/utils";

const Home = () => {
  return (
    <MaxWidthWrapper className="h-full pt-0">
      <div className="mx-auto max-w-7xl">
        {/* Hero Image Section */}
        <div className="mt-12 sm:mt-14">
          <div className="relative overflow-hidden rounded-xl bg-zinc-900/5 ring-1 ring-inset ring-zinc-900/10 lg:rounded-2xl">
            <img
              src="https://images.pexels.com/photos/27367865/pexels-photo-27367865/free-photo-of-mount-everest.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Mount Everest"
              className="h-64 w-full object-cover sm:h-72 lg:h-96"
              draggable="false"
            />
            <div className="absolute inset-0 flex hidden items-center justify-center bg-black/30">
              <h1 className="text-3xl font-bold text-white lg:text-5xl">
                Explore the World’s Highest Peaks
              </h1>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mx-auto mt-10 w-full max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              Top Categories
            </h2>
            <Link to="/categories">
              <Button
                variant="ghost"
                className="rounded-3xl border border-zinc-900/10 text-sm text-zinc-900 dark:text-zinc-100"
              >
                View All <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 rounded-lg border border-zinc-900/10 sm:grid-cols-3 lg:grid-cols-6">
            {categories.slice(0, 6).map((category, index) => (
              <Link
                key={category.title}
                to={category.href}
                className={cn(
                  "group relative transform overflow-hidden border border-zinc-900/20 bg-white shadow-md transition duration-300 ease-in-out hover:shadow-lg",
                  index === 0 &&
                    "rounded-bl-none rounded-tl-lg lg:rounded-bl-lg lg:rounded-tr-none",
                  index === 1 &&
                    "rounded-bl-none rounded-tr-lg sm:rounded-br-none sm:rounded-tr-none",
                  index === 2 &&
                    "rounded-bl-none rounded-tr-none sm:rounded-br-none sm:rounded-tr-lg lg:rounded-br-lg lg:rounded-tr-lg",
                  index === 3 &&
                    "sm:rounded-bl-lg sm:rounded-tl-none lg:rounded-bl-lg lg:rounded-tl-lg",
                  index === 4 &&
                    "rounded-bl-lg rounded-tr-none sm:rounded-bl-none sm:rounded-tr-none",
                  index === 5 &&
                    "rounded-br-lg rounded-tr-none lg:rounded-br-lg lg:rounded-tr-lg",
                )}
              >
                <img
                  src={category.imageSrc}
                  alt={category.title}
                  className="h-32 w-full object-contain transition duration-300 ease-in-out group-hover:opacity-75"
                />
                <div className="absolute inset-0 hidden items-center justify-center bg-black/60 opacity-0 transition duration-300 ease-in-out group-hover:flex group-hover:opacity-100">
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
