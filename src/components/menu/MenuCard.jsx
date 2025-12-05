import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './menu.module.css';
import Button from '../button/Button'; 

function pickImage(item) {
    return (
        item.image || item.img || item.photo || item.photoUrl || item.picture || ''
    );
}

function pickTitle(item) {
    return (
        item.title || item.meal || item.name || item.label || 'Untitled'
    );
}

function pickDesc(item) {
    return 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
}

export default function MenuCard({ item }) {
    const [qty, setQty] = useState(1);
    const { addToCart } = useCart();

    const price = Number(item.price ?? item.cost ?? item.amount ?? 0);
    const img = pickImage(item);
    const title = pickTitle(item);
    const desc = pickDesc(item);


    return (
        <article className={styles.card}>
        <div className={styles.media}>
            <img
            src={img}
            alt={title}
            onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
            />
        </div>

        <div className={styles.body}>
            <div className={styles.titleRow}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.price}>${price.toFixed(2)} USD</span>
            </div>

            <p className={styles.desc}>{desc}</p>

            <div className={styles.actions}>
            <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className={styles.qty}
            />
            <Button
                className={styles.btn}
                onClick={() => addToCart({ id: item.id, title, price }, qty)}
            >
                Add to cart
            </Button>
            </div>
        </div>
        </article>
    );
}
