// import * as React from "react"
// import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
// import { Check } from "lucide-react"

// import { cn } from "@/lib/utils"

// const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
//   <CheckboxPrimitive.Root
//     ref={ref}
//     className={cn(
//       "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
//       className
//     )}
//     {...props}>
//     <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
//       <Check className="h-4 w-4" />
//     </CheckboxPrimitive.Indicator>
//   </CheckboxPrimitive.Root>
// ))
// Checkbox.displayName = CheckboxPrimitive.Root.displayName

// export { Checkbox }

import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure this utility is available for class names

const Checkbox = ({ className, checked, onChange, disabled, ...props }) => {
  // Local state for controlled checkbox
  const [isChecked, setIsChecked] = useState(checked);

  // Toggle checkbox state
  const handleChange = () => {
    if (!disabled) {
      const newChecked = !isChecked;
      setIsChecked(newChecked);
      if (onChange) onChange(newChecked);
    }
  };

  return (
    <div
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onClick={handleChange}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleChange();
        }
      }}
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        isChecked && "bg-primary text-primary-foreground",
        className,
      )}
      {...props}
    >
      {isChecked && <Check className="h-4 w-4 text-current" />}
    </div>
  );
};

Checkbox.displayName = "Checkbox";  

export { Checkbox };
