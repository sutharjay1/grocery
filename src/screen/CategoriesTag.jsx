import React, { useCallback, useMemo, useState } from "react";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { useParams } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon, PlusCircle, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { CiFilter } from "react-icons/ci";
import { productFilter, productsByCategory } from "../config";
import ImageSlider from "../components/image-slider";
import { Checkbox } from "@/components/ui/checkbox";

const CategoriesTag = () => {
  const { categoryTag } = useParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = useCallback(
    (sectionId, value) =>
      setSelectedFilters((prev) => ({
        ...prev,
        [sectionId]: prev[sectionId]
          ? prev[sectionId].includes(value)
            ? prev[sectionId].filter((item) => item !== value)
            : [...prev[sectionId], value]
          : [value],
      })),
    [],
  );

  const filters = useMemo(
    () => productFilter[categoryTag] || [],
    [categoryTag],
  );

  const filteredProducts = useMemo(() => {
    const products = productsByCategory[categoryTag] || [];
    return products.filter((product) =>
      Object.entries(selectedFilters).every(
        ([filterId, selectedValues]) =>
          selectedValues.length === 0 ||
          selectedValues.includes(product[filterId]),
      ),
    );
  }, [categoryTag, selectedFilters]);

  return (
    <MaxWidthWrapper className="h-full pt-0">
      <Sheet>
        <div className="mx-auto max-w-6xl">
          <div className="bg-white">
            <div className="border-b border-gray-200 pb-10 pt-10">
              <h2 className="text-2xl font-bold capitalize tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl md:text-4xl">
                {categoryTag.replace(/-/g, " ")}
              </h2>
              <p className="mt-4 text-sm text-gray-500 sm:text-base">
                Explore our selection of fresh, locally-sourced products to add
                nutrition and flavor to your meals.
              </p>
            </div>

            <div className="py-6 sm:pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <aside className="flex items-start pb-4 lg:col-span-1">
                <h2 className="sr-only">Filters</h2>

                <SheetTrigger>
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
                </SheetTrigger>
                <SheetContent>
                  <div className="relative flex h-full w-full flex-col overflow-y-auto py-4 pb-6">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <SheetClose>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Close menu</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </SheetClose>
                    </div>

                    {/* Filters */}
                    <form className="mt-4">
                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.name}
                          className="border-t border-gray-200 pb-4 pt-4"
                        >
                          {({ open }) => (
                            <fieldset>
                              <legend className="w-full px-2">
                                <DisclosureButton className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                  <span className="text-sm font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex h-7 items-center">
                                    <ChevronDownIcon
                                      className={`h-5 w-5 transform ${
                                        open ? "-rotate-180" : "rotate-0"
                                      }`}
                                      aria-hidden="true"
                                    />
                                  </span>
                                </DisclosureButton>
                              </legend>
                              <DisclosurePanel className="px-4 pb-2 pt-4">
                                <div className="space-y-6">
                                  {section.options.map((option) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      {/* <input
                                        id={`${section.id}-${option.value}`}
                                        name={`${section.id}[]`}
                                        type="checkbox"
                                        checked={selectedFilters[
                                          section.id
                                        ]?.includes(option.value)}
                                        onChange={() =>
                                          handleFilterChange(
                                            section.id,
                                            option.value,
                                          )
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      /> */}

                                      <Checkbox
                                        id={`${section.id}-${option.value}`}
                                        name={`${section.id}[]`}
                                        checked={selectedFilters[
                                          section.id
                                        ]?.includes(option.value)}
                                        onChange={() =>
                                          handleFilterChange(
                                            section.id,
                                            option.value,
                                          )
                                        }
                                      />

                                      <label
                                        htmlFor={`${section.id}-${option.value}`}
                                        className="ml-3 text-sm text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </DisclosurePanel>
                            </fieldset>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </div>
                </SheetContent>

                <div className="hidden lg:block">
                  <form className="space-y-10 divide-y divide-gray-200">
                    {filters.map((section) => (
                      <div key={section.name} className="">
                        <fieldset>
                          <legend className="block text-sm font-medium text-gray-900">
                            {section.name}
                          </legend>
                          <div className="space-y-3 pt-6">
                            {section.options.map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <Checkbox
                                  id={`${section.id}-${option.value}`}
                                  name={`${section.id}[]`}
                                  checked={selectedFilters[
                                    section.id
                                  ]?.includes(option.value)}
                                  onChange={() =>
                                    handleFilterChange(section.id, option.value)
                                  }
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
                        </fieldset>
                      </div>
                    ))}
                  </form>
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

const Card = ({ product }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="w-full">
        <ImageSlider images={product.imageSrc} />
      </div>
      <Link to={product.href}>
        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <div className="flex flex-1 flex-col justify-end">
            <p className="text-sm italic text-gray-500">{product.options}</p>
            <p className="text-base font-medium text-gray-900">
              {product.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoriesTag;
