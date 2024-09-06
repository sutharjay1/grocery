import * as React from "react";

const ScrollArea = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <div className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 h-full w-full overflow-auto">
        {children}
      </div>
      <ScrollBar orientation="vertical" />
    </div>
  ),
);

ScrollArea.displayName = "ScrollArea";

const ScrollBar = React.forwardRef(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <div
      ref={ref}
      className={`absolute ${orientation === "vertical" ? "right-0 top-0 w-2 bg-gray-400" : "bottom-0 left-0 h-2 bg-gray-400"} ${className}`}
      {...props}
    >
      <div
        className={`relative ${orientation === "vertical" ? "h-full w-full" : "h-full w-full"} rounded-full bg-gray-600`}
      />
    </div>
  ),
);

ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
