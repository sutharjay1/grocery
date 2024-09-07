export const wishlistStorage = {
  getItems: () => {
    const items = JSON.parse(localStorage.getItem("wishlist-storage") || "[]");
    return Array.isArray(items) ? items : [];
  },
  setItems: (items) =>
    localStorage.setItem("wishlist-storage", JSON.stringify(items)),
  addItem: (item) => {
    const items = wishlistStorage.getItems();
    const existingItemIndex = items.findIndex((i) => i.id === item.id);
    if (existingItemIndex !== -1) {
      items[existingItemIndex].quantity += item.quantity;
    } else {
      items.push(item);
    }
    wishlistStorage.setItems(items);
  },
  removeItem: (id) => {
    const items = wishlistStorage.getItems();
    const updatedItems = items.filter((item) => item.id !== id);
    wishlistStorage.setItems(updatedItems);
  },
  updateItemQuantity: (id, quantity) => {
    const items = wishlistStorage.getItems();
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      items[itemIndex].quantity = quantity;
      wishlistStorage.setItems(items);
    }
  },
  clearWishlist: () => {
    localStorage.removeItem("wishlist-storage");
  },
};
