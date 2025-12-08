import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '@/data/books';

export interface CartItem {
  book: Book;
  quantity: number;
  rentalDuration: 'year';
  protectionPlan: boolean;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book, protectionPlan?: boolean) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  updateProtection: (bookId: string, hasProtection: boolean) => void;
  totalItems: number;
  subtotal: number;
  protectionTotal: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PROTECTION_RATE = 0.15; // 15% of rental price for damage protection

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (book: Book, protectionPlan = false) => {
    setItems(prev => {
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) return prev;
      
      return [...prev, {
        book,
        quantity: 1,
        rentalDuration: 'year',
        protectionPlan,
      }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setItems(prev => prev.filter(item => item.book.id !== bookId));
  };

  const clearCart = () => setItems([]);

  const updateProtection = (bookId: string, hasProtection: boolean) => {
    setItems(prev => prev.map(item => 
      item.book.id === bookId 
        ? { ...item, protectionPlan: hasProtection }
        : item
    ));
  };

  const totalItems = items.length;
  
  const subtotal = items.reduce((sum, item) => sum + item.book.rentalPrice, 0);
  
  const protectionTotal = items
    .filter(item => item.protectionPlan)
    .reduce((sum, item) => sum + Math.round(item.book.rentalPrice * PROTECTION_RATE), 0);
  
  const grandTotal = subtotal + protectionTotal;

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      updateProtection,
      totalItems,
      subtotal,
      protectionTotal,
      grandTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
