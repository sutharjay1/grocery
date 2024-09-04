import React from "react";
import { cn } from "../lib/utils";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchInput = ({ className }) => {
  return (
    <div className={cn("relative z-10 w-full px-4", className)}>
      <Search className="pointer-events-none absolute left-8 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search for Fruits, Vegetables and more..."
        className="w-full rounded-xl py-6 pl-10 pr-6 ring-0 focus-visible:outline-none"
        //   onChange={handleChange}
        aria-label="Search for products"
      />
    </div>
  );
};

export default SearchInput;
