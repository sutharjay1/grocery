import Sheet from "@/components/sheet";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { cartStorage } from "../../hook/cartStorage";
import Hint from "../hint";
import { Separator } from "../ui/separator";
import CartItem from "./cart-item";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const fee = 0.05;

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const updateCart = () => {
    const cartItems = cartStorage.getItems();
    setItems(cartItems);
    setItemCount(cartItems.length);
  };

  useEffect(() => {
    updateCart();
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const intervalId = setInterval(updateCart, 300);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <Toaster />
        <Sheet.Trigger className="group -m-2 flex items-center p-2">
          <Hint
            label={<p>Cart</p>}
            side="bottom"
            align="center"
            alignOffset={10}
          >
            <div className="flex items-center p-1">
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
        <Sheet.Content className="flex h-full flex-col">
          <Sheet.Header className="space-y-2.5 p-6 font-medium">
            <Sheet.Title>Cart ({itemCount})</Sheet.Title>
          </Sheet.Header>{" "}
          {itemCount > 0 ? (
            <div className="flex h-full flex-col">
              <div className="space-y-4 overflow-y-auto p-6 pb-64 pr-6">
                {items.map((item) => (
                  <CartItem product={item} key={item.id} />
                ))}
              </div>
              <Sheet.Footer className="absolute bottom-0 w-full space-y-2">
                <div className="w-full space-y-4 p-6 pt-6 sm:pt-2">
                  <Separator />
                  <div className="space-y-1.5 text-sm">
                    <div className="flex">
                      <span className="flex-1">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex">
                      <span className="flex-1">Transaction Fee</span>
                      <span>{formatPrice(fee)}</span>
                    </div>
                    <div className="flex">
                      <span className="flex-1">Total</span>
                      <span>{formatPrice(cartTotal + fee)}</span>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Checkout
                  </Link>
                </div>
              </Sheet.Footer>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-6">
              <div className="text-2xl font-medium text-zinc-900">
                Your cart is empty
              </div>
              <Sheet.Footer>
                <Sheet.Close asChild>
                  <Link
                    to="/categories"
                    className={buttonVariants({
                      variant: "link",
                      size: "sm",
                      className: "text-lg text-zinc-900",
                    })}
                  >
                    Add items to your cart to checkout
                  </Link>
                </Sheet.Close>
              </Sheet.Footer>
            </div>
          )}
        </Sheet.Content>
      </Sheet>
    </>
  );
};

export default Cart;
