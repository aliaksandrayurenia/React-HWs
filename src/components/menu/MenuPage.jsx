import { useEffect, useMemo, useState } from 'react';
import { fetchMeals } from '../../api/meals';
import MenuCard from './MenuCard';
import styles from './menu.module.css';
import Button from '../button/Button'; 

const PAGE = 6;
const TABS = ['Desert', 'Dinner', 'Breakfast'];

export default function MenuPage() {
    const [all, setAll] = useState([]);
    const [visible, setVisible] = useState(PAGE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
        try {
            const data = await fetchMeals();
            setAll(Array.isArray(data) ? data : []);
        } catch (e) {
            setError(String(e));
        } finally {
            setLoading(false);
        }
        })();
    }, []);

    const shown = useMemo(() => all.slice(0, visible), [all, visible]);
    const canSeeMore = visible < all.length;

    if (loading) return <section className={styles.wrap}>Loading...</section>;
    if (error) return <section className={styles.wrap}>{error}</section>;

    return (
        <section className={styles.wrap}>
        <div className={styles.heroBg} aria-hidden />

        <h2 className={styles.h2}>Browse our menu</h2>
        <p className={styles.sub}>
            Use our menu to place an order online, or{' '}
            <span className={styles.linkFake}>phone</span> our store
            to place a pickup order. Fast and fresh food.
        </p>

        <div className={styles.tabs}>
            {TABS.map((t, i) => (
            <Button
                key={t}
                className={`${styles.tab} ${i === 0 ? styles.tabActive : ''}`}
                onClick={(e) => e.preventDefault()}
                aria-disabled="true"
            >
                {t}
            </Button>
            ))}
        </div>

        <div className={styles.grid}>
            {shown.map((item) => (
            <MenuCard key={item.id} item={item} />
            ))}
        </div>

        {canSeeMore && (
            <div className={styles.more}>
            <Button
                className={styles.seeMore}
                onClick={() => setVisible((v) => v + PAGE)} 
            >
                See more
            </Button>
            </div>
        )}
        </section>
    );
}
