// import * as React from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import { ArrowLeft, ArrowRight } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// const CarouselContext = React.createContext(null);

// function useCarousel() {
//   const context = React.useContext(CarouselContext);

//   if (!context) {
//     throw new Error("useCarousel must be used within a <Carousel />");
//   }

//   return context;
// }

// const Carousel = React.forwardRef(
//   (
//     {
//       orientation = "horizontal",
//       opts,
//       setApi,
//       plugins,
//       className,
//       children,
//       ...props
//     },
//     ref,
//   ) => {
//     const [carouselRef, api] = useEmblaCarousel(
//       {
//         ...opts,
//         axis: orientation === "horizontal" ? "x" : "y",
//       },
//       plugins,
//     );
//     const [canScrollPrev, setCanScrollPrev] = React.useState(false);
//     const [canScrollNext, setCanScrollNext] = React.useState(false);

//     const onSelect = React.useCallback((api) => {
//       if (!api) {
//         return;
//       }

//       setCanScrollPrev(api.canScrollPrev());
//       setCanScrollNext(api.canScrollNext());
//     }, []);

//     const scrollPrev = React.useCallback(() => {
//       api?.scrollPrev();
//     }, [api]);

//     const scrollNext = React.useCallback(() => {
//       api?.scrollNext();
//     }, [api]);

//     const handleKeyDown = React.useCallback(
//       (event) => {
//         if (event.key === "ArrowLeft") {
//           event.preventDefault();
//           scrollPrev();
//         } else if (event.key === "ArrowRight") {
//           event.preventDefault();
//           scrollNext();
//         }
//       },
//       [scrollPrev, scrollNext],
//     );

//     React.useEffect(() => {
//       if (!api || !setApi) {
//         return;
//       }

//       setApi(api);
//     }, [api, setApi]);

//     React.useEffect(() => {
//       if (!api) {
//         return;
//       }

//       onSelect(api);
//       api.on("reInit", onSelect);
//       api.on("select", onSelect);

//       return () => {
//         api?.off("select", onSelect);
//       };
//     }, [api, onSelect]);

//     return (
//       <CarouselContext.Provider
//         value={{
//           carouselRef,
//           api: api,
//           opts,
//           orientation:
//             orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
//           scrollPrev,
//           scrollNext,
//           canScrollPrev,
//           canScrollNext,
//         }}
//       >
//         <div
//           ref={ref}
//           onKeyDownCapture={handleKeyDown}
//           className={cn("relative mx-auto w-full", className)}
//           role="region"
//           aria-roledescription="carousel"
//           {...props}
//         >
//           {children}
//         </div>
//       </CarouselContext.Provider>
//     );
//   },
// );
// Carousel.displayName = "Carousel";

// const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
//   const { carouselRef, orientation } = useCarousel();

//   return (
//     <div ref={carouselRef} className="overflow-hidden w-full">
//       <div
//         ref={ref}
//         className={cn(
//           "flex",
//           orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
//           className,
//         )}
//         {...props}
//       />
//     </div>
//   );
// });
// CarouselContent.displayName = "CarouselContent";

// const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
//   const { orientation } = useCarousel();

//   return (
//     <div
//       ref={ref}
//       role="group"
//       aria-roledescription="slide"
//       className={cn(
//         "min-w-0 shrink-0 grow-0 basis-full pl-0",
//         orientation === "horizontal" ? "pl-4" : "pt-4",
//         className,
//       )}
//       {...props}
//     />
//   );
// });
// CarouselItem.displayName = "CarouselItem";

// const CarouselPrevious = React.forwardRef(
//   ({ className, variant = "outline", size = "icon", ...props }, ref) => {
//     const { orientation, scrollPrev, canScrollPrev } = useCarousel();

//     return (
//       <Button
//         ref={ref}
//         variant={variant}
//         size={size}
//         className={cn(
//           "absolute z-30 h-10 w-10 rounded-full",
//           orientation === "horizontal"
//             ? "left-4 top-1/2 -translate-y-1/2"
//             : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
//           className,
//         )}
//         disabled={!canScrollPrev}
//         onClick={scrollPrev}
//         {...props}
//       >
//         <ArrowLeft className="h-6 w-6" />
//         <span className="sr-only">Previous slide</span>
//       </Button>
//     );
//   },
// );
// CarouselPrevious.displayName = "CarouselPrevious";

// const CarouselNext = React.forwardRef(
//   ({ className, variant = "outline", size = "icon", ...props }, ref) => {
//     const { orientation, scrollNext, canScrollNext } = useCarousel();

//     return (
//       <Button
//         ref={ref}
//         variant={variant}
//         size={size}
//         className={cn(
//           "absolute h-10 w-10 rounded-full",
//           orientation === "horizontal"
//             ? "right-4 top-1/2 -translate-y-1/2"
//             : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
//           className,
//         )}
//         disabled={!canScrollNext}
//         onClick={scrollNext}
//         {...props}
//       >
//         <ArrowRight className="h-6 w-6" />
//         <span className="sr-only">Next slide</span>
//       </Button>
//     );
//   },
// );
// CarouselNext.displayName = "CarouselNext";

// export {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
// };


'use client';
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselContext = createContext(undefined);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within an CarouselProvider');
  }
  return context;
}

