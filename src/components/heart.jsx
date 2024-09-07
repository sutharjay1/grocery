import Sheet from "@/components/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { Heart as HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { wishlistStorage } from "@/hook/wishlistStorage";
import Hint from "./hint";
import { ScrollArea } from "./ui/scroll-area";
import CartItem from "./cart/cart-item";
import { Separator } from "./ui/separator";

const Heart = () => {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const wishlistTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const updateWishlist = () => {
    const wishlistItems = wishlistStorage.getItems();
    setItems(wishlistItems);
    setItemCount(wishlistItems.length);
  };

  useEffect(() => {
    updateWishlist();
    window.addEventListener("storage", updateWishlist);

    return () => {
      window.removeEventListener("storage", updateWishlist);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const intervalId = setInterval(updateWishlist, 500); // Check for updates every second

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <Sheet.Trigger className="group -m-2 flex items-center p-2">
          <Hint
            label={<p>Favorites</p>}
            side="bottom"
            align="center"
            alignOffset={10}
          >
            <div className="flex items-center p-1">
              <HeartIcon
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
          <Sheet.Header className="font-polySansMedian space-y-2.5 pr-6 font-medium">
            <Sheet.Title>Favorites ({itemCount})</Sheet.Title>
          </Sheet.Header>
          {itemCount > 0 ? (
            <div className="flex h-full flex-col">
              <div className="space-y-4 p-6 pr-6">
                {items.map((item) => (
                  <CartItem product={item} key={item.id} />
                ))}
              </div>
              <div className="space-y-4 p-6 pt-6 sm:pt-2">
                <Separator />
                <div className="space-y-1.5 text-sm">
                  <div className="flex">
                    <span className="flex-1">Total</span>
                    <span>{formatPrice(wishlistTotal)}</span>
                  </div>
                </div>
                <Sheet.Footer>
                  <Link
                    to="/cart"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Add to Cart
                  </Link>
                </Sheet.Footer>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-1">
              <div className="font-polySansMedian text-2xl font-medium">
                Your favorites is empty
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
                  Add items to your favorites
                </Link>
              </Sheet.Close>
            </div>
          )}
        </Sheet.Content>
      </Sheet>
    </>
  );
};

export default Heart;
