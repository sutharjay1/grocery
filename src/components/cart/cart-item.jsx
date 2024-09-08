import { cn, formatPrice } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import { cartStorage } from "../../hook/cartStorage";
import { Button } from "../ui/button";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { wishlistStorage } from "../../hook/wishlistStorage";

const CartItem = ({ product, removeItem, wishlist }) => {
  const removeItemHandler = (e) => {
    e.stopPropagation();
    cartStorage.removeItem(product.id);
    toast.success(`${product.name} removed from cart`);
  };

  const removeWishItem = (e) => {
    e.stopPropagation();
    wishlistStorage.removeItem(product.id);
    toast.success(`${product.name} removed from wishlist`);
  };

  const handleRemove = wishlist
    ? removeWishItem
    : removeItem || removeItemHandler;

  return (
    <div className="space-y-3 py-2">
      <Toaster />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link to={product.href} className="flex items-center space-x-4">
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
              )}
            </div>
            <div className="flex flex-col items-start justify-center">
              <span
                className={cn(
                  "line-clamp-1 text-base font-semibold text-gray-900",
                )}
              >
                {product.name}
              </span>
              <span className={cn("text-base font-medium text-green-900")}>
                {formatPrice(product.price)}
              </span>
            </div>
          </Link>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleRemove}
          className="text-sm text-zinc-900 hover:text-zinc-950"
        >
          <X className="mr-1 h-4 w-4" />
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
