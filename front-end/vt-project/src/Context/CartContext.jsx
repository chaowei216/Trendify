
import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(Cookies.get('cart') || '[]');
        setCartItems(savedCart);
    }, []);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.id === product.id &&
                    item.size === product.size &&
                    item.color === product.color
            );

            let newItems;
            if (existingItemIndex > -1) {
                newItems = prevItems.map((item, index) => {
                    if (index === existingItemIndex) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity,
                            totalPrice: (item.quantity + product.quantity) * item.price
                        };
                    }
                    return item;
                });
            } else {
                newItems = [...prevItems, {
                    ...product,
                    totalPrice: product.price * product.quantity
                }];
            }

            Cookies.set('cart', JSON.stringify(newItems));
            return newItems;
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);