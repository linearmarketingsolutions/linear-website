import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

export function Container({
  children,
  className = "",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={`max-w-[1200px] mx-auto px-6 ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
