import React from 'react';
import mockup from '../../assets/mockup.png';
import trustpilot from '../../assets/trustpilot.svg';
import { useFetch } from '../hooks/useFetch';
import styles from './Hero.module.css';

export default function Main() {

    const { status } = useFetch('https://jsonplaceholder.typicode.com/todos/1');

    return (
        <main className={styles.main}>
            <div className={styles.container}>

                {/* LEFT SIDE */}
                <div className={styles.left}>
                    <div className={styles.titleText}>
                        <p className={styles.siteTitle}>
                            Beautiful food & takeaway, <span className={styles.spanText}>delivered</span> to your door.
                        </p>
                    </div>

                    <div className={styles.paragraphText}>
                        <p className={styles.paragraph}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500.
                        </p>
                    </div>

                    <div className={styles.buttonBlock}>
                        <button className={styles.mainBtn} disabled>
                            Place an Order
                        </button>
                    </div>

                    <div className={styles.ratingBlock}>
                        <img src={trustpilot} alt="rating" className={styles.trustpilotImg} />
                        <p className={styles.trustpilotText}>
                            <span className={styles.trustpilotTextStrong}>4.8 out of 5</span> based on 2000+ reviews
                        </p>
                    </div>

                    <p className={styles.debug}>
                        API status: <strong>{status}</strong>
                    </p>
                </div>

                <div className={styles.right}>
                    <img src={mockup} alt="hero" className={styles.heroImage} />
                </div>
            </div>
        </main>
    );
}
