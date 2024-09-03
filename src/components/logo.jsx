import React from "react";

import { cn } from "@/lib/utils";

const AppLogo = ({ className, width, height }) => {
  return (
    <img
      src="/logo.svg"
      alt="Logo"
      className={cn(className, "object-contain")}
      width={width || 60}
      height={height || 60}
    />
  );
};

export default AppLogo;
