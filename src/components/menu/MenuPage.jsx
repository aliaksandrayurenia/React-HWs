import { useEffect, useMemo, useState } from 'react';
import { fetchMeals } from '../../api/meals';
import MenuCard from './MenuCard';
import Button from '../button/Button';
import styles from './menu.module.css';

const PAGE = 6;

export default function MenuPage() {
    const [all, setAll] = useState([]);
    const [category, setCategory] = useState('');
    const [visible, setVisible] = useState(PAGE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
        try {
            const data = await fetchMeals();
            const list = Array.isArray(data) ? data : [];
            setAll(list);

            const firstCat = list.find(x => x.category)?.category;
            if (firstCat) setCategory(firstCat);
        } catch (e) {
            setError(String(e));
        } finally {
            setLoading(false);
        }
        })();
    }, []);

    const tabs = useMemo(() => {
        const values = Array.from(
        new Set(
            all
            .map(x => (x.category ?? '').toString().trim())
            .filter(Boolean)
        )
        );

        return values.map(value => ({ value, label: value }));
    }, [all]);

    const filtered = useMemo(() => {
        if (!category) return [];
        const cat = category.toLowerCase();
        return all.filter(
        (x) => (x.category ?? '').toString().toLowerCase() === cat
        );
    }, [all, category]);

    const shown = useMemo(
        () => filtered.slice(0, visible),
        [filtered, visible]
    );

    const canSeeMore = visible < filtered.length;

    if (loading) {
        return <section className={styles.wrap}>Loading...</section>;
    }

    if (error) {
        return <section className={styles.wrap}>{error}</section>;
    }

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
            {tabs.map((t) => (
            <Button
                key={t.value}
                type="button"
                className={`${styles.tab} ${category === t.value ? styles.tabActive : ''}`}
                onClick={() => {
                setCategory(t.value);
                setVisible(PAGE);
                }}
            >
                {t.label}
            </Button>
            ))}
        </div>

        <div className={styles.grid}>
            {shown.map((item) => (
            <MenuCard key={item.id} item={item} />
            ))}
        </div>

        {filtered.length === 0 ? (
            <p className={styles.more} style={{ color: '#6b7280' }}>
            no items in this category
            </p>
        ) : canSeeMore ? (
            <div className={styles.more}>
            <Button
                className={styles.seeMore}
                onClick={() => setVisible((v) => v + PAGE)}
            >
                See more
            </Button>
            </div>
        ) : (
            <p className={styles.more} style={{ color: '#6b7280' }}>
            no more items
            </p>
        )}
        </section>
    );
}