function CarouselProvider({
  children,
  initialIndex = 0,
  onIndexChange,
}) {
  const [index, setIndex] = useState(initialIndex);
  const [itemsCount, setItemsCount] = useState(0);

  const handleSetIndex = (newIndex) => {
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  return (
    <CarouselContext.Provider
      value={{ index, setIndex: handleSetIndex, itemsCount, setItemsCount }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

function Carousel({
  children,
  className,
  initialIndex = 0,
  index: externalIndex,
  onIndexChange,
}) {
  const [internalIndex, setInternalIndex] = useState(initialIndex);
  const isControlled = externalIndex !== undefined;
  const currentIndex = isControlled ? externalIndex : internalIndex;

  const handleIndexChange = (newIndex) => {
    if (!isControlled) {
      setInternalIndex(newIndex);
    }
    onIndexChange?.(newIndex);
  };

  return (
    <CarouselProvider
      initialIndex={currentIndex}
      onIndexChange={handleIndexChange}
    >
      <div className={cn('group/hover relative', className)}>
        <div className='overflow-hidden snap-center' >{children}</div>
      </div>
    </CarouselProvider>
  );
}

function CarouselNavigation({
  className,
  classNameButton,
  alwaysShow,
}) {
  const { index, setIndex, itemsCount } = useCarousel();

  return (
    <div
      className={cn(
        'pointer-events-none absolute left-[-12.5%] top-1/2 flex w-[125%] -translate-y-1/2 justify-between px-2',
        className
      )}
    >
      <button
        type='button'
        className={cn(
          'pointer-events-auto h-fit w-fit rounded-full bg-zinc-50 p-2 transition-opacity duration-300 dark:bg-zinc-950',
          alwaysShow
            ? 'opacity-100'
            : 'opacity-0 group-hover/hover:opacity-100',
          alwaysShow
            ? 'disabled:opacity-40'
            : 'disabled:group-hover/hover:opacity-40',
          classNameButton
        )}
        disabled={index === 0}
        onClick={() => {
          if (index > 0) {
            setIndex(index - 1);
          }
        }}
      >
        <ChevronLeft
          className='stroke-zinc-600 dark:stroke-zinc-50'
          size={16}
        />
      </button>
      <button
        type='button'
        className={cn(
          'pointer-events-auto h-fit w-fit rounded-full bg-zinc-50 p-2 transition-opacity duration-300 dark:bg-zinc-950',
          alwaysShow
            ? 'opacity-100'
            : 'opacity-0 group-hover/hover:opacity-100',
          alwaysShow
            ? 'disabled:opacity-40'
            : 'disabled:group-hover/hover:opacity-40',
          classNameButton
        )}
        disabled={index + 1 === itemsCount}
        onClick={() => {
          if (index < itemsCount - 1) {
            setIndex(index + 1);
          }
        }}
      >
        <ChevronRight
          className='stroke-zinc-600 dark:stroke-zinc-50'
          size={16}
        />
      </button>
    </div>
  );
}

function CarouselIndicator({
  className,
  classNameButton,
}) {
  const { index, itemsCount, setIndex } = useCarousel();

  return (
    <div
      className={cn(
        'absolute bottom-0 z-10 flex w-full items-center justify-center',
        className
      )}
    >
      <div className='flex space-x-2'>
        {Array.from({ length: itemsCount }, (_, i) => (
          <button
            key={i}
            type='button'
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              'h-2 w-2 rounded-full transition-opacity duration-300',
              index === i
                ? 'bg-zinc-950 dark:bg-zinc-50'
                : 'bg-zinc-900/50 dark:bg-zinc-100/50',
              classNameButton
            )}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselContent({
  children,
  className,
  transition,
}) {
  const { index, setIndex, setItemsCount } = useCarousel();
  const [visibleItemsCount, setVisibleItemsCount] = useState(1);
  const dragX = useMotionValue(0);
  const containerRef = useRef(null);
  const itemsLength = Children.count(children);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const options = {
      root: containerRef.current,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleCount = entries.filter(
        (entry) => entry.isIntersecting
      ).length;
      setVisibleItemsCount(visibleCount);
    }, options);

    const childNodes = containerRef.current.children;
    Array.from(childNodes).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [children, setItemsCount]);

  useEffect(() => {
    if (!itemsLength) {
      return;
    }

    setItemsCount(itemsLength);
  }, [itemsLength, setItemsCount]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -10 && index < itemsLength - 1) {
      setIndex(index + 1);
    } else if (x >= 10 && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <motion.div
      drag='x'
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      dragMomentum={false}
      style={{
        x: dragX,
      }}
      animate={{
        translateX: `-${index * (100 / visibleItemsCount)}%`,
      }}
      onDragEnd={onDragEnd}
      transition={
        {
          damping: 18,
          stiffness: 90,
          type: 'spring',
          duration: 0.2,
        } || transition
      }
      className={cn(
        'flex cursor-grab items-center active:cursor-grabbing',
        className
      )}
      ref={containerRef}
    >
      {children}
    </motion.div>
  );
}

function CarouselItem({ children, className }) {
  return (
    <motion.div
      className={cn(
        'w-full min-w-0 shrink-0 grow-0 overflow-hidden',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem,
  useCarousel,
};
