import { cn } from "@/lib/utils";

export function P({ children, className }) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-4", className)}>
      {children}
    </p>
  );
}
