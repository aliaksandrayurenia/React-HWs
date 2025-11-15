import React from 'react';
import Logo from '../../assets/Logo.svg'; 
import Cart from '../../assets/Cart.svg';
import styles from './Header.module.css';
import SmallCart from '../../assets/SmallCart.svg';

const navigation = [
    { name: 'Home', link: '#' },
    { name: 'Menu', link: '#' },
    { name: 'Company', link: '#' },
    { name: 'Login', link: '#' }
]; 

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>

                <div className={styles.left}>
                    <a href="#">
                        <img src={Logo} alt="logo" className={styles.logoImg} />
                    </a>
                </div>

                <nav className={styles.menu}>
                    <ul className={styles.navList}>
                        {navigation.map(item => (
                        <li key={item.name}>
                            <a href={item.link} className={item.name === 'Home' ? styles.navLinkActive : styles.navLink}>
                            {item.name}
                            </a>
                        </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.cartBlock}>
                    <div className={styles.cart}>
                        <img src={Cart} alt="cart" className={styles.cartImg} />
                        <img src={SmallCart} alt="small icon" className={styles.smallcart} />
                        <span className={styles.badge}>0</span>
                    </div>
                </div>

            </div>
        </header>
);
}
