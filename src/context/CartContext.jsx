import { createContext, useContext, useMemo, useState } from 'react';

const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id, title, price, qty}]

function addToCart(product, qty = 1) {
    qty = Number(qty) || 1;
    setItems(prev => {

        const i = prev.findIndex(x => x.id === product.id);
        if (i === -1) return [...prev, { ...product, qty }];
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
    });
}

const { totalQty, totalAmount } = useMemo(() => {
    const totalQty = items.reduce((s, x) => s + x.qty, 0);
    const totalAmount = items.reduce((s, x) => s + x.qty * Number(x.price), 0);
    return { totalQty, totalAmount };
}, [items]);

const value = { items, addToCart, totalQty, totalAmount };
return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
