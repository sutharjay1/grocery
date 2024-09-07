import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { HeartIcon, HeartCrackIcon } from "lucide-react";
import { wishlistStorage } from "../../hook/wishlistStorage";
import toast from "react-hot-toast";

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
      toast.success(`${product.name} removed from wishlist`, {
        icon: '💔',
      });
    } else {
      const newItem = { ...product, quantity: quantity || 1 };
      wishlistStorage.addItem(newItem);
      setIsInWishlist(true);
      toast.success(`${product.name} added to wishlist`, {
        icon: '❤️',
      });
    }
  };

  useEffect(() => {
    if (isInWishlist && quantity) {
      wishlistStorage.updateItemQuantity(product.id, quantity);
      // toast.success(`${product.name} quantity updated in wishlist`);
    }
  }, [quantity, product.id, isInWishlist, product.name]);

  return (
    <Button
      onClick={handleAddToWishlist}
      size={size}
      className={cn(className, "")}
      variant={isInWishlist ? "destructive" : "default"}
    >
      {size === "icon" ? (
        isInWishlist ? (
          <HeartCrackIcon />
        ) : (
          <HeartIcon className="fill-current" />
        )
      ) : isInWishlist ? (
        "Remove from wishlist"
      ) : (
        "Add to wishlist"
      )}
    </Button>
  );
};

export default AddToWishButton;
