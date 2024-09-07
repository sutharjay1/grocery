import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { useParams, useSearchParams } from "react-router-dom";
import Card from "../components/card";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { productFilter, productsByCategory } from "../config";
import { formatPrice } from "../lib/utils";

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


  const renderFilterContent = () => (
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
            className="w-full text-red-800 appearance-auto "
          />
          <div className="text-sm text-gray-500">
            Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium text-gray-900">Sort by Price</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sort-low-to-high"
              checked={sortOrder === "lowToHigh"}
              className="size-4 rounded border-gray-300"
              onChange={() => handleSortChange("lowToHigh")}
            />
            <label
              htmlFor="sort-low-to-high"
              className="ml-3 text-sm text-gray-600"
            >
              Low to High
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sort-high-to-low"
              checked={sortOrder === "highToLow"}
              className="size-4 rounded border-gray-300"
              onChange={() => handleSortChange("highToLow")}
            />
            <label
              htmlFor="sort-high-to-low"
              className="ml-3 text-sm text-gray-600"
            >
              High to Low
            </label>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium text-gray-900">Filter by Rating</h3>
        <div className="mt-4 space-y-4">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center">
              <input
                type="checkbox"
                id={`rating-${star}`}
                checked={ratingFilter.includes(star)}
                onChange={() => handleRatingChange(star)}
                className="size-4 rounded border-gray-300"
              />
              <label
                htmlFor={`rating-${star}`}
                className="ml-3 text-sm text-gray-600"
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
              <div key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${section.id}-${option.value}`}
                  className="size-4 rounded border-gray-300"
                  checked={selectedFilters[section.id]?.includes(option.value)}
                  onChange={() => {
                    handleFilterChange(section.id, option.value);
                  }}
                />
                <label
                  htmlFor={`${section.id}-${option.value}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white">
      <div className="lg:hidden">
        <Button
          variant="outline"
          className="flex w-full items-center justify-between"
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
                {renderFilterContent()}
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryTag]);


  const initialFilters = useMemo(() => {
    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      if (key === "price") {
        filters[key] = value.split("-").map(Number);
      } else if (key === "sortOrder") {
        filters[key] = value;
      } else if (key === "rating") {
        filters[key] = value.split(",").map(Number);
      } else {
        filters[key] = filters[key] ? [...filters[key], value] : [value];
      }
    }
    return filters;
  }, [searchParams]);

  const handleFilterChange = useCallback(
    (newFilters) => {
      const params = new URLSearchParams();
      Object.entries(newFilters).forEach(([key, value]) => {
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
      setSearchParams(params);
    },
    [setSearchParams],
  );

  const filters = useMemo(
    () => productFilter[categoryTag] || [],
    [categoryTag],
  );

  const filteredProducts = useMemo(() => {
    let products = productsByCategory[categoryTag] || [];
    products = products.filter((product) =>
      Object.entries(initialFilters).every(([filterId, selectedValues]) => {
        if (filterId === "price") {
          const [min, max] = selectedValues;
          return product.price >= min && product.price <= max;
        }
        if (filterId === "sortOrder") {
          return true; // We'll handle sorting separately
        }
        if (filterId === "rating") {
          return (
            selectedValues.length === 0 ||
            selectedValues.includes(Math.floor(product.rating))
          );
        }
        if (!selectedValues || selectedValues.length === 0) {
          return true;
        }
        return selectedValues.some((value) =>
          Array.isArray(product[filterId])
            ? product[filterId].includes(value)
            : product[filterId] === value,
        );
      }),
    );

    // Apply sorting
    if (initialFilters.sortOrder === "lowToHigh") {
      products.sort((a, b) => a.price - b.price);
    } else if (initialFilters.sortOrder === "highToLow") {
      products.sort((a, b) => b.price - a.price);
    }

    return products;
  }, [categoryTag, initialFilters]);

  return (
    <MaxWidthWrapper className="h-full pt-0">
      <div className="mx-auto max-w-6xl">
        <div className="bg-white">
          <div className="border-b border-gray-200 pt-5 lg:py-10">
            <h2 className="text-2xl font-bold capitalize tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl md:text-4xl">
              {categoryTag.replace(/-/g, " ")}
            </h2>
            <p className="my-2 text-sm text-gray-500 sm:text-base">
              Explore our selection of fresh, locally-sourced products to add
              nutrition and flavor to your meals.
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
              {filteredProducts.length > 0 ? (
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
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
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CategoriesTag;
