import type { ChangeEventHandler } from "react";
import styles from "./Input.module.css";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
};

export default function Input({
  id,
  label,
  value,
  onChange,
  type = "text",
}: Props) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
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
