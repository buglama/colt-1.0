import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/src/types';

interface CartContextType {
  cart: {
    items: CartItem[];
    restaurantId: string | null;
    restaurantName: string | null;
    subtotal: number;
    deliveryFee: number;
    total: number;
  };
  addToCart: (item: CartItem, restaurantId: string, restaurantName: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState({
    items: [] as CartItem[],
    restaurantId: null as string | null,
    restaurantName: null as string | null,
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
  });

  useEffect(() => {
    const subtotal = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const deliveryFee = cart.items.length > 0 ? 2.99 : 0;
    
    setCart(prevCart => ({
      ...prevCart,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
    }));
  }, [cart.items]);

  const addToCart = (
    item: CartItem,
    restaurantId: string,
    restaurantName: string
  ) => {
    if (cart.restaurantId && cart.restaurantId !== restaurantId) {
      if (window.confirm('Adding items from a different restaurant will clear your current cart. Continue?')) {
        setCart({
          items: [item],
          restaurantId,
          restaurantName,
          subtotal: 0,
          deliveryFee: 0,
          total: 0,
        });
      }
      return;
    }

    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.id === item.id
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cart.items];
      updatedItems[existingItemIndex].quantity += item.quantity;
      
      setCart(prevCart => ({
        ...prevCart,
        items: updatedItems,
      }));
    } else {
      setCart(prevCart => ({
        ...prevCart,
        items: [...prevCart.items, item],
        restaurantId: restaurantId,
        restaurantName: restaurantName,
      }));
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedItems = cart.items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );

    setCart(prevCart => ({
      ...prevCart,
      items: updatedItems,
    }));
  };

  const removeFromCart = (itemId: string) => {
    const updatedItems = cart.items.filter(item => item.id !== itemId);
    
    const restaurantId = updatedItems.length > 0 ? cart.restaurantId : null;
    const restaurantName = updatedItems.length > 0 ? cart.restaurantName : null;

    setCart(prevCart => ({
      ...prevCart,
      items: updatedItems,
      restaurantId,
      restaurantName,
    }));
  };

  const clearCart = () => {
    setCart({
      items: [],
      restaurantId: null,
      restaurantName: null,
      subtotal: 0,
      deliveryFee: 0,
      total: 0,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}