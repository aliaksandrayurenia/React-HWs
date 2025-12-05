import React from 'react';
import { useCart } from '../../context/CartContext'; 
import Logo from '../../assets/Logo.svg';
import Cart from '../../assets/Cart.svg';
import SmallCart from '../../assets/SmallCart.svg';
import styles from './Header.module.css';

const navigation = [
    { name: 'Home', link: '#' },
    { name: 'Menu', link: '#' },
    { name: 'Company', link: '#' },
    { name: 'Login', link: '#' },
];

export default function Header() {

    const { totalQty, totalAmount } = useCart();   

return (
    <header className={styles.header}>
        <div className={styles.container}>

            <div className={styles.left}>
                <a href="#" onClick={(e) => e.preventDefault()} aria-disabled="true">
                    <img src={Logo} alt="logo" className={styles.logoImg} />
                </a>
            </div>

            <nav className={styles.menu}>
                <ul className={styles.navList}>
                    {navigation.map(item => (
                    <li key={item.name}>
                        <a
                        href="#"
                        onClick={(e) => e.preventDefault()} 
                        className={item.name === 'Menu' ? styles.navLinkActive : styles.navLink} 
                        aria-disabled="true"
                        >
                        {item.name}
                        </a>
                    </li>
                    ))}
                </ul>
            </nav>

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
