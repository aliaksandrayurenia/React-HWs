import { useState } from "react";
import Button from "../button/Button";
import styles from "./menu.module.css";
import { addToCart } from "../../store/cartSlice";
import { useAppDispatch } from "../../store/hooks";
import type { Meal } from "../../store/mealsSlice";

type Props = { item: Meal };

export default function MenuCard({ item }: Props) {
  const [qty, setQty] = useState<number>(1);
  const dispatch = useAppDispatch();

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img
          src={item.img}
          alt={item.meal}
          onError={(e) => {
            e.currentTarget.style.visibility = "hidden";
          }}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{item.meal}</h3>
          <span className={styles.price}>${item.price.toFixed(2)} USD</span>
        </div>

        <p className={styles.desc}>{item.instructions.slice(0, 120)}…</p>

        <div className={styles.actions}>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className={styles.qty}
          />

          <Button
            className={styles.btn}
            onClick={() =>
              dispatch(
                addToCart({
                  product: {
                    id: item.id,
                    title: item.meal,
                    price: item.price,
                    image: item.img,
                  },
                  qty,
                })
              )
            }
          >
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
