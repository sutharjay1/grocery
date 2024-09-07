import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { cartStorage } from "../../hook/cartStorage";
import toast from "react-hot-toast";

const AddToCartButton = ({
  product,
  quantity,
  className,
  size = "icon",
  label,
}) => {
  const [isInCart, setIsInCart] = useState(false);
  const [prevQuantity, setPrevQuantity] = useState(quantity);

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
      toast.success(`${product.name} removed from cart`);
    } else {
      const newItem = { ...product, quantity: quantity || 1 };
      cartStorage.addItem(newItem);
      setIsInCart(true);
      toast.success(`${product.name} added to cart`);
    }
  };

  useEffect(() => {
    if (isInCart && quantity) {
      cartStorage.updateItemQuantity(product.id, quantity);
      if (quantity !== prevQuantity) {
        toast.success(`${product.name} quantity updated in cart`);
        setPrevQuantity(quantity);
      }
    }
  }, [quantity, product.id, product.name, isInCart, prevQuantity]);

  return (
    <Button
      onClick={handleAddToCart}
      size={size}
      className={cn(className, "gap-x-2")}
      variant={isInCart ? "destructive" : "default"}
    >
      {size === "icon" ? <ShoppingCart /> : null}
      {label ? (
        <span className="text-base font-medium">
          {isInCart ? "Remove from cart" : "Add to cart"}
        </span>
      ) : null}
    </Button>
  );
};

export default AddToCartButton;
