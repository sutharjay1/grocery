import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "../components/cart/add-to-cart-button";
import AddToWishButton from "../components/cart/add-to-wish-button";
import { productsByCategory } from "../config";
import { cartStorage } from "../hook/cartStorage";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { renderRating } from "../components/shared/rating";

const Product = () => {
  const { productId } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursorPosition, setShowCursorPosition] = useState(false);

  const product = Object.values(productsByCategory)
    .flat()
    .find((product) => product.href === `/products/${productId}`);

  useEffect(() => {
    if (product) {
      const cartItem = cartStorage
        .getItems()
        .find((item) => item.id === product.id);
      if (cartItem) {
        setQuantity(cartItem.quantity);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <MaxWidthWrapper>
        <div>Product not found</div>
      </MaxWidthWrapper>
    );
  }

  const { imageSrc: images } = product;

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    cartStorage.updateItemQuantity(product.id, newQuantity);
  };

  const handleIncreaseQuantity = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };

  const handleMouseMove = (event) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setCursorPosition({ x, y });
    setShowCursorPosition(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowCursorPosition(false);
  };

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <MaxWidthWrapper className="pt-5">
      <div className="grid grid-cols-1 items-start gap-6 pb-10 lg:grid-cols-2 lg:gap-24 lg:pb-14">
        <div className="">
          <div className={cn("relative w-full pb-8")}>
            <Carousel index={index} onIndexChange={setIndex}>
              <CarouselContent className="relative">
                {images?.map((src, i) => (
                  <CarouselItem key={i}>
                    <div
                      className="flex h-[300px] items-center justify-center overflow-hidden rounded-lg sm:h-[400px] md:h-[500px] lg:h-[600px]"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
                    >
                      <img
                        src={src}
                        alt={`Product image ${i + 1}`}
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
        </div>
        <div className="relative pt-8 lg:pt-0">
          {isHovered && (
            <div
              className={cn(
                "absolute inset-0 z-50 hidden h-[80%] w-full overflow-hidden rounded-lg bg-black/50 lg:flex",
              )}
              style={{
                backgroundImage: `url(${images[index]})`,
                backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
                backgroundSize: "200%",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          )}
          <div className="mb-7 border-b border-gray-300 pb-7">
            <h2 className="mb-3.5 text-lg font-bold text-gray-900 md:text-xl lg:text-2xl 2xl:text-3xl">
              {product.name}
            </h2>
            {renderRating(product.rating || 0)}
            <p className="mt-2 text-sm leading-6 text-gray-700 lg:text-base lg:leading-8">
              {product.description}
            </p>
            <div className="flex flex-col items-start text-[#868686]">
              <span
                className={cn(
                  "selection:text-[#16191E]",
                  discountedPrice < product.price ? "text-base" : "text-lg",
                )}
              >
                MRP:{" "}
                <span
                  className={cn(
                    "font-bold text-[#ef9f43] selection:text-[#16191E]",
                    discountedPrice < product.price && "line-through",
                  )}
                >
                  {formatPrice(product.price)}
                </span>
              </span>
              {product.discount > 0 && (
                <span className="text-lg selection:text-[#16191E]">
                  <span className="font-bold text-[#0a7558] selection:text-[#16191E]">
                    {formatPrice(discountedPrice)}
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="space-s-4 3xl:pr-48 relative flex flex-col items-start justify-start gap-2 border-b border-gray-300 pb-8 md:pr-32 lg:flex-row lg:items-center lg:pr-12 2xl:pr-32">
            <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
              <button
                className="flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 text-gray-900 transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none md:w-12"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
              <span className="duration-250 flex h-full w-12 flex-shrink-0 cursor-default items-center justify-center text-base font-semibold text-gray-900 transition-colors ease-in-out md:w-20 xl:w-24">
                {quantity}
              </span>
              <button
                className="flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 text-gray-900 transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none md:w-12"
                onClick={handleDecreaseQuantity}
              >
                -
              </button>
            </div>
            <div className="flex w-full items-center gap-2">
              <AddToWishButton
                className="w-fit px-2"
                product={product}
                quantity={1}
                size="icon"
              />
              <AddToCartButton
                className="w-fit px-2"
                product={product}
                quantity={1}
                size="icon"
                label
              />
            </div>
          </div>
          <div className="py-6">
            <ul className="space-y-5 pb-1 text-sm">
              <li>
                <span className="inline-block pr-2 font-semibold text-gray-900">
                  Category:
                </span>
                <a
                  className="text-blue-600 transition hover:text-blue-800 hover:underline"
                  href="#"
                >
                  {product.category}
                </a>
              </li>
              <li className="productTags">
                <span className="inline-block pr-2 font-semibold text-gray-900">
                  Tags:
                </span>
                {product.tags &&
                  product.tags.map((tag, index) => (
                    <a
                      key={index}
                      className="inline-block pr-1.5 text-blue-600 transition last:pr-0 hover:text-blue-800 hover:underline"
                      href="#"
                    >
                      {tag}
                    </a>
                  ))}
              </li>
            </ul>
          </div>
          <div className="shadow-sm">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="pr-2 text-sm font-semibold leading-relaxed text-gray-900 md:text-base lg:text-lg">
                Product Details
              </h2>
              <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                <div className="h-0.5 w-full rounded-sm bg-gray-900" />
                <div className="absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm bg-gray-900 transition-transform duration-500 ease-in-out" />
              </div>
            </header>
            <div>
              <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                Our Customer Experience Team is available 7 days a week and we
                offer 2 ways to get in contact.Email and Chat . We try to reply
                quickly, so you need not to wait too long for a response!.
              </div>
            </div>
          </div>
          <div className="">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="pr-2 text-sm font-semibold leading-relaxed text-gray-900 md:text-base lg:text-lg">
                Additional Information
              </h2>
            </header>
          </div>
          <div className="">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="pr-2 text-sm font-semibold leading-relaxed text-gray-900 md:text-base lg:text-lg">
                Customer Reviews
              </h2>
            </header>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Product;
