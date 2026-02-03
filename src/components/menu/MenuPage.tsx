import { useEffect, useMemo, useState } from "react";
import { loadMeals } from "../../store/mealsSlice";
import { selectMealTabs, makeSelectMealsByCategory } from "../../store/mealsSelectors";
import MenuCard from "./MenuCard";
import Button from "../button/Button";
import styles from "./menu.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const PAGE = 6;

export default function MenuPage() {
  const dispatch = useAppDispatch();

  const { items: all, status, error } = useAppSelector((s) => s.meals);
  const tabs = useAppSelector(selectMealTabs);

  const [category, setCategory] = useState<string>("");
  const [visible, setVisible] = useState<number>(PAGE);

  useEffect(() => {
    if (status === "idle") dispatch(loadMeals());
  }, [status, dispatch]);

  useEffect(() => {
    if (!category && all.length) {
      const firstCat = all.find((x) => x.category)?.category;
      if (firstCat) setCategory(firstCat);
    }
  }, [all, category]);

  const selectFiltered = useMemo(makeSelectMealsByCategory, []);
  const filtered = useAppSelector((state) => selectFiltered(state, category));

  const shown = useMemo(() => filtered.slice(0, visible), [filtered, visible]);
  const canSeeMore = visible < filtered.length;

  if (status === "loading") return <section className={styles.wrap}>Loading...</section>;
  if (status === "error") return <section className={styles.wrap}>{error}</section>;

  return (
    <section className={styles.wrap}>
      <div className={styles.heroBg} aria-hidden />

      <h2 className={styles.h2}>Browse our menu</h2>
      <p className={styles.sub}>
        Use our menu to place an order online, or{" "}
        <span className={styles.linkFake}>phone</span> our store to place a pickup order. Fast
        and fresh food.
      </p>

      <div className={styles.tabs}>
        {tabs.map((t) => (
          <Button
            key={t.value}
            type="button"
            className={`${styles.tab} ${category === t.value ? styles.tabActive : ""}`}
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
        <p className={styles.more} style={{ color: "#6b7280" }}>
          no items in this category
        </p>
      ) : canSeeMore ? (
        <div className={styles.more}>
          <Button className={styles.seeMore} onClick={() => setVisible((v) => v + PAGE)}>
            See more
          </Button>
        </div>
      ) : (
        <p className={styles.more} style={{ color: "#6b7280" }}>
          no more items
        </p>
      )}
    </section>
  );
}
