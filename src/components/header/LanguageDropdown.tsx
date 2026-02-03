import { useTranslation } from "react-i18next";
import styles from "./LanguageDropdown.module.css";

export default function LanguageDropdown() {
  const { i18n, t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label={t("language.label")}
      >
        <option value="en">{t("language.en")}</option>
        <option value="ru">{t("language.ru")}</option>
        <option value="lt">{t("language.lt")}</option>
      </select>

      <span className={styles.chevron} aria-hidden="true" />
    </div>
  );
}
