"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Sheet from "@/components/sheet";
import { Heart, ShoppingCartIcon } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/hook/useCart";
import { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CartItem from "./cart/cart-item";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;

  const fee = 9.8;

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0,
  );

  useEffect(() => {});
  

  return (
    <>
      <Sheet>
        <Sheet.Trigger className="group -m-2 flex items-center p-2">
          <Tooltip delayDuration={100}>
            <TooltipTrigger className="-m-2 flex items-center p-1">
              <Heart
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0 text-zinc-600 group-hover:text-zinc-700 dark:text-zinc-400"
              />
              <span className="ml-2 text-sm font-medium text-zinc-700 group-hover:text-zinc-800 dark:text-zinc-400">
                {/* {isMounted ? itemCount : 0} */} {itemCount}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Favorites</p>
            </TooltipContent>
          </Tooltip>
        </Sheet.Trigger>
        <Sheet.Content className="flex w-full flex-col sm:max-w-lg">
          <Sheet.Header className="font-polySansMedian space-y-2.5 pr-6 font-medium">
            <Sheet.Title>Favorites ({itemCount})</Sheet.Title>
          </Sheet.Header>
          {itemCount > 0 ? (
            <>
              <div className="flex w-full flex-1 flex-col pr-6">
                <ScrollArea>
                  {items.map(({ product }) => (
                    <CartItem product={product} key={product.id} />
                  ))}
                </ScrollArea>
              </div>
              <div className="space-y-4">
                <Separator />
                <div className="space-y-1.5 text-sm">
                  <div className="flex">
                    <span className={cn("flex-1")}>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex">
                    <span className={cn("flex-1")}>Transaction Fee</span>
                    <span>{formatPrice(fee)}</span>
                  </div>
                  <div className="flex">
                    <span className={cn("flex-1")}>Total</span>
                    <span>{formatPrice(cartTotal + fee)}</span>
                  </div>
                </div>

                <Sheet.Footer className="">
                  <Sheet.Trigger asChild>
                    <Link
                      to="/cart"
                      className={buttonVariants({
                        className: "w-full",
                      })}
                    >
                      Continue to Checkout
                    </Link>
                  </Sheet.Trigger>
                </Sheet.Footer>
              </div>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center space-y-1">
              {/* <div
                aria-hidden="true"
                className="relative mb-4 h-60 w-60 text-muted-foreground"
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
              <div className="font-polySansMedian text-2xl font-medium">
                Your favorites is empty
              </div>
              <Sheet.Trigger asChild>
                <Link
                  to="/product"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "text-lg text-muted-foreground",
                  })}
                >
                  Add items to your favorites
                </Link>
              </Sheet.Trigger>
            </div>
          )}
        </Sheet.Content>
      </Sheet>
    </>
  );
};

export default Cart;
