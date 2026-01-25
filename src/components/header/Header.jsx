import { useSelector } from "react-redux";
import {
  selectTotalQty,
  selectTotalAmount,
} from "../../store/cartSelectors";
import styles from './Header.module.css'
import Logo from "../../assets/Logo.svg";
import Cart from "../../assets/Cart.svg"
import SmallCart from "../../assets/SmallCart.svg"


export default function Header() {
  const totalQty = useSelector(selectTotalQty);
  const totalAmount = useSelector(selectTotalAmount);

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
