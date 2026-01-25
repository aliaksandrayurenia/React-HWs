import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}: Props) {
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
}
