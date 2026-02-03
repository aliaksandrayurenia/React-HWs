import Logo from "../../assets/Logo.svg";
import instagram from "../../assets/inst.svg";
import twitter from "../../assets/twitter.svg";
import youtube from "../../assets/youtube.svg";
import styles from "./Footer.module.css";
import { useTranslation, Trans } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <img src={Logo} alt={t("alt.logo")} className={styles.logo} />
          <p className={styles.text}>
            <Trans i18nKey="footer.description" />
          </p>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <h4>{t("footer.company.title")}</h4>
            <a href="#">{t("footer.company.home")}</a>
            <a href="#">{t("footer.company.order")}</a>
            <a href="#">{t("footer.company.faq")}</a>
            <a href="#">{t("footer.company.contact")}</a>
          </div>

          <div className={styles.column}>
            <h4>{t("footer.template.title")}</h4>
            <a href="#">{t("footer.template.styleGuide")}</a>
            <a href="#">{t("footer.template.changelog")}</a>
            <a href="#">{t("footer.template.licence")}</a>
            <a href="#">{t("footer.template.webflow")}</a>
          </div>

          <div className={styles.column}>
            <h4>{t("footer.flowbase.title")}</h4>
            <a href="#">{t("footer.flowbase.more")}</a>
          </div>
        </div>
      </div>

      <hr className={styles.line} />

      <div className={styles.bottom}>
        <p>
          <Trans
            i18nKey="footer.bottom"
            components={{
              flowbase: <span className={styles.accent} />,
              webflow: <span className={styles.accent} />
            }}
          />
        </p>

        <div className={styles.socials}>
          <img src={instagram} alt={t("alt.instagram")} />
          <img src={twitter} alt={t("alt.twitter")} />
          <img src={youtube} alt={t("alt.youtube")} />
        </div>
      </div>
    </footer>
  );
}
