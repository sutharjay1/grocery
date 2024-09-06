import { useEffect, useState } from "react";
import { useCart } from "@/hook/useCart";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";

const AddToCartButton = ({ product, quantity, className, size = "icon" }) => {
  const { addItem, items, removeItem } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  console.log(product);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      removeItem(product.id);
    } else {
      addItem(product, quantity); // Pass quantity if needed
    }
  };

  useEffect(() => {
    const itemInCart = items.find((item) => item.product.id === product.id);
    setIsInCart(!!itemInCart);
  }, [items, product.id]);

  useEffect(() => {
    console.log("Cart items:", items);
  }, [items]);
  

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
      size={size}
      className={cn(className, "")}
      variant={isInCart ? "destructive" : "ghost"}
    >
      {size === "icon" ? (
        <ShoppingCartIcon />
      ) : isInCart ? (
        "Remove from cart"
      ) : (
        "Add to cart"
      )}
    </Button>
  );
};

export default AddToCartButton;
