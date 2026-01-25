import styles from "./Input.module.css";

export default function Input({
        id,
        label,
        value,
        onChange,
        type = "text",
    }) {
    return (
        <div className={styles.field}>
        <label className={styles.label} htmlFor={id}>
            {label}
        </label>
        <input
            id={id}
            type={type}
            className={styles.input}
            value={value}
            onChange={onChange}
        />
        </div>
);
}
 