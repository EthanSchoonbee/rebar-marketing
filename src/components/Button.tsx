import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
};

export default function Button({ href, children, variant = "primary" }: ButtonProps) {
  return (
    <a className={`button button--${variant}`} href={href}>
      {children}
    </a>
  );
}
