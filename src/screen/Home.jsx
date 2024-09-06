import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { Link } from "react-router-dom";
import { categories, productsByCategory, randomProducts } from "../config";
import { Button } from "../components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "../lib/utils";
import Highlight from "../components/Highlight";
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselItem,
} from "@/components/ui/carousel";
import Card from "../components/card";
import { CarouselIndicator } from "../components/ui/carousel";
import { Motion } from "../components/motion";

const Home = () => {
  return (
    <MaxWidthWrapper className="h-full pb-4 pt-0">
      <div className="mx-auto max-w-8xl">
        {/* Hero Image Section */}
        <div className="mt-12 sm:mt-14">
          <div className="relative w-full">
            <Carousel>
              <CarouselContent className="-ml-4">
                <CarouselItem className="pl-4">
                  <div className="relative overflow-hidden rounded-xl bg-zinc-900/5 ring-1 ring-inset ring-zinc-900/10 lg:rounded-2xl">
                    <img
                      src="https://klbtheme.com/grogin/wp-content/uploads/2023/11/banner-01.jpg"
                      alt="Mount Everest"
                      className="h-64 w-full object-cover sm:h-72 lg:h-96"
                      draggable="false"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4">
                  <div className="relative overflow-hidden rounded-xl bg-zinc-900/5 ring-1 ring-inset ring-zinc-900/10 lg:rounded-2xl">
                    <img
                      src="https://klbtheme.com/grogin/wp-content/uploads/2023/11/banner-02.jpg"
                      alt="Mount Everest"
                      className="h-64 w-full object-cover sm:h-72 lg:h-96"
                      draggable="false"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4">
                  <div className="relative overflow-hidden rounded-xl bg-zinc-900/5 ring-1 ring-inset ring-zinc-900/10 lg:rounded-2xl">
                    <img
                      src="https://klbtheme.com/grogin/wp-content/uploads/2023/11/banner-03.jpg"
                      alt="Mount Everest"
                      className="h-64 w-full object-cover sm:h-72 lg:h-96"
                      draggable="false"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselNavigation
                className="absolute -bottom-14 left-auto top-auto w-full justify-end gap-2"
                classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
                alwaysShow
              />
              <CarouselIndicator className="absolute -bottom-6 left-auto top-auto w-full justify-center gap-2" />
            </Carousel>
          </div>
        </div>

        {/* Categories Section */}
        <Motion direction="up" duration={1.8}>
          <div className="mx-auto mt-12 w-full max-w-8xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-xl">
                Top Categories
              </h2>
              <Link to="/categories">
                <Button
                  variant="ghost"
                  className="rounded-3xl border border-zinc-900/10 px-3 py-0 text-sm text-zinc-900 dark:text-zinc-100"
                >
                  View All <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-2 rounded-lg border border-zinc-900/10 sm:grid-cols-3 lg:grid-cols-6">
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
                      "rounded-bl-none rounded-tr-none sm:rounded-br-lg sm:rounded-tr-lg lg:rounded-br-none lg:rounded-tr-none",
                    index === 3 &&
                      "sm:rounded-bl-lg sm:rounded-tl-none md:rounded-bl-lg md:rounded-tl-lg lg:rounded-bl-none lg:rounded-tl-none",
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
        </Motion>
        <Motion direction="up" duration={1.8}>
          <div className="mx-auto mt-8 max-w-8xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-xl">
                Highlights
              </h2>
            </div>
            <div className="mt-6 hidden grid-cols-1 gap-4 sm:grid-cols-2 lg:grid lg:grid-cols-3">
              <Highlight
                badge="Only this week"
                title="Sale 70%"
                description="Sale 70% off on all products"
                buttonText="Shop Now"
                buttonLink="/categories/mount-everest"
                image="https://klbtheme.com/grogin/wp-content/uploads/2023/11/banner-01.jpg"
              />
              <Highlight
                badge="Only this week"
                title="Sale 70%"
                description="Sale 70% off on all products"
                buttonText="Shop Now"
                buttonLink="/categories/mount-everest"
                image="https://klbtheme.com/grogin/wp-content/uploads/2023/11/banner-02.jpg"
              />
              <Highlight
                badge="Only this week"
                title="Sale 70%"
                description="Sale 70% off on all products"
                buttonText="Shop Now"
                buttonLink="/categories/mount-everest"
                image="https://klbtheme.com/grogin/wp-content/uploads/2023/11/banner-03.jpg"
              />
            </div>
            <div className="mt-8 flex w-full lg:hidden">
              <div className="relative w-full">
                <Carousel>
                  <CarouselContent className="-ml-4">
                    <CarouselItem className="pl-4">
                      <Highlight
                        badge="Only this week"
                        title="Sale 30%"
                        className="w-full"
                        description="Sale 30% off on all products"
                        buttonText="Shop Now"
                        buttonLink="/categories/mount-everest"
                        image="https://klbtheme.com/grogin/wp-content/uploads/2023/11/banner-25.jpg"
                      />
                    </CarouselItem>
                    <CarouselItem className="pl-4">
                      <Highlight
                        badge="Only this week"
                        title="Sale 50%"
                        className="w-full"
                        description="Sale 50% off on all products"
                        buttonText="Shop Now"
                        buttonLink="/categories/mount-everest"
                        image="https://klbtheme.com/grogin/wp-content/uploads/2023/11/banner-25.jpg"
                      />
                    </CarouselItem>
                    <CarouselItem className="pl-4">
                      <Highlight
                        badge="Only this week"
                        title="Sale 70%"
                        className="w-full"
                        description="Sale 70% off on all products"
                        buttonText="Shop Now"
                        buttonLink="/categories/mount-everest"
                        image="https://klbtheme.com/grogin/wp-content/uploads/2023/11/banner-25.jpg"
                      />
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselNavigation
                    className="absolute -bottom-14 left-auto top-auto w-full justify-end gap-2"
                    classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
                    alwaysShow
                  />
                  <CarouselIndicator className="absolute -bottom-6 left-auto top-auto w-full justify-center gap-2" />
                </Carousel>
              </div>
            </div>
          </div>{" "}
        </Motion>

        <Motion direction="up" duration={1.8}>
          <div className="mx-auto mt-12 w-full max-w-8xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-xl">
                Top Picks
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
            <div className="relative w-full max-w-full">
              <Carousel>
                <CarouselContent className="-ml-4">
                  {randomProducts.map((product, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-11/12 pl-4 sm:basis-1/3 lg:basis-1/6"
                    >
                      <div className="flex aspect-square items-center justify-center">
                        <Card index={index} product={product} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNavigation
                  className="absolute -bottom-14 left-auto top-auto w-full justify-end gap-2"
                  classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
                />
              </Carousel>
            </div>
          </div>{" "}
        </Motion>
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;
