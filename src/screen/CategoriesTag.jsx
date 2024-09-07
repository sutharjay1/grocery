import { Checkbox } from "@/components/ui/checkbox";
import React, { useCallback, useMemo, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { useParams } from "react-router-dom";
import Card from "../components/card";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { productFilter, productsByCategory } from "../config";
import { formatPrice } from "../lib/utils";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { X } from "lucide-react";

const ProductFilter = ({ categoryTag, filters, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = useCallback(
    (sectionId, value) => {
      setSelectedFilters((prev) => {
        const newFilters = {
          ...prev,
          [sectionId]: prev[sectionId]
            ? prev[sectionId].includes(value)
              ? prev[sectionId].filter((item) => item !== value)
              : [...prev[sectionId], value]
            : [value],
        };
        onFilterChange({ ...newFilters, price: priceRange });
        return newFilters;
      });
    },
    [onFilterChange, priceRange],
  );

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange({ ...selectedFilters, price: value });
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
            className="w-full"
          />
          <div className="text-sm text-gray-500">
            Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
          </div>
        </div>
      </div>
      {filters.map((section) => (
        <div key={section.id} className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-medium text-gray-900">{section.name}</h3>
          <div className="mt-4 space-y-4">
            {section.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <Checkbox
                  id={`${section.id}-${option.value}`}
                  checked={selectedFilters[section.id]?.includes(option.value)}
                  onCheckedChange={(checked) => {
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
          <div className="fixed inset-0 flex items-center justify-center p-4">
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
              <div className="mt-4">{renderFilterContent()}</div>
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
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = useCallback((newFilters) => {
    setSelectedFilters(newFilters);
  }, []);

  const filters = useMemo(
    () => productFilter[categoryTag] || [],
    [categoryTag],
  );

  const filteredProducts = useMemo(() => {
    const products = productsByCategory[categoryTag] || [];
    return products.filter((product) =>
      Object.entries(selectedFilters).every(([filterId, selectedValues]) => {
        if (filterId === "price") {
          const [min, max] = selectedValues;
          return product.price >= min && product.price <= max;
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
  }, [categoryTag, selectedFilters]);

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
