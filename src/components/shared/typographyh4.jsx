import { cn } from "@/lib/utils";

export function H4({ children, className, style }) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      style={style}
    >
      {children}
    </h4>
  );
}
