import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { cartStorage } from "../../hook/cartStorage";

const AddToCartButton = ({ product, quantity, className, size = "icon" }) => {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const items = cartStorage.getItems();
    const itemInCart = items.find((item) => item.id === product.id);
    setIsInCart(!!itemInCart);
  }, [product.id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      cartStorage.removeItem(product.id);
      setIsInCart(false);
    } else {
      const newItem = { ...product, quantity: quantity || 1 };
      cartStorage.addItem(newItem);
      setIsInCart(true);
    }
  };

  useEffect(() => {
    if (isInCart && quantity) {
      cartStorage.updateItemQuantity(product.id, quantity);
    }
  }, [quantity, product.id, isInCart]);

  return (
    <Button
      onClick={handleAddToCart}
      size={size}
      className={cn(className, "")}
      variant={isInCart ? "destructive" : "default"}
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
