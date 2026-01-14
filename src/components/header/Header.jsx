import React from "react";
import { useSelector } from "react-redux";
import Logo from "../../assets/Logo.svg";
import Cart from "../../assets/Cart.svg";
import SmallCart from "../../assets/SmallCart.svg";
import styles from "./Header.module.css";

export default function Header() {
    const items = useSelector((s) => s.cart.items);

    const totalQty = items.reduce((sum, x) => sum + (x.qty || 0), 0);
    const totalAmount = items.reduce((sum, x) => sum + (x.qty || 0) * Number(x.price || 0), 0);

    return (
        <header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.left}>
            <a href="#" onClick={(e) => e.preventDefault()} aria-disabled="true">
                <img src={Logo} alt="logo" className={styles.logoImg} />
            </a>
            </div>

            <div className={styles.cartBlock}>
            <div className={styles.cart}>
                <img src={Cart} alt="cart" className={styles.cartImg} />
                <img src={SmallCart} alt="small icon" className={styles.smallCart} />
            </div>

            <span className={styles.badge}>{totalQty}</span>
            <span className={styles.total}>${totalAmount.toFixed(2)}</span>
            </div>
        </div>
        </header>
    );
}
