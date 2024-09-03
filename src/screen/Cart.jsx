"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatPrice } from "@/lib/utils";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useCart } from "@/hook/useCart";
import { useSession } from "next-auth/react";
import { P } from "@/components/shared/typographypara";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { toast } from "sonner";

const Page = () => {
  const { items, removeItem } = useCart();

  const router = useRouter();
  const session = useSession();

  const searchParam = useSearchParams();

  const orderId = searchParam.get("order_id");

  const productIds = items.map(({ product }) => product.id);

  const { user } = useUser();
  const [isMounted, setIsMounted] = useState < boolean > false;

  const cartTotal = items.reduce((total, { product }) => {
    console.log(
      `Product ID: ${product.id}, Price: ${product.price}, Quantity: ${product.quantity}`,
    );
    return total + product.price * Number(product.quantity);
  }, 0);
  // const fee = 9.8;
  const fee = 0;

  useEffect(() => {
    setTotalPrice(cartTotal + fee);
  }, [cartTotal, fee]);
  console.log(cartTotal);

  const [totalPrice, setTotalPrice] = useState(cartTotal + fee);
  const [isLoading, setIsLoading] = useState < boolean > false;

  const [verifyPayment, setVerifyPayment] = useState < boolean > false;
  const [isVerifying, setIsVerifying] = useState(false);

  // const [paymentSessionId, setPaymentSessionId] = useState<string>("");
  // const [orderId, setOrderId] = useState<string>();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const LoadingScreen = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-6 text-center shadow-lg dark:bg-zinc-800">
        <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-500" />
        <p className="font-polySansMedian text-lg font-medium">
          Verifying Payment...
        </p>
        <p
          className={cn(
            InterVar.className,
            "text-sm text-gray-500 dark:text-gray-400",
          )}
        >
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
          <h1 className="font-polySansMedian text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
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
                  {/* <div
                    aria-hidden="true"
                    className="relative mb-4 h-40 w-40 text-muted-foreground"
                  >
                    <Image
                      src="/not-found-light.svg"
                      fill
                      alt="empty shopping cart femeraa"
                      draggable="false"
                      className="dark:hidden"
                    />
                    <Image
                      src="/not-found-dark.svg"
                      fill
                      alt="empty shopping cart femeraa"
                      draggable="false"
                      className="hidden dark:block"
                    />
                  </div> */}
                  <h3 className="font-polySansMedian text-2xl font-semibold">
                    Your cart is empty
                  </h3>
                  <P className="text-muted-foreground text-center">
                    Whoops! Nothing to show here yet.
                  </P>
                  <Link href="/product">
                    <Button
                      className="group mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-green-900 bg-gradient-to-br from-green-900 to-blue-900 py-[0.01rem] sm:w-36 dark:border-green-900 dark:from-green-950 dark:to-blue-950"
                      // onClick={() => router.push("/product")}
                    >
                      <span className="text-zinc-200 dark:text-zinc-300">
                        Browse Products
                      </span>
                      <HiMiniArrowLongRight className="h-5 w-5 text-zinc-200 transition-all group-hover:translate-x-1 dark:text-zinc-300" />
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
                    const label = PRODUCT_CATEGORIES.find(
                      (c) => c.value === product.category,
                    )?.label;

                    const { image } = product.images[0];

                    return (
                      <li
                        key={product.id}
                        className="flex flex-col py-6 md:flex-row"
                      >
                        <div className="flex-shrink-0">
                          <div className="relative h-32 w-32">
                            {typeof image !== "string" && image.url ? (
                              <Image
                                fill
                                src={image.url}
                                alt="product image"
                                className="h-full w-full rounded-md object-cover object-center sm:h-64 sm:w-64"
                              />
                            ) : null}
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col justify-between pt-4 sm:ml-6 md:pt-0">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <Link
                                    href={`/product/${product.category}`}
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
                                      .replace("_", " ")
                                      .toLocaleUpperCase()}
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
                                  size={"icon"}
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
                "mt-4 rounded-lg border-[0.5px] border-zinc-200 px-4 py-6 sm:mt-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 dark:border-zinc-200/20",
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
                      <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t-[0.5px] border-zinc-300 pt-4 dark:border-zinc-200/40">
                  <div
                    className={cn(
                      InterVar.className,
                      "text-muted-foreground flex items-center text-sm",
                    )}
                  >
                    <span>Flat Transaction Fee</span>
                  </div>
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {isMounted ? (
                      formatPrice(fee)
                    ) : (
                      <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t-[0.5px] border-zinc-300 pt-4 dark:border-zinc-200/40">
                  <div
                    className={cn(
                      InterVar.className,
                      "text-base font-medium text-zinc-900 dark:text-zinc-100",
                    )}
                  >
                    Order Total
                  </div>
                  <div className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                    {isMounted ? (
                      formatPrice(cartTotal + fee)
                    ) : (
                      <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  // disabled={items.length === 0 || isLoading}
                  // onClick={() => createCheckoutSession({ productIds })}
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                >
                  Checkout
                  {isPaymentSessionIdLoading ? (
                    <Loader2 className="ml-1.5 h-4 w-4 animate-spin" />
                  ) : null}
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div>{isVerifying && <LoadingScreen />}</div>
    </MaxWidthWrapper>
  );
};

export default Page;
