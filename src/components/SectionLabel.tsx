import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
};

export default function SectionLabel({ children }: SectionLabelProps) {
  return <p className="eyebrow">{children}</p>;
}
