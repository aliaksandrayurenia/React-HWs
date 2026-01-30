import { useMemo, useState } from "react";
import styles from "./Order.module.css";

import Button from "../button/Button";
import Input from "../input/Input";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeFromCart, setQty, clearCart } from "../../store/cartSlice";

type Address = { street: string; house: string };

export default function Order() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  const [address, setAddress] = useState<Address>({ street: "", house: "" });

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const onQtyChange = (id: string | number, nextValue: string) => {
    const nextQty = Math.max(1, Number(nextValue) || 1);
    dispatch(setQty({ id, qty: nextQty }));
  };

  const onRemove = (id: string | number) => {
    dispatch(removeFromCart(id));
  };

  const onAddressChange = (field: keyof Address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      items,
      address,
      total: Number(total.toFixed(2)),
    };

    console.log("ORDER:", payload);
    alert("Order placed (demo)!");

  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Finish your order</h1>

      <div className={styles.content}>
        {items.length === 0 ? (
          <p className={styles.empty}>Cart is empty.</p>
        ) : (
          <div className={styles.list}>
            {items.map((i) => (
              <article key={String(i.id)} className={styles.card}>
                {i.image && (
                  <img className={styles.img} src={i.image} alt={i.title} />
                )}

                <div className={styles.info}>
                  <p className={styles.name}>{i.title}</p>
                </div>

                <div className={styles.price}>${i.price.toFixed(2)} USD</div>

                <input
                  className={styles.qty}
                  type="number"
                  min={1}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onAddressChange("street", e.target.value)
            }
          />

          <Input
            id="house"
            label="House"
            value={address.house}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onAddressChange("house", e.target.value)
            }
          />

          <Button type="submit" className={styles.orderBtn} disabled={items.length === 0}>
            Order
          </Button>


        </form>
      </div>
    </section>
  );
}
