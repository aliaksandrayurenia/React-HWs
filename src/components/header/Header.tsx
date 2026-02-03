import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQty, selectTotalAmount } from "../../store/cartSelectors";
import { useTheme, type ThemePreference } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

import styles from "./Header.module.css";
import Logo from "../../assets/Logo.svg";
import Cart from "../../assets/Cart.svg";
import SmallCart from "../../assets/SmallCart.svg";
import LanguageDropdown from "./LanguageDropdown";

export default function Header() {
  const totalQty = useSelector(selectTotalQty);
  const totalAmount = useSelector(selectTotalAmount);

  const { preference, setPreference } = useTheme();
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <NavLink to="/">
            <img src={Logo} alt={t("alt.logo")} className={styles.logoImg} />
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
                {t("nav.home")}
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
                {t("nav.menu")}
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
                {t("nav.order")}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.right}>
          {/* Язык */}
          <LanguageDropdown />

          {/* Тема */}
          <select
            value={preference}
            onChange={(e) => setPreference(e.target.value as ThemePreference)}
            aria-label={t("theme.label")}
            className={styles.themeSelect}
          >
            <option value="system">{t("theme.system")}</option>
            <option value="light">{t("theme.light")}</option>
            <option value="dark">{t("theme.dark")}</option>
          </select>

          <div className={styles.cartBlock}>
            <div className={styles.cart}>
              <img src={Cart} alt={t("alt.cart")} className={styles.cartImg} />
              <img
                src={SmallCart}
                alt={t("alt.smallCart")}
                className={styles.smallCart}
              />
            </div>

            <span className={styles.badge}>{totalQty}</span>
            <span className={styles.total}>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
