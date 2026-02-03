import { useNavigate } from "react-router-dom";
import mockup from "../../assets/mockup.png";
import trustpilot from "../../assets/trustpilot.svg";
import { useFetch } from "../hooks/useFetch";
import styles from "./Hero.module.css";
import Button from "../button/Button";
import { useTranslation, Trans } from "react-i18next";

export default function Hero() {
  const navigate = useNavigate();
  const { status } = useFetch("https://jsonplaceholder.typicode.com/todos/1");
  const { t } = useTranslation();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.titleText}>
            <p className={styles.siteTitle}>
              <Trans
                i18nKey="hero.title"
                components={{ highlight: <span className={styles.spanText} /> }}
              />
            </p>
          </div>

          <div className={styles.paragraphText}>
            <p className={styles.paragraph}>{t("hero.description")}</p>
          </div>

          <div className={styles.buttonBlock}>
            <Button
              type="button"
              className={styles.mainBtn}
              onClick={() => navigate("/order")}
            >
              {t("hero.cta")}
            </Button>
          </div>

          <div className={styles.ratingBlock}>
            <img
              src={trustpilot}
              alt={t("hero.ratingAlt")}
              className={styles.trustpilotImg}
            />
            <p className={styles.trustpilotText}>
              <span className={styles.trustpilotTextStrong}>
                {t("hero.ratingScore")}
              </span>{" "}
              {t("hero.ratingBasedOn")}
            </p>
          </div>

          <p className={styles.debug}>
            {t("hero.apiStatus")}: <strong>{status}</strong>
          </p>
        </div>

        <div className={styles.right}>
          <img
            src={mockup}
            alt={t("hero.heroAlt")}
            className={styles.heroImage}
          />
        </div>
      </div>
    </main>
  );
}
