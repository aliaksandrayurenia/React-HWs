import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.css";

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
