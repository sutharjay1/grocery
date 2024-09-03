// import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hook/useCart";
import { cn, formatPrice } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import { Button } from "../ui/button";

export const PRODUCT_CATEGORIES = [
  {
    label: "SUBSCRIPTION_KIT",
    value: "ui_kits",
    featured: [
      {
        name: "Editor picks",
        href: `/products?category=ui_kits`,
        imageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=ui_kits&sort=desc",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=ui_kits",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "REFILL",
    value: "icons",
    featured: [
      {
        name: "Favorite Icon Picks",
        href: `/products?category=icons`,
        imageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=icons&sort=desc",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Bestselling Icons",
        href: "/products?category=icons",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];

const CartItem = ({ product }) => {
  const { image } = product.images[0];

  const { removeItem } = useCart();

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category.toString(),
  )?.label;

  //   clg(product

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image.url ? (
              <img
                src={
                  image.url ||
                  "https://images.unsplash.com/photo-1722809431357-9403c62c46dc?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
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

            <span className="text-muted-foreground line-clamp-1 text-xs capitalize">
              {label}
            </span>

            <div className="text-muted-foreground mt-4 text-xs">
              <Button
                variant={"destructive"}
                onClick={() => removeItem(product.id)}
                className="border-input flex items-center justify-center gap-0.5 border px-4"
              >
                {" "}
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
