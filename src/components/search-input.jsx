import { Search } from "lucide-react";
import qs from "query-string";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hook/use-debounce";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";

const SearchInput = ({ className }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);
  const navigate = useNavigate();
  const lastDebouncedValue = useRef(debouncedValue);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (debouncedValue !== lastDebouncedValue.current) {
      lastDebouncedValue.current = debouncedValue;

      const queryParams = debouncedValue ? { rawQuery: debouncedValue } : {};

      const url = qs.stringifyUrl(
        {
          url: debouncedValue ? `/search` : `/`,
          query: queryParams,
        },
        { skipEmptyString: true, skipNull: true },
      );

      navigate(url, { replace: true });
    }
  }, [debouncedValue, navigate]);

  return (
    <div className={cn("relative z-10 w-full px-4", className)}>
      <Search className="pointer-events-none absolute left-8 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for Fruits, Vegetables and more..."
        className="w-full rounded-xl py-6 pl-10 pr-6 ring-0 focus-visible:outline-none"
        aria-label="Search for products"
      />
    </div>
  );
};

export default SearchInput;
