import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { wishlistStorage } from "../../hook/wishlistStorage";

const AddToWishButton = ({ product, quantity, className, size = "icon" }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const items = wishlistStorage.getItems();
    const itemInWishlist = items.find((item) => item.id === product.id);
    setIsInWishlist(!!itemInWishlist);
  }, [product.id]);

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      wishlistStorage.removeItem(product.id);
      setIsInWishlist(false);
    } else {
      const newItem = { ...product, quantity: quantity || 1 };
      wishlistStorage.addItem(newItem);
      setIsInWishlist(true);
    }
  };

  useEffect(() => {
    if (isInWishlist && quantity) {
      wishlistStorage.updateItemQuantity(product.id, quantity);
    }
  }, [quantity, product.id, isInWishlist]);

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
