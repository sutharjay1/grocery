import { useCart } from "@/hook/useCart";
import { cn, formatPrice } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import { Button } from "../ui/button";

const CartItem = ({ product }) => {
  const { removeItem } = useCart();

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {product.imageSrc && product.imageSrc.length > 0 ? (
              <img
                src={product.imageSrc[0]}
                alt={product.name}
                className="absolute h-full w-full object-cover"
              />
            ) : (
              <div className="bg-secondary flex h-full items-center justify-center">
                <ImageIcon
                  aria-hidden="true"
                  className="text-muted-foreground h-4 w-4"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span
              className={cn(
                "mb-1 line-clamp-1 text-base font-normal tracking-wide",
              )}
            >
              {product.name}
            </span>

            <div className="text-muted-foreground mt-4 text-xs">
              <Button
                variant="destructive"
                onClick={() => removeItem(product.id)}
                className="border-input flex items-center justify-center gap-0.5 border px-4"
              >
                <X className="size-5" />
                Remove
              </Button>
            </div>
          </div>
        </div>

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
