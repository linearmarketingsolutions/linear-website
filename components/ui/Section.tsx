import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: "section" | "div";
};

export function Section({
  children,
  id,
  className = "",
  as: Component = "section",
}: SectionProps) {
  return (
    <Component
      id={id}
      className={`py-16 md:py-24 ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
