import MaxWidthWrapper from "../components/max-width-wrapper";
import { Motion } from "../components/motion";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from "../components/ui/carousel";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { randomProducts } from "../config";
import Card from "../components/card";
import { useEffect } from "react";
import { Input } from "../components/ui/input";

const Highlight = ({
  className,
  badge,
  title,
  description,
  buttonText,
  buttonLink,
  image,
  height,
}) => {
  return (
    <div
      className={cn("relative overflow-hidden rounded-lg shadow-lg", className)}
    >
      <div className="absolute inset-0">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>
      <div
        className={cn(
          "relative flex flex-col justify-start p-6 text-white sm:px-6 sm:py-6",
          height ? "h-64 lg:h-96" : "h-60 lg:h-72",
        )}
      >
        <div className="space-y-2 sm:space-y-3">
          {badge && (
            <span className="inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
              {badge}
            </span>
          )}
          {title && (
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="max-w-md text-sm text-gray-200 sm:text-base">
              {description}
            </p>
          )}
          {buttonText && buttonLink && (
            <Link to={buttonLink} className="mt-4 inline-block">
              <Button
                variant="outline"
                className="rounded-3xl border border-zinc-900/10 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100"
              >
                {buttonText}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Deals = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MaxWidthWrapper className="h-full pb-20 pt-0">
      <div className="mx-auto max-w-8xl">
        <Motion direction="up" duration={1.8}>
          <div className="mx-auto mt-12 w-full max-w-8xl pb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Top Picks
              </h1>
              <Link to="/categories">
                <Button
                  variant="ghost"
                  className="rounded-3xl border border-zinc-900/10 text-sm text-zinc-900 dark:text-zinc-100"
                >
                  View All <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative mt-4 w-full max-w-full">
              <Carousel>
                <CarouselContent className="w-full md:gap-x-2">
                  {randomProducts.map((product, index) => (
                    <CarouselItem
                      key={index}
                      className="w-full basis-full snap-center auto-rows-[26rem] sm:basis-1/3 lg:basis-1/5"
                    >
                      <Card index={index} product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNavigation
                  alwaysShow
                  className="absolute -bottom-16 left-auto top-auto z-50 w-full justify-end gap-2"
                  classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
                />
              </Carousel>
            </div>
          </div>{" "}
        </Motion>

        <Motion direction="up" duration={1.8} up={70}>
          <div className="mx-auto mt-8 max-w-8xl">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Todays Deals
              </h1>
            </div>
            <div className="mt-6 hidden grid-cols-1 gap-4 sm:grid-cols-2 lg:grid lg:grid-cols-4">
              <Highlight
                height
                badge="Only this week"
                title="Sale 70%"
                description="Sale 70% off on all products"
                buttonText="Shop Now"
                buttonLink="/categories/mount-everest"
                image="https://klbtheme.com/grogin/wp-content/uploads/2023/11/banner-01.jpg"
              />
              <Highlight
                height
                badge="Only this week"
                title="Sale 70%"
                description="Sale 70% off on all products"
                buttonText="Shop Now"
                buttonLink="/categories/mount-everest"
                image="https://klbtheme.com/grogin/wp-content/uploads/2023/11/banner-02.jpg"
              />
              <Highlight
                height
                badge="Only this week"
                title="Sale 70%"
                description="Sale 70% off on all products"
                buttonText="Shop Now"
                buttonLink="/categories/mount-everest"
                image="https://klbtheme.com/grogin/wp-content/uploads/2023/11/banner-04.jpg"
              />
              <Highlight
                height
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
                        height
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
                        height
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
                        height
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
                        height
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
          <div className="mx-auto mt-12 w-full max-w-8xl pb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Top Picks
              </h1>
              <Link to="/categories">
                <Button
                  variant="ghost"
                  className="rounded-3xl border border-zinc-900/10 text-sm text-zinc-900 dark:text-zinc-100"
                >
                  View All <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative mt-4 w-full max-w-full">
              <Carousel>
                <CarouselContent className="w-full md:gap-x-2">
                  {randomProducts.map((product, index) => (
                    <CarouselItem
                      key={index}
                      className="w-full basis-full snap-center auto-rows-[26rem] sm:basis-1/3 lg:basis-1/5"
                    >
                      <Card index={index} product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNavigation
                  alwaysShow
                  className="absolute -bottom-16 left-auto top-auto z-50 w-full justify-end gap-2"
                  classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
                />
              </Carousel>
            </div>
          </div>{" "}
        </Motion>

        <Motion direction="up" duration={1.8} up={70}>
          <div className="mx-auto mt-8 max-w-8xl">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Todays Deals
              </h1>
            </div>
            <div className="mt-6 hidden grid-cols-1 gap-4 sm:grid-cols-2 lg:grid">
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
          <div className="mx-auto mt-16 w-full max-w-8xl">
            <section className="rounded-lg bg-primary px-6 py-12 lg:px-12">
              <div className="mx-auto max-w-7xl text-center">
                <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
                  Subscribe for Exclusive Deals
                </h2>
                <p className="mb-8 text-lg text-white lg:text-xl">
                  Be the first to know about our best offers and new arrivals!
                </p>
                <div className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow rounded-md px-4 py-2 text-gray-900"
                  />
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">
                    Subscribe
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </Motion>
      </div>
    </MaxWidthWrapper>
  );
};

export default Deals;
