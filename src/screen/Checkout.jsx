import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatPrice } from "@/lib/utils";
import { Check, Loader2, X, ArrowRight } from "lucide-react";
import { useCart } from "@/hook/useCart";
import { P } from "@/components/shared/typographypara";
import MaxWidthWrapper from "../components/max-width-wrapper";

const Checkout = () => {
  const { items, removeItem } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const cartTotal = items.reduce((total, { product }) => {
    return total + product.price * Number(product.quantity);
  }, 0);
  const fee = 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = () => {
    console.log("Checkout initiated");
    // Implement checkout logic here
  };

  const LoadingScreen = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-6 text-center shadow-lg dark:bg-zinc-800">
        <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-500" />
        <p className="font-polySansMedian text-lg font-medium">
          Verifying Payment...
        </p>
        <p className={cn("text-sm text-gray-500 dark:text-gray-400")}>
          Please wait while we confirm your payment.
        </p>
      </div>
    </div>
  );

  return (
    <MaxWidthWrapper
      padding="large"
      paddingTop="large"
      paddingY="large"
      className="px-3 pt-8 selection:bg-teal-500/30"
    >
      <div className="">
        <div className="mx-auto max-w-2xl pb-24 pt-[4.8rem] sm:pt-0 lg:max-w-7xl lg:pt-16">
          <h1 className="font-polySansMedian text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Shopping Cart
          </h1>

          <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <div
              className={cn("lg:col-span-7", {
                "rounded-lg border-[1.2px] border-dashed border-zinc-400 p-12 dark:border-zinc-200/30":
                  isMounted && items.length === 0,
              })}
            >
              <h2 className="sr-only">Items in your shopping cart</h2>

              {isMounted && items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-1">
                  <h3 className="font-polySansMedian text-2xl font-semibold">
                    Your cart is empty
                  </h3>
                  <P className="text-center text-muted-foreground">
                    Whoops! Nothing to show here yet.
                  </P>
                  <Link to="/product">
                    <Button className="group mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-green-900 bg-gradient-to-br from-green-900 to-blue-900 py-[0.01rem] dark:border-green-900 dark:from-green-950 dark:to-blue-950 sm:w-36">
                      <span className="text-zinc-200 dark:text-zinc-300">
                        Browse Products
                      </span>
                      <ArrowRight className="h-5 w-5 text-zinc-200 transition-all group-hover:translate-x-1 dark:text-zinc-300" />
                    </Button>
                  </Link>
                </div>
              ) : null}

              {!isMounted && items.length === 0 ? (
                <div className="flex flex-col space-y-4 py-6 lg:flex-row">
                  <div className="flex flex-shrink-0">
                    <div className="relative h-24 w-24">
                      <Skeleton className="h-full w-full bg-zinc-200 dark:bg-zinc-800/50" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between lg:ml-4">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div className="flex flex-col justify-between space-y-2">
                        <Skeleton className="h-3 w-full bg-zinc-200 dark:bg-zinc-800/50" />
                        <Skeleton className="h-3 w-full bg-zinc-200 dark:bg-zinc-800/50" />
                        <Skeleton className="h-3 w-full bg-zinc-200 dark:bg-zinc-800/50" />
                      </div>

                      <div className="mt-4 w-20 sm:mt-0 sm:pr-9">
                        <div className="absolute right-0 top-0">
                          <Skeleton className="h-12 w-12 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="h-3 w-full bg-zinc-200 dark:bg-zinc-800/50" />
                  </div>
                </div>
              ) : null}

              <ul
                className={cn({
                  "divide-y divide-zinc-200 border-b border-t border-zinc-200":
                    isMounted && items.length > 0,
                })}
              >
                {isMounted &&
                  items.map(({ product }) => {
                    const image = product.imageSrc && product.imageSrc[0];

                    return (
                      <li
                        key={product.id}
                        className="flex flex-col py-6 md:flex-row"
                      >
                        <div className="flex-shrink-0">
                          <div className="relative h-32 w-32">
                            {image && (
                              <img
                                src={image.url || image}
                                alt="product image"
                                className="h-full w-full rounded-md object-cover object-center sm:h-64 sm:w-64"
                              />
                            )}
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col justify-between pt-4 sm:ml-6 md:pt-0">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <Link
                                    to={`/product/${product.name.toLowerCase()}`}
                                    className="font-medium text-zinc-700 hover:text-zinc-800 dark:text-zinc-200 dark:hover:text-zinc-100"
                                  >
                                    {product.name}
                                  </Link>
                                </h3>
                              </div>

                              <div className="mt-1 flex text-sm">
                                <p className="text-muted-foreground">
                                  Category:{" "}
                                  <span className="capitalize">
                                    {product.category
                                      .replace("-", " ")}
                                  </span>
                                </p>
                              </div>

                              <div>
                                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                  {formatPrice(product.price)}
                                </p>

                                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                  Quantity: {product.quantity}
                                </p>
                                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                  Size: {product.product?.details.size}
                                </p>
                                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                  Pack: {product.product?.details.quantity} pcs
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 w-20 sm:mt-0 sm:pr-9">
                              <div className="absolute right-0 top-0">
                                <Button
                                  aria-label="remove product"
                                  onClick={() => removeItem(product.id)}
                                  variant="destructive"
                                  size="icon"
                                  className="flex items-center justify-center"
                                >
                                  <X size={24} aria-hidden="true" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <p className="mt-4 flex space-x-2 text-sm text-zinc-700 dark:text-zinc-300">
                            <Check className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" />

                            <span>Eligible for instant delivery</span>
                          </p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <section
              className={cn(
                "mt-4 rounded-lg border-[0.5px] border-zinc-200 px-4 py-6 dark:border-zinc-200/20 sm:mt-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              )}
            >
              <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                Order summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Subtotal
                  </p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {isMounted ? (
                      formatPrice(cartTotal)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t-[0.5px] border-zinc-300 pt-4 dark:border-zinc-200/40">
                  <div
                    className={cn(
                      "flex items-center text-sm text-muted-foreground"
                    )}
                  >
                    <span>Flat Transaction Fee</span>
                  </div>
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {isMounted ? (
                      formatPrice(fee)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t-[0.5px] border-zinc-300 pt-4 dark:border-zinc-200/40">
                  <div
                    className={cn(
                      "text-base font-medium text-zinc-900 dark:text-zinc-100"
                    )}
                  >
                    Order Total
                  </div>
                  <div className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                    {isMounted ? (
                      formatPrice(cartTotal + fee)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  disabled={items.length === 0 || isLoading}
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                >
                  Checkout
                  {isLoading ? (
                    <Loader2 className="ml-1.5 h-4 w-4 animate-spin" />
                  ) : null}
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {isVerifying && <LoadingScreen />}
    </MaxWidthWrapper>
  );
};

export default Checkout;
