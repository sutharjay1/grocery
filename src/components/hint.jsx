// const Hint = ({
//   label,
//   children,
//   side = "right",
//   align = "center",
//   sideOffset = 10,
//   alignOffset = 10,
// }) => {
//   return (
//     <Tooltip delayDuration={100}>
//       <TooltipTrigger asChild>{children}</TooltipTrigger>
//       <TooltipContent
//         side={side}
//         sideOffset={sideOffset}
//         align={align}
//         className="border-zinc-900 bg-zinc-900 text-zinc-50"
//         alignOffset={alignOffset}
//       >
//         <p className="font-semibold capitalize">{label}</p>
//       </TooltipContent>
//     </Tooltip>
//   );
// };

// export default Hint;

import React, { useState } from "react";

const Hint = ({
  label,
  children,
  side = "bottom", // Default side is now bottom
  align = "center",
  sideOffset = 14,
  alignOffset = 10,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleTooltip = (visibility) => {
    setIsVisible(visibility);
  };

  // Tooltip positioning logic based on `side` and `align`
  const tooltipStyles = {
    position: "absolute",
    background: "#333",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
    zIndex: 100,
    display: isVisible ? "block" : "none",
    ...(side === "top" && {
      bottom: `calc(100% + ${sideOffset}px)`, // Position tooltip above the trigger
      left:
        align === "center" ? "50%" : align === "left" ? `${alignOffset}px` : "",
      right: align === "right" ? `${alignOffset}px` : "",
      transform: align === "center" ? "translateX(-50%)" : "",
    }),
    ...(side === "bottom" && {
      top: `calc(100% + ${sideOffset}px)`, // Position tooltip below the trigger
      left:
        align === "center" ? "50%" : align === "left" ? `${alignOffset}px` : "",
      right: align === "right" ? `${alignOffset}px` : "",
      transform: align === "center" ? "translateX(-50%)" : "",
    }),
    ...(side === "left" && {
      right: `calc(100% + ${sideOffset}px)`, // Position tooltip to the left
      top:
        align === "center" ? "50%" : align === "top" ? `${alignOffset}px` : "",
      bottom: align === "bottom" ? `${alignOffset}px` : "",
      transform: align === "center" ? "translateY(-50%)" : "",
    }),
    ...(side === "right" && {
      left: `calc(100% + ${sideOffset}px)`, // Position tooltip to the right
      top:
        align === "center" ? "50%" : align === "top" ? `${alignOffset}px` : "",
      bottom: align === "bottom" ? `${alignOffset}px` : "",
      transform: align === "center" ? "translateY(-50%)" : "",
    }),
  };

  const wrapperStyles = {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
  };

  return (
    <div
      style={wrapperStyles}
      onMouseEnter={() => toggleTooltip(true)}
      onMouseLeave={() => toggleTooltip(false)}
    >
      {children}
      <div style={tooltipStyles}>{label}</div>
    </div>
  );
};

export default Hint;
