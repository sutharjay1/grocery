import React from "react";
import { twMerge } from "tailwind-merge";

const MaxWidthWrapper = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        "max-w-7xl font-poppins mx-auto overflow-hidden bg-white px-4 pt-20 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
