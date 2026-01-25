import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQty, selectTotalAmount } from "../../store/cartSelectors";

import styles from "./Header.module.css";
import Logo from "../../assets/Logo.svg";
import Cart from "../../assets/Cart.svg";
import SmallCart from "../../assets/SmallCart.svg";

export default function Header() {
  const totalQty = useSelector(selectTotalQty);
  const totalAmount = useSelector(selectTotalAmount);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <NavLink to="/">
            <img src={Logo} alt="logo" className={styles.logoImg} />
          </NavLink>
        </div>

        <nav className={styles.menu}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                Menu
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/order"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                Order
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.cartBlock}>
          <div className={styles.cart}>
            <img src={Cart} alt="cart" className={styles.cartImg} />
            <img
              src={SmallCart}
              alt="small cart"
              className={styles.smallCart}
            />
          </div>

          <span className={styles.badge}>{totalQty}</span>
          <span className={styles.total}>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </header>
  );
}
