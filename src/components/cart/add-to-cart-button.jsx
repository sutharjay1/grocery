import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hook/useCart";
import { cn } from "@/lib/utils";

const AddToCartButton = ({ product, quantity, className }) => {
  const { addItem, items, removeItem } = useCart();
  const [isInCart, setIsInCart] = useState < boolean > false;

  useEffect(() => {
    const itemInCart = items.find((item) => item.product.id === product.id);
    setIsInCart(!!itemInCart);
  }, [items, product.id]);

  const handleAddToCart = () => {
    if (isInCart) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  useEffect(() => {
    if (quantity) {
      const itemInCart = items.find((item) => item.product.id === product.id);

      if (itemInCart) {
        itemInCart.product.quantity = quantity;
        removeItem(itemInCart.product.id);
        addItem(itemInCart.product);
      }
    }
  }, [quantity]);

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      className={cn(className, "w-full")}
      variant={isInCart ? "destructive" : "default"}
    >
      {isInCart ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
