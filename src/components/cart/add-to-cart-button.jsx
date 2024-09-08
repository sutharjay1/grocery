import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { cartStorage } from "../../hook/cartStorage";
import { Button } from "../ui/button";

const AddToCartButton = ({
  product,
  quantity = 1,
  className,
  size = "icon",
  label,
}) => {
  const [isInCart, setIsInCart] = useState(false);
  const [prevQuantity, setPrevQuantity] = useState(quantity);

  useEffect(() => {
    setIsInCart(cartStorage.getItems().some((item) => item.id === product.id));
  }, [product.id]);

  const handleAddToCart = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isInCart) {
        cartStorage.removeItem(product.id);
        setIsInCart(false);
        toast.success(`${product.name} removed from cart`);
      } else {
        cartStorage.addItem({ ...product, quantity });
        setIsInCart(true);
        toast.success(`${product.name} added to cart`);
      }
    },
    [isInCart, product, quantity],
  );

  useEffect(() => {
    if (isInCart && quantity !== prevQuantity) {
      cartStorage.updateItemQuantity(product.id, quantity);
      toast.success(`${product.name} quantity updated in cart`);
      setPrevQuantity(quantity);
    }
  }, [quantity, product.id, product.name, isInCart, prevQuantity]);

  return (
    <Button
      onClick={handleAddToCart}
      size={size}
      className={cn(className, "gap-x-2")}
      variant={isInCart ? "destructive" : "default"}
    >
      {size === "icon" && <ShoppingCart />}
      {label && (
        <span className="text-base font-medium">
          {isInCart ? "Remove from cart" : "Add to cart"}
        </span>
      )}
    </Button>
  );
};

export default AddToCartButton;
