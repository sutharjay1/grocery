"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const ProductSlider = ({ images, className, isHovered, setIsHovered }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className={cn("relative w-full py-8", className)}>
      <Carousel index={index} onIndexChange={setIndex}>
        <CarouselContent className="relative">
          {images?.map((src, i) => (
            <CarouselItem key={i} className="">
              <div
                className="flex aspect-square items-center justify-center overflow-hidden rounded-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-4 flex w-full justify-center space-x-3 px-4">
        {images?.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-12 w-12 border border-zinc-200 dark:border-zinc-800",
              index === i && "border-blue-500 dark:border-blue-400",
            )}
          >
            <img
              src={images[i]}
              alt={`Thumbnail ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
