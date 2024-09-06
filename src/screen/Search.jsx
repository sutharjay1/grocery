import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { productsByCategory } from "../config";
import MaxWidthWrapper from "../components/max-width-wrapper";
import Sheet from "../components/sheet";

import { CiFilter } from "react-icons/ci";
import { ChevronDownIcon, X } from "lucide-react";
import { Checkbox } from "../components/ui/checkbox";
import Card from "../components/card";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const rawQuery = searchParams.get("rawQuery");

  const allProducts = useMemo(() => {
    return Object.values(productsByCategory).flat();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!rawQuery) return allProducts;
    const lowercaseQuery = rawQuery.toLowerCase();
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
    );
  }, [allProducts, rawQuery]);

  return (
    <MaxWidthWrapper className="h-full pt-0">
      <Sheet>
        <div className="mx-auto max-w-6xl">
          <div className="bg-white">
            <div className="border-b border-gray-200 pb-10 pt-10 lg:pt-5">
              <p className="mt-4 text-sm text-gray-500 sm:text-base">
                Search Results
              </p>
              <h2 className="text-3xl font-bold capitalize tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl md:text-4xl">
                {rawQuery}
              </h2>
            </div>

            <div className="py-6 sm:pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <aside className="flex items-start pb-4 lg:col-span-1">
                <h2 className="sr-only">Filters</h2>

                <Sheet.Trigger>
                  <button
                    type="button"
                    className="inline-flex items-center lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="text-base font-medium text-gray-700">
                      Filters
                    </span>
                    <CiFilter
                      className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                  </button>
                </Sheet.Trigger>
                <Sheet.Content>
                  <div className="relative flex h-full w-full flex-col overflow-y-auto py-4 pb-6">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <Sheet.Close>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Close menu</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </Sheet.Close>
                    </div>

                    <form className="mt-4">
                      {/* Filter implementation can be added here */}
                    </form>
                  </div>
                </Sheet.Content>

                <div className="hidden lg:block">
                  {/* Desktop filter implementation can be added here */}
                </div>
              </aside>

              <main className="w-full lg:col-span-3">
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} product={product} />
                  ))}
                </div>
              </main>
            </div>
          </div>
        </div>
      </Sheet>
    </MaxWidthWrapper>
  );
};

export default Search;
