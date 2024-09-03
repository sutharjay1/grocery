import { cn } from "@/lib/utils";

export function TypographyLead({ children, className }) {
  return (
    <p
      className={cn(
        "text-muted-foreground ml-1 mt-4 text-lg tracking-normal",
        className,
      )}
    >
      {children}
    </p>
  );
}
