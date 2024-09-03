import { cn } from "@/lib/utils";

export function H1({ children, className, style }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-normal lg:text-5xl",
        className,
      )}
      style={style}
    >
      {children}
    </h1>
  );
}
