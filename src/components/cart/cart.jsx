"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Sheet from "@/components/sheet";
import { ShoppingCartIcon } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/hook/useCart";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CartItem from "./cart-item";
import { Link } from "react-router-dom";
import Hint from "../hint";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const fee = 9.8;

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0,
  );

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <Sheet.Trigger className="group -m-2 flex items-center p-2">
          <Hint
            label={<p>Cart</p>}
            side="bottom"
            align="center"
            alignOffset={10}
          >
            <div className="-m-2 flex items-center p-1">
              <ShoppingCartIcon
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0 text-zinc-600 group-hover:text-zinc-700 dark:text-zinc-400"
              />
              <span className="ml-2 text-sm font-medium text-zinc-700 group-hover:text-zinc-800 dark:text-zinc-400">
                {itemCount}
              </span>
            </div>
          </Hint>
        </Sheet.Trigger>
        <Sheet.Content className="flex w-full flex-col items-center justify-center sm:max-w-lg">
          <Sheet.Header className="font-polySansMedian space-y-2.5 pr-6 font-medium">
            <Sheet.Title>Cart ({itemCount})</Sheet.Title>
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

                <Sheet.Footer>
                  <Sheet.Close asChild>
                    <Link
                      to="/checkout"
                      className={buttonVariants({
                        className: "w-full",
                      })}
                    >
                      Continue to Checkout
                    </Link>
                  </Sheet.Close>
                </Sheet.Footer>
              </div>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center space-y-1">
              <div className="font-polySansMedian text-2xl font-medium">
                Your cart is empty
              </div>
              <Sheet.Close asChild>
                <Link
                  to="/product"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "text-lg text-muted-foreground",
                  })}
                >
                  Add items to your cart to checkout
                </Link>
              </Sheet.Close>
            </div>
          )}
        </Sheet.Content>
      </Sheet>
    </>
  );
};

export default Cart;
