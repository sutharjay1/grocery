import { useEffect, useState } from "react";
import { useWishlist } from "@/hook/useWishlist";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";

const AddToWishButton = ({ product, className, size = "icon" }) => {
  const { addToWishlist, items, removeFromWishlist } = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  useEffect(() => {
    const itemInWishlist = items.find((item) => item.product.id === product.id);
    setIsInWishlist(!!itemInWishlist);
  }, [items, product.id]);

  return (
    <Button
      onClick={handleAddToWishlist}
      size={size}
      className={cn(className, "")}
      variant={isInWishlist ? "destructive" : "default"}
    >
      {size === "icon" ? (
        <HeartIcon className={isInWishlist ? "fill-current" : ""} />
      ) : isInWishlist ? (
        "Remove from wishlist"
      ) : (
        "Add to wishlist"
      )}
    </Button>
  );
};

export default AddToWishButton;
