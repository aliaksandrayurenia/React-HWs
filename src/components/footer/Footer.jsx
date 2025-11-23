
import Logo from '../../assets/Logo.svg';
import instagram from '../../assets/inst.svg';
import twitter from '../../assets/twitter.svg';
import youtube from '../../assets/youtube.svg';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.leftSection}>
                    <img src={Logo} alt="logo" className={styles.logo} />
                    <p className={styles.text}>
                        Takeaway & Delivery template <br />
                        for small - medium businesses.
                    </p>
                </div>

                <div className={styles.columns}>
                    <div className={styles.column}>
                        <h4>Company</h4>
                        <a href="#">Home</a>
                        <a href="#">Order</a>
                        <a href="#">FAQ</a>
                        <a href="#">Contact</a>
                    </div>

                    <div className={styles.column}>
                        <h4>Template</h4>
                        <a href="#">Style Guide</a>
                        <a href="#">Changelog</a>
                        <a href="#">Licence</a>
                        <a href="#">Webflow University</a>
                    </div>

                    <div className={styles.column}>
                        <h4>Flowbase</h4>
                        <a href="#">More Cloneables</a>
                    </div>
                </div>
            </div>

            <hr className={styles.line} />

            <div className={styles.bottom}>
                <p>
                Built by <span className={styles.accent}>Flowbase</span> · Powered by
                <span className={styles.accent}> Webflow</span>
                </p>

                <div className={styles.socials}>
                    <img src={instagram} alt="Instagram" />
                    <img src={twitter} alt="Twitter" />
                    <img src={youtube} alt="YouTube" />
                </div>
            </div>
        </footer>
);
}
