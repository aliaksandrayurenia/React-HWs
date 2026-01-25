import { useMemo, useState } from "react";
import styles from "./Order.module.css";

import Button from "../button/Button";
import Input from "../input/Input";
import burgerImg from "../../assets/burgertmp.png";

const demoItems = [
    { id: "a1", title: "Burger Dreams", price: 9.2, qty: 1, image: burgerImg },
    { id: "b2", title: "Burger Dreams", price: 9.2, qty: 1, image: burgerImg },
    { id: "c3", title: "Burger Dreams", price: 9.2, qty: 1, image: burgerImg },
];

export default function Order() {
    const [items, setItems] = useState(demoItems);
    const [address, setAddress] = useState({ street: "", house: "" });

    const total = useMemo(
        () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
        [items]
    );

    function onQtyChange(id, nextValue) {
        const nextQty = Math.max(1, parseInt(nextValue, 10) || 1);
        setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, qty: nextQty } : i))
        );
    }

    function onRemove(id) {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }

    function onAddressChange(field, value) {
        setAddress((prev) => ({ ...prev, [field]: value }));
    }

    function onSubmit(e) {
        e.preventDefault();

        const payload = {
        items,
        address,
        total: Number(total.toFixed(2)),
        };

        console.log("ORDER DEMO:", payload);
        alert("Order placed (demo)!");
    }

    return (
        <section className={styles.page}>
        <h1 className={styles.title}>Finish your order</h1>

        <div className={styles.content}>
            {items.length === 0 ? (
            <p className={styles.empty}>Cart is empty.</p>
            ) : (
            <div className={styles.list}>
                {items.map((i) => (
                <article key={i.id} className={styles.card}>
                    <img className={styles.img} src={i.image} alt={i.title} />

                    <div className={styles.info}>
                    <p className={styles.name}>{i.title}</p>
                    </div>

                    <div className={styles.price}>
                    ${i.price.toFixed(2)} USD
                    </div>

                    <input
                    className={styles.qty}
                    type="number"
                    min="1"
                    value={i.qty}
                    onChange={(e) => onQtyChange(i.id, e.target.value)}
                    />

                    <Button
                    type="button"
                    className={styles.remove}
                    onClick={() => onRemove(i.id)}
                    aria-label="Remove item"
                    >
                    X
                    </Button>
                </article>
                ))}
            </div>
            )}

            <form className={styles.form} onSubmit={onSubmit}>
            <Input
                id="street"
                label="Street"
                value={address.street}
                onChange={(e) => onAddressChange("street", e.target.value)}
            />

            <Input
                id="house"
                label="House"
                value={address.house}
                onChange={(e) => onAddressChange("house", e.target.value)}
            />

            <Button
                type="submit"
                className={styles.orderBtn}
                disabled={items.length === 0}
            >
                Order
            </Button>
            </form>
        </div>
        </section>
    );
}
