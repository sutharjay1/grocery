import { cn, formatPrice } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import { cartStorage } from "../../hook/cartStorage";
import { Button } from "../ui/button";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const CartItem = ({ product, removeItem }) => {
  const removeItemHandler = () => {
    cartStorage.removeItem(product.id);
    toast.success(`${product.name} removed from cart`);
  };

  return (
    <div className="space-y-3 py-2">
      {" "}
      <Toaster />
      <div className="flex items-start justify-between gap-4">
        <Link to={product.href}>
          <div className="flex items-center space-x-4">
            <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
              {product.imageSrc && product.imageSrc.length > 0 ? (
                <img
                  src={product.imageSrc[0]}
                  alt={product.name}
                  className="absolute h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-secondary">
                  <ImageIcon
                    aria-hidden="true"
                    className="h-4 w-4 text-muted-foreground"
                  />
                </div>
              )}{" "}
            </div>

            <div className="flex flex-col self-start">
              <span
                className={cn(
                  "mb-1 line-clamp-1 text-base font-normal tracking-wide",
                )}
              >
                {product.name}
              </span>

              <div className="mt-4 text-xs text-muted-foreground">
                <Button
                  variant="destructive"
                  onClick={removeItem ? removeItem : removeItemHandler}
                  className="flex items-center justify-center gap-0.5 border border-input px-4"
                >
                  <X className="size-5" />
                  Remove
                </Button>
              </div>
            </div>
          </div>{" "}
        </Link>

        <div className="flex flex-col space-y-1 font-medium">
          <span className={cn("ml-auto line-clamp-1 text-sm")}>
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
