import { Dialog, DialogPanel } from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CiFilter } from "react-icons/ci";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Card from "../components/card";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { productFilter, productsByCategory } from "../config";
import { cn, formatPrice } from "../lib/utils";
import { motion } from "framer-motion";
import { Skeleton } from "../components/ui/skeleton";
import { Checkbox } from "../components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import qs from "query-string";

const ProductFilter = ({
  categoryTag,
  filters,
  onFilterChange,
  initialFilters,
  filteredProducts,
}) => {
  const [priceRange, setPriceRange] = useState(
    initialFilters.price || [0, 1000],
  );
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(initialFilters.sortOrder || "");
  const [ratingFilter, setRatingFilter] = useState(initialFilters.rating || []);

  useEffect(() => {
    setSelectedFilters(initialFilters);
    setPriceRange(initialFilters.price || [0, 1000]);
    setSortOrder(initialFilters.sortOrder || "");
    setRatingFilter(initialFilters.rating || []);
  }, [initialFilters]);

  const handleFilterChange = useCallback(
    (sectionId, value) => {
      setSelectedFilters((prev) => {
        const isSelected = prev[sectionId]?.includes(value);
        const updatedFilters = {
          ...prev,
          [sectionId]: isSelected
            ? prev[sectionId].filter((item) => item !== value)
            : [...(prev[sectionId] || []), value],
        };
        onFilterChange({
          ...updatedFilters,
          price: priceRange,
          sortOrder,
          rating: ratingFilter,
        });
        return updatedFilters;
      });
    },
    [onFilterChange, priceRange, sortOrder, ratingFilter],
  );

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange({
      ...selectedFilters,
      price: value,
      sortOrder,
      rating: ratingFilter,
    });
  };

  const handleSortChange = (value) => {
    setSortOrder((prevSortOrder) => {
      const newSortOrder = prevSortOrder === value ? "" : value;
      onFilterChange({
        ...selectedFilters,
        price: priceRange,
        sortOrder: newSortOrder,
        rating: ratingFilter,
      });
      return newSortOrder;
    });
  };

  const handleRatingChange = (value) => {
    setRatingFilter((prevRating) => {
      const updatedRating = prevRating.includes(value)
        ? prevRating.filter((r) => r !== value)
        : [...prevRating, value];
      onFilterChange({
        ...selectedFilters,
        price: priceRange,
        sortOrder,
        rating: updatedRating,
      });
      return updatedRating;
    });
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const renderFilterContent = () => (
    <Accordion isOpen={!isFilterOpen} collapsed className="flex flex-1">
      <AccordionItem>
        <AccordionTrigger className="mx-auto mr-6 w-full pb-4 pt-0">
          <Button variant="ghost" className="w-full px-9 py-0 text-left">
            <span className="text-left text-lg font-medium text-gray-700">
              Filters
            </span>
          </Button>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      handlePriceChange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-20"
                    placeholder="Min"
                  />
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      handlePriceChange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-20"
                    placeholder="Max"
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange[1]}
                  onChange={(e) =>
                    handlePriceChange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full appearance-auto text-red-800"
                />
                <div className="text-sm text-gray-500">
                  Price: {formatPrice(priceRange[0])} -{" "}
                  {formatPrice(priceRange[1])}
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Sort by Price
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <Checkbox
                    id="sort-low-to-high"
                    checked={sortOrder === "lowToHigh"}
                    onChange={() => handleSortChange("lowToHigh")}
                  />
                  <label
                    htmlFor="sort-low-to-high"
                    className="ml-3 cursor-pointer text-sm text-gray-600"
                  >
                    Low to High
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="sort-high-to-low"
                    checked={sortOrder === "highToLow"}
                    onChange={() => handleSortChange("highToLow")}
                  />
                  <label
                    htmlFor="sort-high-to-low"
                    className="ml-3 cursor-pointer text-sm text-gray-600"
                  >
                    High to Low
                  </label>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Filter by Rating
              </h3>
              <div className="mt-4 space-y-4">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div
                    key={star}
                    className="flex items-center"
                    id={`rating-${star}`}
                  >
                    <Checkbox
                      id={`rating-${star}`}
                      checked={ratingFilter.includes(star)}
                      onChange={() => handleRatingChange(star)}
                    />
                    <label
                      htmlFor={`rating-${star}`}
                      className="ml-3 cursor-pointer text-sm text-gray-600"
                    >
                      {star} Star{star !== 1 && "s"}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {filters.map((section) => (
              <div key={section.id} className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900">Filter by</h3>
                <div className="mt-4 space-y-4">
                  {section.options.map((option) => (
                    <div
                      key={option.value}
                      className="flex cursor-pointer items-center"
                    >
                      <Checkbox
                        id={`${section.id}-${option.value}`}
                        checked={selectedFilters[section.id]?.includes(
                          option.value,
                        )}
                        onChange={() =>
                          handleFilterChange(section.id, option.value)
                        }
                      />
                      <label
                        htmlFor={`${section.id}-${option.value}`}
                        className="ml-3 cursor-pointer text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <div className="w-full bg-white">
      <div className="lg:hidden">
        <Button
          variant="outline"
          className="flex w-full items-center justify-between border-zinc-400"
          onClick={() => setIsOpen(true)}
        >
          <span className="text-base font-medium text-gray-700">Filters</span>
          <CiFilter
            className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
        </Button>

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 my-8 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="p-1"
                  size="icon"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Price Range
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between">
                        <Input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) =>
                            handlePriceChange([
                              Number(e.target.value),
                              priceRange[1],
                            ])
                          }
                          className="w-20"
                          placeholder="Min"
                        />
                        <Input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) =>
                            handlePriceChange([
                              priceRange[0],
                              Number(e.target.value),
                            ])
                          }
                          className="w-20"
                          placeholder="Max"
                        />
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={1000}
                        step={10}
                        value={priceRange[1]}
                        onChange={(e) =>
                          handlePriceChange([
                            priceRange[0],
                            Number(e.target.value),
                          ])
                        }
                        className="w-full appearance-auto text-red-800"
                      />
                      <div className="text-sm text-gray-500">
                        Price: {formatPrice(priceRange[0])} -{" "}
                        {formatPrice(priceRange[1])}
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Sort by Price
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <Checkbox
                          id="sort-low-to-high"
                          checked={sortOrder === "lowToHigh"}
                          onChange={() => handleSortChange("lowToHigh")}
                        />
                        <label
                          htmlFor="sort-low-to-high"
                          className="ml-3 cursor-pointer text-sm text-gray-600"
                        >
                          Low to High
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="sort-high-to-low"
                          checked={sortOrder === "highToLow"}
                          onChange={() => handleSortChange("highToLow")}
                        />
                        <label
                          htmlFor="sort-high-to-low"
                          className="ml-3 cursor-pointer text-sm text-gray-600"
                        >
                          High to Low
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Filter by Rating
                    </h3>
                    <div className="mt-4 space-y-4">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div
                          key={star}
                          className="flex items-center"
                          id={`rating-${star}`}
                        >
                          <Checkbox
                            id={`rating-${star}`}
                            checked={ratingFilter.includes(star)}
                            onChange={() => handleRatingChange(star)}
                          />
                          <label
                            htmlFor={`rating-${star}`}
                            className="ml-3 cursor-pointer text-sm text-gray-600"
                          >
                            {star} Star{star !== 1 && "s"}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {filters.map((section) => (
                    <div
                      key={section.id}
                      className="border-b border-gray-200 pb-4"
                    >
                      <h3 className="text-lg font-medium text-gray-900">
                        Filter by
                      </h3>
                      <div className="mt-4 space-y-4">
                        {section.options.map((option) => (
                          <div
                            key={option.value}
                            className="flex cursor-pointer items-center"
                          >
                            <Checkbox
                              id={`${section.id}-${option.value}`}
                              checked={selectedFilters[section.id]?.includes(
                                option.value,
                              )}
                              onChange={() =>
                                handleFilterChange(section.id, option.value)
                              }
                            />
                            <label
                              htmlFor={`${section.id}-${option.value}`}
                              className="ml-3 cursor-pointer text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>

      <div className="hidden lg:block">{renderFilterContent()}</div>
    </div>
  );
};

const CategoriesTag = () => {
  const { categoryTag } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const cachedProducts = useMemo(() => {
    return productsByCategory[categoryTag] || [];
  }, [categoryTag]);

  useEffect(() => {
    if (cachedProducts.length > 0) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [categoryTag, cachedProducts]);

  const initialFilters = useMemo(() => {
    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      if (key === "price") {
        filters[key] = value.split("-").map(Number);
      } else if (key === "sortOrder") {
        filters[key] = value;
      } else if (key === "rating") {
        filters[key] = value.split(",").map(Number);
      } else if (key !== "page") {
        filters[key] = filters[key] ? [...filters[key], value] : [value];
      }
    }
    return filters;
  }, [searchParams]);

  const handleFilterChange = useCallback(
    (newFilters) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(newFilters).forEach(([key, value]) => {
        params.delete(key);
        if (Array.isArray(value) && value.length > 0) {
          if (key === "price") {
            params.append(key, value.join("-"));
          } else if (key === "rating") {
            params.append(key, value.join(","));
          } else {
            value.forEach((v) => params.append(key, v));
          }
        } else if (key === "sortOrder" && value) {
          params.append(key, value);
        }
      });
      params.set("page", "1");
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const filters = useMemo(
    () => productFilter[categoryTag] || [],
    [categoryTag],
  );

  const filteredProducts = useMemo(() => {
    let products = cachedProducts;
    Object.entries(initialFilters).forEach(([key, value]) => {
      if (key === "price") {
        const [min, max] = value;
        products = products.filter(
          (product) => product.price >= min && product.price <= max,
        );
      } else if (key === "sortOrder") {
        if (value === "lowToHigh") {
          products.sort((a, b) => a.price - b.price);
        } else if (value === "highToLow") {
          products.sort((a, b) => b.price - a.price);
        }
      } else if (key === "rating") {
        products = products.filter((product) =>
          value.includes(Math.floor(product.rating)),
        );
      } else {
        products = products.filter((product) =>
          value.some((v) => product[key] && product[key].includes(v)),
        );
      }
    });
    return products;
  }, [cachedProducts, initialFilters]);

  const PRODUCTS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    setPage(currentPage);
  }, [searchParams]);

  const currentPageProducts = useMemo(() => {
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, page]);

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    const url = qs.stringifyUrl(
      {
        url: `/categories/${categoryTag}`,
        query: { ...qs.parse(searchParams.toString()), page: newPage },
      },
      { skipNull: true },
    );
    navigate(url, { replace: true });
  };

  return (
    <MaxWidthWrapper className="h-full pt-0">
      <div className="mx-auto max-w-6xl">
        <div className="bg-white">
          <div className="border-b border-gray-200 pt-5 lg:pb-1 lg:pt-10">
            <h2 className="text-3xl font-extrabold capitalize tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl md:text-5xl">
              {categoryTag.replace(/-/g, " ")}
            </h2>
            <p className="mb-4 mt-2 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
              Discover a world of fresh, high-quality products in our curated
              {categoryTag.replace(/-/g, " ")} category.
            </p>
          </div>

          <div className="pb-6 pt-3 sm:pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside className="sticky top-16 flex items-start pb-4 lg:col-span-1">
              <h2 className="sr-only">Filters</h2>

              <ProductFilter
                categoryTag={categoryTag}
                filters={filters}
                onFilterChange={handleFilterChange}
                initialFilters={initialFilters}
                filteredProducts={filteredProducts}
              />
            </aside>

            <main className="w-full lg:col-span-3">
              {isLoading ? (
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {[...Array(PRODUCTS_PER_PAGE)].map((_, index) => (
                    <div key={index} className="space-y-4">
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : currentPageProducts.length > 0 ? (
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {currentPageProducts.map((product) => (
                    <Card key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center">
                  <p className="text-xl font-semibold text-gray-600">
                    No products found
                  </p>
                  <p className="mt-2 text-gray-500">
                    Try adjusting your filters or search for something else.
                  </p>
                </div>
              )}
            </main>
          </div>
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <Button
                variant={page === 1 ? "disabled" : "outline"}
                onClick={() => handlePagination(page - 1)}
                disabled={page === 1}
                className="w-24"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Prev
              </Button>
              <div className="hidden space-x-2 px-8 text-center md:flex">
                {[...Array(totalPages).keys()].map((i) => {
                  const pageNumber = i + 1;
                  return (
                    <Button
                      key={pageNumber}
                      size="icon"
                      variant={page === pageNumber ? "default" : "outline"}
                      onClick={() => handlePagination(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>
              <div className="flex md:hidden">
                Page {page} of {totalPages}
              </div>
              <Button
                variant={page === totalPages ? "disabled" : "outline"}
                onClick={() => handlePagination(page + 1)}
                disabled={page === totalPages}
                className="w-24"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CategoriesTag;
